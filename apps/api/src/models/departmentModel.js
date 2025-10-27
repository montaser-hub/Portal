import mongoose from 'mongoose';
const departmentSchema = new mongoose.Schema({
  name: { 
    type: String, required: true 
  },
  managerId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User' },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }
}, { timestamps: true });
export default mongoose.model('Department', departmentSchema);
