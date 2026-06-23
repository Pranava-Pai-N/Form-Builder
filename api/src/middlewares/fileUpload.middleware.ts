import type { Context, Next } from 'hono'
import mime from 'mime-types'
import { writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import fs from 'node:fs'
import uploadToCloudinary from '../utils/cloudinary'

export const handleFileUpload = async (c: Context, next: Next) => {
  let tempFilePath = ''

  try {
    const body = await c.req.parseBody()
    const file = body.coverImage
    const user = c.get('user')

    if (!user?.id) {
      return c.json({ success: false, error: 'Unauthorized access' }, 401)
    }

    if (!file || typeof file === 'string') {
      return c.json({ success: false, error: 'No file uploaded' }, 400)
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png']

    if (!allowedMimeTypes.includes(file.type)) {
      return c.json({ error: 'Invalid file type. Only JPEG, PNG are allowed.' }, 400)
    }

    const FIVE_MB = 5 * 1024 * 1024

    if (file.size > FIVE_MB) {
      return c.json({ error: 'File size exceeds 5MB limit.' }, 400)
    }

    const tempDir = join(process.cwd(), 'coverImage')
    if (!fs.existsSync(tempDir)) {
      await mkdir(tempDir, { recursive: true })
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const extension = mime.extension(file.type) || file.name.split('.').pop()
    const filename = `coverImage-${uniqueSuffix}.${extension}`
    tempFilePath = join(tempDir, filename)

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await writeFile(tempFilePath, buffer)

    const uploadResult = await uploadToCloudinary(tempFilePath, user.id, 'new_survey')

    if (!uploadResult?.secure_url) {
      return c.json({ success: false, error: 'Failed to upload image to Cloudinary.' }, 500)
    }

    c.set('uploadedFilePath', uploadResult.secure_url)

    await next()
  } catch (_error) {
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath)
    }

    return c.json({ error: 'Something went wrong during upload' }, 500)
  }
}
