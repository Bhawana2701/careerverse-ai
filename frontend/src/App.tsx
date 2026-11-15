// App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import { careers } from "./careerData";

interface User {
  id: number;
  name: string;
  email: string;
  education: string;
  target_career: string;
  created_at: string;
}

interface Skill {
  id: number;
  user_id: number;
  skill_name: string;
  skill_level: string;
  created_at: string;
}

type Page =
  | "dashboard"
  | "profile"
  | "skills"
  | "roadmap"
  | "mentor"
  | "careers";

const requiredSkills = [
  "JavaScript",
  "Data Structures & Algorithms",
  "React",
  "Node.js",
  "SQL",
  "Git",
];



function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [mentorQuestion, setMentorQuestion] = useState("");
  const [mentorAnswer, setMentorAnswer] = useState("");
  const [mentorLoading, setMentorLoading] = useState(false);
  const [mentorError, setMentorError] = useState("");
  const [careerSearch, setCareerSearch] = useState("");
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("");
  const [addingSkill, setAddingSkill] = useState(false);
  const [skillMessage, setSkillMessage] = useState("");
  const [skillMessageType, setSkillMessageType] = useState<"success" | "error">(
    "success"
  );
  const [updatingSkill, setUpdatingSkill] = useState<number | null>(null);
  const [deletingSkill, setDeletingSkill] = useState<number | null>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [roadmapError, setRoadmapError] = useState("");
  const [selectedRoadmapStep, setSelectedRoadmapStep] = useState<number | null>(null);
  const [activeRoadmapTab, setActiveRoadmapTab] = useState("Topics");
  const [selectedRoadmapTopic, setSelectedRoadmapTopic] = useState<string | null>(null);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [topicNotes, setTopicNotes] = useState<any>(null);
  const [topicNotesLoading, setTopicNotesLoading] = useState(false);
  const [topicNotesError, setTopicNotesError] = useState("");
  const [assessmentQuestions, setAssessmentQuestions] = useState<any[]>([]);
  const [assessmentLoading, setAssessmentLoading] = useState(false);
  const [assessmentError, setAssessmentError] = useState("");
  const [showAssessment, setShowAssessment] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [generatedQuizId, setGeneratedQuizId] = useState<number | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const [showQuizHistory, setShowQuizHistory] = useState(false);
  const [isMentorAnswerCollapsed, setIsMentorAnswerCollapsed] = useState(false);

  const fetchTopicNotes = async (topic: string, milestoneNumber: number) => {
    setTopicNotesLoading(true);
    setTopicNotesError("");
    setTopicNotes(null);

    try {
      const params = new URLSearchParams({
        career: "Software Engineer",
        milestone_number: String(milestoneNumber),
        topic_name: topic,
      });

      const response = await fetch(
        `http://localhost:8080/api/topic-notes?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load revision notes.");
      }

      setTopicNotes(data.notes);
    } catch (error) {
      setTopicNotesError(
        error instanceof Error ? error.message : "Failed to load revision notes."
      );
    } finally {
      setTopicNotesLoading(false);
    }
  };


  const fetchAssessmentQuestions = async (
    topic: string,
    milestoneNumber: number
  ) => {
    setAssessmentLoading(true);
    setAssessmentError("");
    setAssessmentQuestions([]);
    setSelectedAnswers({});
    setGeneratedQuizId(null);
    setAssessmentResult(null);
    setShowAssessment(false);

    try {
      const response = await fetch("http://localhost:8080/api/quizzes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          career: "Software Engineer",
          milestone_number: milestoneNumber,
          topic_name: topic,
          difficulty: "beginner",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate quiz.");
      }

      setGeneratedQuizId(data.quiz.id);
      setAssessmentQuestions(data.questions);
      setShowAssessment(true);
    } catch (error) {
      setAssessmentError(
        error instanceof Error ? error.message : "Failed to generate quiz."
      );
    } finally {
      setAssessmentLoading(false);
    }
  };


  const submitAssessment = async () => {

    if (!user) {
      setAssessmentError("Please log in before submitting the quiz.");
      return;
    }
    if (!generatedQuizId) {
      setAssessmentError("Please generate a quiz first.");
      return;
    }

    if (Object.keys(selectedAnswers).length !== assessmentQuestions.length) {
      setAssessmentError("Please answer all five questions before submitting.");
      return;
    }

    try {
      setAssessmentError("");

      const answers = assessmentQuestions.map((question) => ({
        question_id: question.id,
        selected_answer: selectedAnswers[question.id],
      }));

      const response = await fetch(
        `http://localhost:8080/api/quizzes/${generatedQuizId}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            answers,
            time_taken_seconds: 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit quiz.");
      }

     setAssessmentResult(data.attempt);
    } catch (error) {
      setAssessmentError(
        error instanceof Error ? error.message : "Failed to submit quiz."
      );
    }
  };

  const fetchQuizHistory = async () => {
    if (!user) {
      setHistoryError("Please log in to view your previous quizzes.");
      return;
    }

    try {
      setHistoryLoading(true);
      setHistoryError("");

      const response = await fetch(
        `http://localhost:8080/api/quizzes/history/${user.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load quiz history.");
      }

      setQuizHistory(data.attempts || []);
      setShowQuizHistory(true);
    } catch (error: any) {
      setHistoryError(error.message || "Something went wrong.");
    } finally {
      setHistoryLoading(false);
    }
  };


  const skillAliases: Record<string, string> = {
    dsa: "data structures & algorithms",
    "data structures and algorithms": "data structures & algorithms",
  };

  const normalizeSkillName = (name: string) => {
    const normalized = name.trim().toLowerCase();

    return skillAliases[normalized] || normalized;
  };

  const skillGaps = requiredSkills
    .map((requiredSkill) => {
      const userSkill = skills.find(
        (skill) =>
          normalizeSkillName(skill.skill_name) ===
          normalizeSkillName(requiredSkill)
      );

      if (!userSkill) {
        return {
          skill: requiredSkill,
          status: "Missing",
        };
      }

      if (userSkill.skill_level === "Beginner") {
        return {
          skill: requiredSkill,
          status: "Needs improvement",
        };
      }

      if (userSkill.skill_level === "Intermediate") {
        return {
          skill: requiredSkill,
          status: "Developing",
        };
      }

      return {
        skill: requiredSkill,
        status: "Strong",
      };
    })
    .filter((item) => item.status !== "Strong");


  const strongSkills = requiredSkills.filter((requiredSkill) => {
    const userSkill = skills.find(
      (skill) =>
        skill.skill_name.toLowerCase() === requiredSkill.toLowerCase()
    );

    return userSkill?.skill_level === "Advanced";
  });

  const careerProgress = Math.round(
    (requiredSkills.reduce((total, skillName) => {
      const skill = skills.find(
        (item) =>
          normalizeSkillName(item.skill_name) ===
          normalizeSkillName(skillName)
      );

      if (!skill) return total;

      if (skill.skill_level === "Beginner") return total + 25;
      if (skill.skill_level === "Intermediate") return total + 60;
      if (skill.skill_level === "Advanced") return total + 100;

      return total;
    }, 0) /
      (requiredSkills.length * 100)) *
      100
  );

  const learningRecommendations: Record<string, string> = {
    JavaScript: "Practice ES6+, async programming, DOM manipulation, and build small projects.",
    "Data Structures & Algorithms":
      "Practice arrays, strings, linked lists, stacks, queues, trees, and sorting algorithms.",
    React:
      "Learn components, hooks, state management, routing, and build a React project.",
    "Node.js":
      "Learn Express, REST APIs, middleware, authentication, and backend development.",
    SQL:
      "Practice SELECT queries, joins, subqueries, aggregation, and database design.",
    Git:
      "Learn branching, merging, pull requests, conflict resolution, and GitHub workflows.",
  };

   const careerRecommendations = skillGaps.slice(0, 3).map((item) => ({
    skill: item.skill,
    recommendation:
      learningRecommendations[item.skill] ||
      `Improve your ${item.skill} skills through practice and projects.`,
  }));

  const nextSkill =
    skillGaps.find((gap) => gap.status === "Missing")?.skill ||
    skillGaps.find((gap) => gap.status === "Needs improvement")?.skill ||
    skillGaps[0]?.skill ||
    "Build a project";

  const nextSkillData = skills.find(
    (skill) =>
      skill.skill_name.toLowerCase() === nextSkill.toLowerCase()
  );

  const nextAction = !nextSkillData
    ? `Start learning ${nextSkill} and build a small project to practice it.`
    : nextSkillData.skill_level === "Beginner"
    ? `Strengthen your ${nextSkill} fundamentals through practice and small exercises.`
    : nextSkillData.skill_level === "Intermediate"
    ? `Improve your ${nextSkill} skills by building a practical project.`
    : learningRecommendations[nextSkill] ||
      `Keep strengthening ${nextSkill} through projects and practical experience.`;

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const filteredCareers = careers.filter((career) =>
    career.name.toLowerCase().includes(careerSearch.toLowerCase())
  );

  const activeCareer = careers.find(
    (career) => career.id === selectedCareer
  );

  const careerReadiness = activeCareer
  ? Math.round(
      (activeCareer.skills.filter((requiredSkill) =>
        skills.some(
          (userSkill) =>
            userSkill.skill_name.toLowerCase() ===
            requiredSkill.toLowerCase()
        )
      ).length /
        activeCareer.skills.length) *
        100
    )
  : 0;

  const fetchSkills = async () => {
    if (!user) return;

    setSkillsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/skills/user/${user.id}`
      );

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        throw new Error("Failed to fetch skills");
      }

      setSkills(data.data);
    } catch (error) {
      console.error("Skills error:", error);
    } finally {
      setSkillsLoading(false);
    }
  };

 const fetchRoadmap = async () => {
  if (!user) return;

  try {
    setRoadmapLoading(true);
    setRoadmapError("");

    const response = await fetch(
      `http://localhost:8080/api/roadmap/${encodeURIComponent(
        user.target_career
      )}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch roadmap");
    }

    const data = await response.json();
    setRoadmap(data);
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    setRoadmapError("Unable to load your career roadmap.");
  } finally {
    setRoadmapLoading(false);
  }
};

  const addSkill = async () => {
    if (!user || !newSkill.trim()) {
      setSkillMessageType("error");
      setSkillMessage("Please enter a skill.");
      return;
    }

    if (!newSkillLevel) {
      setSkillMessageType("error");
      setSkillMessage("Please select a skill level.");
      return;
    }

    const skillAlreadyExists = skills.some(
      (skill) =>
        normalizeSkillName(skill.skill_name) ===
        normalizeSkillName(newSkill)
    );

    if (skillAlreadyExists) {
      setSkillMessageType("error");
      setSkillMessage(
        "This skill already exists. You can update its level below."
      );
      return;
    }

    setAddingSkill(true);
    setSkillMessage("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/skills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            skillName: newSkill.trim(),
            skillLevel: newSkillLevel,
          }),
        }
      );


      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Failed to add skill");
      }
      setSkillMessageType("success");
      setSkillMessage("Skill added successfully!");

      // Clear form after successful submission
      setNewSkill("");
      setNewSkillLevel("");

      await fetchSkills();
    } catch (error) {
      console.error("Add skill error:", error);
      setSkillMessage("Could not add skill.");
    } finally {
      setAddingSkill(false);
    }
  };

  const updateSkillLevel = async (
    skillId: number,
    skillLevel: string
  ) => {
    setUpdatingSkill(skillId);
    setSkillMessage("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/skills/${skillId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skillLevel,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update skill."
        );
      }

      setSkills((currentSkills) =>
        currentSkills.map((skill) =>
          skill.id === skillId
            ? {
                ...skill,
                skill_level: skillLevel,
              }
            : skill
        )
      );

      setSkillMessage("Skill level updated successfully.");
    } catch (error) {
      console.error("Update skill error:", error);

      setSkillMessage(
        "Unable to update skill level. Please try again."
      );
    } finally {
      setUpdatingSkill(null);
    }
  };

  const deleteSkill = async (skillId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingSkill(skillId);
    setSkillMessage("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/skills/${skillId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete skill."
        );
      }

      setSkills((currentSkills) =>
        currentSkills.filter(
          (skill) => skill.id !== skillId
        )
      );

      setSkillMessage("Skill deleted successfully.");
    } catch (error) {
      console.error("Delete skill error:", error);

      setSkillMessage(
        "Unable to delete skill. Please try again."
      );
    } finally {
      setDeletingSkill(null);
    }
  };

  const askMentor = async (questionOverride?: string) => {
    const question = questionOverride ?? mentorQuestion;

    if (!question.trim()) {
      return;
    }

    setMentorLoading(true);
    setMentorError("");
    setMentorAnswer("");

    try {
      const response = await fetch("http://localhost:8080/api/ai/mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          skills,
          skillGaps,
          careerProgress,
          question,
          selectedCareer: activeCareer
            ? {
                name: activeCareer.name,
                description: activeCareer.description,
                scope: activeCareer.scope,
                skills: activeCareer.skills,
                roadmap: activeCareer.roadmap,
                readiness: careerReadiness,
              }
            : null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "AI Mentor request failed.");
      }

      setMentorAnswer(result.data.answer);
    } catch (error) {
      console.error("AI Mentor error:", error);
      setMentorError(
        "Sorry, AI Mentor could not generate a response. Please try again."
      );
    } finally {
      setMentorLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        if (data.data.length > 0) {
          setUser(data.data[0]);
        } else {
          setError("No user profile found.");
        }
      } catch (error) {
        console.error(error);
        setError("Could not connect to CareerVerse backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (
      (currentPage === "dashboard" ||
        currentPage === "skills" ||
        currentPage === "roadmap") &&
      user
    ) {
      fetchSkills();
      fetchRoadmap();
    }
  }, [currentPage, user]);

  if (loading) {
    return <div className="loading">Loading CareerVerse...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div className="error">No profile available.</div>;
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">✨ CareerVerse AI</div>

        <nav>
          <button
            className={currentPage === "dashboard" ? "active" : ""}
            onClick={() => setCurrentPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={currentPage === "profile" ? "active" : ""}
            onClick={() => setCurrentPage("profile")}
          >
            My Profile
          </button>

          <button
            className={currentPage === "skills" ? "active" : ""}
            onClick={() => setCurrentPage("skills")}
          >
            Skill Analysis
          </button>

          <button
            className={currentPage === "roadmap" ? "active" : ""}
            onClick={() => setCurrentPage("roadmap")}
          >
            Career Roadmap
          </button>

          <button
            className={currentPage === "careers" ? "active" : ""}
            onClick={() => {
              setCurrentPage("careers");
              setSelectedCareer(null);
            }}
          >
            Career Explorer
          </button>

          <button
            className={currentPage === "mentor" ? "active" : ""}
            onClick={() => setCurrentPage("mentor")}
          >
            AI Mentor
          </button>

          <button>AI Interview</button>
        </nav>
      </aside>

      <main className="main">

        {currentPage === "dashboard" && (
          <div className="dashboard-page">

            {/* Dashboard top bar */}

            <div className="dashboard-topbar">

              {/* Left side - greeting */}

              <div className="dashboard-greeting-section">

                <h2 className="dashboard-greeting">
                  Good afternoon, {user.name} 👋
                </h2>

                <p>
                  Let's continue your journey toward becoming{" "}
                  <strong>{user.target_career}</strong>.
                </p>

              </div>

              {/* Right side - date + profile */}

              <div className="dashboard-top-actions">

                <div className="dashboard-date">
                  <span
                    className="dashboard-calendar-icon"
                    aria-hidden="true"
                  ></span>

                  <span>{currentDate}</span>
                </div>

                <button
                  className="dashboard-profile"
                  onClick={() => setCurrentPage("profile")}
                  type="button"
                >
                  <div className="dashboard-user">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <span className="dashboard-profile-name">
                    {user.name}
                  </span>

                  <span className="dashboard-profile-arrow">
                    ⌄
                  </span>
                </button>

              </div>

            </div>

            {/* Career journey hero */}

            <div className="career-journey-card">

              <div className="career-journey-content">

                <div className="career-journey-label">
                  🎯 YOUR CAREER JOURNEY
                </div>

                <h1>{user.target_career}</h1>

                <p>
                  Your personalized career path based on your
                  current skills and progress.
                </p>

                <div className="career-progress-wrapper">

                  <div className="career-progress-bar">
                    <div
                      className="career-progress-fill"
                      style={{
                        width: `${careerProgress}%`,
                      }}
                    ></div>
                  </div>

                  <strong>{careerProgress}%</strong>

                </div>

                <span className="career-progress-text">
                  Career readiness
                </span>

              </div>

              <div className="career-journey-icon">
                🚀
              </div>

            </div>

            {/* Stats */}

            <div className="dashboard-stats">

              <div className="dashboard-stat purple">
                <div className="stat-icon">
                  🎯
                </div>

                <div>
                  <span>Target Career</span>
                  <strong>{user.target_career}</strong>
                </div>
              </div>

              <div className="dashboard-stat blue">
                <div className="stat-icon">
                  🧠
                </div>

                <div>
                  <span>Skills Added</span>
                  <strong>{skills.length}</strong>
                </div>
              </div>

              <div className="dashboard-stat green">
                <div className="stat-icon">
                  📈
                </div>

                <div>
                  <span>Career Progress</span>
                  <strong>{careerProgress}%</strong>
                </div>
              </div>

              <div className="dashboard-stat orange">
                <div className="stat-icon">
                  ⚠️
                </div>

                <div>
                  <span>Skills to Improve</span>
                  <strong>{skillGaps.length}</strong>
                </div>
              </div>

            </div>

            {/* Main dashboard grid */}

            <div className="dashboard-main-grid">

              {/* Next action */}

              <div className="dashboard-feature-card next-action-card">

                <div className="feature-card-header">
                  <div className="feature-icon purple-icon">
                    ✨
                  </div>

                  <div>
                    <span>YOUR NEXT BEST ACTION</span>
                    <h3>{nextSkill}</h3>
                  </div>
                </div>

                <p>
                  {nextAction}
                </p>

                <button
                  className="primary-dashboard-button"
                  onClick={() => setCurrentPage("skills")}
                >
                  Start Learning →
                </button>

              </div>

              {/* Skill gaps */}

              <div className="dashboard-feature-card">

                <div className="feature-card-header">
                  <div className="feature-icon red-icon">
                    ⚠️
                  </div>

                  <div>
                    <span>SKILLS TO IMPROVE</span>
                    <h3>Skill Gaps</h3>
                  </div>
                </div>

                <div className="dashboard-gap-list">

                  {skillGaps.length > 0 ? (
                    skillGaps.slice(0, 3).map((gap) => (
                      <div
                        className="dashboard-gap-item"
                        key={gap.skill}
                      >
                        <span>{gap.skill}</span>

                        <strong>
                          {gap.status}
                        </strong>
                      </div>
                    ))
                  ) : (
                    <div className="dashboard-success">
                      🎉 No major skill gaps!
                    </div>
                  )}

                </div>

                <button
                  className="secondary-dashboard-button"
                  onClick={() => setCurrentPage("skills")}
                >
                  View Skill Analysis →
                </button>

              </div>

              {/* Roadmap */}

              <div className="dashboard-feature-card">

                <div className="feature-card-header">
                  <div className="feature-icon blue-icon">
                    🗺️
                  </div>

                  <div>
                    <span>YOUR JOURNEY</span>
                    <h3>Career Roadmap</h3>
                  </div>
                </div>

                <div className="mini-roadmap">

                  {requiredSkills.slice(0, 4).map(
                    (requiredSkill, index) => {

                      const userSkill = skills.find(
                        (skill) =>
                          skill.skill_name.toLowerCase() ===
                          requiredSkill.toLowerCase()
                      );

                      const completed =
                        userSkill?.skill_level === "Advanced";

                      return (
                        <div
                          className="mini-roadmap-item"
                          key={requiredSkill}
                        >
                          <div
                            className={
                              completed
                                ? "mini-roadmap-number completed"
                                : "mini-roadmap-number"
                            }
                          >
                            {completed
                              ? "✓"
                              : index + 1}
                          </div>

                          <span>
                            {requiredSkill}
                          </span>
                        </div>
                      );
                    }
                  )}

                </div>

                <button
                  className="secondary-dashboard-button"
                  onClick={() => setCurrentPage("roadmap")}
                >
                  View Full Roadmap →
                </button>

              </div>

              {/* AI Mentor */}

              <div className="dashboard-feature-card ai-mentor-dashboard-card">

                <div className="mentor-glow"></div>

                <div className="feature-card-header">
                  <div className="feature-icon ai-icon">
                    🤖
                  </div>

                  <div>
                    <span>CAREER ASSISTANT</span>
                    <h3>AI Career Mentor</h3>
                  </div>
                </div>

                <p>
                  Get personalized guidance based on your skills,
                  career goals, and current progress.
                </p>

                <button
                  className="mentor-dashboard-button"
                  onClick={() => setCurrentPage("mentor")}
                >
                  Ask AI Mentor ✨
                </button>

              </div>

            </div>

            {/* Career tip */}

            <div className="career-tip-card">

              <div className="career-tip-icon">
                💡
              </div>

              <div>
                <span>CAREER TIP OF THE DAY</span>

                <p>
                  Build projects while learning new skills.
                  A project gives you practical experience and
                  something valuable to showcase during interviews.
                </p>
              </div>

            </div>

          </div>
        )}

        {currentPage === "profile" && (
          <section className="profile-page">
            <div className="profile-card">
              <h2>Career Profile</h2>

              <div className="profile-field">
                <strong>Name</strong>
                <p>{user.name}</p>
              </div>

              <div className="profile-field">
                <strong>Email</strong>
                <p>{user.email}</p>
              </div>

              <div className="profile-field">
                <strong>Education</strong>
                <p>{user.education}</p>
              </div>

              <div className="profile-field">
                <strong>Target Career</strong>
                <p>{user.target_career}</p>
              </div>
            </div>
          </section>
        )}

        {currentPage === "skills" && (
          <section className="skills-page">
            <div className="skills-header">
              <h2>Skill Analysis</h2>

              <p>
                Skills currently associated with your CareerVerse profile.
              </p>
            </div>

            <div className="add-skill-card">
              <h3>Add a Skill</h3>

              <div className="add-skill-form">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(event) => setNewSkill(event.target.value)}
                  onFocus={() => setShowSkillSuggestions(true)}
                  placeholder="Search or type a skill..."
                />

                <select
                  value={newSkillLevel}
                  onChange={(event) => setNewSkillLevel(event.target.value)}
                >
                  <option value="">Select skill level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                <button onClick={addSkill} disabled={addingSkill}>
                  {addingSkill ? "Adding..." : "Add Skill"}
                </button>
              </div>

              {showSkillSuggestions && (
                <div className="skill-suggestions">
                  {[
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Node.js",
                    "Express.js",
                    "Python",
                    "Java",
                    "SQL",
                    "Git and GitHub",
                    "Data Structures & Algorithms",
                    "REST APIs",
                    "Problem Solving",
                  ]
                    .filter((name) =>
                      name.toLowerCase().includes(newSkill.toLowerCase())
                    )
                    .map((name) => (
                      <button
                        type="button"
                        className="skill-suggestion"
                        key={name}
                        onClick={() => {
                          setNewSkill(name);
                          setShowSkillSuggestions(false);
                        }}
                      >
                        {name}
                      </button>
                    ))}
                </div>
              )}

              {skillMessage && (
                <p
                  className={`skill-message ${
                    skillMessageType === "error"
                      ? "error-message"
                      : "success-message"
                  }`}
                >
                  {skillMessage}
                </p>
              )}
            </div>

            {skillsLoading ? (
              <div className="card">
                <p>Loading your skills...</p>
              </div>
            ) : skills.length === 0 ? (
              <div className="card">
                <h3>No skills added yet</h3>

                <p>
                  Add your skills to begin your career skill analysis.
                </p>
              </div>
            ) : (
              <div className="skills-list">
                {skills.map((skill) => (
                  <div className="skill-card-enhanced" key={skill.id}>

                    <div className="skill-card-top">

                      <div className="skill-title">
                        <div className="skill-icon">
                          💡
                        </div>

                        <div>
                          <h3>{skill.skill_name}</h3>
                          <span>Your current skill level</span>
                        </div>
                      </div>

                      <button
                        className="delete-skill-button"
                        onClick={() => deleteSkill(skill.id)}
                        disabled={deletingSkill === skill.id}
                        title="Delete skill"
                      >
                        {deletingSkill === skill.id
                          ? "..."
                          : "🗑️"}
                      </button>

                    </div>

                    <div className="skill-level-section">

                      <label>
                        Skill Level
                      </label>

                      <select
                        value={skill.skill_level}
                        onChange={(event) =>
                          updateSkillLevel(
                            skill.id,
                            event.target.value
                          )
                        }
                        disabled={updatingSkill === skill.id}
                        className="skill-level-select"
                      >
                        <option value="Beginner">
                          Beginner
                        </option>

                        <option value="Intermediate">
                          Intermediate
                        </option>

                        <option value="Advanced">
                          Advanced
                        </option>
                      </select>

                    </div>

                    <div
                      className={`skill-level-badge ${skill.skill_level.toLowerCase()}`}
                    >
                      {skill.skill_level}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </section>
        )}


        {currentPage === "roadmap" && (
          <section className="roadmap-page">
            <div className="roadmap-header">
              <h2>🗺️ Your Career Journey</h2>
              <p>
                Every expert starts somewhere. Choose your next station and keep moving forward.
              </p>
            </div>

            {roadmapLoading && (
              <div className="roadmap-card">
                <p>Loading your career journey...</p>
              </div>
            )}

            {roadmapError && (
              <div className="roadmap-card">
                <p>{roadmapError}</p>
              </div>
            )}

            {roadmap && !roadmapLoading && (
              <>
                {selectedRoadmapStep === null ? (
                  <div className="journey-overview">
                    <div className="journey-summary">
                      <div>
                        <span className="journey-eyebrow">YOUR DESTINATION</span>
                        <h3>{user.target_career}</h3>
                        <p>{user.education}</p>
                      </div>

                      <div className="journey-progress">
                        <span>Career progress</span>
                        <strong>{careerProgress}%</strong>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${careerProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="journey-heading">
                      <div>
                        <h3>Your learning route</h3>
                        <p>Choose any station to explore what you'll learn.</p>
                      </div>
                      <span className="journey-count">
                        {roadmap.steps.length} stations
                      </span>
                    </div>

                    <div className="journey-route">
                      {roadmap.steps.map((step: any, index: number) => (
                        <div className="journey-stop" key={step.stepNumber}>
                          <div className="journey-track">
                            <div className="journey-station">
                              {step.stepNumber}
                            </div>
                            {index < roadmap.steps.length - 1 && (
                              <div className="journey-line" />
                            )}
                          </div>

                          <button
                            type="button"
                            className="journey-stop-card"
                            onClick={() =>
                              setSelectedRoadmapStep(step.stepNumber)
                            }
                          >
                            <span className="journey-stop-label">
                              STATION {String(step.stepNumber).padStart(2, "0")}
                            </span>
                            <h4>{step.title}</h4>
                            <div className="journey-stop-meta">
                              <span>{step.level}</span>
                              <span>{step.duration}</span>
                            </div>
                            <span className="journey-explore">
                              Explore station <span aria-hidden="true">→</span>
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  (() => {
                    const step = roadmap.steps.find(
                      (item: any) => item.stepNumber === selectedRoadmapStep
                    );

                    if (!step) {
                      return (
                        <div className="roadmap-card">
                          <p>We couldn't find that station.</p>
                          <button
                            type="button"
                            onClick={() => setSelectedRoadmapStep(null)}
                          >
                            Back to journey
                          </button>
                        </div>
                      );
                    }

                    return (

                      <div className="station-detail">
                        <button
                          type="button"
                          className="journey-back-button"
                          onClick={() => {
                            setSelectedRoadmapStep(null);
                            setSelectedRoadmapTopic(null);
                            setActiveRoadmapTab("Topics");
                          }}
                        >
                          ← Career Roadmap
                        </button>

                        {(() => {
                          const step = roadmap.steps.find(
                            (item: any) => item.stepNumber === selectedRoadmapStep
                          );

                          if (!step) return <p>Station not found.</p>;

                          const topics: string[] = Array.isArray(step.whatToLearn)
                            ? step.whatToLearn
                            : typeof step.whatToLearn === "string"
                              ? step.whatToLearn.split("\n").filter(Boolean)
                              : [];

                          const resources: any[] = Array.isArray(step.resources)
                            ? step.resources
                            : [];

                          const tabNames = ["Topics", "Resources", "Practice", "Outcome"];

                          const topicDetails = topics.find(
                            (topic) => topic === selectedRoadmapTopic
                          );

                          return (
                            <>
                              <div className="station-detail-header">
                                <div className="station-title-row">
                                  <div>
                                    <span className="journey-eyebrow">
                                      MILESTONE {step.stepNumber} OF {roadmap.steps.length}
                                    </span>
                                    <h2>{step.title}</h2>
                                  </div>
                                  <span className="journey-count">
                                    Milestone {step.stepNumber} of {roadmap.steps.length}
                                  </span>
                                </div>

                                <p>{step.whyItMatters}</p>

                                <div className="station-metrics">
                                  <div className="station-metric">
                                    <span>🗓️</span>
                                    <small>Duration</small>
                                    <strong>{step.duration}</strong>
                                  </div>

                                  <div className="station-metric">
                                    <span>📖</span>
                                    <small>Topics</small>
                                    <strong>{topics.length} topics</strong>
                                  </div>

                                  <div className="station-metric">
                                    <span>🎯</span>
                                    <small>Focus</small>
                                    <strong>{step.level}</strong>
                                  </div>
                                </div>
                              </div>

                              <div className="station-tabs">
                                {(selectedRoadmapTopic
                                  ? [
                                      { label: "Topic Notes", value: "Topic Notes" },
                                      { label: "Practice Questions", value: "Practice Questions" },
                                      { label: "Learning Resources", value: "Learning Resources" },
                                    ]
                                  : [
                                      { label: "Topics", value: "Topics" },
                                      { label: "Outcome", value: "Outcome" },
                                    ]
                                ).map((tab) => (
                                  <button
                                    type="button"
                                    key={tab.value}
                                    className={
                                      activeRoadmapTab === tab.value
                                        ? "station-tab active"
                                        : "station-tab"
                                    }
                                    onClick={() => setActiveRoadmapTab(tab.value)}
                                  >
                                    {tab.label}
                                  </button>
                                ))}
                              </div>




                              <div className="station-tab-content">
                                {!selectedRoadmapTopic && activeRoadmapTab === "Topics" && (
                                  topics.length > 0 ? (
                                    <div className="station-topic-list">
                                      {topics.map((topic, index) => (
                                        <button
                                          type="button"
                                          className="station-topic-row"
                                          key={`${step.stepNumber}-${topic}-${index}`}
                                          onClick={() => {
                                            setSelectedRoadmapTopic(topic);
                                            setActiveRoadmapTab("Topic Notes");
                                            fetchTopicNotes(topic, step.stepNumber);
                                          }}
                                        >
                                          <span className="station-topic-number">{index + 1}</span>
                                          <span className="station-topic-title">{topic}</span>
                                          <span className="station-topic-arrow">›</span>
                                        </button>
                                      ))}
                                    </div>
                                  ) : (
                                    <p>No individual topics have been added to this station yet.</p>
                                  )
                                )}

                                {selectedRoadmapTopic && (
                                  <div className="topic-detail">
                                    <h3>{selectedRoadmapTopic}</h3>

                                    {topicNotesLoading ? (
                                      <p>Loading revision notes...</p>
                                    ) : topicNotesError ? (
                                      <p>{topicNotesError}</p>
                                    ) : !topicNotes ? (
                                      <p>Revision notes for this topic have not been added yet.</p>
                                    ) : (
                                      <>
                                        {activeRoadmapTab === "Topic Notes" && (
                                          <div className="topic-revision-notes">
                                            <h4>Explanation</h4>
                                            <p>{topicNotes.explanation}</p>

                                            <h4>Key Points</h4>
                                            <ul>
                                              {topicNotes.key_points.map((point: string, index: number) => (
                                                <li key={index}>{point}</li>
                                              ))}
                                            </ul>

                                            <h4>Examples</h4>
                                            <ul>
                                              {topicNotes.examples.map((example: any, index: number) => (
                                                <li key={index}>
                                                  <strong>{example.title}</strong>
                                                  <pre><code>{example.code}</code></pre>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}

                                        {activeRoadmapTab === "Practice Questions" && (
                                          <div className="station-tab-panel">
                                            <h3>Practice Questions</h3>

                                            <div className="revision-questions-section">
                                              <h3>📚 Revision Questions</h3>
                                              <p>Review these important questions before taking your assessment.</p>

                                              <div className="revision-question-list">
                                                {topicNotes.practice_questions.map(
                                                  (question: string, index: number) => (
                                                    <div className="revision-question-card" key={index}>
                                                      <span className="revision-question-number">
                                                        Q{index + 1}
                                                      </span>
                                                      <p>{question}</p>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            </div>

                                            <div className="ai-quiz-section">
                                              <h3>🤖 AI-Powered Assessment</h3>
                                              <p>Test your knowledge with a fresh AI-generated quiz.</p>

                                              <button
                                                className="previous-quizzes-button"
                                                onClick={fetchQuizHistory}
                                                disabled={historyLoading}
                                              >
                                                {historyLoading ? "Loading..." : "📚 View Previous Quizzes"}
                                              </button>
                                              <button
                                                type="button"
                                                className="generate-quiz-button"
                                                onClick={() =>
                                                  fetchAssessmentQuestions(
                                                    selectedRoadmapTopic,
                                                    step.stepNumber
                                                  )
                                                }
                                                disabled={assessmentLoading}
                                              >
                                                {assessmentLoading
                                                  ? "Generating Quiz..."
                                                  : "✨ Generate New AI Quiz"}
                                              </button>

                                              {assessmentError && (
                                                <p className="error-message">{assessmentError}</p>
                                              )}

                                              {showAssessment && assessmentQuestions.length > 0 && (
                                                <div className="assessment-quiz">
                                                  <h3>AI-Generated Quiz</h3>

                                                  {assessmentQuestions.map((question, index) => (
                                                    <div className="assessment-question" key={question.id}>
                                                      <h4>Q{index + 1}. {question.question}</h4>

                                                      {question.options.map(
                                                        (option: string, optionIndex: number) => (
                                                          <label
                                                            key={optionIndex}
                                                            className="assessment-option"
                                                          >
                                                            <input
                                                              type="radio"
                                                              name={`question-${question.id}`}
                                                              value={option}
                                                              checked={selectedAnswers[question.id] === option}
                                                              disabled={!!assessmentResult}
                                                              onChange={() =>
                                                                setSelectedAnswers((previous) => ({
                                                                  ...previous,
                                                                  [question.id]: option,
                                                                }))
                                                              }
                                                            />
                                                            {option}
                                                          </label>
                                                        )
                                                      )}
                                                    </div>
                                                  ))}

                                                  <button
                                                    type="button"
                                                    className="submit-quiz-button"
                                                    onClick={submitAssessment}
                                                    disabled={!!assessmentResult}
                                                  >
                                                    {assessmentResult ? "Quiz Submitted" : "Submit Quiz"}
                                                  </button>

                                                  {assessmentResult && (
                                                    <div className="assessment-results">
                                                      <h3>Your Quiz Results</h3>
                                                      <h2>
                                                        {assessmentResult.correct_answers} / {assessmentResult.total_questions}
                                                      </h2>
                                                      <p>Your Score: {assessmentResult.score}%</p>

                                                      {assessmentResult.answers.map(
                                                        (answer: any, index: number) => (
                                                          <div className="assessment-question" key={answer.question_id}>
                                                            <h4>Q{index + 1}. {answer.question}</h4>
                                                            <p>Your answer: {answer.selected_answer}</p>
                                                            <p>Correct answer: {answer.correct_answer}</p>
                                                            <p>{answer.is_correct ? "✅ Correct" : "❌ Incorrect"}</p>
                                                            <p>Explanation: {answer.explanation}</p>
                                                          </div>
                                                        )
                                                      )}
                                                    </div>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                            {historyError && (
                                              <p className="assessment-error">{historyError}</p>
                                            )}

                                            {showQuizHistory && (
                                              <div className="quiz-history-section">
                                                <div className="quiz-history-header">
                                                  <h3>📚 Your Previous Quizzes</h3>
                                                  <button
                                                    onClick={() => setShowQuizHistory(false)}
                                                    className="close-history-button"
                                                  >
                                                    ✕ Close
                                                  </button>
                                                </div>

                                                {quizHistory.length === 0 ? (
                                                  <p>You haven't attempted any quizzes yet.</p>
                                                ) : (
                                                  <div className="quiz-history-list">

                                                  {quizHistory.map((attempt: any) => (
                                                    <div className="quiz-history-card" key={attempt.attempt_id}>
                                                      <h4>{attempt.topic_name}</h4>

                                                      <p><strong>Career:</strong> {attempt.career}</p>
                                                      <p><strong>Milestone:</strong> {attempt.milestone_number}</p>
                                                      <p><strong>Score:</strong> {attempt.score}%</p>
                                                      <p>
                                                        <strong>Correct answers:</strong>{" "}
                                                        {attempt.correct_answers}/{attempt.total_questions}
                                                      </p>
                                                      <p>
                                                        <strong>Attempted on:</strong>{" "}
                                                        {new Date(attempt.attempted_at).toLocaleString()}
                                                      </p>

                                                      <div className="history-answers">
                                                        <h5>📝 Question & Answer Review</h5>

                                                        {attempt.answers?.map((answer: any, index: number) => (
                                                          <div className="history-answer-card" key={answer.question_id}>
                                                            <h6>
                                                              Q{index + 1}. {answer.question}
                                                            </h6>

                                                            <p>
                                                              <strong>Your answer:</strong>{" "}
                                                              {answer.selected_answer || "Not answered"}
                                                            </p>

                                                            <p>
                                                              <strong>Correct answer:</strong>{" "}
                                                              {answer.correct_answer}
                                                            </p>

                                                            <p className={answer.is_correct ? "history-correct" : "history-incorrect"}>
                                                              {answer.is_correct ? "✓ Correct" : "✗ Incorrect"}
                                                            </p>

                                                            <div className="history-explanation">
                                                              <strong>Explanation:</strong>
                                                              <p>{answer.explanation}</p>
                                                            </div>
                                                          </div>
                                                        ))}
                                                      </div>
                                                    </div>
                                                  ))}

                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        )}


                                        {activeRoadmapTab === "Learning Resources" && (
                                          <div className="station-tab-panel">
                                            <h3>Learning Resources</h3>
                                            <ul>
                                              {topicNotes.resources.map((resource: any, index: number) => (
                                                <li key={index}>
                                                  <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                  >
                                                    {resource.title}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                )}

                                {!selectedRoadmapTopic && activeRoadmapTab === "Outcome" && (
                                  <div className="station-tab-panel">
                                    <h3>Your expected outcome</h3>
                                    <p>{step.expectedOutcome}</p>
                                    <h4>Prerequisites</h4>
                                    <p>{step.prerequisites || "No prerequisites listed."}</p>
                                  </div>
                                )}
                              </div>


                              <div className="station-navigation">
                                <span>
                                  Station {step.stepNumber} of {roadmap.steps.length}
                                </span>



                                <div className="station-navigation-buttons">
                                  {selectedRoadmapTopic && (
                                    <button
                                      type="button"
                                      className="journey-back-button"
                                      onClick={() => {
                                        setSelectedRoadmapTopic(null);
                                        setActiveRoadmapTab("Topics");
                                        setTopicNotes(null);
                                      }}
                                    >
                                      ← All topics
                                    </button>
                                  )}
                                  {step.stepNumber < roadmap.steps.length && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedRoadmapStep(step.stepNumber + 1);
                                        setSelectedRoadmapTopic(null);
                                        setActiveRoadmapTab("Topics");
                                      }}
                                    >
                                      Next station →
                                    </button>
                                  )}
                                </div>


                              </div>
                            </>
                          );
                        })()}
                      </div>

                    );
                  })()
                )}
              </>
            )}


          </section>
        )}

        {currentPage === "mentor" && (
          <div className="mentor-page">
            <div className="mentor-header">
              <span className="mentor-eyebrow">YOUR PERSONAL AI GUIDE</span>
              <h2>Meet Your AI Career Companion <span>✦</span></h2>
            </div>

            <div className="mentor-card">
              <h3>Ask Your AI Mentor</h3>

              <div className="mentor-quick-questions">
                <button
                  onClick={() =>
                    askMentor("What should I focus on first to become a software engineer?")
                  }
                >
                  What should I focus on first?
                </button>

                <button
                  onClick={() =>
                    askMentor("How can I improve my career progress?")
                  }
                >
                  How can I improve my career progress?
                </button>

                <button
                  onClick={() =>
                    askMentor("What project should I build to improve my skills?")
                  }
                >
                  What project should I build?
                </button>
              </div>

              <textarea
                value={mentorQuestion}
                onChange={(e) => setMentorQuestion(e.target.value)}
                placeholder="Ask your career question..."
                rows={5}
              />

              <button
                className="mentor-ask-button"
                onClick={() => askMentor()}
                disabled={mentorLoading}
              >
                {mentorLoading ? "Thinking..." : "Ask AI Mentor"}
              </button>

              {mentorError && (
                <p className="mentor-error">
                  {mentorError}
                </p>
              )}

              {mentorAnswer && (
                <div className="mentor-answer">
                  <div className="mentor-answer-header">
                    <h3>💡 AI Mentor</h3>

                    <button
                      className="clear-mentor-answer"
                      onClick={() =>
                        setIsMentorAnswerCollapsed(!isMentorAnswerCollapsed)
                      }
                    >
                      {isMentorAnswerCollapsed ? "＋ Show Answer" : "− Hide Answer"}
                    </button>
                  </div>

                  {!isMentorAnswerCollapsed && (
                    <p>{mentorAnswer}</p>
                  )}
                </div>
              )}

            </div>
            <div className="mentor-card avatar-mentor-card">
              <h3>🎥 Talk to Your AI Career Mentor</h3>

              <p>
                Have a real-time voice conversation with your
                personal AI career mentor.
              </p>

              <div className="avatar-container">
                <iframe
                  src="https://bey.chat/d4d47232-40e9-4abf-aa68-61b80b873c7e"
                  width="100%"
                  height="600px"
                  title="CareerVerse AI Talking Mentor"
                  frameBorder="0"
                  allowFullScreen
                  allow="camera; microphone; fullscreen"
                  style={{ border: "none", maxWidth: "100%" }}
                />
              </div>
            </div>
          </div>
        )}
        {currentPage === "careers" && (
          <div className="career-explorer-page">
            <div className="career-explorer-header">
              <h2>Career Explorer</h2>
              <p>
                Explore different careers, discover required skills,
                understand career scope, and follow a step-by-step roadmap.
              </p>

              <input
                type="text"
                value={careerSearch}
                onChange={(e) => setCareerSearch(e.target.value)}
                placeholder="Search careers... e.g. Software Engineer"
                className="career-search-input"
              />
            </div>

            {!activeCareer && (
              <div className="career-grid">
                {filteredCareers.map((career) => (
                  <div className="career-card" key={career.id}>
                    <h3>{career.name}</h3>

                    <p>{career.description}</p>

                    <div className="career-card-section">
                      <strong>🧠 Key Skills</strong>

                      <div className="career-skill-tags">
                        {career.skills.slice(0, 4).map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>
                    </div>

                    <button
                      className="career-view-button"
                      onClick={() => setSelectedCareer(career.id)}
                    >
                      View Career →
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeCareer && (
              <div className="career-details">

                <button
                  className="career-back-button"
                  onClick={() => setSelectedCareer(null)}
                >
                  ← Back to Careers
                </button>

                <div className="career-details-header">
                  <h2>{activeCareer.name}</h2>

                  <p>{activeCareer.description}</p>

                  <div className="career-readiness">
                    <div className="career-readiness-top">
                      <strong>🎯 Your Career Readiness</strong>
                      <strong>{careerReadiness}%</strong>
                    </div>

                    <div className="career-readiness-bar">
                      <div
                        className="career-readiness-fill"
                        style={{ width: `${careerReadiness}%` }}
                      ></div>
                    </div>

                    <button
                      className="career-mentor-button"
                      onClick={() => {
                        setCurrentPage("mentor");
                        setMentorQuestion(
                          `How should I prepare for a career as a ${activeCareer.name}?`
                        );
                      }}
                    >
                      🤖 Ask AI Mentor About This Career
                    </button>

                    <p>
                      Based on the skills you currently have compared with the
                      skills required for this career.
                    </p>
                  </div>
                </div>

                <div className="career-details-card">
                  <h3>📈 Career Scope</h3>
                  <p>{activeCareer.scope}</p>
                </div>

                <div className="career-details-card">
                  <h3>🧠 Required Skills</h3>

                  <div className="career-required-skills">
                    {activeCareer.skills.map((skill) => {
                      const userSkill = skills.find(
                        (item) =>
                          item.skill_name.toLowerCase() ===
                          skill.toLowerCase()
                      );

                      return (
                        <div className="career-required-skill" key={skill}>
                          <span>{skill}</span>

                          {userSkill ? (
                            <strong className="skill-match">
                              ✓ {userSkill.skill_level}
                            </strong>
                          ) : (
                            <strong className="skill-missing">
                              ✕ Missing
                            </strong>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="career-details-card">
                  <h3>🗺️ Career Roadmap</h3>

                  <div className="career-roadmap">
                    {activeCareer.roadmap.map((step, index) => (
                      <div className="career-roadmap-step" key={step}>
                        <div className="career-step-number">
                          {index + 1}
                        </div>

                        <div>
                          <h4>Step {index + 1}</h4>
                          <p>{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {!activeCareer && filteredCareers.length === 0 && (
              <div className="career-no-results">
                <h3>No careers found</h3>
                <p>
                  Try searching for another career such as Software Engineer,
                  Data Scientist, or Cloud Engineer.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
