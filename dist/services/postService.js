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
            try {
                const posts = yield prisma_1.default.post.findMany({
                    include: { author: { select: { name: true } }, image: true },
                });
                return posts;
            }
            catch (error) {
                throw Error(error.message);
            }
        });
    }
    static getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getPostById = yield prisma_1.default.post.findUnique({
                    where: {
                        id: id,
                    },
                    include: { author: { select: { name: true } }, image: true },
                });
                return getPostById;
            }
            catch (error) {
                throw Error('failed to get unique post');
            }
        });
    }
    static getPostByAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getPostByAuthor = yield prisma_1.default.post.findMany({
                    where: {
                        authorId,
                    },
                    include: { author: { select: { name: true } }, image: true },
                });
                return getPostByAuthor;
            }
            catch (error) {
                throw Error('failed to get post by author');
            }
        });
    }
    static createPost(postData, images) {
        return __awaiter(this, void 0, void 0, function* () {
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
                            data: images.map((file) => ({
                                name: file.filename,
                            })),
                        },
                    },
                };
                const createdPost = yield prisma_1.default.post.create({
                    data: postDataInput,
                    include: { image: true },
                });
                return createdPost;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to create a new post');
            }
        });
    }
    static updatePost(id, postData, images) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postDataInput = {
                    title: postData.title,
                    description: postData.description,
                    price_min: postData.price_min,
                    price_max: postData.price_max,
                    location: postData.location,
                    phone_number_whatsapp: postData.phone_number_whatsapp,
                    phone_number_contact: postData.phone_number_contact,
                    image: {
                        createMany: {
                            data: images.map((file) => ({
                                name: file.filename,
                            })),
                        },
                    },
                };
                const updatedPost = yield prisma_1.default.post.update({
                    where: { id: id },
                    data: postDataInput
                });
                return updatedPost;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to update post');
            }
        });
    }
    static deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPost = yield prisma_1.default.post.delete({
                    where: {
                        id: id,
                    }
                });
                return deletedPost;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static searchQuery(searchText, lokasi, minPrice, maxPrice, skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            const search = searchText || '';
            const location = lokasi || '';
            const strMinPrice = minPrice !== undefined ? String(minPrice) : undefined;
            const strMaxPrice = maxPrice !== undefined ? String(maxPrice) : undefined;
            const skipPage = skip || 0;
            const takePage = take || 10;
            try {
                let whereClause = {};
                if (search !== '') {
                    // Apply search filter if searchText is not empty
                    whereClause.title = {
                        contains: search,
                    };
                }
                if (location !== '') {
                    // Apply location filter if lokasi is not empty
                    whereClause.location = {
                        contains: location,
                    };
                }
                if (strMinPrice !== undefined) {
                    // Apply minPrice filter if minPrice is not undefined
                    whereClause.price_min = {
                        gte: strMinPrice,
                    };
                }
                if (strMaxPrice !== undefined) {
                    // Apply maxPrice filter if maxPrice is not undefined
                    whereClause.price_max = {
                        lte: strMaxPrice,
                    };
                }
                const results = yield prisma_1.default.post.findMany({
                    where: whereClause,
                    include: { author: { select: { name: true } }, image: true },
                    skip: skipPage,
                    take: takePage,
                });
                return results;
            }
            catch (error) {
                // Handle error
            }
        });
    }
}
exports.default = PostService;
