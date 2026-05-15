/**
 * ============================================================================
 * STUDENT PROFILE CONFIGURATION - BLUEPRINT/TEMPLATE
 * ============================================================================
 *
 * EN: This is your personal student configuration file.
 *     Each student has their own file to avoid merge conflicts!
 *
 * ES: Este es tu archivo de configuración de estudiante personal.
 *     ¡Cada estudiante tiene su propio archivo para evitar conflictos de merge!
 *
 * ============================================================================
 * HOW TO CREATE YOUR OWN FILE / CÓMO CREAR TU PROPIO ARCHIVO
 * ============================================================================
 *
 * EN:
 * 1. Copy this file
 * 2. Rename it to: your-username.ts (e.g., maria-garcia.ts)
 * 3. Update all the information below with your data
 * 4. The file will be automatically imported by index.ts
 *
 * ES:
 * 1. Copia este archivo
 * 2. Renómbralo a: tu-usuario.ts (ej., maria-garcia.ts)
 * 3. Actualiza toda la información abajo con tus datos
 * 4. El archivo será importado automáticamente por index.ts
 *
 * ============================================================================
 */

import type { Student } from './types'

// EN: TODO: Update all fields with your information
// ES: TODO: Actualiza todos los campos con tu información

export const emmanuelPerezCastrillon: Student = {
  // EN: Your username (lowercase, use hyphens for spaces)
  // ES: Tu nombre de usuario (minúsculas, usa guiones para espacios)
  // This will be used in the URL: /fullstack-course/students/YOUR-USERNAME
  username: 'tiz787',

  // EN: Your full name
  // ES: Tu nombre completo
  name: 'Emmanuel Pérez Castrillón',

  // EN: A short biography about yourself (2-3 sentences)
  // ES: Una biografía corta sobre ti (2-3 oraciones)
  bio: 'i like to code and learn new things. im a web developer and a student of the course Full Stack Developer.',

  // EN: Your interests and skills (as an array)
  // ES: Tus intereses y habilidades (como un array)
  interests: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Music'],

  // EN: Path to your profile image
  // ES: Ruta a tu imagen de perfil
  // The image should be in: /public/fullstack-course/students/YOUR-USERNAME/profile.webp
  profileImage:
    '/fullstack-course/students/emmanuel-perez-castrillon/profile.png',

  // EN: Your social media links (optional fields)
  // ES: Tus enlaces de redes sociales (campos opcionales)
  socials: {
    github: 'https://github.com/tiz787',

    // instagram: '', // Optional / Opcional
  },
}

/**
 * ============================================================================
 * IMPORTANT NOTES / NOTAS IMPORTANTES
 * ============================================================================
 *
 * EN:
 * - Make sure your username matches your folder name in /public/fullstack-course/students/
 * - Use lowercase and hyphens for the username (e.g., maria-garcia, not Maria Garcia)
 * - The profile image should be named 'profile.webp' and placed in your folder
 * - All social links are optional except GitHub (recommended)
 *
 * ES:
 * - Asegúrate de que tu usuario coincida con el nombre de tu carpeta en /public/fullstack-course/students/
 * - Usa minúsculas y guiones para el usuario (ej., maria-garcia, no Maria Garcia)
 * - La imagen de perfil debe llamarse 'profile.webp' y estar en tu carpeta
 * - Todos los enlaces sociales son opcionales excepto GitHub (recomendado)
 *
 * ============================================================================
 */
