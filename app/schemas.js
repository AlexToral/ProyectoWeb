const mongoose = require('mongoose');


const UsersSchema = new mongoose.Schema({
    id: String,
    name: String,
    mail: String,
    followers: [String],
    follows: [String],
    birthDate: Date,
    contact1: String,
    contact2: String
});

const usersModel = mongoose.model("Users", UsersSchema, "Users");

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    imageUrl: String,
    author: String,
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    category: String,
    id: Number
});

const BlogModel = mongoose.model("Blog", BlogSchema, "Blog");

const CommentSchema = new mongoose.Schema({
    author: String,
    postIn: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    likes: { type: Number, default: 0 },
    content: String
  });
  
const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = {
    UsersModel: usersModel,
    UsersSchema: UsersSchema,
    BlogModel: BlogModel,
    BlogSchema: BlogSchema,
    CommentModel: CommentModel,
    CommentSchema: CommentSchema
};