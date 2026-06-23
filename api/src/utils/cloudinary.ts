import { v2 as cloudinary } from 'cloudinary'
import fs from 'node:fs'
import credentialProvider from '../env'

cloudinary.config({
  cloud_name: credentialProvider.CLOUD_NAME,
  api_key: credentialProvider.API_KEY,
  api_secret: credentialProvider.API_SECRET,
})

const uploadToCloudinary = async (filePath: string, userId: string, surveyId: string) => {
  try {
    if (!filePath) {
      throw new Error('File path not provided. Please try again with the filePath')
    }
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
      folder: `coverImage/${userId}/${surveyId}`,
    })

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    return response
  } catch (error) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    if (error instanceof Error) {
      console.log(error.message)
      throw new Error(error.message)
    }
    console.log('Error uploading file to clouinary.Pease try again later')
  }
}

export default uploadToCloudinary
