"use client";

import { upload } from "@vercel/blob/client";
import QRCode from "qrcode";
import { ChangeEvent, useEffect, useState } from "react";

const MAX_EDGE = 2000;

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

async function toWebp(source: File) {
  const bitmap = await createImageBitmap(source, { imageOrientation: "from-image" });
  const ratio = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * ratio));
  const height = Math.max(1, Math.round(bitmap.height * ratio));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("이미지를 처리할 수 없습니다.");
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.86));
  if (!blob) throw new Error("이미지를 변환할 수 없습니다.");
  return blob;
}

export default function UploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function select(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    if (preview) URL.revokeObjectURL(preview);
    setFile(next);
    setPreview(next ? URL.createObjectURL(next) : "");
    setError("");
  }

  async function submit() {
    if (!file) return;
    setBusy(true);
    setError("");

    try {
      const token = randomToken();
      const pathname = `photos/${token}.webp`;
      const optimized = await toWebp(file);
      await upload(pathname, optimized, {
        access: "private",
        handleUploadUrl: "/api/upload",
        contentType: "image/webp",
      });

      const url = `${window.location.origin}/p/${token}`;
      setPhotoUrl(url);
      setQrUrl(await QRCode.toDataURL(url, { width: 720, margin: 2, errorCorrectionLevel: "M" }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "업로드에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview("");
    setPhotoUrl("");
    setQrUrl("");
    setError("");
  }

  if (photoUrl) {
    return (
      <div className="stack center">
        <strong>QR코드를 손님에게 보여주세요</strong>
        {/* QR data URL is generated locally and is never stored. */}
        <img className="qr" src={qrUrl} alt="사진을 여는 QR코드" />
        <a className="link" href={photoUrl} target="_blank" rel="noreferrer">사진 페이지 확인</a>
        <button type="button" onClick={reset}>다음 사진</button>
      </div>
    );
  }

  return (
    <div className="stack">
      <label className="upload-drop">
        <input type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={select} />
        <span><strong>{file ? file.name : "사진 선택 또는 촬영"}</strong><span>JPG, PNG, WebP</span></span>
      </label>
      {preview && <img className="preview" src={preview} alt="업로드할 사진 미리보기" />}
      {error && <div className="error" role="alert">{error}</div>}
      <button type="button" disabled={!file || busy} onClick={submit}>
        {busy ? "사진 처리 및 업로드 중…" : "업로드하고 QR 만들기"}
      </button>
      <p className="hint">사진은 최대 2,000px WebP로 변환되어 비공개 저장소에 저장됩니다.</p>
    </div>
  );
}
