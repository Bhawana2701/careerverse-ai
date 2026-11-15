export interface Career {
  id: string;
  name: string;
  description: string;
  scope: string;
  skills: string[];
  roadmap: string[];
}

export const careers: Career[] = [
  {
    id: "software-engineer",
    name: "Software Engineer",
    description:
      "Design, develop, test, and maintain software applications and systems.",
    scope:
      "Software engineers are needed across technology companies, startups, banks, healthcare, e-commerce, and many other industries.",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "SQL",
      "Data Structures & Algorithms",
      "Git",
    ],
    roadmap: [
      "Learn programming fundamentals",
      "Master Data Structures & Algorithms",
      "Learn Git and GitHub",
      "Build frontend applications with React",
      "Learn Node.js and REST APIs",
      "Work with SQL and databases",
      "Build full-stack projects",
      "Prepare for software engineering interviews",
    ],
  },

  {
    id: "data-scientist",
    name: "Data Scientist",
    description:
      "Analyze data and build statistical and machine-learning models to solve business problems.",
    scope:
      "Data scientists work in technology, finance, healthcare, retail, consulting, research, and other data-driven industries.",
    skills: [
      "Python",
      "SQL",
      "Statistics",
      "Data Analysis",
      "Machine Learning",
      "Data Visualization",
    ],
    roadmap: [
      "Learn Python programming",
      "Learn statistics and probability",
      "Master SQL",
      "Learn data analysis with Python",
      "Learn data visualization",
      "Study machine learning fundamentals",
      "Build data science projects",
      "Create a portfolio and prepare for interviews",
    ],
  },

  {
    id: "ai-ml-engineer",
    name: "AI / ML Engineer",
    description:
      "Build and deploy artificial intelligence and machine-learning systems.",
    scope:
      "AI and ML engineers are increasingly used in software, healthcare, finance, robotics, cybersecurity, automation, and research.",
    skills: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "Statistics",
      "SQL",
      "Data Structures & Algorithms",
    ],
    roadmap: [
      "Learn Python",
      "Learn mathematics and statistics",
      "Study machine learning",
      "Learn deep learning fundamentals",
      "Work with ML frameworks",
      "Build AI projects",
      "Learn model deployment",
      "Create an AI/ML portfolio",
    ],
  },

  {
    id: "web-developer",
    name: "Web Developer",
    description:
      "Build websites and web applications using frontend and backend technologies.",
    scope:
      "Web developers can work in startups, agencies, software companies, e-commerce, freelancing, and many other industries.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Git",
    ],
    roadmap: [
      "Learn HTML",
      "Learn CSS",
      "Master JavaScript",
      "Learn responsive web design",
      "Learn React",
      "Learn backend development",
      "Build complete web applications",
      "Publish projects and build a portfolio",
    ],
  },

  {
    id: "data-analyst",
    name: "Data Analyst",
    description:
      "Use data to identify trends, answer business questions, and support decision-making.",
    scope:
      "Data analysts are employed in finance, marketing, healthcare, retail, consulting, technology, and business operations.",
    skills: [
      "SQL",
      "Excel",
      "Statistics",
      "Data Visualization",
      "Python",
      "Power BI",
    ],
    roadmap: [
      "Learn Excel and spreadsheets",
      "Master SQL",
      "Learn statistics",
      "Learn data cleaning",
      "Learn data visualization",
      "Learn Power BI or Tableau",
      "Build analytics projects",
      "Create a data portfolio",
    ],
  },

  {
    id: "cybersecurity-analyst",
    name: "Cybersecurity Analyst",
    description:
      "Protect systems, networks, and data from security threats and attacks.",
    scope:
      "Cybersecurity professionals are needed in technology, banking, government, healthcare, defense, consulting, and other organizations.",
    skills: [
      "Networking",
      "Linux",
      "Cybersecurity Fundamentals",
      "Python",
      "Ethical Hacking",
      "Risk Management",
    ],
    roadmap: [
      "Learn computer networking",
      "Learn Linux fundamentals",
      "Study cybersecurity fundamentals",
      "Learn common security threats",
      "Practice ethical hacking",
      "Learn security monitoring",
      "Complete cybersecurity projects",
      "Prepare for cybersecurity certifications and interviews",
    ],
  },

  {
    id: "cloud-engineer",
    name: "Cloud Engineer",
    description:
      "Design, deploy, and maintain applications and infrastructure on cloud platforms.",
    scope:
      "Cloud engineers are needed as organizations increasingly move applications and infrastructure to cloud platforms.",
    skills: [
      "Linux",
      "Networking",
      "Cloud Computing",
      "Docker",
      "Git",
      "Python",
    ],
    roadmap: [
      "Learn Linux",
      "Learn networking fundamentals",
      "Understand cloud computing",
      "Learn AWS, Azure, or Google Cloud",
      "Learn Docker",
      "Learn infrastructure and deployment",
      "Build cloud projects",
      "Prepare for cloud engineering roles",
    ],
  },

  {
    id: "ui-ux-designer",
    name: "UI/UX Designer",
    description:
      "Design user interfaces and experiences that are useful, accessible, and easy to use.",
    scope:
      "UI/UX designers work with software companies, startups, agencies, e-commerce companies, and product teams.",
    skills: [
      "UI Design",
      "UX Research",
      "Wireframing",
      "Prototyping",
      "Figma",
      "Design Systems",
    ],
    roadmap: [
      "Learn UI/UX fundamentals",
      "Study user research",
      "Learn wireframing",
      "Learn Figma",
      "Create prototypes",
      "Study design systems",
      "Complete real-world design projects",
      "Build a UX portfolio",
    ],
  },

  {
    id: "product-manager",
    name: "Product Manager",
    description:
      "Plan product strategy and coordinate teams to build products that solve user problems.",
    scope:
      "Product managers work in technology companies, startups, fintech, e-commerce, healthcare, and many digital businesses.",
    skills: [
      "Product Strategy",
      "User Research",
      "Communication",
      "Data Analysis",
      "Project Management",
      "Problem Solving",
    ],
    roadmap: [
      "Learn product management fundamentals",
      "Understand user research",
      "Learn product strategy",
      "Develop data analysis skills",
      "Learn project management",
      "Practice product case studies",
      "Work on product projects",
      "Prepare for product management interviews",
    ],
  },
];