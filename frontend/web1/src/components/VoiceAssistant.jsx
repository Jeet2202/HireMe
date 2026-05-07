/**
 * VoiceAssistant — Main voice navigator component.
 *
 * This is a guided, intent-based voice system — NOT a chatbot.
 * Users can speak commands to navigate jobs, hear summaries,
 * and accept/reject jobs with voice confirmation.
 *
 * States: idle | listening | processing | speaking
 */

import { useState, useRef, useCallback, useEffect } from "react";
import useRecorder from "../hooks/useRecorder";
import "./VoiceAssistant.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function VoiceAssistant() {
  // ── State ────────────────────────────────────────────────
  const [phase, setPhase] = useState("idle"); // idle | listening | processing | speaking
  const [responseText, setResponseText] = useState(
    "Tap the mic and speak a command."
  );
  const [intent, setIntent] = useState("");
  const [confirmState, setConfirmState] = useState("idle"); // idle | awaiting_confirmation
  const [history, setHistory] = useState([]);
  const [networkError, setNetworkError] = useState(null);

  const audioRef = useRef(null);
  const { status: recorderStatus, error: recorderError, startRecording, stopRecording, cancelRecording } = useRecorder();

  // ── Mic button handler ───────────────────────────────────
  const handleMicClick = useCallback(async () => {
    if (phase === "listening") {
      // Stop recording and send to backend
      setPhase("processing");
      const blob = await stopRecording();

      if (!blob || blob.size === 0) {
        setResponseText("No audio captured. Please try again.");
        setPhase("idle");
        return;
      }

      await sendAudio(blob);
    } else if (phase === "idle" || phase === "speaking") {
      // Stop any playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPhase("listening");
      setNetworkError(null);
      await startRecording();
    }
  }, [phase, startRecording, stopRecording]);

  // ── Send audio to backend ────────────────────────────────
  const sendAudio = async (blob) => {
    try {
      setNetworkError(null);
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");

      const res = await fetch(`${API_URL}/api/voice/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      setResponseText(data.text);
      setIntent(data.intent);
      setConfirmState(data.state || "idle");

      // Add to history
      setHistory((prev) => [
        { text: data.text, intent: data.intent, time: new Date() },
        ...prev.slice(0, 9), // Keep last 10
      ]);

      // Play audio response
      if (data.audio) {
        playAudio(data.audio);
      } else {
        setPhase("idle");
      }
    } catch (err) {
      console.error("Voice API error:", err);
      setNetworkError("Connection failed. Please check your network.");
      setResponseText("Network error. Please try again.");
      setPhase("idle");
    }
  };

  // ── Play base64 audio ────────────────────────────────────
  const playAudio = (base64Audio) => {
    try {
      setPhase("speaking");
      const audioData = atob(base64Audio);
      const audioArray = new Uint8Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        audioArray[i] = audioData.charCodeAt(i);
      }
      const audioBlob = new Blob([audioArray], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setPhase("idle");
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      audio.onerror = () => {
        setPhase("idle");
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      audio.play().catch(() => {
        setPhase("idle");
      });
    } catch {
      setPhase("idle");
    }
  };

  // ── Cleanup on unmount ───────────────────────────────────
  useEffect(() => {
    return () => {
      cancelRecording();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [cancelRecording]);

  // ── Phase-based UI text ──────────────────────────────────
  const getStatusLabel = () => {
    switch (phase) {
      case "listening":
        return "Listening...";
      case "processing":
        return "Processing...";
      case "speaking":
        return "Speaking...";
      default:
        return "Tap mic to speak";
    }
  };

  const getIntentBadge = () => {
    if (!intent || intent === "UNKNOWN") return null;
    const colors = {
      READ_SUMMARY: "#3b82f6",
      BEST_JOB: "#f59e0b",
      NEXT_JOB: "#8b5cf6",
      REPEAT: "#6b7280",
      ACCEPT: "#10b981",
      REJECT: "#ef4444",
      STOP: "#6b7280",
      CONFIRM: "#10b981",
      DENY: "#ef4444",
    };
    return (
      <span
        className="va-intent-badge"
        style={{ backgroundColor: colors[intent] || "#6b7280" }}
      >
        {intent}
      </span>
    );
  };

  // ── Quick action buttons ─────────────────────────────────
  const quickActions = [
    { label: "Summary", icon: "📋" },
    { label: "Best Job", icon: "⭐" },
    { label: "Next", icon: "⏭️" },
    { label: "Repeat", icon: "🔁" },
  ];

  return (
    <div className="va-container">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="va-header">
        <div className="va-header-icon">🎙️</div>
        <div>
          <h2 className="va-title">Voice Job Navigator</h2>
          <p className="va-subtitle">Speak commands to find and accept jobs</p>
        </div>
      </div>

      {/* ── Response Card ──────────────────────────────── */}
      <div className={`va-response-card ${confirmState === "awaiting_confirmation" ? "va-confirming" : ""}`}>
        {confirmState === "awaiting_confirmation" && (
          <div className="va-confirm-badge">⚠️ Confirmation Required</div>
        )}
        <p className="va-response-text">{responseText}</p>
        <div className="va-response-meta">
          {getIntentBadge()}
          <span className="va-status-text">{getStatusLabel()}</span>
        </div>
      </div>

      {/* ── Mic Button ─────────────────────────────────── */}
      <div className="va-mic-section">
        <button
          id="voice-mic-button"
          className={`va-mic-btn va-mic-${phase}`}
          onClick={handleMicClick}
          disabled={phase === "processing"}
          aria-label={phase === "listening" ? "Stop recording" : "Start recording"}
        >
          <div className="va-mic-inner">
            {phase === "processing" ? (
              <div className="va-spinner" />
            ) : phase === "listening" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="va-mic-icon">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="va-mic-icon">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
          </div>
          {phase === "listening" && (
            <>
              <div className="va-pulse-ring va-pulse-1" />
              <div className="va-pulse-ring va-pulse-2" />
              <div className="va-pulse-ring va-pulse-3" />
            </>
          )}
        </button>
        <p className="va-mic-label">{getStatusLabel()}</p>
      </div>

      {/* ── Quick Actions ──────────────────────────────── */}
      <div className="va-quick-actions">
        {quickActions.map((action) => (
          <div key={action.label} className="va-quick-chip">
            <span>{action.icon}</span>
            <span>"{action.label}"</span>
          </div>
        ))}
      </div>

      {/* ── Errors ─────────────────────────────────────── */}
      {(recorderError || networkError) && (
        <div className="va-error">
          ⚠️ {recorderError || networkError}
        </div>
      )}

      {/* ── Command History ────────────────────────────── */}
      {history.length > 0 && (
        <div className="va-history">
          <h3 className="va-history-title">Recent</h3>
          {history.map((item, i) => (
            <div key={i} className="va-history-item">
              <span className="va-history-intent">{item.intent}</span>
              <span className="va-history-text">{item.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Help ───────────────────────────────────────── */}
      <div className="va-help">
        <h3 className="va-help-title">Voice Commands</h3>
        <div className="va-help-grid">
          <div className="va-help-item">
            <span className="va-help-cmd">"Summary"</span>
            <span className="va-help-desc">Hear available jobs overview</span>
          </div>
          <div className="va-help-item">
            <span className="va-help-cmd">"Best job"</span>
            <span className="va-help-desc">Hear the highest paying job</span>
          </div>
          <div className="va-help-item">
            <span className="va-help-cmd">"Next"</span>
            <span className="va-help-desc">Hear the next job</span>
          </div>
          <div className="va-help-item">
            <span className="va-help-cmd">"Accept"</span>
            <span className="va-help-desc">Accept current job</span>
          </div>
          <div className="va-help-item">
            <span className="va-help-cmd">"Reject"</span>
            <span className="va-help-desc">Skip current job</span>
          </div>
          <div className="va-help-item">
            <span className="va-help-cmd">"Repeat"</span>
            <span className="va-help-desc">Hear last response again</span>
          </div>
        </div>
      </div>
    </div>
  );
}
