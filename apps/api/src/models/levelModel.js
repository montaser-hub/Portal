import mongoose from 'mongoose';
const levelSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  positionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true }
}, { timestamps: true });
levelSchema.set('toObject', { virtuals: true });
levelSchema.set('toJSON', { virtuals: true });
levelSchema.virtual('Position', {
  ref: 'Position',
  localField: 'positionId',
  foreignField: '_id',
  justOne: true
});


export default mongoose.model('Level', levelSchema);
