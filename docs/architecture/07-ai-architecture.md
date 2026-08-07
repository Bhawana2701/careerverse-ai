# AI Architecture

## Overview

CareerVerse AI uses a modular AI architecture rather than a single general-purpose chatbot.

The AI layer provides specialized capabilities for career discovery, skill-gap analysis, roadmap generation, mentoring, resume analysis, and interview preparation.

---

# AI Architecture

```text
                    React Web App
                         |
                         v
                  Spring Boot API
                         |
                         v
                    AI Gateway
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
   Career Engine    Roadmap Engine   Interview Engine
          |              |              |
          +--------------+--------------+
                         |
                         v
                  AI Context Layer
                         |
             +-----------+-----------+
             |                       |
             v                       v
       PostgreSQL              Vector Store
       User Data              (Future)
             |                       |
             +-----------+-----------+
                         |
                         v
                    LLM Provider
```

---

# AI Gateway

The AI Gateway is the central entry point for AI-related requests.

Responsibilities:

- Route AI requests
- Manage prompts
- Provide user context
- Validate AI responses
- Track AI usage
- Handle provider errors
- Apply safety rules
- Prevent direct frontend access to LLM providers

The frontend should never directly call an LLM provider.

---

# Career Recommendation Engine

Inputs:

- User profile
- Interests
- Education
- Existing skills
- Career goals
- Assessment results

Outputs:

- Recommended careers
- Recommendation explanation
- Matching skills
- Skill gaps
- Confidence/relevance score

---

# Skill Gap Engine

The engine compares:

```text
User Skills
     +
Target Career Requirements
     =
Skill Gap
```

Output:

- Missing skills
- Current proficiency
- Required proficiency
- Priority
- Recommended learning resources

---

# Roadmap Engine

The Roadmap Engine generates personalized learning plans.

Inputs:

- Target career
- Current skills
- Skill gaps
- Available weekly hours
- Learning preferences
- Target completion date

Output:

- Ordered learning steps
- Skills to learn
- Projects
- Resources
- Estimated duration

The generated roadmap should be validated against the Career Blueprint before being saved.

---

# AI Mentor Engine

The AI Mentor is a future feature.

It will provide persistent personalized mentoring.

The mentor may use:

- User profile
- Career goals
- Roadmap progress
- Previous conversations
- Completed projects
- Interview performance

Future capabilities:

- Voice conversation
- Real-time mentoring
- Proactive check-ins
- Personalized recommendations
- Long-term AI memory

---

# AI Interview Engine

The AI Interview Engine will simulate realistic interviews.

Supported modes:

- Text
- Voice
- Video (Future)
- Coding
- Behavioral
- Technical
- System Design

The engine should:

1. Select an appropriate question.
2. Evaluate the user's response.
3. Generate a follow-up question.
4. Adapt difficulty.
5. Produce a final feedback report.

---

# Resume AI

Future AI capabilities:

- Resume analysis
- ATS optimization
- Achievement rewriting
- Skill recommendations
- Job-description matching

---

# Retrieval-Augmented Generation

RAG may be used when the AI needs reliable external or internal knowledge.

Potential knowledge sources:

- Career blueprints
- Learning resources
- Interview question banks
- Company-specific preparation material
- Career information
- Curated educational content

Basic flow:

```text
User Request
     |
     v
Context Retrieval
     |
     v
Relevant Documents
     |
     v
Prompt Construction
     |
     v
LLM
     |
     v
Validated Response
```

---

# AI Memory

## Short-Term Memory

Conversation context within the current session.

## Long-Term Memory

Relevant user information that should persist across sessions.

Examples:

- Career goal
- Learning preferences
- Previous mentoring decisions
- Important weaknesses
- Completed milestones

The system should store only useful information and should respect user privacy.

---

# Proactive AI

CareerVerse AI should eventually be able to proactively assist users.

Example:

```text
User has missed learning goals
            |
            v
AI detects pattern
            |
            v
Evaluate user's roadmap
            |
            v
Suggest adjusted plan
            |
            v
Notify user
```

The AI should recommend actions rather than silently changing important user plans.

---

# AI Safety and Validation

AI-generated information must not automatically become trusted application data.

Important outputs should be validated before persistence.

Examples:

- Roadmap steps must reference valid skills.
- Learning resources must be valid.
- Career recommendations should include explanations.
- AI-generated database queries must never execute directly.
- Sensitive user information must not be unnecessarily included in prompts.

---

# LLM Provider Abstraction

The application should not tightly couple business logic to one LLM provider.

```text
AI Gateway
     |
     +-- LLM Provider A
     |
     +-- LLM Provider B
     |
     +-- Local Model (Future)
```

This allows the platform to change providers without rewriting the entire application.

---

# MVP AI Scope

The initial version should focus on:

- Career recommendations
- Skill-gap analysis
- Personalized roadmap generation
- Basic AI career assistant
- Basic text-based mock interviews

Advanced voice, video, persistent mentor memory, and proactive AI should be introduced incrementally.

---

# Future AI Scope

- AI Career Mentor
- Voice Mentor
- Video AI Interviewer
- Real-time interview feedback
- AI avatar
- Live coding interviews
- Company-specific interview simulations
- Advanced long-term AI memory
- Proactive career coaching