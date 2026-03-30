import { connectDB } from "@/lib/mongodb";
import Tree from "@/models/Tree";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const tree = await Tree.findById(id);
    return Response.json(tree);
  }

  const trees = await Tree.find();
  return Response.json(trees);
}

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