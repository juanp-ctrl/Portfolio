# Contributing to the Fullstack Course Section 🎓

Welcome, students! This guide will help you make your first open-source contribution to this portfolio website as part of the Fullstack Development Course.

## Table of Contents

- [Quick Start](#quick-start)
- [Detailed Step-by-Step Guide](#detailed-step-by-step-guide)
- [File Structure](#file-structure)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Code of Conduct](#code-of-conduct)

---

## Quick Start

**TL;DR:** For experienced developers who want a quick overview:

1. Fork → Clone → Create branch (`add-student-your-name`)
2. Copy `src/constants/students/juan-pablo-jimenez.ts` → Rename to `your-username.ts`
3. Edit your file with your info
4. Create folder: `public/fullstack-course/students/your-username/`
5. Add your `profile.webp` image
6. Test with `pnpm dev`
7. Commit → Push → Open PR to `develop` branch

---

## Detailed Step-by-Step Guide

### Prerequisites

Before you start, make sure you have:

- [Git](https://git-scm.com/) installed
- [Node.js](https://nodejs.org/) v18.18 or higher
- [pnpm](https://pnpm.io/) package manager
- A GitHub account
- A code editor (VS Code recommended)
- A profile picture (400x400px minimum, square, WebP format preferred)

### Step 1: Fork the Repository

1. Go to [https://github.com/juanpablojimenezheredia/portfolio](https://github.com/juanpablojimenezheredia/portfolio)
2. Click the **"Fork"** button in the top-right corner
3. This creates your own copy of the repository

### Step 2: Clone Your Fork

Open your terminal and run:

```bash
# Replace YOUR-USERNAME with your GitHub username
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio
```

### Step 3: Install Dependencies

```bash
pnpm install
```

Wait for all packages to be installed. This might take a few minutes.

### Step 4: Create a New Branch

**IMPORTANT:** Always work on a new branch, never on `main` or `develop` directly.

```bash
git checkout -b add-student-your-name
```

Example: `git checkout -b add-student-maria-garcia`

### Step 5: Create Your Student Configuration File

This is where the magic happens! Each student gets their own file to avoid merge conflicts.

#### 5.1: Navigate to the Students Directory

```bash
cd src/constants/students/
```

#### 5.2: Copy the Template File

```bash
# Copy the professor's file as your template
cp juan-pablo-jimenez.ts your-username.ts
```

Example: `cp juan-pablo-jimenez.ts maria-garcia.ts`

**Important:** Use lowercase letters and hyphens (no spaces, no underscores).

#### 5.3: Edit Your File

Open your new file (`your-username.ts`) in your code editor and update:

```typescript
import type { Student } from './types'

// Change the export name to camelCase version of your username
export const yourUsername: Student = {
  // Example: mariaGarcia
  // Your username (must match the filename without .ts)
  username: 'your-username', // Example: 'maria-garcia'

  // Your full name
  name: 'Your Full Name', // Example: 'María García'

  // A short bio about yourself (2-3 sentences)
  bio: 'Write something interesting about yourself. What are you passionate about? What are you learning?',

  // Your interests/skills (add or remove as needed)
  interests: ['React', 'TypeScript', 'Add your interests here'],

  // Path to your profile image (we'll create this in Step 6)
  profileImage: '/fullstack-course/students/your-username/profile.webp',

  // Your social media links (all optional except GitHub)
  socials: {
    github: 'https://github.com/yourusername', // Required
    linkedin: 'https://linkedin.com/in/your-name', // Optional
    twitter: 'https://x.com/yourhandle', // Optional
    website: 'https://yourwebsite.com', // Optional
    instagram: '', // Optional
  },
}
```

**Tips:**

- The `username` field must match your filename (without `.ts`)
- Use your real name or a professional pseudonym for the `name` field
- Keep your bio concise but informative
- Be honest about your interests/skills
- At minimum, provide your GitHub link

**Important:** Your file will be automatically discovered! You don't need to edit `index.ts` or any other files. Just create your profile file with the correct naming convention and it will be automatically imported and displayed.

### Step 6: Add Your Profile Image

#### 6.1: Create Your Folder

From the project root:

```bash
mkdir -p public/fullstack-course/students/your-username
```

Example: `mkdir -p public/fullstack-course/students/maria-garcia`

#### 6.2: Add Your Profile Picture

1. Choose a professional photo of yourself
2. **Image requirements:**
   - Format: WebP (preferred) or JPG/PNG
   - Size: Minimum 400x400 pixels
   - Aspect ratio: Square (1:1)
   - File name: `profile.webp` (exactly this name)

3. Place the image in your folder:
   ```
   public/fullstack-course/students/your-username/profile.webp
   ```

**How to convert to WebP:**

- Online: [Squoosh.app](https://squoosh.app/)
- Command line (Mac/Linux): `brew install webp` then `cwebp input.jpg -o profile.webp`

### Step 7: Test Your Changes

This is **CRITICAL**. Always test before submitting!

#### 7.1: Start the Development Server

```bash
pnpm dev
```

#### 7.2: Visit These Pages

1. **Course main page:** `http://localhost:3000/fullstack-course`
   - ✅ Check: Your name appears in the students list
2. **Your profile:** `http://localhost:3000/fullstack-course/students/your-username`
   - ✅ Check: Your profile image loads
   - ✅ Check: Your name displays correctly
   - ✅ Check: Your bio appears
   - ✅ Check: Your interests show up as tags
   - ✅ Check: Your social links work (click them!)
   - ✅ Check: No console errors (open browser DevTools with F12)

#### 7.3: Common Test Failures

**Profile image not loading?**

- Check the path in your config file
- Verify the file is named exactly `profile.webp`
- Check that the folder name matches your username

**Name not appearing in the list?**

- Check that your filename matches the pattern: `your-username.ts` (lowercase, hyphens)
- Verify your file is in `src/constants/students/` directory
- Make sure your file exports a valid Student object
- Check for TypeScript errors in the terminal

**Console errors?**

- Read the error message carefully
- Check for typos in your configuration
- Ensure all required fields are filled

### Step 8: Commit Your Changes

Once everything works:

```bash
# Go back to the project root if you're in a subdirectory
cd /path/to/portfolio

# Add all your changes
git add .

# Commit with a clear message
git commit -m "feat: add [Your Name] to fullstack course"
```

Example: `git commit -m "feat: add María García to fullstack course"`

**Good commit messages:**

- ✅ `feat: add María García to fullstack course`
- ✅ `feat: add student profile for maria-garcia`

**Bad commit messages:**

- ❌ `update`
- ❌ `changes`
- ❌ `my profile`

### Step 9: Push to Your Fork

```bash
git push origin add-student-your-name
```

Example: `git push origin add-student-maria-garcia`

### Step 10: Open a Pull Request

1. Go to your fork on GitHub: `https://github.com/YOUR-USERNAME/portfolio`
2. You should see a yellow banner saying "Compare & pull request" - click it
3. **IMPORTANT:** Make sure the PR is targeting the `develop` branch (not `main`)
4. Fill out the PR template:
   - **Title:** `Add [Your Name] to Fullstack Course`
   - **Description:** Include:
     - Your name
     - What you changed
     - Any challenges you faced
     - Checklist confirmation

**Example PR Description:**

```markdown
## Student Profile Submission

**Name:** María García  
**Username:** maria-garcia

### Changes Made

- Created student configuration file: `src/constants/students/maria-garcia.ts`
- Added import and export in `src/constants/students/index.ts`
- Added profile image: `public/fullstack-course/students/maria-garcia/profile.webp`

### Checklist

- [x] Tested locally with `pnpm dev`
- [x] Profile page loads correctly
- [x] Profile image displays
- [x] No console errors
- [x] Social links work

### Notes

This is my first open-source contribution! 🎉
```

5. Click **"Create Pull Request"**
6. Wait for review and approval!

---

## File Structure

Understanding the project structure:

```
portfolio/
├── src/
│   ├── constants/
│   │   └── students/
│   │       ├── index.ts                    ← Auto-imports all files (don't edit!)
│   │       ├── types.ts                    ← Type definitions (don't change)
│   │       ├── juan-pablo-jimenez.ts       ← Template (copy this)
│   │       └── your-username.ts            ← Your file goes here
│   ├── lib/
│   │   └── students.ts                     ← Utility functions (don't change)
│   └── app/
│       └── fullstack-course/
│           ├── page.tsx                    ← Course main page
│           ├── resources/                  ← Course materials
│           └── students/
│               ├── [username]/             ← Dynamic route (auto-generates your page)
│               └── juan-pablo-jimenez/     ← Blueprint profile page
└── public/
    └── fullstack-course/
        └── students/
            ├── juan-pablo-jimenez/
            │   └── profile.webp
            └── your-username/              ← Create this folder
                └── profile.webp            ← Your image goes here
```

---

## Common Issues and Solutions

### Issue: TypeScript Errors

**Error:** `Cannot find module './your-username'`

**Solution:** Make sure you created the file and the import path matches the filename exactly.

---

### Issue: Merge Conflicts

**Error:** Git shows merge conflicts when pulling/pushing

**Solution:**

```bash
# Update your branch with latest changes
git checkout develop
git pull origin develop
git checkout add-student-your-name
git rebase develop

# If conflicts occur, Git will tell you which files
# Resolve conflicts in your editor, then:
git add .
git rebase --continue
```

**Better approach:** Create your own file! That's why we use individual files with automatic discovery instead of manual registration. The system automatically imports all student files, eliminating merge conflicts.

---

### Issue: Image Not Loading

**Possible causes:**

1. Wrong file path in config
2. File not named `profile.webp`
3. File not in the correct folder
4. Image file corrupted

**Solution:**

- Double-check the path: `/fullstack-course/students/your-username/profile.webp`
- Verify the folder structure matches your username
- Try converting the image again

---

### Issue: Build Fails

**Error:** `pnpm dev` won't start or shows errors

**Solutions:**

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm dev
```

---

### Issue: Port Already in Use

**Error:** `Port 3000 is already in use`

**Solutions:**

```bash
# Option 1: Kill the process using port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use a different port
pnpm dev --port 3001
```

---

## Code of Conduct

### Do's ✅

- Be respectful and professional
- Help other students when you can
- Ask questions if you're stuck
- Follow the contribution guidelines
- Test thoroughly before submitting
- Write clear commit messages
- Keep your profile appropriate and professional

### Don'ts ❌

- Don't modify other students' files
- Don't change files outside the `fullstack-course` directory
- Don't include personal sensitive information (addresses, phone numbers, etc.)
- Don't copy other students' profiles verbatim
- Don't submit without testing
- Don't force push (`git push -f`)
- Don't commit `node_modules` or build artifacts

---

## Getting Help

### Resources

1. **Template Files:**
   - Configuration: `src/constants/students/juan-pablo-jimenez.ts`
   - Profile page: `src/app/fullstack-course/students/juan-pablo-jimenez/page.tsx`

2. **Documentation:**
   - [README.md](./README.md) - Project overview
   - [Next.js Docs](https://nextjs.org/docs)
   - [TypeScript Handbook](https://www.typescriptlang.org/docs/)

3. **Community:**
   - Ask in class
   - Comment on your PR
   - Check existing PRs for examples

### Contact

- **Professor:** Juan Pablo Jiménez
- **Website:** [juanpablojimenez.dev](https://www.juanpablojimenez.dev)
- **GitHub:** [@juanpablojimenezheredia](https://github.com/juanpablojimenezheredia)

---

## Congratulations! 🎉

Once your PR is merged, your profile will be live on the website for everyone to see! You've just made your first open-source contribution!

**What's next?**

- Explore the codebase
- Try adding a custom profile page (advanced)
- Help other students with their PRs
- Continue contributing to open source!

---

**Happy coding!** 🚀
