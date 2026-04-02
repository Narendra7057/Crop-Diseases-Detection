// Mock data for the Crop Disease Detection System

export const mockDiseases = [
  {
    id: 1,
    name: "Early Blight",
    crop: "Tomato",
    symptoms: ["Brown spots on lower leaves", "Yellow halo around spots", "Concentric ring pattern"],
    causes: "Fungal infection, caused by Alternaria solani",
    preventionTips: [
      "Remove lower infected leaves",
      "Improve air circulation",
      "Avoid overhead watering",
      "Use disease-resistant varieties"
    ],
    treatment: "Apply copper or sulfur-based fungicides every 7-10 days",
    severity: "Medium"
  },
  {
    id: 2,
    name: "Powdery Mildew",
    crop: "Grapes",
    symptoms: ["White powder on leaves", "Reduced fruit quality", "Leaf curling"],
    causes: "Fungal infection by Erysiphe necator",
    preventionTips: [
      "Maintain proper canopy density",
      "Improve air ventilation",
      "Avoid high nitrogen fertilizers",
      "Plant resistant varieties"
    ],
    treatment: "Spray sulfur powder or potassium bicarbonate solution",
    severity: "High"
  },
  {
    id: 3,
    name: "Corn Leaf Blight",
    crop: "Maize",
    symptoms: ["Gray-green spots", "Oval lesions with dark borders", "Tissue death"],
    causes: "Fungal disease caused by Exserohilum turcicum",
    preventionTips: [
      "Crop rotation",
      "Use resistant varieties",
      "Remove infected plant debris",
      "Proper spacing between plants"
    ],
    treatment: "Apply triazole or strobilurin fungicides",
    severity: "High"
  },
  {
    id: 4,
    name: "Pink Rot",
    crop: "Onion",
    symptoms: ["Pink or salmon-colored rot", "Soft tissue breakdown", "Unpleasant odor"],
    causes: "Fungal infection by Phytophthora infestans",
    preventionTips: [
      "Store in cool, dry conditions",
      "Ensure proper ventilation",
      "Remove infected bulbs immediately",
      "Avoid mechanical injury during harvest"
    ],
    treatment: "No effective treatment once infected; prevention is key",
    severity: "Critical"
  },
  {
    id: 5,
    name: "Late Blight",
    crop: "Tomato",
    symptoms: ["Water-soaked spots", "White fungal growth on undersides", "Rapid spread"],
    causes: "Fungal disease by Phytophthora infestans",
    preventionTips: [
      "Avoid wet foliage",
      "Increase air circulation",
      "Remove infected parts immediately",
      "Copper fungicide spray"
    ],
    treatment: "Apply metalaxyl or chlorothalonil fungicides",
    severity: "Critical"
  },
  {
    id: 6,
    name: "Downy Mildew",
    crop: "Grapes",
    symptoms: ["Yellow oil spots on upper surface", "Gray mold on undersides", "Leaf drop"],
    causes: "Oomycete pathogen Plasmopara viticola",
    preventionTips: [
      "Remove affected leaves early",
      "Improve drainage",
      "Reduce humidity",
      "Use resistant rootstocks"
    ],
    treatment: "Copper sulfate or fixed copper fungicides",
    severity: "High"
  }
];

export const mockCrops = [
  { id: 1, name: "Tomato", icon: "🍅", color: "red" },
  { id: 2, name: "Grapes", icon: "🍇", color: "purple" },
  { id: 3, name: "Maize", icon: "🌽", color: "yellow" },
  { id: 4, name: "Onion", icon: "🧅", color: "orange" }
];

export const mockDetectionResults = [
  {
    id: 1,
    disease: "Early Blight",
    crop: "Tomato",
    confidence: 92.5,
    severity: "Medium",
    recommendation: "Apply copper fungicide and remove infected leaves",
    timestamp: "2024-01-15",
    imageUrl: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    disease: "Healthy",
    crop: "Grapes",
    confidence: 98.2,
    severity: "None",
    recommendation: "Continue regular maintenance and monitoring",
    timestamp: "2024-01-14",
    imageUrl: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    disease: "Powdery Mildew",
    crop: "Grapes",
    confidence: 87.3,
    severity: "High",
    recommendation: "Spray sulfur powder or use systemic fungicides",
    timestamp: "2024-01-13",
    imageUrl: "https://via.placeholder.com/200"
  }
];

