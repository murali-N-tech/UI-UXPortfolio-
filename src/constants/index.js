export const NAV_LINKS = [
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

export const EDUCATION = [
  {
    title: "B.Tech in AI & Data Science",
    institution: "SRKR Engineering College",
    date: "2022 - 2026",
    description: "Focusing on Machine Learning, Deep Learning, and Full Stack Systems.",
  },
];

export const SKILLS = [
  {
    category: "Frontend Development",
    items: [
      "React",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Chakra UI",
      "Tailwind CSS",
      "Framer Motion",
      "Responsive Design"
    ]
  },
  {
    category: "Backend Development",
    items: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "Authentication (JWT)"
    ]
  },
  {
    category: "Databases",
    items: [
      "MongoDB",
      "Mongoose",
      "PostgreSQL"
    ]
  },
  {
    category: "Data Science & ML (Python)",
    items: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow"
    ]
  },
  {
    category: "ML Model & App Deployment",
    items: [
      "Render",
      "Streamlit",
      "Vercel",
      "Netlify"
    ]
  },
  {
    category: "Tools & Technologies",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code"
    ]
  },
  {
    category: "Concepts & Methodologies",
    items: [
      "MVC Architecture",
      "API Design",
      "OOP",
      "Data Structures & Algorithms"
    ]
  }
];

export const PROJECTS = [
  {
    id: "hire-me-ai",
    title: "HIRE-ME AI",
    terminalTitle: "HIRE-ME-AI [ v1.0 ]",
    commands: ["cd projects/hire-me-ai", "npm install", "npm start"],
    status: "Server - Running on port 5000",
    description: "Intelligent resume evaluation and interview system that uses AI to score candidates.",
    features: ["OpenAI API", "MERN Stack", "AWS Deployment"],
    mockup: "/assets/images/hire-me-mobile.png", // Ensure this image exists
    github: "https://github.com/your-username/hire-me-ai",
    live: "#"
  },
  {
    id: "ai-aap",
    title: "AI-AAP",
    terminalTitle: "AI-AAP [ Adaptive Engine ]",
    commands: ["cd core/engine", "python main.py", "Loading Weights..."],
    status: "Core Engine - Optimized",
    description: "A microservices-based AI-driven adaptive learning platform for students.",
    features: ["TensorFlow", "Python", "Microservices"],
    mockup: "/assets/images/ai-aap-mobile.png",
    github: "#",
    live: "#"
  },
  {
    id: "school-platform",
    title: "NewGeneration School",
    terminalTitle: "SCHOOL-MGT [ v2.4 ]", // Added this
    commands: ["cd school-portal", "npm run dev", "Database Connected"], // Added this
    status: "Production Build - Live", // Added this
    description: "Full-stack MERN application delivered for a real-world client to manage student data.",
    features: ["React", "Express", "Node.js", "Cloudinary"], // Added this
    mockup: "/assets/images/school-mobile.png", // Added this
    github: "#",
    live: "https://newgenschool.com"
  }
];