"use client";

import { useState } from "react";

export default function Admin() {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

 const uploadImage = async () => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "qzjsajop");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dzmgrxdyn/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
};

  const handleSubmit = async () => {
    let image_url = "";

    if (file) {
      image_url = await uploadImage();
    }

    await fetch("/api/trees", {
      method: "POST",
      body: JSON.stringify({ ...form, image_url }),
    });

    alert("Tree added!");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Add Tree</h1>

      <input placeholder="Botanical Name"
        onChange={e => setForm({ ...form, botanical_name: e.target.value })} />

      <br />

      <input placeholder="Common Name"
        onChange={e => setForm({ ...form, common_name: e.target.value })} />

      <br />

      <input placeholder="Family Name"
        onChange={e => setForm({ ...form, family_name: e.target.value })} />

      <br />

      <input placeholder="Section"
        onChange={e => setForm({ ...form, section: e.target.value })} />

      <br />

      <textarea placeholder="Description"
        onChange={e => setForm({ ...form, description: e.target.value })} />

      <br />

      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <br /><br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}