import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { mockDiseases, mockCrops } from "../data/mockData";

export const PreventionPage = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [expandedDisease, setExpandedDisease] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDiseases = mockDiseases.filter((disease) => {
    const matchesCrop = !selectedCrop || disease.crop === selectedCrop;
    const matchesSearch =
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.symptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCrop && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Disease Prevention</h1>
        <p className="text-gray-600 mb-8">Learn about crop diseases and get prevention recommendations</p>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search diseases, symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCrop("")}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCrop === "" ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              All Crops
            </button>
            {mockCrops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop.name)}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                  selectedCrop === crop.name ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <span>{crop.icon}</span>
                {crop.name}
              </button>
            ))}
          </div>
        </div>

        {/* Disease Cards */}
        <div className="space-y-4">
          {filteredDiseases.length > 0 ? (
            filteredDiseases.map((disease) => (
              <div key={disease.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => setExpandedDisease(expandedDisease === disease.id ? null : disease.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{disease.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        disease.severity === "Critical"
                          ? "bg-red-100 text-red-700"
                          : disease.severity === "High"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {disease.severity}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {disease.crop}
                      </span>
                    </div>
                    <p className="text-gray-600">{disease.symptoms.slice(0, 2).join(", ")}...</p>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-gray-400 transition ${expandedDisease === disease.id ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Expanded Content */}
                {expandedDisease === disease.id && (
                  <div className="px-6 py-6 bg-gray-50 border-t space-y-6">
                    {/* Symptoms */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">🔍 Symptoms</h4>
                      <ul className="space-y-2">
                        {disease.symptoms.map((symptom, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700">
                            <span className="text-green-500 mt-1">•</span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Causes */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">⚕️ Causes</h4>
                      <p className="text-gray-700">{disease.causes}</p>
                    </div>

                    {/* Prevention Tips */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">🛡️ Prevention Tips</h4>
                      <ul className="space-y-2">
                        {disease.preventionTips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700">
                            <span className="text-green-500 mt-1">✓</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Treatment */}
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-gray-900 mb-2">💊 Suggested Treatment</h4>
                      <p className="text-gray-700">{disease.treatment}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600">No diseases found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
