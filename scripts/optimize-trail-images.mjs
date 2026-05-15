import sharp from 'sharp'
import { mkdirSync } from 'fs'
import { join } from 'path'

const src = './public/images'
const dest = './public/images/trail'
const count = 18

mkdirSync(dest, { recursive: true })

for (let i = 1; i <= count; i++) {
  const file = `IMG_${i}.webp`
  await sharp(join(src, file))
    .resize(300, 400, { fit: 'cover' })
    .webp({ quality: 75 })
    .toFile(join(dest, file))
  console.log(`✓ ${file}`)
}

console.log(`\nDone — optimized ${count} images → ${dest}`)
