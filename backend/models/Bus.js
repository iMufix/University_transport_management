import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' }
}, { timestamps: true });

export default mongoose.model('Bus', busSchema);
