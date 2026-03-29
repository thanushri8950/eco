"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TreePage() {
  const params = useParams(); // ✅ correct way
  const id = params?.id;

  const [tree, setTree] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/trees?id=${id}`)
      .then((res) => res.json())
      .then((data) => setTree(data));
  }, [id]);

  if (!tree) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div style={{ padding: "30px", color: "#fff" }}>
      <img
        src={tree.image_url}
        style={{ width: "300px", borderRadius: "10px" }}
      />

      <h1>{tree.common_name}</h1>
      <h2 style={{ fontStyle: "italic" }}>{tree.botanical_name}</h2>
      <h3>{tree.family_name}</h3>
      <p>{tree.description}</p>
    </div>
  );
}