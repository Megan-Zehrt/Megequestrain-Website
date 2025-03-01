const { ObjectId, Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({

    MainImage: {
        type: String,
        required: [true, "Please select a post Image"]
    },
    Introduction: {
        type: String,
        required: [true, "Please add an 'about this blog' paragraph/sentence"]
    },
    title: {
        type: String,
        required: [true, "Please give your post a title"]
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    sectionOneContent: {
        type: String,
        required: [true, "Please add some content to your post"]
    },
    sectionOneImage: {
        type: String
    },
    sectionTwoContent: {
        type: String,
        required: [true, "Please add some content to your post"]
    },
    sectionTwoImage: {
        type: String
    },
    sectionThreeContent: {
        type: String,
        required: [true, "Please add some content to your post"]
    },
    sectionThreeImage: {
        type: String
    },
    sectionFourContent: {
        type: String,
        required: [true, "Please add some content to your post"]
    },
    sectionFourImage: {
        type: String
    },
    sectionFiveContent: {
        type: String,
        required: [true, "Please add some content to your post"]
    },
    sectionFiveImage: {
        type: String
    }
}, { timestamps: true});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;