import mongoose from 'mongoose';
const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  street: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  postalCode: {
    type: String
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

locationSchema.virtual('Address').get(function () {
  return `${this.street}, ${this.city}, ${this.state}, ${this.country}, ${this.postalCode}`
});

locationSchema.index({ state: 1, street: 1 }, { unique: true });

const Location = mongoose.model('Location', locationSchema);

export default Location
