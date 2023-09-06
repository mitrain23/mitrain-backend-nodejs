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
const prisma_1 = __importDefault(require("../utils/prisma"));
class PostService {
    static getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield prisma_1.default.post.findMany({
                include: {
                    mitra: {
                        select: {
                            name: true
                        }
                    },
                    images: { select: { url: true } }
                }
            });
            return posts;
        });
    }
    static getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const getPostById = yield prisma_1.default.post.findUnique({
                where: {
                    id: id
                },
                include: { images: true }
            });
            return getPostById;
        });
    }
    static getPostByAuthor(mitraId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getPostByAuthor = yield prisma_1.default.post.findMany({
                where: {
                    mitraId
                },
                include: {
                    mitra: {
                        select: {
                            name: true
                        }
                    },
                    images: { select: { url: true } }
                }
            });
            if (!getPostByAuthor) {
                throw Error('Post not found!');
            }
            return getPostByAuthor;
        });
    }
    static createPost(postData, images, mitra) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, priceMin, priceMax, location, phoneIntWhatsapp, phoneIntContact, category } = postData;
            const image = images.map((file) => file.path);
            const mitraId = mitra;
            console.log({ mitraId });
            if (!title ||
                !description ||
                !priceMin ||
                !priceMax ||
                !location ||
                !phoneIntWhatsapp ||
                !phoneIntContact) {
                throw Error('Fill all the require data');
            }
            const createdPost = yield prisma_1.default.post.create({
                data: {
                    title,
                    description,
                    priceMin,
                    priceMax,
                    location,
                    phoneIntWhatsapp,
                    phoneIntContact,
                    category,
                    mitraId,
                    images: {
                        createMany: {
                            data: image.map((imageUrl) => ({
                                url: imageUrl
                            }))
                        }
                    }
                },
                include: {
                    mitra: {
                        select: {
                            name: true
                        }
                    },
                    images: { select: { url: true } }
                }
            });
            return createdPost;
        });
    }
    static updatePost(id, postData, images, mitra) {
        return __awaiter(this, void 0, void 0, function* () {
            const postDataInput = {
                title: postData.title,
                description: postData.description,
                priceMin: postData.priceMin,
                priceMax: postData.priceMax,
                location: postData.location,
                phoneIntWhatsapp: postData.phoneIntWhatsapp,
                phoneIntContact: postData.phoneIntContact,
                category: postData.category,
                mitraId: mitra,
                images: {
                    createMany: {
                        data: images.map((imageUrl) => ({
                            url: imageUrl
                        }))
                    }
                }
            };
            const post = yield prisma_1.default.post.findUnique({
                where: {
                    id: id
                }
            });
            console.log(post);
            if (!post) {
                throw new Error('Cannot find post');
            }
            if (mitra !== post.mitraId) {
                throw new Error('You are not the owner of post');
            }
            else {
                const updatedPost = yield prisma_1.default.post.update({
                    where: { id: id },
                    data: postDataInput
                });
                return updatedPost;
            }
        });
    }
    static deletePost(id, mitra) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield prisma_1.default.post.findUnique({
                where: {
                    id: id
                }
            });
            if (!post) {
                throw new Error('Cannot find post');
            }
            if (mitra !== post.mitraId) {
                throw new Error('You are not the owner of post');
            }
            else {
                const deletedPost = yield prisma_1.default.post.delete({
                    where: {
                        id: id
                    }
                });
                return deletedPost;
            }
        });
    }
}
exports.default = PostService;
