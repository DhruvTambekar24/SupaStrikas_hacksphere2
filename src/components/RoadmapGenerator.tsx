import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "github-markdown-css"; // Import GitHub Markdown styles
import Sidebar from "./Sidebar";

const RoadmapGenerator: React.FC = () => {
  // Form state
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [durationMonths, setDurationMonths] = useState<number>(12);
  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  // Response state
  const [roadmap, setRoadmap] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setRoadmap("");
    if (!projectTitle || !projectDescription || !startDate) {
      setError("Please fill out all required fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("https://r-roadmap-generator-kk9t.vercel.app/roadmap", {
        project_title: projectTitle,
        project_description: projectDescription,
        start_date: startDate,
        duration_months: durationMonths,
        additional_notes: additionalNotes,
      });
      setRoadmap(response.data.roadmap);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "An error occurred while generating the roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center">
  
      <Sidebar/>
    <div className="flex flex-col justify-between items-center md:flex-row min-h-screen overflow-scroll   text-black">
      <div className=" flex flex-col justify-center items-center p-4 mr-44  rounded-lg shadow-md w-full max-w-3xl drop-shadow-2xl border-2 border-black">
        <h1 className="text-3xl font-bold text-center mb-6">
          🚀 Roadmap Generator
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Enter your project details below and let Gemini AI create a detailed
          roadmap with milestones, timelines, and actionable steps.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="projectTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Project Title *
            </label>
            <input
              id="projectTitle"
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Enter your project name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="projectDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Project Description *
            </label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Provide a brief description of your project, including goals and objectives"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Project Start Date *
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="durationMonths"
                className="block text-sm font-medium text-gray-700"
              >
                Estimated Duration (months) *
              </label>
              <input
                id="durationMonths"
                type="number"
                min="1"
                max="60"
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="additionalNotes"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Notes or Requirements
            </label>
            <textarea
              id="additionalNotes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any extra details or constraints for your roadmap"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Generating Roadmap..." : "Generate Roadmap"}
          </button>
        </form>
        {roadmap && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Generated Roadmap</h2>
            <div className="prose prose-sm px-4 max-w-none markdown-body">
              <ReactMarkdown>{roadmap}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default RoadmapGenerator;
