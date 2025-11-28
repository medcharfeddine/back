import mongoose from 'mongoose';

const RepairSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  note: String,
  tech: String
});

const MachineSchema = new mongoose.Schema({
  sn: { type: String, required: true },
  client: { type: String, required: true },
  phone: String,
  type: String,
  brand: String,
  technician: { type: String, required: true },
  entry: { type: Date, default: Date.now },
  exit: Date,
  status: { type: String, default: "In" },
  repairs: [RepairSchema]
});

export default mongoose.model('Machine', MachineSchema);
