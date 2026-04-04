import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  pickupPoint: { type: String, required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
