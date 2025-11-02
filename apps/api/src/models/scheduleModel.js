
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
scheduleSchema.set('toObject', { virtuals: true });
scheduleSchema.set('toJSON', { virtuals: true });
  scheduleSchema.virtual('department', {
    ref: 'Department',
    localField: 'departmentId',
    foreignField: '_id',
    justOne: true 
  });
  scheduleSchema.virtual('subDepartment', {
    ref: 'SubDepartment',
    localField: 'subDepartmentId',
    foreignField: '_id',
    justOne: true 
  });
  scheduleSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
  });
  scheduleSchema.virtual('shift', {
    ref: 'Shift',
    localField: 'shiftId',
    foreignField: '_id',
    justOne: true
  });

export default mongoose.model('Schedule', scheduleSchema);
