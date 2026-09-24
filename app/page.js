"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setReply(data.reply);
    } catch (error) {
      setReply("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0f1115",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px 15px"
    }}>
      <h1>NaveeGPT</h1>

      <p>AI Assistant</p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message NaveeGPT..."
        rows={5}
        style={{
          width: "100%",
          maxWidth: "700px",
          padding: "15px",
          borderRadius: "12px",
          border: "1px solid #333",
          background: "#181a20",
          color: "white",
          fontSize: "16px"
        }}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "12px 25px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      {reply && (
        <div style={{
          width: "100%",
          maxWidth: "700px",
          marginTop: "25px",
          padding: "20px",
          borderRadius: "12px",
          background: "#181a20",
          whiteSpace: "pre-wrap"
        }}>
          {reply}
        </div>
      )}
    </main>
  );
          }
