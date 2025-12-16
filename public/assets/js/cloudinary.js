export const CLOUD_NAME = "dbxktcwug";

export const PRESET_PROFILE = "Karteji";
export const PRESET_GALLERY = "Karteji Galeri";
export const PRESET_FINANCE = "Karteji Finance";

export async function uploadToCloudinary(file, preset, folder="karteji") {
  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", preset);
  form.append("folder", folder);

  const res = await fetch(endpoint, { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Upload Cloudinary gagal");

  return {
    url: data.secure_url,
    publicId: data.public_id,
    bytes: data.bytes,
    format: data.format,
    createdAt: data.created_at
  };
}
