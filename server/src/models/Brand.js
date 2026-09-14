import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  description: String,
  industry: String,
  audience: String,
  voice: String,
  pillars: [String],
  platforms: [String]
}, { timestamps: true });

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema);
