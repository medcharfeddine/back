import mongoose from 'mongoose';

const TechnicianSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // stored as plain text
});

export default mongoose.model('Technician', TechnicianSchema);
