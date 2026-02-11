import { placeholderImages } from './placeholder-images.json';

export type User = {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  imageHint: string;
  skills: string[];
  interests: string[];
  bio: string;
};

const allSkills = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'Figma',
  'UI/UX Design', 'Project Management', 'Product Strategy', 'Python',
  'Machine Learning', 'Data Analysis', 'Go', 'Rust', 'Solidity', 'DevOps'
];

const allInterests = [
  'AI', 'Web3', 'SaaS', 'Fintech', 'EdTech', 'Open Source', 'Gaming',
  'Photography', 'Traveling', 'Music Production'
];

function getRandomSubset<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * count) + 1);
}

export const users: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    title: 'Senior Frontend Developer',
    avatarUrl: placeholderImages.find(p => p.id === 'user-avatar-1')?.imageUrl || '',
    imageHint: placeholderImages.find(p => p.id === 'user-avatar-1')?.imageHint || '',
    skills: ['React', 'Next.js', 'TypeScript', 'GraphQL'],
    interests: ['AI', 'Open Source', 'Photography'],
    bio: '10+ years of experience building scalable web applications. Passionate about creating beautiful and functional user interfaces.'
  },
  {
    id: '2',
    name: 'Samantha Lee',
    title: 'Product Designer',
    avatarUrl: placeholderImages.find(p => p.id === 'user-avatar-2')?.imageUrl || '',
    imageHint: placeholderImages.find(p => p.id === 'user-avatar-2')?.imageHint || '',
    skills: ['Figma', 'UI/UX Design', 'Product Strategy'],
    interests: ['EdTech', 'Traveling', 'Gaming'],
    bio: 'Designing user-centric products that solve real-world problems. I believe in the power of empathy and collaboration.'
  },
  {
    id: '3',
    name: 'David Chen',
    title: 'AI Researcher',
    avatarUrl: placeholderImages.find(p => p.id === 'user-avatar-3')?.imageUrl || '',
    imageHint: placeholderImages.find(p => p.id === 'user-avatar-3')?.imageHint || '',
    skills: ['Python', 'Machine Learning', 'Data Analysis'],
    interests: ['AI', 'Fintech', 'Music Production'],
    bio: 'Exploring the frontiers of artificial intelligence and its applications in finance. Always eager to learn and share knowledge.'
  },
  {
    id: '4',
    name: 'Maria Garcia',
    title: 'Project Manager',
    avatarUrl: placeholderImages.find(p => p.id === 'user-avatar-4')?.imageUrl || '',
    imageHint: placeholderImages.find(p => p.id === 'user-avatar-4')?.imageHint || '',
    skills: ['Project Management', 'Product Strategy', 'DevOps'],
    interests: ['SaaS', 'Web3', 'Traveling'],
    bio: 'Helping teams build and ship amazing products. I thrive in fast-paced environments and love tackling complex challenges.'
  },
  {
    id: '5',
    name: 'Kenji Tanaka',
    title: 'Full-Stack Developer',
    avatarUrl: placeholderImages.find(p => p.id === 'user-avatar-5')?.imageUrl || '',
    imageHint: placeholderImages.find(p => p.id === 'user-avatar-5')?.imageHint || '',
    skills: ['Node.js', 'React', 'Go', 'DevOps'],
    interests: ['Open Source', 'Gaming', 'AI'],
    bio: 'Building robust and efficient systems from the ground up. I enjoy working on all parts of the stack.'
  },
  {
    id: '6',
    name: 'Emily White',
    title: 'Blockchain Engineer',
    avatarUrl: placeholderImages.find(p => p.id === 'user-avatar-6')?.imageUrl || '',
    imageHint: placeholderImages.find(p => p.id === 'user-avatar-6')?.imageHint || '',
    skills: ['Solidity', 'Rust', 'Web3', 'Node.js'],
    interests: ['Web3', 'Fintech', 'Open Source'],
    bio: 'Passionate about decentralized technologies and their potential to change the world. Currently building on Ethereum.'
  }
];

export const posts = [
  {
    id: 'post-1',
    userId: '2', // Samantha Lee
    content: `Excited to share the final designs for our new EdTech platform! We focused on creating an intuitive and accessible learning experience. Big thanks to the whole team for their hard work. #UIUX #ProductDesign #EdTech`,
    imageUrl: placeholderImages.find(p => p.id === 'post-image-1')?.imageUrl || '',
    imageHint: placeholderImages.find(p => p.id === 'post-image-1')?.imageHint || '',
    createdAt: '4h ago',
    likesCount: 128,
    commentsCount: 12,
  },
  {
    id: 'post-2',
    userId: '1', // Alex Johnson
    content: `Just published a new article on advanced state management patterns in Next.js 15! Covering everything from the new useOptimistic hook to integrating with server components. Hope you find it useful! #React #NextJS #WebDev`,
    imageUrl: '',
    createdAt: '1d ago',
    likesCount: 256,
    commentsCount: 34,
  },
  {
    id: 'post-3',
    userId: '3', // David Chen
    content: `Our latest research paper on using LLMs for financial forecasting just got accepted! It's been a long journey, but the results are promising. The potential for AI in this space is massive. #AI #MachineLearning #Fintech`,
    imageUrl: placeholderImages.find(p => p.id === 'post-image-2')?.imageUrl || '',
    imageHint: placeholderImages.find(p => p.id === 'post-image-2')?.imageHint || '',
    createdAt: '2d ago',
    likesCount: 512,
    commentsCount: 64,
  },
];


export const skills = allSkills;
export const interests = allInterests;
