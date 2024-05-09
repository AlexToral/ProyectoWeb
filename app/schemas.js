const mongoose = require('mongoose');


const UsersSchema = new mongoose.Schema({
    name: String, // Valor predeterminado para el nombre
    mail: String, // Valor predeterminado para el correo electrónico
    password: String, // Valor predeterminado para la contraseña
    imageUrl: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/1/1247.png' }, // Valor predeterminado para la URL de la imagen
    followers: { type: [String], default: [] }, // Valor predeterminado para los seguidores (una matriz vacía)
    follows: { type: [String], default: [] }, // Valor predeterminado para los seguidos (una matriz vacía)
    birthDate: { type: Date, default: Date.now }, // Valor predeterminado para la fecha de nacimiento (fecha actual)
    contact1: { type: String, default: 'xx-xxx-xxx-xx' }, // Valor predeterminado para el primer contacto
    contact2: { type: String, default: 'xx-xxx-xxx-xx' } // Valor predeterminado para el segundo contacto
});



const usersModel = mongoose.model("Users", UsersSchema, "Users");

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    imageUrl: Buffer,
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