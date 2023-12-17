import mongoose from 'mongoose';

const OwnerSchema = new mongoose.Schema({
  id: Number,
  name: String
});

OwnerSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret._id;
    delete ret.__v;
    return ret;
}
};

const Owner = mongoose.model('Owner', OwnerSchema);

export default Owner;