
import mongoose from 'mongoose';
const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  postalCode: { type: String },
  address:[{
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
      postalCode: { type: String }
  }]
}, { timestamps: true });

export default mongoose.model('Location', locationSchema);