export const dashboardStats = [
  { label: "Total Scans", value: 234, icon: "📊", color: "bg-blue-500" },
  { label: "Healthy Crops", value: 156, icon: "✅", color: "bg-green-500" },
  { label: "Diseased Crops", value: 45, icon: "⚠️", color: "bg-yellow-500" },
  { label: "High-Risk Cases", value: 18, icon: "🚨", color: "bg-red-500" }
];

export const recentScans = [
  { id: 1, crop: "Tomato", disease: "Early Blight", confidence: 92, date: "Today", status: "Critical" },
  { id: 2, crop: "Grapes", disease: "Healthy", confidence: 98, date: "Yesterday", status: "Healthy" },
  { id: 3, crop: "Maize", disease: "Corn Leaf Blight", confidence: 85, date: "2 days ago", status: "Warning" },
  { id: 4, crop: "Onion", disease: "Healthy", confidence: 96, date: "3 days ago", status: "Healthy" },
  { id: 5, crop: "Tomato", disease: "Late Blight", confidence: 88, date: "4 days ago", status: "Critical" }
];

export const faqData = [
  {
    question: "How accurate is the disease detection?",
    answer: "Our AI model achieves 92-95% accuracy for most crop diseases. However, always verify with agronomic experts for critical decisions."
  },
  {
    question: "What crops are currently supported?",
    answer: "We currently support Tomato, Grapes, Maize, and Onion. More crops will be added soon."
  },
  {
    question: "Can I use this on mobile devices?",
    answer: "Yes! Our platform is fully responsive and works on smartphones, tablets, and desktops."
  },
  {
    question: "How often should I scan my crops?",
    answer: "We recommend scanning weekly during growing season and bi-weekly during off-season for early disease detection."
  },
  {
    question: "Do you provide real-time support?",
    answer: "Yes, we have a dedicated support team available 24/7 for farmers. Contact us anytime!"
  },
  {
    question: "Is my data secure?",
    answer: "All your data is encrypted and stored securely. We never share your information with third parties."
  }
];

export const testimonials = [
  {
    name: "Rajesh Patel",
    role: "Tomato Farmer, Gujarat",
    message: "This app helped me save my entire crop! Early detection of blight saved me thousands of rupees.",
    rating: 5
  },
  {
    name: "Priya Singh",
    role: "Grape Farmer, Maharashtra",
    message: "The prevention tips are very practical and easy to follow. Highly recommended for all farmers.",
    rating: 5
  },
  {
    name: "Amit Sharma",
    role: "Maize Farmer, Madhya Pradesh",
    message: "Easy to use interface. The mobile app works perfectly in my farm without good internet connectivity.",
    rating: 4
  },
  {
    name: "Kavya Reddy",
    role: "Onion Farmer, Karnataka",
    message: "Support team is very helpful. They responded to my questions within minutes.",
    rating: 5
  }
];

export const features = [
  {
    icon: "🔍",
    title: "AI-Powered Detection",
    description: "Advanced machine learning detects diseases in seconds with high accuracy"
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    description: "Access detection and prevention tips on your smartphone anywhere on farm"
  },
  {
    icon: "💚",
    title: "Eco-Friendly Solutions",
    description: "Get organic and sustainable treatment recommendations"
  },
  {
    icon: "📊",
    title: "Track Progress",
    description: "Monitor your crops health with detailed analytics and reports"
  },
  {
    icon: "🌍",
    title: "Multi-Crop Support",
    description: "Supports multiple crop varieties with specialized recommendations"
  },
  {
    icon: "🎯",
    title: "Expert Advice",
    description: "Get guidance from agricultural experts available 24/7"
  }
];

export const howItWorks = [
  {
    step: 1,
    title: "Upload Image",
    description: "Take a photo of your crop leaf or upload from gallery"
  },
  {
    step: 2,
    title: "AI Analysis",
    description: "Our AI analyzes the image in real-time"
  },
  {
    step: 3,
    title: "Instant Result",
    description: "Get disease diagnosis with confidence score"
  },
  {
    step: 4,
    title: "Prevention Tips",
    description: "Receive personalized prevention and treatment recommendations"
  }
];
