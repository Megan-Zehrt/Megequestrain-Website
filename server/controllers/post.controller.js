const Post = require('../models/post.model');

module.exports.findAllPosts = (req, res) => {
    Post.find()
        .populate("user_id")
        .then((allDaPosts) => {
            res.json({ posts: allDaPosts })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.findAllPostsByUser = (req, res) => {
    Post.find({ user_id: req.params.userid })
        .populate("user_id")
        .then((allDaPosts) => {
            res.json({ posts: allDaPosts })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.findAllPostsByCategory = (req, res) => {
    Post.find({ category: req.params.category })
        .then((allDaPostsCategory) => {
            res.json({ posts: allDaPostsCategory })
        })
        .catch((err) => {
            res.statue(400).json(err)
        });
}

module.exports.findOneSinglePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(oneSinglePost => {
            res.json({ post: oneSinglePost })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.createNewPost = (req, res) => {
    console.log("***", req.body)
    Post.create(req.body)
        .then(newlyCreatedPost => {
            res.json({ post: newlyCreatedPost })
        })
        .catch((err) => {
            res.status(400).json(err)
        });
}

module.exports.updateExistingPost = (req, res) => {
    Post.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedPost => {
            res.json({ post: updatedPost })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.deleteAnExistingPost = (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.findByIdAndUpdateLike = (req, res) => {
    Post.FindAndUpdateLike(req.body, {
        $push: { likes: req.user._id }
    },
        {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(400).json(err)
            } else {
                res.json(result)
            }
        })
}

module.exports.findByIdAndUpdateUnLike = (req, res) => {
    Post.FindAndUpdateUnLike(req.body, {
        $pull: { likes: req.user._id }
    },
        {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(400).json(err)
            } else {
                res.json(result)
            }
        })
}

module.exports.createpostbyuser = async (req, res) => {
    try {

        const post = new Post(req.body);
        await post.save();
        const user = await User.findById({ _id: post.user })
        user.publishedPosts.push(post);
        await user.save();

        res.status(200).json({ success: true, data: post })

    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}

module.exports.likeThePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId)

        if (!post) {
            return res.status(404).json({message: 'Post unavailable'})
        }

        post.likes += 1

        await post.save()

        return res.status(200).json(post)
    } catch (error){
        console.log("❌❌➕➕❌❌", error)
        return res.status(500).json({message: 'Server error'})
    }
}