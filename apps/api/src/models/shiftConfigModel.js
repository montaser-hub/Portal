
import mongoose from 'mongoose'
const shiftConfigSchema = new mongoose.Schema({
  shiftId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shift', required: true },
  positionConfig: [{
    positionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
    allowed: { type: Boolean, default: true }
  }]
}, { timestamps: true });
shiftConfigSchema.set('toObject', { virtuals: true });
shiftConfigSchema.set('toJSON', { virtuals: true });
shiftConfigSchema.virtual('shift', {
  ref: 'Shift',
  localField: 'shiftId',  
  foreignField: '_id',
  justOne: true
});
shiftConfigSchema.virtual('positions', {
  ref: 'Position',
  localField: 'positionConfig.positionId',
  foreignField: '_id',
  justOne:false
});



export default mongoose.model('ShiftConfig', shiftConfigSchema);
