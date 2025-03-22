
import React, { useState } from "react";

const Summarize: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8003/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, language: "en" }), // Ensure language is sent
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data: { summary: string } = await res.json();
      setSummary(data.summary);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setSummary(null);
    }
  };

  return (
    <div>
      <input type="text" value={url} onChange={handleChanges} placeholder="Enter URL" />
      <button onClick={handleSubmit}>Summarize</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {summary && <pre>{summary}</pre>}
    </div>
  );
};

export default Summarize;
