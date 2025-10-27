import mongoose from 'mongoose';
const levelSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  positionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true }
}, { timestamps: true });

export default mongoose.model('Level', levelSchema);
