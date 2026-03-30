"use client";

import { useState } from "react";

export default function Admin() {
  const [form, setForm] = useState({
    botanical_name: "",
    common_name: "",
    family_name: "",
    description: "",
    section: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!file) return "";

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "qzjsajop");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzmgrxdyn/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const image_url = await uploadImage();

      await fetch("/api/trees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          image_url,
        }),
      });

      alert("Tree added ✅");

      setForm({
        botanical_name: "",
        common_name: "",
        family_name: "",
        description: "",
        section: "",
      });

      setFile(null);
    } catch (err) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#1c1c1c",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ color: "#9FE870", marginBottom: "20px" }}>
          Add Tree 🌳
        </h2>

        <form onSubmit={handleSubmit}>
          {[
            ["Botanical Name", "botanical_name"],
            ["Common Name", "common_name"],
            ["Family Name", "family_name"],
          ].map(([label, key]) => (
            <input
              key={key}
              placeholder={label}
              value={form[key]}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
              style={inputStyle}
            />
          ))}

          <input
            placeholder="Section"
            value={form.section}
            onChange={(e) =>
              setForm({ ...form, section: e.target.value })
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            style={{ ...inputStyle, height: "80px" }}
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ color: "#ccc", marginBottom: "15px" }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#a6c48a",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Uploading..." : "Save Tree"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#2a2a2a",
  color: "#fff",
};