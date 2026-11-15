const generateMentorResponse = async ({
  user,
  skills,
  skillGaps,
  careerProgress,
  question,
  selectedCareer,
}) => {
  const skillSummary =
    skills.length > 0
      ? skills
          .map(
            (skill) =>
              `${skill.skill_name}: ${skill.skill_level}`
          )
          .join(", ")
      : "No skills added yet";

  const gapSummary =
    skillGaps.length > 0
      ? skillGaps
          .map(
            (gap) =>
              `${gap.skill}: ${gap.status}`
          )
          .join(", ")
      : "No major skill gaps";

  const careerName = selectedCareer
    ? selectedCareer.name
    : user.target_career;

  const readiness = selectedCareer
    ? selectedCareer.readiness
    : careerProgress;

  console.log("AI Mentor Demo Mode");
  console.log("User:", user.name);
  console.log("Question:", question);
  console.log("Career:", careerName);

  return `
Hi ${user.name}! 👋

You are currently exploring the career path of ${careerName}.

Your current career readiness is approximately ${readiness}%.

Your current skills:
${skillSummary}

Your main skill gaps:
${gapSummary}

Your question:
${question}

My recommendation:

Start by focusing on the skills that are currently missing or need improvement for ${careerName}.

Rather than trying to learn everything at once, choose one important missing skill and practice it through a small project.

A good approach is:

1. Strengthen one missing skill.
2. Build a small project using that skill.
3. Add the next required skill.
4. Combine your skills into a larger project.
5. Continue following your career roadmap.

For your next step, choose one of your missing skills and spend the next week practicing it consistently.

Keep building and improving — every completed project moves you closer to becoming a ${careerName}. 🚀
`;
};

module.exports = {
  generateMentorResponse,
};