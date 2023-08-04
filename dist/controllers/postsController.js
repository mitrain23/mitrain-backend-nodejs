"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postService_1 = __importDefault(require("../services/postService"));
class PostsController {
    static getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield postService_1.default.getAllPosts();
                res.json(posts);
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    static getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const getPostById = yield postService_1.default.getPostById(id);
                if (getPostById == null) {
                    throw Error('Post not found');
                }
                res.json(getPostById);
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    static getPostByAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.userId, 'ini userId');
            const authorId = parseInt(req.params.id);
            try {
                const getPostByAuthor = yield postService_1.default.getPostByAuthor(authorId);
                if (getPostByAuthor == null) {
                    throw Error('Post not found');
                }
                res.json({
                    getPostByAuthor
                });
            }
            catch (err) {
            }
        });
    }
    static createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = req.body;
                const images = req.files;
                console.log(images === null || images === void 0 ? void 0 : images.length);
                const createdPost = yield postService_1.default.createPost(postData, images);
                res.json(createdPost);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const postData = req.body;
                const images = req.files;
                const updatedPost = yield postService_1.default.updatePost(id, postData, images);
                res.json({
                    updatedPost
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idParams = req.params.id;
            const id = parseInt(idParams, 10);
            try {
                console.log(id);
                const deletedPost = yield postService_1.default.deletePost(id);
                res.json({
                    data: `post deleted successfully, ${deletedPost.id}`
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static searchQuery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lokasi, price_min, price_max, search, page, pageSize } = req.query;
            const minPrice = parseFloat(price_min);
            const maxPrice = parseFloat(price_max);
            const parsedPage = parseInt(page, 10);
            const parsedPageSize = parseInt(pageSize, 10);
            const skip = parsedPage * parsedPageSize - parsedPageSize;
            const take = parsedPageSize;
            console.log(lokasi);
            if (isNaN(minPrice) && isNaN(maxPrice)) {
                try {
                    const results = yield postService_1.default.searchQuery(search, lokasi, undefined, undefined, skip, take);
                    res.json({
                        results,
                    });
                }
                catch (err) {
                    res.status(500).json({ error: err.message });
                }
            }
            else if (isNaN(minPrice) || isNaN(maxPrice)) {
                return res.status(400).json({ error: 'Invalid price range.' });
            }
            else {
                console.log(minPrice, maxPrice);
                try {
                    const results = yield postService_1.default.searchQuery(search, lokasi, minPrice, maxPrice, skip, take);
                    res.json({
                        results,
                    });
                }
                catch (err) {
                    res.status(500).json({ error: err.message });
                }
            }
        });
    }
}
exports.default = PostsController;
