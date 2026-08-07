# Database Design

## Database Technology

CareerVerse AI will use PostgreSQL as the primary relational database.

PostgreSQL will store transactional application data, user profiles, career definitions, skills, personalized roadmaps, learning progress, resumes, interviews, and AI conversation metadata.

---

# Core Entities

## users

Stores authentication and basic user information.

Fields:

- id
- email
- password_hash
- first_name
- last_name
- profile_image_url
- created_at
- updated_at

---

## user_profiles

Stores additional career and learning information.

Fields:

- id
- user_id
- education_level
- current_occupation
- years_of_experience
- career_goal
- preferred_learning_style
- weekly_learning_hours
- created_at
- updated_at

Relationship:

users 1 ─── 1 user_profiles

---

## careers

Stores career definitions.

Fields:

- id
- name
- slug
- category
- description
- difficulty
- demand_level
- growth_rate
- created_at
- updated_at

---

## career_blueprints

Defines the requirements and recommended pathway for a career.

Fields:

- id
- career_id
- version
- description
- created_at
- updated_at

Relationship:

careers 1 ─── 1 career_blueprints

---

## skills

Stores reusable skills.

Fields:

- id
- name
- slug
- description
- difficulty
- estimated_learning_hours
- created_at
- updated_at

---

## career_skills

Maps skills to careers.

Fields:

- career_id
- skill_id
- importance
- required_level

Relationship:

careers M ─── N skills

---

## user_skills

Stores a user's current skill level.

Fields:

- id
- user_id
- skill_id
- proficiency_level
- source
- verified
- created_at
- updated_at

Relationship:

users M ─── N skills

---

## roadmaps

Stores personalized career roadmaps.

Fields:

- id
- user_id
- career_id
- title
- start_date
- target_date
- progress_percentage
- status
- created_at
- updated_at

Relationship:

users 1 ─── N roadmaps

careers 1 ─── N roadmaps

---

## roadmap_steps

Stores individual roadmap tasks.

Fields:

- id
- roadmap_id
- skill_id
- title
- description
- step_order
- estimated_hours
- status
- completed_at
- created_at
- updated_at

Relationship:

roadmaps 1 ─── N roadmap_steps

---

## learning_resources

Stores learning resources.

Fields:

- id
- title
- resource_type
- url
- provider
- difficulty
- estimated_hours
- created_at
- updated_at

---

## projects

Stores recommended or user-created projects.

Fields:

- id
- title
- description
- difficulty
- estimated_hours
- repository_url
- created_at
- updated_at

---

## resumes

Stores resume information.

Fields:

- id
- user_id
- title
- content
- ats_score
- created_at
- updated_at

---

## interviews

Stores interview sessions.

Fields:

- id
- user_id
- interview_type
- target_role
- target_company
- score
- feedback
- started_at
- completed_at

---

## interview_questions

Stores questions used during interview sessions.

Fields:

- id
- interview_id
- question
- question_type
- difficulty
- user_answer
- score
- feedback
- created_at

---

## ai_conversations

Stores AI conversation sessions.

Fields:

- id
- user_id
- conversation_type
- started_at
- updated_at

---

## ai_messages

Stores individual messages within an AI conversation.

Fields:

- id
- conversation_id
- role
- content
- created_at

Relationship:

ai_conversations 1 ─── N ai_messages

---

# Progress Tracking

Progress should be tracked at multiple levels:

User
  ↓
Roadmap
  ↓
Roadmap Step
  ↓
Skill

This allows CareerVerse AI to calculate:

- Roadmap completion
- Skill completion
- Career readiness
- Learning consistency

---

# Future AI Memory

The MVP will store conversation history in PostgreSQL.

Future versions may introduce a vector database for semantic retrieval of relevant user context.

Potential architecture:

PostgreSQL
    +
Vector Storage
    ↓
AI Memory Layer

The vector layer should be introduced only when semantic retrieval provides a clear product benefit.

---

# Indexing Strategy

Important indexes should be created for:

- users.email
- careers.slug
- skills.slug
- roadmaps.user_id
- roadmap_steps.roadmap_id
- user_skills.user_id
- ai_conversations.user_id
- ai_messages.conversation_id
- interviews.user_id

---

# Data Integrity

The database should enforce:

- Primary keys
- Foreign keys
- Unique constraints
- NOT NULL constraints where appropriate
- Valid status values
- Referential integrity

---

# Security

Sensitive information must not be stored in plaintext.

Passwords must be stored using secure password hashing.

Authentication credentials and secrets must never be committed to Git.

---

# Database Evolution

Database schema changes will be managed using versioned database migrations.

Development and production environments must use controlled migrations rather than manually modifying production tables.

---

# Future Entities

Potential future tables include:

- internships
- scholarships
- companies
- certifications
- mentor_sessions
- notifications
- career_trends
- ai_memory
- achievements