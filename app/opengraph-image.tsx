import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Jan Brinkmann - Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const avatar = await readFile(join(process.cwd(), "public", "avatar.jpg"));
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 72,
          padding: "0 96px",
          background: "#f6f5f2",
          color: "#1a1a1a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          width={300}
          height={300}
          alt=""
          style={{ borderRadius: 9999, border: "10px solid #e4e2dc", filter: "grayscale(100%)" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Jan Brinkmann</div>
          <div style={{ fontSize: 40, color: "#55524c" }}>Product Designer · Design Lead</div>
          <div style={{ fontSize: 28, color: "#7a766e", marginTop: 12 }}>jan-brinkmann.com</div>
        </div>
      </div>
    ),
    size,
  );
}
