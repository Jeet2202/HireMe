/**
 * useRecorder — Custom hook for browser audio recording.
 *
 * Uses MediaRecorder API to capture audio from the microphone.
 * Returns controls and state for the recording lifecycle.
 *
 * States: idle → listening → stopped
 */

import { useState, useRef, useCallback } from "react";

export default function useRecorder() {
  const [status, setStatus] = useState("idle"); // idle | listening | error
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  /**
   * Start recording audio from the microphone.
   * Returns a Promise that resolves when recording begins.
   */
  const startRecording = useCallback(async () => {
    try {
      setError(null);
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        },
      });

      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : "audio/webm",
      });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(100); // Collect data every 100ms
      setStatus("listening");
    } catch (err) {
      console.error("Microphone access denied:", err);
      setError(
        err.name === "NotAllowedError"
          ? "Microphone permission denied. Please allow mic access."
          : "Could not access microphone. Please check your device."
      );
      setStatus("error");
    }
  }, []);

  /**
   * Stop recording and return the audio Blob.
   * @returns {Promise<Blob|null>} The recorded audio blob, or null on error.
   */
  const stopRecording = useCallback(() => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;

      if (!recorder || recorder.state === "inactive") {
        setStatus("idle");
        resolve(null);
        return;
      }

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];

        // Stop all tracks to release the mic
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        setStatus("idle");
        resolve(blob);
      };

      recorder.stop();
    });
  }, []);

  /**
   * Cancel recording without returning data.
   */
  const cancelRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    chunksRef.current = [];
    setStatus("idle");
    setError(null);
  }, []);

  return {
    status,
    error,
    startRecording,
    stopRecording,
    cancelRecording,
  };
}
