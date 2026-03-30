"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TreePage() {
  const { id } = useParams();
  const [tree, setTree] = useState(null);

  useEffect(() => {
    fetch(`/api/trees?id=${id}`)
      .then((res) => res.json())
      .then((data) => setTree(data));
  }, [id]);

  if (!tree) return <div>Loading...</div>;

  return (
    <div style={{ padding: "30px", background: "#111", color: "#fff" }}>
      <img src={tree.image_url} style={{ width: "300px" }} />

      <h1>{tree.common_name}</h1>
      <h2>{tree.botanical_name}</h2>

      <p><b>Family:</b> {tree.family_name}</p>
      <p><b>Section:</b> {tree.section}</p>

      <p>{tree.description}</p>
    </div>
  );
}