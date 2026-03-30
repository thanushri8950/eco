import mongoose from "mongoose";

const TreeSchema = new mongoose.Schema({
  botanical_name: String,
  common_name: String,
  family_name: String,
  description: String,
  section: String,
  image_url: String,
});

export default mongoose.models.Tree || mongoose.model("Tree", TreeSchema);