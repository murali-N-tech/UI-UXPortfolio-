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
    id: "school-platform",
    title: "NewGeneration School",
    terminalTitle: "SCHOOL-MGT [ v2.4 ]", // Added this
    commands: ["cd school-portal", "npm run dev", "Database Connected"], // Added this
    status: "Production Build - Live", // Added this
    description: "Full-stack MERN application delivered for a real-world client to manage student data.",
    features: ["React", "Express", "Node.js", "Cloudinary"], // Added this
    mockup: "https://res.cloudinary.com/dkpjimiip/image/upload/v1774290931/Screenshot_2026-03-23_234903_bkmp0f.png", // Added this
    github: "https://github.com/murali-N-tech/Newgenration.git",
    live: "https://newgenerationschool.vercel.app/"
  },
  
  {
    id: "india-kart",
    title: "E-Commerce Website (MERN)",
    terminalTitle: "INDIA-KART [ mern ]",
    commands: ["cd projects/india-kart", "npm install", "npm run dev"],
    status: "Live Demo - Vercel",
    description: "Modern MERN stack e-commerce platform with a clean UI and full shopping flow.",
    features: ["MongoDB", "Express", "React", "Node", "MERN", "Tailwind"],
    mockup: "https://res.cloudinary.com/dkpjimiip/image/upload/v1774290931/Screenshot_2026-03-23_235720_oeviwa.png",
    github: "https://github.com/murali-N-tech/e-commerce.git",
    live: "https://india-kart.vercel.app/"
  },
  {
    id: "anurag-school",
    title: "Anurag School Website",
    terminalTitle: "ANURAG-SCHOOL [ prod ]",
    commands: ["cd projects/anurag-school", "npm install", "npm run build"],
    status: "Live Site",
    description: "A school website built using the MERN stack (MongoDB, Express.js, React, Node.js).",
    features: ["MERN", "React", "UI/UX", "Responsive"],
    mockup: "https://res.cloudinary.com/dkpjimiip/image/upload/v1774290919/Screenshot_2026-03-23_235911_srqhqn.png",
    github: "https://github.com/murali-N-tech/Anurag-school-website.git",
    live: "https://www.anuragschool.com/"
  },
  {
    id: "hire-me-ai",
    title: "HIRE-ME AI",
    terminalTitle: "HIRE-ME-AI [ v1.0 ]",
    commands: ["cd projects/hire-me-ai", "npm install", "npm start"],
    status: "Server - Running on port 5000",
    description: "Intelligent resume evaluation and interview system that uses AI to score candidates.",
    features: ["OpenAI API", "MERN Stack", "AWS Deployment"],
    mockup: "https://res.cloudinary.com/dkpjimiip/image/upload/v1774290918/Screenshot_2026-03-23_235758_ijp7zr.png", // Ensure this image exists
    github: "https://github.com/murali-N-tech/Hire-Me.git",
    live: "https://hire-me-phi.vercel.app/"
  },
  {
    id: "ai-aap",
    title: "AI-AAP",
    terminalTitle: "AI-AAP [ Adaptive Engine ]",
    commands: ["cd core/engine", "python main.py", "Loading Weights..."],
    status: "Core Engine - Optimized",
    description: "A microservices-based AI-driven adaptive learning platform for students.",
    features: ["TensorFlow", "Python", "Microservices"],
    mockup: "https://res.cloudinary.com/dkpjimiip/image/upload/v1774291331/Screenshot_20260323_235844_igd0h2.jpg",
    github: "https://github.com/vijayagiduthuri/AI-AAP.git",
    live: "#"
  },
  {
  id: "chennapatnam-coffee",
  title: "Chennapatnam Filter Coffee",
  terminalTitle: "CFC-Web [ Traditional Brew ]",
  commands: ["npm install", "npm run dev", "Brewing Aroma..."],
  status: "Production - Live",
  description: "An authentic digital storefront and franchise management platform for a premium South Indian coffee brand.",
  features: ["React", "Tailwind CSS", "Framer Motion"],
  mockup: "https://res.cloudinary.com/dkpjimiip/image/upload/v1774290930/Screenshot_2026-03-23_235534_foyunm.png",
  github: "https://github.com/murali-N-tech/Coffee.git",
  live: "https://chennapatnamfiltercoffee.vercel.app/"
}
  
];