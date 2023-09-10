import { Request, Response } from 'express'
import PostService from '../services/postService'

class PostsController {
  static async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.getAllPosts()
      res.status(200).json({ data: posts })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }

  static async getPostById(req: Request, res: Response) {
    const id = req.params.id
    try {
      const getPostById = await PostService.getPostById(id)
      if (getPostById == null) {
        throw Error('Post not found')
      }
      res.status(200).json({ data: getPostById })
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }

  static async getPostByAuthor(req: Request, res: Response) {
    const mitraId = req.params.id
    try {
      const getPostByAuthor = await PostService.getPostByAuthor(mitraId)
      if (getPostByAuthor == null) {
        throw Error('Post not found')
      }
      res.status(200).json({
        data: getPostByAuthor
      })
    } catch (err: any) {}
  }

  static async createPost(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        priceMin,
        priceMax,
        location,
        phoneIntWhatsapp,
        phoneIntContact,
        category
      } = req.body
      const postData = {
        title,
        description,
        priceMin,
        priceMax,
        location,
        phoneIntWhatsapp,
        phoneIntContact,
        category
      }
      const images = req.files
      const mitra = req.body.mitraId
      console.log(mitra)

      const createdPost = await PostService.createPost(postData, images, mitra)
      res.status(200).json({
        data: createdPost
      })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  static async updatePost(req: Request, res: Response) {
    const id = req.params.id
    try {
      const mitra = req.body.mitraId
      const postData = req.body
      const images = req.files

      const updatedPost = await PostService.updatePost(
        id,
        postData,
        images,
        mitra
      )
      res.status(200).json({
        data: updatedPost
      })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  static async deletePost(req: Request, res: Response) {
    const id = req.params.id
    const mitra = req.body.mitraId
    try {
      const deletedPost = await PostService.deletePost(id, mitra)
      res.status(200).json({
        data: `post deleted successfully, ${deletedPost.id}`
      })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  //   static async searchQuery(req: Request, res: Response) {
  //     const { lokasi, price_min, price_max, search, page, pageSize } = req.query
  //     const minPrice = parseFloat(price_min as string)
  //     const maxPrice = parseFloat(price_max as string)
  //     const parsedPage = parseInt(page as string, 10)
  //     const parsedPageSize = parseInt(pageSize as string, 10)

  //     const skip = parsedPage * parsedPageSize - parsedPageSize
  //     const take = parsedPageSize

  //     console.log(lokasi)

  //     if (isNaN(minPrice) && isNaN(maxPrice)) {
  //       try {
  //         const results = await PostService.searchQuery(
  //           search as string,
  //           lokasi as string,
  //           undefined,
  //           undefined,
  //           skip,
  //           take
  //         )
  //         res.json({
  //           results
  //         })
  //       } catch (err: any) {
  //         res.status(500).json({ error: err.message })
  //       }
  //     } else if (isNaN(minPrice) || isNaN(maxPrice)) {
  //       return res.status(400).json({ error: 'Invalid price range.' })
  //     } else {
  //       console.log(minPrice, maxPrice)
  //       try {
  //         const results = await PostService.searchQuery(
  //           search as string,
  //           lokasi as string,
  //           minPrice,
  //           maxPrice,
  //           skip,
  //           take
  //         )
  //         res.json({
  //           results
  //         })
  //       } catch (err: any) {
  //         res.status(500).json({ error: err.message })
  //       }
  //     }
  //   }
}

export default PostsController
