// ─── Section registry ───────────────────────────────────────────────────────
// Add or remove section names here when you add/remove pages.
// TOTAL_PAGES is auto-derived and used by App.jsx and useScrollLogic.js.
// If a section needs extra scroll height (e.g. Projects with many cards),
// add an extra entry like 'projects-2' to give it another full screen of room.
export const SECTIONS = [
  'hero',
  'about',
  'skills',
  'projects',
  'projects-2',
  'blog',
  'contact',
];
export const TOTAL_PAGES = SECTIONS.length; // currently 7

export const portfolioData = {
  name: "Dhruva Pandya",
  role: "B.Tech Computer Science Student | Full-Stack Developer | Tech Enthusiast",
  summary: "I’m passionate about building impactful web experiences with React, JavaScript, and modern tech. I love solving problems and collaborating on innovative projects.",
  whoIAm: "A analytical Computer Engineering student and collaborative technical leader. Experienced in architecting high-concurrency platforms, scaling secure full-stack applications for 1,500+ users, and facilitating cross-functional team communication to achieve project goals.",
  quote: "“Strive not to be a success, but rather to be of value.” — Albert Einstein",
  education: [
    {
      degree: "B.Tech Computer Science",
      institution: "Birla Vishvakarma Mahavidhyalaya",
      duration: "2023 - 2027",
      details: "CGPA: 8.75/10"
    },
    {
      degree: "Higher Secondary Certificate",
      institution: "RPTP Higher Secondary Science School",
      duration: "2022 - 2023",
      details: "Percentage: 90%"
    },
    {
      degree: "Secondary School Certificate",
      institution: "Kasturba Kanya Vidhyalaya",
      duration: "2021 - 2022",
      details: "Percentage: 96.16%"
    }
  ],
  skills: {
    frontend: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap 5', 'Flutter'],
    backendTools: ['Node.js', 'Express.js', 'MongoDB', 'Git & GitHub'],
    other: ['TypeScript', 'Redux', 'REST APIs'],
    soft: ['Teamwork', 'Communication', 'Problem Solving', 'Leadership', 'Time Management', 'Adaptability']
  },
  projects: [
    {
      name: "Udaan'26",
      desc: "Full-stack event management platform supporting 1,500+ concurrent users. Features AES-256-GCM encrypted QR codes for tamper-proof attendance and a RedCarpet voting system built on atomic database operations for perfect vote consistency.",
      stack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Railway', 'Cloudinary'],
      highlight: '1,500+ concurrent users',
      link: 'https://bvmtechfest.up.railway.app/',
    },
    {
      name: "KnowHow'26",
      desc: "Flagship event registration platform handling 55,000+ requests from 1,050+ users with high availability. Includes automated registration workflows and a real-time analytics dashboard for live event insights.",
      stack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Vercel', 'Cloudinary'],
      highlight: '55,000+ requests served',
      link: 'https://knowhow2k26.vercel.app/',
    },
    {
      name: 'Student Stress Predictor',
      desc: 'Built a full-stack ML application that predicts student stress levels by analyzing academic pressure and lifestyle habits using behavioral data.',
      stack: ['Python', 'Random Forest', 'React', 'Vite', 'Tailwind CSS'],
      highlight: 'Developed a custom API deployment on Vercel utilizing joblib for real-time model inference and high-accuracy predictions.',
      link: 'https://stress-app-omega.vercel.app/',
    },
    {
      name: 'FreelanceHub',
      desc: 'A freelancing platform connecting clients and freelancers for projects, collaboration, and secure transactions. Features real-time chat, project bidding, and role-based access.',
      stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      highlight: null,
      link: 'https://github.com/dhruva2609/FreelanceHub',
    },
    {
      name: 'Sahil Foods',
      desc: 'A single-page website for a local bakery, showcasing products, menu, and contact information. Features smooth scrolling and an animated menu.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      highlight: null,
      link: 'https://sahil-foods.vercel.app/',
    },
    {
      name: 'Manga Reader',
      desc: 'A sleek and fast single-page manga reader built with React.js. Features instant search and bookmarking.',
      stack: ['React.js', 'REST API'],
      highlight: null,
      link: 'https://manga-reader-roan.vercel.app/',
    },
  ],
  blogs: [
    {
      title: "Developed a production-ready Manga reader using the MangaDex API and a custom proxy to bypass regional restrictions and resolve image loading issues.",
      date: "May 2026",
      link: "https://www.linkedin.com/posts/pandyadhruva_mangareader-webdevelopment-reactjs-ugcPost-7457052686774050816-IAZs?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEWuP8UB8wjdAidQgnFJ_accUsjkZxdgaRY"
    },
    {
      title: "Led the development team to architect the Udaan'26 platform, delivering secure voting and encrypted attendance for 1,500+ users.",
      date: "Feb 2026",
      link: 'https://www.linkedin.com/posts/pandyadhruva_udaan26-redcarpet-bvm-ugcPost-7432792325652791297-zen0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEWuP8UB8wjdAidQgnFJ_accUsjkZxdgaRY'
    },
    {
      title: "Coordinated a developer team to build the KnowHow'26 infrastructure, successfully managing over 1,000 candidate registrations.",
      date: "Jan 2026",
      link: 'https://www.linkedin.com/posts/pandyadhruva_webdesign-fullstackdevelopement-mernstack-ugcPost-7420494004859097088-srjb?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEWuP8UB8wjdAidQgnFJ_accUsjkZxdgaRY'
    },
  ],
  stats: "Training & Placement Coordinator, BVM",
  socials: {
    github: "github.com/dhruva2609",
    linkedin: "linkedin.com/in/dhruva-pandya-145618287",
    leetcode: "leetcode.com/u/dhruva26",
    email: "pandyadhruva09@gmail.com"
  }
};
