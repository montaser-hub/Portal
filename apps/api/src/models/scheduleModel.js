
import mongoose from 'mongoose';
const scheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  swapRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SwapRequest'
  },
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift'
  },
  subDepartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubDepartment'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Schedule', scheduleSchema);
