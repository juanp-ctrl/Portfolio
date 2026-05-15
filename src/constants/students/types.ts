/**
 * Student Types and Interfaces
 *
 * These TypeScript interfaces define the structure of student data.
 */

export interface StudentSocials {
  github?: string
  linkedin?: string
  twitter?: string
  website?: string
  instagram?: string
}

export interface Student {
  username: string // Used in URL: /fullstack-course/students/{username}
  name: string // Full name to display
  bio: string // Short biography
  interests: string[] // Array of interests/skills
  profileImage: string // Path to image in /public/fullstack-course/students/{username}/
  gallery?: string[] // Optional: Array of images for carousel
  socials: StudentSocials // Social media links
}
