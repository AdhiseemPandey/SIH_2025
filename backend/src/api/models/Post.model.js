const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String }, // URL to the image
    status: { type: String, enum: ['Pending', 'Processing', 'Completed', 'Rejected'], default: 'Pending' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    managedBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to an admin
    upvotes: { type: Number, default: 0 }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;