export const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Three.js'],
  },
  {
    title: 'Backend',
    skills: ['Python', 'Node.js', 'Java', 'PHP', 'C#', 'Flask', 'Django', 'Express', 'FastAPI'],
  },
  {
    title: 'AI / ML',
    skills: ['TensorFlow', 'PyTorch', 'scikit-learn', 'NLP', 'Neural Networks', 'Computer Vision', 'Data Analysis'],
  },
  {
    title: 'Tools & Databases',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Docker', 'Git', 'Prisma', 'Figma'],
  },
];

export const allSkills = skillCategories.flatMap((cat) => cat.skills);
