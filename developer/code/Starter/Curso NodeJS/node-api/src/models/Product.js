const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProductScheme = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description:{
    type: String,
    required: true
  },
  url:{
    type: String,
    required: true
  },
  createAt:{
    type: Date,
    default: Date.now
  }
});

ProductScheme.plugin(mongoosePaginate);

mongoose.model('Product', ProductScheme);