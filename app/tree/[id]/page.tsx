export default async function TreePage({ params }: any) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3000/api/trees?id=${id}`,
    { cache: "no-store" }
  );

  const tree = await res.json();

  if (!tree) return <div style={{ padding: "20px" }}>Tree not found</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", color: "#fff" }}>
      <img
        src={tree.image_url}
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "12px",
        }}
      />

      <h1 style={{ color: "lightgreen" }}>{tree.botanical_name}</h1>
      <h2>{tree.common_name}</h2>

      <p><b>Family:</b> {tree.family_name}</p>
      <p><b>Section:</b> {tree.section}</p>

      <p style={{ marginTop: "10px" }}>
        {tree.description}
      </p>
    </div>
  );
}