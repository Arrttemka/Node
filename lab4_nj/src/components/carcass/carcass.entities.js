import crypto from 'crypto';
import mongoose from 'mongoose';

/*class Carcass {
  constructor(name) {
    this.name = name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}*/

const CarcassSchema = new mongoose.Schema({
  id: Number,
  name: String
});

CarcassSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret._id;
    delete ret.__v;
    return ret;
}
};

const Carcass = mongoose.model('Carcass', CarcassSchema);


export default Carcass;