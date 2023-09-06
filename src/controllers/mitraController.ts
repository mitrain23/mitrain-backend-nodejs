import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import MitraService from '../services/mitraService'

class MitraController {
  static async registerMitra(req: Request, res: Response): Promise<any> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const {
        email,
        password,
        name,
        address,
        phoneIntWhatsapp,
        phoneIntContact,
        category,
        description
      } = req.body
      const images = req.files
      const mitraData = {
        email,
        password,
        name,
        address,
        phoneIntWhatsapp,
        phoneIntContact,
        category,
        description
      }

      const newMitra = await MitraService.registerMitra(mitraData, images)

      res.status(200).json({
        data: newMitra
      })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }

  static async loginMitra(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { email, password } = req.body
      const mitra = await MitraService.loginMitra(email, password)

      const token = await MitraService.generateToken(mitra.id)

      res.status(200).json({
        data: {
          id: mitra.id,
          email: mitra.email
        },
        token
      })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }
  static async getAllMitra(req: Request, res: Response) {
    try {
      const mitra = await MitraService.getAllMitra()

      res.status(200).json({
        data: mitra
      })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }
}

export default MitraController
