import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Miam Certificate Quest - Free MIAM Certificate Preparation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(135deg, #be123c 0%, #f43f5e 50%, #fb7185 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "white",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
              fontSize: "48px",
              fontWeight: "bold",
              color: "#be123c",
            }}
          >
            M
          </div>
          <span style={{ fontSize: "56px", fontWeight: "bold" }}>
            Miam Certificate Quest
          </span>
        </div>
        <div
          style={{
            fontSize: "32px",
            opacity: 0.9,
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Free AI-Powered MIAM Certificate Preparation for UK Family Disputes
        </div>
        <div
          style={{
            fontSize: "24px",
            marginTop: "30px",
            padding: "12px 24px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "8px",
          }}
        >
          miam.quest
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
