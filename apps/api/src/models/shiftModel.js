
import mongoose from 'mongoose';

const shiftSchema = new mongoose.Schema({
  shiftName: { type: String, required: true  },
  shiftType: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
 
}, { timestamps: true }
);
shiftSchema.index({ shiftType: 1, shiftName: 1 }, { unique: true });
export default mongoose.model('Shift', shiftSchema);
