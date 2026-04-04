import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  pickupPoint: { type: String, required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
