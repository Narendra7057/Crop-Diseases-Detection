import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { AlertCircle, TrendingUp } from "lucide-react";
import { getDetectionHistory } from "../utils/detectionHistory";

const COLORS = ["#10b981", "#ef4444", "#f59e0b"];

export const DashboardPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const syncHistory = () => {
      setHistory(getDetectionHistory());
    };

    syncHistory();
    window.addEventListener("storage", syncHistory);
    window.addEventListener("detectionHistoryUpdated", syncHistory);

    return () => {
      window.removeEventListener("storage", syncHistory);
      window.removeEventListener("detectionHistoryUpdated", syncHistory);
    };
  }, []);

  const healthyCount = useMemo(() => {
    return history.filter((item) => {
      const severity = (item.severity || "").toLowerCase();
      const status = (item.status || "").toLowerCase();
      return severity === "none" || severity === "low" || status === "healthy";
    }).length;
  }, [history]);

  const warningCount = useMemo(() => {
    return history.filter((item) => {
      const severity = (item.severity || "").toLowerCase();
      const status = (item.status || "").toLowerCase();
      return severity === "medium" || status === "warning";
    }).length;
  }, [history]);

  const diseasedCount = Math.max(history.length - healthyCount, 0);

  const highRiskCount = useMemo(() => {
    return history.filter((item) => {
      const severity = (item.severity || "").toLowerCase();
      const status = (item.status || "").toLowerCase();
      return severity === "high" || severity === "critical" || status === "critical";
    }).length;
  }, [history]);

  const dashboardStats = useMemo(() => {
    return [
      { label: "Total Scans", value: history.length, icon: "📊", color: "bg-blue-500" },
      { label: "Healthy Crops", value: healthyCount, icon: "✅", color: "bg-green-500" },
      { label: "Diseased Crops", value: diseasedCount, icon: "⚠️", color: "bg-yellow-500" },
      { label: "High-Risk Cases", value: highRiskCount, icon: "🚨", color: "bg-red-500" },
    ];
  }, [diseasedCount, healthyCount, highRiskCount, history.length]);

  const chartData = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("en", { month: "short" });
    const months = [];

    for (let i = 5; i >= 0; i -= 1) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      months.push({
        key,
        month: formatter.format(date),
        scans: 0,
        diseased: 0,
      });
    }

    const monthIndex = Object.fromEntries(months.map((item, idx) => [item.key, idx]));

    history.forEach((item) => {
      const date = new Date(item.timestamp);
      if (Number.isNaN(date.getTime())) {
        return;
      }

      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const idx = monthIndex[key];

      if (idx === undefined) {
        return;
      }

      months[idx].scans += 1;
      const severity = (item.severity || "").toLowerCase();
      const status = (item.status || "").toLowerCase();
      const isHealthy = severity === "none" || severity === "low" || status === "healthy";

      if (!isHealthy) {
        months[idx].diseased += 1;
      }
    });

    return months;
  }, [history]);

  const pieData = useMemo(() => {
    return [
      { name: "Healthy", value: healthyCount },
      { name: "Diseased", value: Math.max(diseasedCount - warningCount, 0) },
      { name: "Monitor", value: warningCount },
    ];
  }, [diseasedCount, healthyCount, warningCount]);

  const recentScans = useMemo(() => {
    return history.slice(0, 8).map((scan) => {
      const date = new Date(scan.timestamp);
      return {
        ...scan,
        date: Number.isNaN(date.getTime()) ? "Unknown" : date.toLocaleDateString(),
      };
    });
  }, [history]);

  const activeAlerts = useMemo(() => {
    return history.filter((item) => {
      const severity = (item.severity || "").toLowerCase();
      const status = (item.status || "").toLowerCase();
      return severity === "high" || severity === "critical" || status === "critical";
    }).slice(0, 2);
  }, [history]);

  const hasData = history.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Monitor your crop health and detection history</p>

        {!hasData && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
            <p className="text-blue-900 font-medium">No scan history yet.</p>
            <p className="text-blue-700 mt-1">Run your first disease analysis to populate this dashboard with live stats.</p>
            <Link to="/detection" className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Go to Detection
            </Link>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4"
            >
              <div className={`${stat.color} p-3 rounded-lg text-white text-2xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Line Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Scan Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="scans" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="diseased" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Crop Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${Number(value)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Scans */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Scans</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Crop</th>
                    <th className="text-left py-3 px-4 font-semibold">Disease</th>
                    <th className="text-center py-3 px-4 font-semibold">Confidence</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="text-center py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((scan) => (
                    <tr key={scan.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{scan.crop}</td>
                      <td className="py-3 px-4">{scan.disease}</td>
                      <td className="py-3 px-4 text-center font-medium">{Number(scan.confidence).toFixed(1)}%</td>
                      <td className="py-3 px-4 text-gray-600">{scan.date}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            scan.status === "Healthy"
                              ? "bg-green-100 text-green-700"
                              : scan.status === "Warning"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {scan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentScans.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">No scans available yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts & Alerts */}
          <div className="space-y-6">
            {/* Alerts Panel */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-red-500" />
                Active Alerts
              </h2>
              <div className="space-y-3">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                    <p className="font-semibold text-red-900">{alert.crop} - {alert.severity}</p>
                    <p className="text-sm text-red-700">{alert.disease}</p>
                  </div>
                ))}
                {activeAlerts.length === 0 && (
                  <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="font-semibold text-green-900">No active alerts</p>
                    <p className="text-sm text-green-700">Critical or high-risk detections will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Weather Card */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Today's Weather</h2>
              <div className="text-4xl font-bold mb-2">28°C</div>
              <p className="mb-3">Partly Cloudy with 65% humidity</p>
              <div className="space-y-2 text-sm">
                <p>💧 Humidity: 65%</p>
                <p>💨 Wind: 12 km/h</p>
                <p>☀️ UV Index: 6 (High)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
