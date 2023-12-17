import mongoose from 'mongoose';

/*class Offer {
    constructor(title, summary, WIN, owner_id, carcass_id) {
      //this.id = crypto.randomUUID();
      this.title = title;
      this.summary = summary;
      this.WIN = WIN;
      this.owner_id = owner_id;
      this.carcass_id = carcass_id;
    }
  
    toJSON() {
      return {
        id: this.id,
        title: this.title,
        WIN: this.WIN,
        owner_id: this.owner_id,
        carcass_id: this.carcass_id
      };
    }
  }*/

  const OfferSchema = new mongoose.Schema({
    id: Number,
    title: String,
    summary: String,
    WIN: {
      type: Number,
      min: 0
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