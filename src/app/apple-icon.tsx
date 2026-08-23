import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = { height: 180, width: 180 };

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0a0a0a",
        color: "#fafafa",
        display: "flex",
        fontSize: 112,
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-0.08em",
        width: "100%",
      }}
    >
      N
    </div>,
    size
  );
}
