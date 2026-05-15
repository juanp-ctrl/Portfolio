/**
 * ============================================================================
 * STUDENT PROFILE PAGE - BLUEPRINT/TEMPLATE
 * ============================================================================
 *
 * EN: This is a blueprint profile page that serves as a reference for students.
 *     Copy this structure to create your own profile!
 *
 * ES: Esta es una página de perfil modelo que sirve como referencia para estudiantes.
 *     ¡Copia esta estructura para crear tu propio perfil!
 *
 * ============================================================================
 * IMPORTANT / IMPORTANTE:
 * ============================================================================
 *
 * EN: This file is heavily commented to help you understand each section.
 *     When creating your profile, you can remove most comments to keep it clean.
 *
 * ES: Este archivo está muy comentado para ayudarte a entender cada sección.
 *     Al crear tu perfil, puedes eliminar la mayoría de comentarios para mantenerlo limpio.
 *
 * ============================================================================
 */

'use client'

// ============================================================================
// IMPORTS / IMPORTACIONES
// ============================================================================
// EN: These are the necessary imports for the page to work
// ES: Estas son las importaciones necesarias para que la página funcione

import { useTranslations } from '@/context/I18nContext'
import Header from '@/components/Header/Header'
import PageTransition from '@/components/PageTransition'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { useTransition } from '@/context/TransitionContext'

// ============================================================================
// COMPONENT / COMPONENTE
// ============================================================================
// EN: This is the main component function. Change the name if needed.
// ES: Esta es la función del componente principal. Cambia el nombre si es necesario.

