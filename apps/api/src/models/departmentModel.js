import mongoose from 'mongoose';
import SubDepartment from './subdepartModel.js';
const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    locationId: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Location' },
  },
  { timestamps: true }
);
departmentSchema.set('toObject', { virtuals: true });
departmentSchema.set('toJSON', { virtuals: true });
departmentSchema.pre('findOneAndDelete', async function (next) {
  const department = await this.model.findOne(this.getFilter());
  if (department) {
    await SubDepartment.deleteMany({ departmentId: department._id });
  }
  next();
});
departmentSchema.virtual('manager', {
  ref: 'User',
  localField: 'managerId',
  foreignField: '_id',
  justOne: true,
});
departmentSchema.virtual('location', {  
  ref: 'Location',
  localField: 'locationId',
  foreignField: '_id',
  justOne: true,
});
const Department = mongoose.model('Department', departmentSchema);
export default Department;
