import mongoose from 'mongoose';
const subDepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    subManagerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
subDepartmentSchema.set('toObject', { virtuals: true });
subDepartmentSchema.set('toJSON', { virtuals: true });
subDepartmentSchema.virtual('department', {
  ref: 'Department',
  localField: 'departmentId',
  foreignField: '_id',
  justOne: true
});
const SubDepartment = mongoose.model('SubDepartment', subDepartmentSchema);
export default SubDepartment;