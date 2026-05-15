export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: number
  tags: string[]
  category: string
  coverImage: string
  hasEsTranslation: boolean
}

const blogIndex: Record<'en' | 'es', BlogPost[]> = {
  en: [
    {
      slug: 'mini-shai-hulud-supply-chain-attack',
      title: 'Mini Shai-Hulud: How a Self-Spreading Worm Hit 170+ npm Packages',
      excerpt:
        "On May 11 this crazy worm appeared in the tanstack/router repo, publishing 84 malicious versions across 42 @tanstack/* packages. The attacker never stole an npm password. They chained three known vulnerabilities to publish under TanStack's trusted identity with valid SLSA Build Level 3 provenance.",
      date: '2026-05-13',
      readingTime: 12,
      tags: ['security', 'npm', 'ci-cd', 'supply-chain'],
      category: 'Security',
      coverImage: '/images/blog/mini-shai-hulud-supply-chain-attack/cover.webp',
      hasEsTranslation: true,
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
      hasEsTranslation: false,
    },
  ],
  es: [
    {
      slug: 'mini-shai-hulud-supply-chain-attack',
      title:
        'Mini Shai-Hulud: Cómo un gusano auto-propagable afectó a más de 170 paquetes npm',
      excerpt:
        'El 11 de mayo apareció este gusano en el repo tanstack/router, publicando 84 versiones maliciosas en 42 paquetes @tanstack/*. El atacante nunca robó una contraseña de npm. Encadenó tres vulnerabilidades conocidas para publicar bajo la identidad de confianza de TanStack con procedencia SLSA Build Level 3 válida.',
      date: '2026-05-13',
      readingTime: 12,
      tags: ['security', 'npm', 'ci-cd', 'supply-chain'],
      category: 'Seguridad',
      coverImage: '/images/blog/mini-shai-hulud-supply-chain-attack/cover.webp',
      hasEsTranslation: false,
    },
    {
      slug: 'privilege-escalation',
      title: 'Escalada de Privilegios',
      excerpt:
        'Nuestro acceso inicial a un servidor remoto suele estar en el contexto de un usuario con bajos privilegios. Un recorrido por las técnicas comunes en Linux y Windows — exploits del kernel, abuso de sudo, cron jobs, credenciales expuestas y claves SSH.',
      date: '2026-07-02',
      readingTime: 10,
      tags: ['pentest', 'post-exploitation', 'linux', 'windows', 'security'],
      category: 'Seguridad',
      coverImage: '/images/blog/privilege-escalation/cover.webp',
      hasEsTranslation: false,
    },
  ],
}

export default blogIndex
