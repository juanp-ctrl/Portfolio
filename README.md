# Juan Pablo Jiménez - Portfolio 🧑‍🚀

## Overview 📖

This is my personal portfolio website, designed to showcase my skills, projects, and professional journey as a Frontend Developer. The site features a modern, interactive design with smooth transitions, multilingual support, and responsive layouts.

## Live Site 🌐

[👨‍🚀 juanpablojimenez.dev](https://www.juanpablojimenez.dev)

## Technologies Used 💻

- **Next.js 16** - React framework with App Router, server-side rendering and static site generation
- **React 19** - Latest React runtime with improved performance and features
- **TypeScript 5.8** - For type-safe code
- **Framer Motion** - For advanced animations and transitions
- **Tailwind CSS** - For utility-first styling
- **next-intl** - For internationalization (English/Spanish) with cookie-based routing
- **GSAP** - For complex animations
- **Custom Cursor** - Enhanced user experience with custom cursor effects
- **Responsive Design** - Mobile-first approach for all device compatibility

## Features 🌱

- **Animated Page Transitions** - Smooth transitions between pages using Framer Motion
- **Bilingual Support** - Complete English and Spanish translations
- **Interactive UI** - Engaging user interface with custom animations
- **Project Showcase** - Detailed display of projects with images and descriptions
- **Custom Fonts** - Using Libre Baskerville and Josefin Sans for typography
- **Cookie Consent** - GDPR compliant cookie consent management
- **PWA Support** - Progressive Web App capabilities
- **SEO Optimized** - Meta tags and structured data for better search engine visibility

## Project Structure

```
├── public
│   ├── fonts             # Custom fonts
│   ├── images            # Site images
│   ├── locales           # Translation files
│   └── service-worker.js # PWA service worker
├── src
│   ├── components        # Reusable UI components
│   ├── hooks             # Custom React hooks
│   ├── pages             # Next.js pages
│   └── styles            # Global styles
```

## Featured Projects

- **Random-Q** - A dynamic web application for generating conversation starters
  - Technologies: NextJS, TypeScript, Firebase Firestore, Firebase App Hosting, CI/CD via GitHub
  - Visit: [random-q.com](https://www.random-q.com/)

## Getting Started 🚀

### Prerequisites

- Node.js (v18.18 or higher - required for Next.js 16)
- pnpm package manager

### Installation

1. Clone the repository
2. Install dependencies

```bash
pnpm install
```

3. Start the development server

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the site

### Building for Production

```bash
pnpm build
pnpm start
```

## Deployment

This site is configured for easy deployment on platforms like Vercel or through standard NextJS deployment procedures.

## Contributing as a Student 🎓

This portfolio includes a special **Fullstack Course** section where students can learn Git, GitHub, and open-source contribution workflows by making real contributions to this website!

### What is the Fullstack Course Section?

The Fullstack Course section (`/fullstack-course`) is an educational space designed to provide hands-on experience with:

- Git version control
- GitHub workflow (fork, clone, branch, commit, push, pull request)
- Open-source contribution practices
- React and Next.js development
- TypeScript programming

### How to Contribute Your Student Profile

Follow these steps to add your profile to the Fullstack Course section:

#### 1. Fork the Repository

Click the "Fork" button at the top right of this GitHub repository to create your own copy.

#### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio
```

#### 3. Install Dependencies

```bash
pnpm install
```

#### 4. Create a New Branch

**Important:** Always create a new branch for your contribution. Use a descriptive name:

```bash
git checkout -b add-student-your-name
```

Example: `git checkout -b add-student-maria-garcia`

#### 5. Create Your Student Configuration File

**Important:** Each student gets their own file to avoid merge conflicts!

1. Go to `src/constants/students/`
2. Copy the file `juan-pablo-jimenez.ts` (this is the template)
3. Rename it to `your-username.ts` (e.g., `maria-garcia.ts`)
4. Open your new file and update all the information:

```typescript
import type { Student } from './types'

export const yourUsername: Student = {
  // Use camelCase: mariaGarcia
  username: 'your-username', // Use lowercase, hyphens: maria-garcia
  name: 'Your Full Name', // Maria García
  bio: 'A short description about yourself (2-3 sentences)',
  interests: ['React', 'TypeScript', 'Your', 'Interests', 'Here'],
  profileImage: '/fullstack-course/students/your-username/profile.webp',
  socials: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername', // Optional
    twitter: 'https://twitter.com/yourusername', // Optional
    website: 'https://yourwebsite.com', // Optional
  },
}
```

**That's it!** Your file will be automatically discovered and imported. You don't need to edit `index.ts` or any other files. The system uses webpack's `require.context()` to dynamically import all student profile files.

#### 6. Create Your Profile Folder

Create a new folder for your profile image:

```bash
mkdir -p public/fullstack-course/students/your-username
```

#### 7. Add Your Profile Image

- Place your profile image in the folder you just created
- Name it `profile.webp` (or convert to WebP format)
- Recommended size: 400x400px minimum, square aspect ratio
- Path: `public/fullstack-course/students/your-username/profile.webp`

#### 8. Use the Blueprint Files as Reference

Check out these template files:

- **Configuration template**: `src/constants/students/juan-pablo-jimenez.ts` - Copy this for your student file
- **Profile page template**: `src/app/fullstack-course/students/juan-pablo-jimenez/page.tsx` - Heavily commented in EN/ES (advanced, optional)

For most students, just creating your configuration file is enough! The system will automatically generate your profile page using the dynamic route.

#### 9. Test Your Changes Locally

Start the development server and check your profile:

```bash
pnpm dev
```

Visit:

- Main course page: `http://localhost:3000/fullstack-course`
- Your profile: `http://localhost:3000/fullstack-course/students/your-username`

Make sure:

- Your name appears in the students list
- Your profile page displays correctly
- Your profile image loads properly
- Your social links work
- No console errors appear

#### 10. Commit Your Changes

```bash
git add .
git commit -m "feat: add [Your Name] to fullstack course"
```

Example: `git commit -m "feat: add Maria Garcia to fullstack course"`

#### 11. Push to Your Fork

```bash
git push origin add-student-your-name
```

#### 12. Open a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. **Important:** Make sure your PR targets the `develop` branch (not `main`)
4. Title your PR: `Add [Your Name] to Fullstack Course`
5. In the description, mention:
   - Your name
   - That this is for the Fullstack Course section
   - Any issues you encountered or questions you have
6. Submit the pull request!

### Pull Request Guidelines

✅ **DO:**

- Only modify files in the `fullstack-course` section
- Create your own file in `src/constants/students/your-username.ts`
- Include a profile image in `public/fullstack-course/students/your-username/`
- Test your changes locally before submitting
- Write a clear commit message
- Target the `develop` branch

❌ **DON'T:**

- Modify other parts of the website
- Include sensitive information (passwords, API keys, etc.)
- Submit without testing locally
- Copy other students' profiles without customization

### Need Help?

- Check the configuration template: `src/constants/students/juan-pablo-jimenez.ts`
- Review the blueprint profile page: `src/app/fullstack-course/students/juan-pablo-jimenez/page.tsx`
- Read the detailed contributing guide: `CONTRIBUTING.md`
- Visit the course page: [juanpablojimenez.dev/fullstack-course](https://www.juanpablojimenez.dev/fullstack-course)
- Ask questions in your pull request

### Course Resources

Download course materials and documentation at: `/fullstack-course/resources`

---

## Contact 📧

Feel free to reach out to me through the contact section on my website or connect with me on social media.

## License 🔍

All rights reserved. This code is not open for reuse without permission.

This portfolio and its code are published for educational and non-commercial purposes only. You may view and learn from the code, but not use it for commercial purposes or republish it without explicit written permission from the author.
