import { selectFields } from "express-validator/src/field-selection";
import { PostModel } from "../models/postModel";
import prisma from "../utils/prisma";

class PostService {
  static async getAllPosts() {
    try {
      const posts = await prisma.post.findMany({
        include: { author: { select: { name: true } }, image: true },
      });
      return posts
    } catch (error: any) {
      throw Error(error.message);
    }
  }


  static async getPostById(id: number) {
    try {
      const getPostById = await prisma.post.findUnique({
        where: {
          id: id,
        },
        include: { author: { select: { name: true } }, image: true },
      })
      return getPostById;
    } catch (error: any) {
      throw Error('failed to get unique post')
    }
  }

  static async getPostByAuthor(authorId: number) {
    try {
      const getPostByAuthor = await prisma.post.findMany({
        where: {
          authorId,
        },
        include: { author: { select: { name: true } }, image: true },
      })
      return getPostByAuthor
    } catch (error: any) {
      throw Error('failed to get post by author')
    }
  }

  static async createPost(postData: PostModel, images: any) {
    try {

      const postDataInput = {
        title: postData.title,
        description: postData.description,
        price_min: postData.price_min,
        price_max: postData.price_max,
        location: postData.location,
        phone_number_whatsapp: postData.phone_number_whatsapp,
        phone_number_contact: postData.phone_number_contact,
        authorId: typeof postData.authorId === 'string' ? parseInt(postData.authorId) : postData.authorId,
        image: {
          createMany: {
            data: images.map((file: any) => ({
              name: file.filename,
            })),
          },
        },
      };

      const createdPost = await prisma.post.create({
        data: postDataInput,
        include: { image: true },
      });

      return createdPost;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to create a new post');
    }
  }

  static async deletePost(id: any) {
    try {
      const deletedPost = await prisma.post.delete({
        where: {
          id: id,
        }
      })
      return deletedPost;
    } catch (error: any) {
      throw new Error(error.message)
    }
  }


  static async searchQuery(searchText: string, lokasi: string, minPrice: number, maxPrice: number, skip: number, take: number) {
    const search = searchText || '';
    const location = lokasi || '';
    const strMinPrice = String(minPrice);
    const strMaxPrice = String(maxPrice);
    const skipPage = skip || 0;
    const takePage = take || 10;
    
    try {
      const results = await prisma.post.findMany({
        where: {
          location: {
            contains: location,
          },
          title: {
            contains: search,
          },
          price_min: {
            gte: strMinPrice,
          },
          price_max: {
            lte: strMaxPrice,
          },
        },
        skip: skipPage,
        take: takePage
      });

      return results;
    } catch (error) {
      // Handle error
    }
  }


}


export default PostService;