"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsController_1 = __importDefault(require("../controllers/postsController"));
const multer_1 = __importDefault(require("../utils/multer"));
const verifyTokenMitra_1 = require("../utils/verifyTokenMitra");
const router = express_1.default.Router();
// search filter
//router.get('/search', PostsController.searchQuery)
// get
router.get('/allPosts', postsController_1.default.getAllPosts);
router.get('/post/:id', postsController_1.default.getPostById);
router.get('/postAuthor/:id', verifyTokenMitra_1.verifyTokenMitra, postsController_1.default.getPostByAuthor);
// // post
router.post('/create', multer_1.default.array('images', 5), verifyTokenMitra_1.verifyTokenMitra, postsController_1.default.createPost);
//update
router.post('/update/:id', multer_1.default.array('images', 5), verifyTokenMitra_1.verifyTokenMitra, postsController_1.default.updatePost);
// // delete
router.delete('/delete/:id', verifyTokenMitra_1.verifyTokenMitra, postsController_1.default.deletePost);
exports.default = router;
