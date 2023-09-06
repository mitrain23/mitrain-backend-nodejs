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
                res.status(200).json({ data: posts });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    static getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const getPostById = yield postService_1.default.getPostById(id);
                if (getPostById == null) {
                    throw Error('Post not found');
                }
                res.status(200).json({ data: getPostById });
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    }
    static getPostByAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mitraId = req.params.id;
            try {
                const getPostByAuthor = yield postService_1.default.getPostByAuthor(mitraId);
                if (getPostByAuthor == null) {
                    throw Error('Post not found');
                }
                res.status(200).json({
                    data: getPostByAuthor
                });
            }
            catch (err) { }
        });
    }
    static createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, priceMin, priceMax, location, phoneIntWhatsapp, phoneIntContact, category } = req.body;
                const postData = {
                    title,
                    description,
                    priceMin,
                    priceMax,
                    location,
                    phoneIntWhatsapp,
                    phoneIntContact,
                    category
                };
                const images = req.files;
                const mitra = req.body.mitraId;
                const createdPost = yield postService_1.default.createPost(postData, images, mitra);
                res.status(200).json({
                    data: createdPost
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const mitra = req.body.mitraId;
                const postData = req.body;
                const images = req.files;
                const updatedPost = yield postService_1.default.updatePost(id, postData, images, mitra);
                res.status(200).json({
                    data: updatedPost
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const mitra = req.body.mitraId;
            try {
                const deletedPost = yield postService_1.default.deletePost(id, mitra);
                res.status(200).json({
                    data: `post deleted successfully, ${deletedPost.id}`
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = PostsController;
