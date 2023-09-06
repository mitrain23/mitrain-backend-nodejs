import { Image, Post } from '@prisma/client'

export interface MitraModel {
  email: string
  password: string
  name: string
  address: string
  phoneIntWhatsapp: string
  phoneIntContact: string
  category: string
  description: string
  isPremium?: Boolean
  image?: Image[]
  post?: Post[]
}
