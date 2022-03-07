const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CateSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  descripcion: {
    type: String,
    required: true
  },
  codigo: {
    type: Number,
    required: true
  }
 
});

module.exports = User = mongoose.model("categoria", CateSchema);
