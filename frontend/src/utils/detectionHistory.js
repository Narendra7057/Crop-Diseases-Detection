const DETECTION_HISTORY_KEY = "detectionHistory";
const MAX_HISTORY_ITEMS = 100;

const safeParse = (value) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getDetectionHistory = () => {
  const history = safeParse(localStorage.getItem(DETECTION_HISTORY_KEY));
  return history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const getSeverityStatus = (severity) => {
  if (!severity) return "Warning";

  const normalized = severity.toLowerCase();

  if (normalized === "none" || normalized === "low") {
    return "Healthy";
  }

  if (normalized === "medium") {
    return "Warning";
  }

  return "Critical";
};

export const addDetectionHistoryItem = (payload) => {
  const item = {
    id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    crop: payload.crop,
    disease: payload.disease,
    confidence: Number(payload.confidence ?? 0),
    severity: payload.severity ?? "Medium",
    recommendation: payload.recommendation ?? "",
    status: getSeverityStatus(payload.severity),
    timestamp: new Date().toISOString(),
  };

  const existing = getDetectionHistory();
  const next = [item, ...existing].slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(DETECTION_HISTORY_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("detectionHistoryUpdated"));

  return item;
};
