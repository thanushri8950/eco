"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Home() {
  const [trees, setTrees] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/trees")
      .then((res) => res.json())
      .then((data) => setTrees(data));
  }, []);

  return (
    <div style={{ padding: "20px", background: "#000", minHeight: "100vh" }}>
      <h1 style={{ color: "#fff" }}>🌿 Campus Trees</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {trees.map((tree: any) => (
          <div
  key={tree._id}
  onClick={() => router.push(`/tree/${tree._id}`)}
  style={{
    borderRadius: "12px",
    overflow: "hidden",
    background: "#ffffff",
    color: "#000",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    cursor: "pointer",
  }}
>
            {/* IMAGE */}
            <img
              src={tree.image_url}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
              }}
            />

            {/* TEXT CONTENT */}
            <div style={{ padding: "12px" }}>
              <h3 style={{ margin: "5px 0" }}>
                {tree.common_name}
              </h3>

              <p
                style={{
                  fontStyle: "italic",
                  color: "#555",
                  margin: "0 0 8px 0",
                }}
              >
                {tree.botanical_name}
              </p>

              <p style={{ fontSize: "12px", color: "#666" }}>
    {tree.description}
  </p>

  <p style={{ fontSize: "12px" }}>
    Family: {tree.family_name}
  </p>

              <span
                style={{
                  background: "#d4edda",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  display: "inline-block",
                }}
              >
                {tree.section}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}