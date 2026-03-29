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

  // 🔥 Upload to Cloudinary
  const uploadImage = async () => {
    if (!file) {
      alert("Please upload an image");
      return "";
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "YOUR_UPLOAD_PRESET"); // 🔁 replace
    data.append("cloud_name", "YOUR_CLOUD_NAME"); // 🔁 replace

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", // 🔁 replace
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  };

  // 🔥 Submit handler
  const handleSubmit = async () => {
    if (
      !form.botanical_name ||
      !form.common_name ||
      !form.family_name ||
      !form.description ||
      !form.section ||
      !file
    ) {
      alert("Please fill all fields + upload image");
      return;
    }

    try {
      setLoading(true);

      const image_url = await uploadImage();

      await fetch("/api/trees", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          image_url,
        }),
      });

      // ✅ reset form
      setForm({
        botanical_name: "",
        common_name: "",
        family_name: "",
        description: "",
        section: "",
      });
      setFile(null);

      alert("Tree added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding tree");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#111", // ✅ fix for white screen issue
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1>Add Tree 🌳</h1>

      {/* Botanical Name */}
      <input
        placeholder="Botanical Name"
        value={form.botanical_name}
        onChange={(e) =>
          setForm({ ...form, botanical_name: e.target.value })
        }
        style={{ padding: "8px", width: "300px" }}
      />

      <br /><br />

      {/* Common Name */}
      <input
        placeholder="Common Name"
        value={form.common_name}
        onChange={(e) =>
          setForm({ ...form, common_name: e.target.value })
        }
        style={{ padding: "8px", width: "300px" }}
      />

      <br /><br />

      {/* Family Name */}
      <input
        placeholder="Family Name"
        value={form.family_name}
        onChange={(e) =>
          setForm({ ...form, family_name: e.target.value })
        }
        style={{ padding: "8px", width: "300px" }}
      />

      <br /><br />

      {/* Section */}
      <select
        value={form.section}
        onChange={(e) =>
          setForm({ ...form, section: e.target.value })
        }
        style={{ padding: "8px", width: "320px" }}
      >
        <option value="">Select Section</option>
        <option>Botanical Garden</option>
        <option>Butterfly Garden</option>
        <option>Vegetable Garden</option>
        <option>Near Chapel</option>
      </select>

      <br /><br />

      {/* Description */}
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        style={{ padding: "8px", width: "300px", height: "100px" }}
      />

      <br /><br />

      {/* File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? "Adding..." : "Submit"}
      </button>
    </div>
  );
}