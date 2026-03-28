import mongoose from "mongoose";

const TreeSchema = new mongoose.Schema({
  botanical_name: {
    type: String,
    required: true,
  },
  common_name: {
    type: String,
    required: true,
  },
  family_name: {
    type: String,
  },
  description: {
    type: String,
  },
  section: {
    type: String,
  },
  image_url: {
    type: String,
  },
});

export default mongoose.models.Tree || mongoose.model("Tree", TreeSchema);