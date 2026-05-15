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
 * 1. Copy this file to the same directory (src/constants/students/)
 * 2. Rename it to: your-username.ts (e.g., maria-garcia.ts)
 *    - Use lowercase letters only
 *    - Use hyphens (-) instead of spaces
 *    - Example: maria-garcia.ts, john-smith.ts
 * 3. Update all the information below with your personal data
 * 4. That's it! Your profile will be automatically discovered and displayed
 *    - No need to edit index.ts or any other files!
 *
 * ES:
 * 1. Copia este archivo en el mismo directorio (src/constants/students/)
 * 2. Renómbralo a: tu-usuario.ts (ej., maria-garcia.ts)
 *    - Usa solo letras minúsculas
 *    - Usa guiones (-) en lugar de espacios
 *    - Ejemplo: maria-garcia.ts, john-smith.ts
 * 3. Actualiza toda la información abajo con tus datos personales
 * 4. ¡Eso es todo! Tu perfil será descubierto y mostrado automáticamente
 *    - ¡No necesitas editar index.ts ni ningún otro archivo!
 *
 * ============================================================================
 */

import type { Student } from './types'

// EN: TODO: Update all fields with your information
// ES: TODO: Actualiza todos los campos con tu información

export const julianandrescorrea: Student = {
  // EN: Your username (lowercase, use hyphens for spaces)
  // ES: Tu nombre de usuario (minúsculas, usa guiones para espacios)
  // This will be used in the URL: /fullstack-course/students/YOUR-USERNAME
  username: 'julian-andres-correa',

  // EN: Your full name
  // ES: Tu nombre completo
  name: 'Julian Andres Correa',

  // EN: A short biography about yourself (2-3 sentences)
  // ES: Una biografía corta sobre ti (2-3 oraciones)
  bio: 'Software Engineer and Full Stack Developer based in Medellín, Colombia, dedicated to web development education and active open-source collaboration.',

  // EN: Your interests and skills (as an array)
  // ES: Tus intereses y habilidades (como un array)
  interests: [
    'React',
    'Next.js',
    'Node.js',
    'UI/UX Design',
    'Performance Optimization',
    'TypeScript',
    'Web Animations',
    'Teaching',
    'Open Source',
  ],

  // EN: Path to your profile image
  // ES: Ruta a tu imagen de perfil
  // The image should be in: /public/fullstack-course/students/YOUR-USERNAME/profile.webp
  profileImage:
    '/fullstack-course/students/julian-andres-correa/julian_correa.png',

  // EN: Your social media links (optional fields)
  // ES: Tus enlaces de redes sociales (campos opcionales)
  socials: {
    github: 'https://github.com/JulianAndresCorrea',
    //linkedin: 'https://www.linkedhttps://github.com/juanpablojimenezherediain.com/in/juanpablojimenezheredia',
    //twitter: 'https://x.com/JuanPabloJim_',
    //website: 'https://www.juanpablojimenez.dev',
    // instagram: '', // Optional / Opcional
  },
}

/**
 * ============================================================================
 * IMPORTANT NOTES / NOTAS IMPORTANTES
 * ============================================================================
 *
 * EN:
 * - Your filename must match your username (e.g., maria-garcia.ts for username: 'maria-garcia')
 * - Your username must match your folder name in /public/fullstack-course/students/
 * - Use lowercase and hyphens for both filename and username (e.g., maria-garcia, not Maria Garcia)
 * - The profile image should be named 'profile.webp' and placed in your folder
 * - All social links are optional except GitHub (recommended)
 * - DO NOT edit index.ts - your file will be automatically discovered!
 *
 * ES:
 * - El nombre de tu archivo debe coincidir con tu usuario (ej., maria-garcia.ts para username: 'maria-garcia')
 * - Tu usuario debe coincidir con el nombre de tu carpeta en /public/fullstack-course/students/
 * - Usa minúsculas y guiones tanto para el archivo como para el usuario (ej., maria-garcia, no Maria Garcia)
 * - La imagen de perfil debe llamarse 'profile.webp' y estar en tu carpeta
 * - Todos los enlaces sociales son opcionales excepto GitHub (recomendado)
 * - NO edites index.ts - ¡tu archivo será descubierto automáticamente!
 *
 * ============================================================================
 */
