import mongoose from 'mongoose';

const stopSchema = new mongoose.Schema({
  stopName: { type: String, required: true },
  order: { type: Number, required: true }
}, { _id: false });

const timingSchema = new mongoose.Schema({
  departureTime: { type: String, required: true },
  shift: { type: String }
}, { _id: false });

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stops: [stopSchema],
  timings: [timingSchema]
}, { timestamps: true });

export default mongoose.model('Route', routeSchema);
