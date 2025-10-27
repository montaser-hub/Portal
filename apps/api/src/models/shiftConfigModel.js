
import mongoose from 'mongoose'
const shiftConfigSchema = new mongoose.Schema({
  shiftId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shift', required: true },
  positionConfig: [{
    positionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
    allowed: { type: Boolean, default: true }
  }]
}, { timestamps: true });


export default mongoose.model('ShiftConfig', shiftConfigSchema);
