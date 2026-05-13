export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: number
  tags: string[]
  category: string
  coverImage: string
}

const blogIndex: BlogPost[] = [
  {
    slug: 'mini-shai-hulud-supply-chain-attack',
    title: 'Mini Shai-Hulud: How a Self-Spreading Worm Hit 170+ npm Packages',
    excerpt:
      'On May 11 this crazy worm appeared in the tanstack/router repo, publishing 84 malicious versions across 42 @tanstack/* packages. The attacker never stole an npm password. They chained three known vulnerabilities to publish under TanStacks trusted identity with valid SLSA Build Level 3 provenance.',
    date: '2026-05-11',
    readingTime: 12,
    tags: ['security', 'npm', 'ci-cd', 'supply-chain'],
    category: 'Security',
    coverImage: '/images/blog/mini-shai-hulud-supply-chain-attack/cover.webp',
  },
  {
    slug: 'privilege-escalation',
    title: 'Privilege Escalation',
    excerpt:
      'Our initial access to a remote server is usually in the context of a low-privileged user. A walkthrough of common Linux and Windows techniques — kernel exploits, sudo abuse, cron jobs, exposed credentials, and SSH keys.',
    date: '2026-07-02',
    readingTime: 10,
    tags: ['pentest', 'post-exploitation', 'linux', 'windows', 'security'],
    category: 'Security',
    coverImage: '/images/blog/privilege-escalation/cover.webp',
  },
]
export default blogIndex
