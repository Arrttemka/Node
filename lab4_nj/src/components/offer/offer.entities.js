import mongoose from 'mongoose';



  const OfferSchema = new mongoose.Schema({
    id: Number,
    title: String,
    summary: String,
    WIN: {
      type: Number,
      min: 0 //валидаторы встроенные
    },
    cost: {
      type: Number,
      min: [0, 'Price cannot be negative']
    },
    owner_id: Number,
    carcass_id: Number,
    imgUrl: String
  });

  OfferSchema.options.toJSON = {
    transform: function(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
      return ret;
  }
  };
  
  const Offer = mongoose.model('Offer', OfferSchema);

  export default Offer;