// Import the models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// Like a post
exports.likePost = async (request, response) => {
    try {
        const {post, user} = request.body;
        const like = new Like({
            post, user,
        });
        const savedLike = await like.save();

        // Update the post collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true})
        .populate("likes").exec();

        response.json({
            post: updatedPost,
        });
    }
    catch(error) {
        return response.status(400).json({
            error: "Error while Liking post",
        });
    }
}

// Unlike a Post
exports.unlikePost = async (request,response) => {
    try {
        const {post,like} = request.body;

        // Find and delete from the like collection
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});
        // Update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {new: true});

        response.json({
            post:updatedPost,
        });
    }
    catch(error) {
        return response.status(400).json({
            error: "Error while unLiking post",
        });
    }
}

exports.dummyLink = (request, response) => {
    response.send("This is your Dummy Page");
}