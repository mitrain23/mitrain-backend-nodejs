import prisma from '../utils/prisma'
import { MitraModel } from '../models/mitraModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
require('dotenv').config()

const salt = 10

class MitraService {
  static async registerMitra(mitraData: MitraModel, images: any) {
    const {
      email,
      password,
      name,
      address,
      phoneIntWhatsapp,
      phoneIntContact,
      category,
      description
    } = mitraData
    const image = images.map((file: any) => file.filename)
    console.log(image)
    if (
      !email ||
      !password ||
      !name ||
      !address ||
      !phoneIntWhatsapp ||
      !phoneIntContact ||
      !image ||
      !description ||
      !category
    ) {
      throw Error('Fill all the require data')
    }

    const existingMitra = await prisma.mitra.findUnique({
      where: { email: email }
    })

    if (existingMitra) {
      throw Error('Mitra already exists')
    }

    const hashedPassword = await bcrypt.hash(password, salt)

    const newmitra = await prisma.mitra.create({
      data: {
        email,
        password: hashedPassword,
        name,
        address,
        phoneIntContact,
        phoneIntWhatsapp,
        category,
        description,
        isPremium: false,
        isMitra: true,
        images: {
          createMany: {
            data: image.map((imageUrl: string) => ({
              url: imageUrl
            }))
          }
        }
      },
      include: {
        images: {
          select: {
            url: true
          }
        }
      }
    })

    return newmitra
  }

  static async loginMitra(email: string, password: string) {
    // Check if mitra exists
    const mitra = await prisma.mitra.findUnique({ where: { email } })
    if (!mitra) {
      throw new Error('Invalid credentials')
    }

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(password, mitra.password)
    if (!passwordsMatch) {
      throw new Error('Invalid credentials')
    }

    return mitra
  }

  static async generateToken(mitraId: string | undefined) {
    const token = jwt.sign({ mitraId }, process.env.JWT_SECRET || '', {
      expiresIn: '4h'
    })
    return token
  }

  static async getAllMitra() {
    const mitra = await prisma.mitra.findMany({
      include: {
        images: {
          select: {
            url: true
          }
        }
      }
    })
    return mitra
  }
}

export default MitraService
