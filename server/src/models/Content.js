import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  title: String,
  brief: String,
  platforms: [String],
  status: { type: String, enum: ['draft', 'review', 'approved', 'scheduled', 'published'], default: 'draft' },
  scheduledFor: Date,
  outputs: mongoose.Schema.Types.Mixed,
  agentTrace: [mongoose.Schema.Types.Mixed]
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);
