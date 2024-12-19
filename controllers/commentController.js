// Import the module
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// Business Logic
exports.createComment = async(request, response) => {
    try {
        // Fetch data from request body
        const {post, user, body} = request.body;
        // Create a comment object
        const comment = new Comment({
            post, user, body
        });

        // Save the new comment into the database
        const saveComment = await comment.save();

        // Find the post by Id, Add the new comment to its array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: saveComment._id}}, {new:true})
                    .populate("comments") // Populate the comments array with comment documents
                    .exec();

        response.json({
            post: updatedPost,
        });
    }
    catch(error) {
        return response.status(500).json({
            error: "Error while creating comment",
        });
    }
}