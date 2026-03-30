"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [trees, setTrees] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/trees")
      .then((res) => res.json())
      .then((data) => setTrees(data));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        padding: "30px",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Tree Collection 🌳
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {trees.map((tree) => (
          <div
            key={tree._id}
            onClick={() => router.push(`/tree/${tree._id}`)}
            style={{
              background: "#1c1c1c",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            {/* IMAGE */}
            <div style={{ overflow: "hidden" }}>
              <img
                src={tree.image_url}
                alt={tree.common_name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  transition: "0.3s",
                }}
              />
            </div>

            {/* TEXT */}
            <div style={{ padding: "14px" }}>
              <h3 style={{ margin: "0", fontSize: "16px" }}>
                {tree.common_name}
              </h3>

              <p
                style={{
                  margin: "4px 0 0",
                  color: "#aaa",
                  fontSize: "13px",
                  fontStyle: "italic",
                }}
              >
                {tree.botanical_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}