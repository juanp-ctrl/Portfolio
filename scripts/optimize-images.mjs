import sharp from 'sharp'
import { mkdirSync, unlinkSync, renameSync, existsSync } from 'fs'
import { join } from 'path'

const img = './public/images'
const fc = './public/fullstack-course/students/juan-pablo-jimenez'

async function convert(src, dest, options) {
  await sharp(src).resize(options).webp({ quality: options.quality ?? 75 }).toFile(dest)
  const before = Math.round(sharp(src).metadata ? 0 : 0) // placeholder
  console.log(`✓ ${src.replace('./public/', '')} → ${dest.replace('./public/', '')}`)
}

async function resizeInPlace(src, options) {
  const tmp = src + '.tmp.webp'
  await sharp(src).resize(options).webp({ quality: options.quality ?? 75 }).toFile(tmp)
  renameSync(tmp, src)
  console.log(`✓ ${src.replace('./public/', '')} (resized in-place)`)
}

// ── Section A: PNG → WebP ────────────────────────────────────────────────────
console.log('\n── PNG → WebP conversions ──')

await sharp(join(img, 'free_astronaut.png'))
  .resize({ width: 600, height: 600, fit: 'inside' })
  .webp({ quality: 80 })
  .toFile(join(img, 'free_astronaut.webp'))
unlinkSync(join(img, 'free_astronaut.png'))
console.log('✓ free_astronaut.png → free_astronaut.webp')

await sharp(join(img, 'spaceship.png'))
  .resize({ width: 600, fit: 'inside' })
  .webp({ quality: 75 })
  .toFile(join(img, 'spaceship.webp'))
unlinkSync(join(img, 'spaceship.png'))
console.log('✓ spaceship.png → spaceship.webp')

await sharp(join(img, 'moon.png'))
  .resize({ width: 60, height: 60, fit: 'cover' })
  .webp({ quality: 80 })
  .toFile(join(img, 'moon.webp'))
unlinkSync(join(img, 'moon.png'))
console.log('✓ moon.png → moon.webp')

// ── Section B: WebP resize in-place ─────────────────────────────────────────
console.log('\n── WebP resize in-place ──')

await resizeInPlace(join(img, 'juan_pablo_jimenez.webp'), { width: 800, fit: 'inside' })
await resizeInPlace(join(img, 'about_juan_pablo_jimenez.webp'), { width: 800, height: 800, fit: 'cover' })
await resizeInPlace(join(img, 'randomq-mockup-iphone5.webp'), { width: 800, fit: 'inside' })
await resizeInPlace(join(img, 'randomq-mockup-iphone2.webp'), { width: 600, fit: 'inside' })
await resizeInPlace(join(img, 'IMG_18.webp'), { width: 600, height: 800, fit: 'cover' })
await resizeInPlace(join(fc, 'profile.webp'), { width: 600, height: 600, fit: 'cover' })

// ── Section C: Delete orphaned files ────────────────────────────────────────
console.log('\n── Deleting orphaned files ──')

const orphans = [join(img, 'bg_space.png'), join(img, 'space_bg.gif')]
for (const f of orphans) {
  if (existsSync(f)) {
    unlinkSync(f)
    console.log(`✓ deleted ${f.replace('./public/', '')}`)
  }
}

console.log('\nDone.')
