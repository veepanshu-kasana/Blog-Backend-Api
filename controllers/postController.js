const Post = require("../models/postModel");

exports.createPost = async(request,response) => {
    try {
        const {title, body} = request.body;
        const post = new Post({
            title, body,
        });
        const savedPost = await post.save();

        response.json({
            post: savedPost,
        });
    }
    catch(error) {
        return response.status(400).json({
            error: "Error while creating Post",
        });
    }
};

exports.getAllPosts = async(request,response) => {
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        response.json({
            posts,
        })
    }
    catch(error) {
        return response.status(400).json({
            error: "Error while fetching posts",
        });
    }
}