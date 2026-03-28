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

  // 🔥 Upload image to Cloudinary
  const uploadImage = async () => {
    if (!file) {
      alert("Please upload an image");
      return "";
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qzjsajop"); // replace

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzmgrxdyn/image/upload", // replace
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  // 🔥 Handle submit
  const handleSubmit = async () => {
    // ✅ Validation
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

      // upload image
      const image_url = await uploadImage();

      // send to backend
      await fetch("/api/trees", {
        method: "POST",
        body: JSON.stringify({ ...form, image_url }),
      });

      // reset form
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
    <div style={{ padding: "30px", color: "#fff" }}>
      <h1>Add Tree 🌳</h1>

      {/* Botanical */}
      <input
        placeholder="Botanical Name"
        value={form.botanical_name}
        onChange={(e) =>
          setForm({ ...form, botanical_name: e.target.value })
        }
      />

      <br /><br />

      {/* Common */}
      <input
        placeholder="Common Name"
        value={form.common_name}
        onChange={(e) =>
          setForm({ ...form, common_name: e.target.value })
        }
      />

      <br /><br />

      {/* Family */}
      <input
        placeholder="Family Name"
        value={form.family_name}
        onChange={(e) =>
          setForm({ ...form, family_name: e.target.value })
        }
      />

      <br /><br />

      {/* Section Dropdown */}
      <select
        value={form.section}
        onChange={(e) =>
          setForm({ ...form, section: e.target.value })
        }
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
      />

      <br /><br />

      {/* Image */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      {/* Submit */}
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