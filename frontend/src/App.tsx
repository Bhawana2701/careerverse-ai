// App.tsx

import { useEffect, useState } from "react";
import "./App.css";

interface User {
  id: number;
  name: string;
  email: string;
  education: string;
  target_career: string;
  created_at: string;
}

type Page = "dashboard" | "profile";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

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
        <div className="logo">CareerVerse AI</div>

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

          <button>Skill Analysis</button>
          <button>Career Roadmap</button>
          <button>AI Mentor</button>
          <button>AI Interview</button>
        </nav>
      </aside>

      <main className="main">
        <div className="topbar">
          <h1>
            {currentPage === "dashboard"
              ? "Dashboard"
              : "My Profile"}
          </h1>

          <div className="profile">{user.name}</div>
        </div>

        {currentPage === "dashboard" && (
          <>
            <section className="welcome">
              <h2>Welcome back, {user.name} 👋</h2>

              <p>
                Continue building your personalized career journey.
              </p>
            </section>

            <section className="career-card">
              <p>Your Target Career</p>

              <h2>{user.target_career}</h2>

              <p>{user.education}</p>
            </section>

            <section className="cards">
              <div className="card">
                <h3>🎯 Career Goal</h3>
                <p>{user.target_career}</p>
              </div>

              <div className="card">
                <h3>📊 Skill Analysis</h3>
                <p>
                  Identify the skills you need to improve.
                </p>
                <button>Analyze Skills</button>
              </div>

              <div className="card">
                <h3>🗺️ Career Roadmap</h3>
                <p>
                  Create a step-by-step path toward your career.
                </p>
                <button>View Roadmap</button>
              </div>

              <div className="card">
                <h3>🤖 AI Mentor</h3>
                <p>
                  Get personalized career guidance from AI.
                </p>
                <button>Meet AI Mentor</button>
              </div>

              <div className="card">
                <h3>🎤 AI Visual Interview</h3>
                <p>
                  Practice interviews and receive AI feedback.
                </p>
                <button>Start Interview</button>
              </div>
            </section>
          </>
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
      </main>
    </div>
  );
}

export default App;