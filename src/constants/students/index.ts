/**
 * ============================================================================
 * STUDENTS INDEX - AUTO-IMPORT ALL STUDENT PROFILES
 * ============================================================================
 *
 * EN: This file automatically discovers and exports all student profiles.
 *     Simply create your student file and it will be automatically included!
 *
 * ES: Este archivo descubre y exporta automáticamente todos los perfiles de estudiantes.
 *     ¡Simplemente crea tu archivo de estudiante y será incluido automáticamente!
 *
 * ============================================================================
 * HOW TO ADD YOUR PROFILE / CÓMO AGREGAR TU PERFIL
 * ============================================================================
 *
 * EN:
 * 1. Create your file: your-username.ts (copy juan-pablo-jimenez.ts as template)
 * 2. Fill in your information in the new file
 * 3. That's it! Your profile will be automatically imported and displayed
 *
 * ES:
 * 1. Crea tu archivo: tu-usuario.ts (copia juan-pablo-jimenez.ts como plantilla)
 * 2. Completa tu información en el nuevo archivo
 * 3. ¡Eso es todo! Tu perfil será importado y mostrado automáticamente
 *
 * ============================================================================
 * TECHNICAL NOTES / NOTAS TÉCNICAS
 * ============================================================================
 *
 * This file uses webpack's require.context() to dynamically import all
 * student profile files at build time. This eliminates merge conflicts
 * that would occur if every student had to manually edit this file.
 *
 * Este archivo usa require.context() de webpack para importar dinámicamente
 * todos los archivos de perfil de estudiantes en tiempo de compilación.
 * Esto elimina conflictos de merge que ocurrirían si cada estudiante tuviera
 * que editar manualmente este archivo.
 *
 * ============================================================================
 */

// Re-export types
export type { Student, StudentSocials } from './types'
import type { Student } from './types'

// Dynamic import using webpack's require.context
// This will import all .ts files except index.ts and types.ts
const studentModules = require.context(
  './', // Directory to search
  false, // Don't search subdirectories
  /^(?!.*(?:index|types)).*\.ts$/, // Match .ts files except index.ts and types.ts
)

// Extract student objects from all modules
export const students: Student[] = studentModules
  .keys()
  .map((fileName:string) => {
    const studentModule = studentModules(fileName) as Record<string, Student>
    // Get the first exported value (the student object)
    const studentKey = Object.keys(studentModule)[0]
    return studentModule[studentKey]
  })
  .filter((student: Student): student is Student => student !== undefined)

/**
 * Get all students (mutable array for utility functions)
 * This is used by the utility functions in src/lib/students.ts
 */
export const allStudents = [...students]
