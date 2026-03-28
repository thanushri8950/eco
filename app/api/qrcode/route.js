import QRCode from "qrcode";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const url = `http://172.20.10.4:3000/tree/${id}`;

  try {
    const qr = await QRCode.toDataURL(url);
    return Response.json({ qr });
  } catch (err) {
    return Response.json({ error: err.message });
  }
}