export default function JuanPabloJimenezProfile() {
  // ==========================================================================
  // HOOKS
  // ==========================================================================
  // EN: These hooks provide translations and navigation functionality
  // ES: Estos hooks proveen traducciones y funcionalidad de navegación

  const t = useTranslations('fullstack_course')
  const { startTransition } = useTransition()

  // ==========================================================================
  // NAVIGATION HANDLER / MANEJADOR DE NAVEGACIÓN
  // ==========================================================================
  // EN: This function handles smooth page transitions
  // ES: Esta función maneja las transiciones suaves entre páginas

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    startTransition('/fullstack-course')
  }

  // ==========================================================================
  // PROFILE DATA / DATOS DEL PERFIL
  // ==========================================================================
  // EN: TODO: Replace this data with your own information!
  // ES: TODO: ¡Reemplaza estos datos con tu propia información!

  // EN: Your full name
  // ES: Tu nombre completo
  const profileName = 'Juan Pablo Jiménez'

  // EN: Your biography/description (2-3 sentences recommended)
  // ES: Tu biografía/descripción (se recomiendan 2-3 oraciones)
  const profileBio =
    'Software Engineer and Frontend Developer from Medellín, Colombia. Passionate about teaching web development and open-source contribution. I love creating interactive experiences with React and Next.js.'

  // EN: Your interests/skills (as an array of strings)
  // ES: Tus intereses/habilidades (como un array de strings)
  const profileInterests = [
    'React',
    'Next.js',
    'TypeScript',
    'Web Animations',
    'Teaching',
    'Open Source',
    'UI/UX Design',
    'Accessibility',
  ]

  // ==========================================================================
  // PROFILE IMAGE PATH / RUTA DE IMAGEN DE PERFIL
  // ==========================================================================
  // EN: TODO: Change this path to point to your image!
  // ES: TODO: ¡Cambia esta ruta para que apunte a tu imagen!
  //
  // EN: Your image should be placed in: /public/fullstack-course/students/YOUR-USERNAME/profile.webp
  // ES: Tu imagen debe estar en: /public/fullstack-course/students/TU-USUARIO/profile.webp
  //
  // EN: Recommended: Use .webp format, 400x400px minimum, square aspect ratio
  // ES: Recomendado: Usa formato .webp, mínimo 400x400px, aspecto cuadrado

  const profileImage =
    '/fullstack-course/students/juan-pablo-jimenez/profile.webp'

  // ==========================================================================
  // SOCIAL MEDIA LINKS / ENLACES DE REDES SOCIALES
  // ==========================================================================
  // EN: TODO: Add your social media links here!
  // ES: TODO: ¡Agrega tus enlaces de redes sociales aquí!
  //
  // EN: Set to null or empty string if you don't have that social network
  // ES: Establece como null o string vacío si no tienes esa red social

  const socialLinks = {
    github: 'https://github.com/juanpablojimenezheredia',
    linkedin: 'https://www.linkedin.com/in/juanpablojimenezheredia',
    twitter: 'https://x.com/JuanPabloJim_',
    website: 'https://www.juanpablojimenez.dev',
    instagram: '', // EN: Optional / ES: Opcional
  }

  // ==========================================================================
  // RENDER / RENDERIZADO
  // ==========================================================================
  // EN: This is what gets displayed on the page
  // ES: Esto es lo que se muestra en la página

  return (
    <PageTransition>
      <main className="relative w-full overflow-hidden bg-white">
        {/* ================================================================== */}
        {/* HEADER COMPONENT / COMPONENTE DE ENCABEZADO */}
        {/* ================================================================== */}
        {/* EN: Don't change this, it's the site navigation */}
        {/* ES: No cambies esto, es la navegación del sitio */}

        <Header variant="dark" />

        {/* ================================================================== */}
        {/* BACK BUTTON SECTION / SECCIÓN DE BOTÓN VOLVER */}
        {/* ================================================================== */}
        {/* EN: Link to go back to the course overview page */}
        {/* ES: Enlace para volver a la página general del curso */}

        <section className="px-6 md:px-20 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/fullstack-course"
              onClick={handleNavigation}
              className="inline-flex items-center gap-2 font-josefin text-base text-black-primary/70 hover:text-yellow-primary transition-colors"
            >
              {/* EN: Back arrow icon / ES: Icono de flecha para volver */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t('back_to_course')}
            </Link>
          </motion.div>
        </section>

        {/* ================================================================== */}
        {/* PROFILE HEADER SECTION / SECCIÓN DE ENCABEZADO DEL PERFIL */}
        {/* ================================================================== */}
        {/* EN: This section contains your name and profile image */}
        {/* ES: Esta sección contiene tu nombre e imagen de perfil */}

        <section className="px-6 md:px-20 py-12 md:py-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
            {/* ============================================================== */}
            {/* PROFILE IMAGE / IMAGEN DE PERFIL */}
            {/* ============================================================== */}
            {/* EN: TODO: Update the 'src' prop with your image path */}
            {/* ES: TODO: Actualiza el prop 'src' con la ruta de tu imagen */}
            {/* EN: TODO: Update the 'alt' prop with your name */}
            {/* ES: TODO: Actualiza el prop 'alt' con tu nombre */}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <Image
                src={profileImage}
                alt={`Profile picture of ${profileName}`}
                width={300}
                height={300}
                className="rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)] w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
                priority
              />
            </motion.div>

            {/* ============================================================== */}
            {/* NAME AND ROLE / NOMBRE Y ROL */}
            {/* ============================================================== */}
            {/* EN: TODO: Update with your name */}
            {/* ES: TODO: Actualiza con tu nombre */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h1 className="font-libre italic text-4xl md:text-6xl text-black-primary">
                {profileName}
              </h1>

              {/* EN: Role badge / ES: Insignia de rol */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-primary border-2 border-black-primary w-fit">
                <span className="font-josefin text-base md:text-lg font-semibold text-black-primary">
                  {t('professor_section_title')}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* BIOGRAPHY SECTION / SECCIÓN DE BIOGRAFÍA */}
        {/* ================================================================== */}
        {/* EN: This is where you write about yourself */}
        {/* ES: Aquí es donde escribes sobre ti */}
        {/* EN: TODO: Replace profileBio variable content with your own text */}
        {/* ES: TODO: Reemplaza el contenido de la variable profileBio con tu propio texto */}

        <section className="px-6 md:px-20 py-12 bg-white-secondary">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-libre italic text-3xl md:text-4xl text-black-primary mb-6">
              About Me
              {/* EN: Feel free to translate this / ES: Siéntete libre de traducir esto */}
            </h2>

            <p className="font-josefin text-base md:text-lg text-black-primary/80 max-w-3xl leading-relaxed">
              {profileBio}
            </p>
          </motion.div>
        </section>

        {/* ================================================================== */}
        {/* INTERESTS SECTION / SECCIÓN DE INTERESES */}
        {/* ================================================================== */}
        {/* EN: This displays your interests/skills as tags */}
        {/* ES: Esto muestra tus intereses/habilidades como etiquetas */}
        {/* EN: TODO: Update profileInterests array with your interests */}
        {/* ES: TODO: Actualiza el array profileInterests con tus intereses */}

        <section className="px-6 md:px-20 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-libre italic text-3xl md:text-4xl text-black-primary mb-8">
              Interests & Skills
              {/* EN: Feel free to translate this / ES: Siéntete libre de traducir esto */}
            </h2>

            {/* ============================================================== */}
            {/* INTERESTS TAGS GRID / CUADRÍCULA DE ETIQUETAS DE INTERESES */}
            {/* ============================================================== */}
            {/* EN: This maps through your interests and creates a tag for each */}
            {/* ES: Esto recorre tus intereses y crea una etiqueta para cada uno */}

            <div className="flex flex-wrap gap-3">
              {profileInterests.map((interest, index) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-black-primary text-white-primary font-josefin text-sm md:text-base border-2 border-black-primary hover:bg-yellow-primary hover:text-black-primary transition-all cursor-default"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ================================================================== */}
        {/* SOCIAL LINKS SECTION / SECCIÓN DE ENLACES SOCIALES */}
        {/* ================================================================== */}
        {/* EN: This section displays your social media links */}
        {/* ES: Esta sección muestra tus enlaces de redes sociales */}
        {/* EN: TODO: Update socialLinks object with your links */}
        {/* ES: TODO: Actualiza el objeto socialLinks con tus enlaces */}

        <section className="px-6 md:px-20 py-16 bg-black-secondary">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-libre italic text-3xl md:text-4xl text-yellow-primary mb-8">
              Connect With Me
              {/* EN: Feel free to translate this / ES: Siéntete libre de traducir esto */}
            </h2>

            {/* ============================================================== */}
            {/* SOCIAL LINKS GRID / CUADRÍCULA DE ENLACES SOCIALES */}
            {/* ============================================================== */}
            {/* EN: These are buttons/links to your social media profiles */}
            {/* ES: Estos son botones/enlaces a tus perfiles de redes sociales */}

            <div className="flex flex-wrap gap-4">
              {/* GITHUB */}
              {/* EN: Only shows if you have a GitHub link / ES: Solo se muestra si tienes un enlace de GitHub */}
              {socialLinks.github && (
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white-primary text-black-primary font-josefin text-base border-2 border-white-primary hover:bg-yellow-primary hover:border-yellow-primary transition-all"
                >
                  <span>GitHub</span>
                  {/* EN: External link icon / ES: Icono de enlace externo */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              )}

              {/* LINKEDIN */}
              {/* EN: Only shows if you have a LinkedIn link / ES: Solo se muestra si tienes un enlace de LinkedIn */}
              {socialLinks.linkedin && (
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white-primary text-black-primary font-josefin text-base border-2 border-white-primary hover:bg-yellow-primary hover:border-yellow-primary transition-all"
                >
                  <span>LinkedIn</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              )}

              {/* TWITTER/X */}
              {/* EN: Only shows if you have a Twitter link / ES: Solo se muestra si tienes un enlace de Twitter */}
              {socialLinks.twitter && (
                <motion.a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white-primary text-black-primary font-josefin text-base border-2 border-white-primary hover:bg-yellow-primary hover:border-yellow-primary transition-all"
                >
                  <span>Twitter/X</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              )}

              {/* PERSONAL WEBSITE */}
              {/* EN: Only shows if you have a website link / ES: Solo se muestra si tienes un enlace de sitio web */}
              {socialLinks.website && (
                <motion.a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white-primary text-black-primary font-josefin text-base border-2 border-white-primary hover:bg-yellow-primary hover:border-yellow-primary transition-all"
                >
                  <span>Website</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              )}

              {/* INSTAGRAM (Optional) */}
              {/* EN: Only shows if you have an Instagram link / ES: Solo se muestra si tienes un enlace de Instagram */}
              {socialLinks.instagram && (
                <motion.a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white-primary text-black-primary font-josefin text-base border-2 border-white-primary hover:bg-yellow-primary hover:border-yellow-primary transition-all"
                >
                  <span>Instagram</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11M15 3H21M21 3V9M21 3L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              )}
            </div>
          </motion.div>
        </section>

        {/* ================================================================== */}
        {/* FOOTER COMPONENT / COMPONENTE DE PIE DE PÁGINA */}
        {/* ================================================================== */}
        {/* EN: Don't change this, it's the site footer */}
        {/* ES: No cambies esto, es el pie de página del sitio */}

        <Footer />
      </main>
    </PageTransition>
  )
}

/**
 * ============================================================================
 * CHECKLIST FOR CREATING YOUR PROFILE / LISTA DE VERIFICACIÓN PARA CREAR TU PERFIL
 * ============================================================================
 *
 * EN: Before submitting your pull request, make sure you've:
 * ES: Antes de enviar tu pull request, asegúrate de haber:
 *
 * [ ] Created your folder: /public/fullstack-course/students/YOUR-USERNAME/ | Haber creado la carpeta en public/fullstack-course/students/YOUR-USERNAME/
 * [ ] Added your profile image: profile.webp (400x400px minimum, square) | Haber agregado tu imagen de perfil: profile.webp (mínimo 400x400px, aspecto cuadrado)
 * [ ] Updated profileName with your name | Haber actualizado profileName con tu nombre
 * [ ] Updated profileBio with your description | Haber actualizado profileBio con tu descripción
 * [ ] Updated profileInterests with your skills/interests | Haber actualizado profileInterests con tus habilidades/intereses
 * [ ] Updated profileImage path to point to your image | Haber actualizado la ruta de profileImage para que apunte a tu imagen
 * [ ] Updated socialLinks with your social media URLs | Haber actualizado socialLinks con tus enlaces de redes sociales
 * [ ] Added yourself to src/constants/students.ts | Haber agregado tu información a src/constants/students.ts
 * [ ] Tested locally with `pnpm dev` | Haber probado localmente con `pnpm dev`
 * [ ] Removed unnecessary comments (optional, but recommended) | Eliminado comentarios innecesarios (opcional, pero recomendado)
 *
 * EN: Good luck with your first contribution! 🚀
 * ES: ¡Buena suerte con tu primera contribución! 🚀
 */
