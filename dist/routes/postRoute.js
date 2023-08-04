"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsController_1 = __importDefault(require("../controllers/postsController"));
const multer_1 = __importDefault(require("../utils/multer"));
const verifyToken_1 = require("../utils/verifyToken");
const router = express_1.default.Router();
// search filter
router.get('/search', postsController_1.default.searchQuery);
// get
router.get('/allPosts', postsController_1.default.getAllPosts);
router.get('/post/:id', postsController_1.default.getPostById);
router.get('/postAuthor/:id', verifyToken_1.verifyToken, postsController_1.default.getPostByAuthor);
// post
router.post('/create', multer_1.default.array('images', 5), verifyToken_1.verifyToken, postsController_1.default.createPost);
// update
router.post('/update/:id', multer_1.default.array('images', 5), postsController_1.default.updatePost);
// delete
router.delete('/delete/:id', verifyToken_1.verifyToken, postsController_1.default.deletePost);
exports.default = router;
