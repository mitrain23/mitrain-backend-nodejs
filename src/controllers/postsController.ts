import { Request, Response } from "express";
import { validationResult } from "express-validator";
import PostService from "../services/postService";
import { PostModel } from "../models/postModel";


class PostsController {
    static async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await PostService.getAllPosts();
            res.json(posts);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getPostById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const getPostById = await PostService.getPostById(id)
            if (getPostById == null) {
                throw Error('Post not found')
            }
            res.json(getPostById);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getPostByAuthor(req: Request, res: Response) {
        console.log(req.body.userId, 'ini dwaohudahuidaw');
        const authorId = parseInt(req.params.id);
        try {
            const getPostByAuthor = await PostService.getPostByAuthor(authorId);
            if (getPostByAuthor == null) {
                throw Error('Post not found')
            }
            res.json({
                getPostByAuthor
            })
        } catch (err: any) {

        }
    }


    static async createPost(req: Request, res: Response) {
        try {
            const postData = req.body;
            const images = req.files;
            console.log(images?.length);
            const createdPost = await PostService.createPost(postData, images);
            res.json(createdPost);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    static async deletePost(req: Request, res: Response) {
        const idParams = req.params.id;
        const id = parseInt(idParams, 10);

        try {
            console.log(id);
            const deletedPost = await PostService.deletePost(id)
            res.json({
                data: `post deleted successfully, ${deletedPost.id}`
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }



    static async searchQuery(req: Request, res: Response) {
        const { lokasi, price_min, price_max, search, page, pageSize } = req.query
        const minPrice = parseFloat(price_min as string);
        const maxPrice = parseFloat(price_max as string);
        const parsedPage = parseInt(page as string, 10);
        const parsedPageSize = parseInt(pageSize as string, 10);

        const skip = parsedPage * parsedPageSize - parsedPageSize
        const take = parsedPageSize

        console.log(skip, 'ini skip'),
        console.log(take, 'ini take')

        if (isNaN(minPrice) || isNaN(maxPrice)) {
            return res.status(400).json({ error: 'Invalid price range.' });
        }

        console.log(minPrice, maxPrice);

        try {
            const results = await PostService.searchQuery(search as string, lokasi as string, minPrice, maxPrice, skip, take)
            res.json({
                results
            })
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }


}


export default PostsController;