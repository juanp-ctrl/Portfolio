/**
 * ============================================================================
 * STUDENTS INDEX - AUTO-IMPORT ALL STUDENT PROFILES
 * ============================================================================
 *
 * EN: This file automatically exports all student profiles.
 *     When you create your student file, add an import and export here.
 *
 * ES: Este archivo exporta automáticamente todos los perfiles de estudiantes.
 *     Cuando crees tu archivo de estudiante, agrega un import y export aquí.
 *
 * ============================================================================
 * HOW TO ADD YOUR PROFILE / CÓMO AGREGAR TU PERFIL
 * ============================================================================
 *
 * EN:
 * 1. Create your file: your-username.ts (copy juan-pablo-jimenez.ts as template)
 * 2. Import it below (use camelCase for the variable name)
 * 3. Add it to the students array at the bottom
 *
 * Example:
 * import { mariaGarcia } from './maria-garcia'
 *
 * Then add to array:
 * export const students: Student[] = [
 *   juanPabloJimenez,  // Professor
 *   mariaGarcia,       // Your entry
 * ]
 *
 * ES:
 * 1. Crea tu archivo: tu-usuario.ts (copia juan-pablo-jimenez.ts como plantilla)
 * 2. Impórtalo abajo (usa camelCase para el nombre de la variable)
 * 3. Agrégalo al array de students al final
 *
 * ============================================================================
 */

// Import types
export type { Student, StudentSocials } from './types'

// Import all student profiles
// EN: Add your import here / ES: Agrega tu import aquí
import { juanPabloJimenez } from './juan-pablo-jimenez'
import { FelipeBeltran } from './1pipe1'
import { MCamilaHolguin } from './CamilaHolguin'
import { RobinTabordaGirado } from './Robin-Taborda'
import { juanSebastianGaviria } from './Sebastian-Gaviria'
import { alanmonroy } from './alan-monroy'
import { alejandraMadrid } from './alejandra-madrid'
import { alejandromurillo } from './alejandro-murillo'
import { anyelohoyos } from './anyelo-hoyos'
import { emmanuelPerezCastrillon } from './emmanuel-perez'
import { JaimeLondonoSaldarriaga } from './jaime-londono-saldarriaga'
import { jeiksonGomez } from './jeikson-gomez'
import { juanFernandoDavid } from './juan-fernando-david'
import { juanjosetobon } from './juan-jose-tobon'
import { juanjosevillegas } from './juan-jose-villegas'
import { julianandrescorrea } from './julian-andres-correa'
import { juanPabloJimenez as marcelaQuintero } from './marcela-quintero'
import { mariaPalacioD } from './mariaPalacioD'
import { mateoHenao } from './mateohenao'
import { paulaCalderon } from './paula-calderon'
import { sebastianPerez } from './sesasan'
import { yesicaGonzalez } from './yesica-maria-gonzalez-v'

/**
 * Students Array
 *
 * EN: This array contains all student profiles.
 *     Add your imported profile to this array.
 *
 * ES: Este array contiene todos los perfiles de estudiantes.
 *     Agrega tu perfil importado a este array.
 */
export const students = [
  juanPabloJimenez, // Professor / Profesor
  FelipeBeltran,
  MCamilaHolguin,
  RobinTabordaGirado,
  juanSebastianGaviria,
  alanmonroy,
  alejandraMadrid,
  alejandromurillo,
  anyelohoyos,
  emmanuelPerezCastrillon,
  JaimeLondonoSaldarriaga,
  jeiksonGomez,
  juanFernandoDavid,
  juanjosetobon,
  juanjosevillegas,
  julianandrescorrea,
  marcelaQuintero,
  mariaPalacioD,
  mateoHenao,
  paulaCalderon,
  sebastianPerez,
  yesicaGonzalez,
  // EN: Add your profile here / ES: Agrega tu perfil aquí
] as const

/**
 * Get all students (mutable array for utility functions)
 * This is used by the utility functions in src/lib/students.ts
 */
export const allStudents = [...students]
