import { connectDB } from "@/lib/mongodb";
import Tree from "@/models/Tree";

// ✅ GET: fetch all trees OR single tree by ID
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // 👉 If ID is provided → return one tree
    if (id) {
      const tree = await Tree.findById(id);

      if (!tree) {
        return Response.json({ error: "Tree not found" });
      }

      return Response.json(tree);
    }

    // 👉 Otherwise → return all trees
    const trees = await Tree.find();
    return Response.json(trees);

  } catch (error) {
    return Response.json({ error: error.message });
  }
}

// ✅ POST: add new tree
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const tree = await Tree.create(body);

    return Response.json(tree);

  } catch (error) {
    return Response.json({ error: error.message });
  }
}