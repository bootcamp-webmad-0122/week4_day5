const { Schema, model } = require('mongoose')

const bookSchema = new Schema(
  {
    title: String,
    description: String,
    rating: Number,
    author: [{
      type: Schema.Types.ObjectId,        // Tipo de dato, siempre Schema.Types.ObjectId
      ref: 'Author'                       // Nombre del modelo relacionado (NOMBRE)
    }]
  },
  {
    timestamps: true
  }
);

module.exports = model('Book', bookSchema)