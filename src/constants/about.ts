export const CONTACT_EMAIL = 'juanpablojimenez.dev@gmail.com'
export const CV_PATH = '/cv/CV Juan Pablo Jiménez Heredia.pdf'
export const HTB_PROFILE_URL = 'https://app.hackthebox.com/users/341543'
export const CWES_CREDLY_URL =
  'https://www.credly.com/badges/aa856ced-9174-431c-8226-b4a18f0476c2/public_url'
export const CWES_POST_SLUG = 'htb-cwes-certification'
export const MENTOR_CREDENTIAL_URL =
  'https://view.pok.tech/c/c1a92aa7-f33c-404a-af18-9a3f2fbfd302'

export interface Course {
  name: string
  issuer: string
  url: string
}

export const courses: Course[] = [
  {
    name: 'AWS Cloud Quest: Cloud Practitioner',
    issuer: 'AWS',
    url: 'https://www.credly.com/badges/53980e2e-598d-4851-b887-f2cf104145a5/public_url',
  },
  {
    name: 'Understanding TypeScript',
    issuer: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-daff226a-cdc3-448c-8a80-05f2602e046c/',
  },
  {
    name: 'Web Design Accessibility Certificate',
    issuer: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-5e39da16-853b-441f-9ed3-57e7dfceadb4/',
  },
  {
    name: 'The Git & GitHub Bootcamp',
    issuer: 'Udemy',
    url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-5038a544-fb6d-4e0e-a446-f9c50bb7bbc4.pdf',
  },
  {
    name: 'React - The Complete Guide',
    issuer: 'Udemy',
    url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-e52f737c-2d82-4add-8029-e47e40f83eb5.pdf',
  },
  {
    name: 'Object-oriented Programming in JavaScript',
    issuer: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-9a996caa-9b02-40fd-9ea5-b837050bf801/',
  },
]

/** Keys map to `about.experience.<id>.*` in messages/*.json */
export const experience: { id: string; current?: boolean }[] = [
  { id: 'gorilla', current: true },
  { id: 'upb' },
  { id: 'globant' },
  { id: 'freelance' },
]

export const engineeringSkills = [
  'TypeScript',
  'JavaScript',
  'React',
  'Next.js',
  'Angular',
  'Node.js',
  'Python',
  'FastAPI',
  'Jest / Vitest',
  'WCAG AA/AAA',
]

export const cloudSkills = [
  'AWS (ECS, ECR, Cognito, SES)',
  'GCP',
  'Docker',
  'GitHub Actions',
  'Git',
  'Sentry',
  'Claude Code',
]

export const offensiveTools = [
  'Burp Suite',
  'OWASP ZAP',
  'ffuf',
  'gobuster',
  'sqlmap',
  'Nmap',
  'SysReptor',
]
