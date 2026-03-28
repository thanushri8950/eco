"use client";

import { useEffect, useState } from "react";

export default function QRCodesPage() {
  const [trees, setTrees] = useState<any[]>([]);
  const [qrs, setQrs] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/trees");
      const data = await res.json();

      setTrees(data);

      const qrMap: any = {};

      for (let tree of data) {
        const qrRes = await fetch(`/api/qrcode?id=${tree._id}`);
        const qrData = await qrRes.json();
        qrMap[tree._id] = qrData.qr;
      }

      setQrs(qrMap);
    };

    fetchData();
  }, []);

  const downloadQR = (qr: string, name: string) => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = `${name}.png`;
    link.click();
  };

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h1>QR Codes</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {trees.map((tree) => (
          <div
            key={tree._id}
            style={{
              background: "#111",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>{tree.common_name}</h3>

            {qrs[tree._id] && (
              <img
                src={qrs[tree._id]}
                style={{ width: "150px", margin: "10px 0" }}
              />
            )}

            <button
              onClick={() =>
                downloadQR(qrs[tree._id], tree.common_name)
              }
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}