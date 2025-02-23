"use client";

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { getAuthHeaders } from "../../auth/api";

export default function CodeEditor({ challengeId }) {
    const headers = getAuthHeaders()
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access");

  const verifySolution = async () => {
    setLoading(true);
    setStatus(null);
    setOutput("");

    try {
      const response = await fetch(
        `${url}/challenges/verify_solution/${challengeId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             ...headers
          },
          body: JSON.stringify({ code }),
        }
      );

      const result = await response.json();
      setLoading(false);

      if (response.ok && result.status === "completed") {
        setStatus("✅ Challenge Passed!");
      } else {
        setStatus("❌ Challenge Failed!");
        setOutput(
          result.failed_cases
            .map(
              (caseData) =>
                `Input: ${caseData.input}\nExpected: ${caseData.expected_output}\nReceived: ${caseData.received_output}\n\n`
            )
            .join("\n")
        );
      }
      console.log(result);
    } catch (error) {
      setLoading(false);
      setStatus("❌ Error submitting solution!");
      setOutput(error.message);
    }
  };

  return (
    <div className="mt-4">
      <CodeMirror
        value={code}
        extensions={[javascript()]}
        onChange={(value) => setCode(value)}
        height="200px"
        theme="dark"
      />

      {token ? (
        <button
          onClick={verifySolution}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Running..." : "Submit Code"}
        </button>
      ) : (
        <p>Login to continue</p>
      )}

      <div className="mt-4">
        {status && <p className="font-semibold">{status}</p>}
        {output && <pre className="bg-gray-200 p-2 rounded">{output}</pre>}
      </div>
    </div>
  );
}
