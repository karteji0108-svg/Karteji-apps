// public/assets/js/services/archive.service.js
import {
  collection, addDoc, getDocs, doc, deleteDoc,
  query, orderBy, limit, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "../firebase.js";
import { uploadToCloudinary, PRESET_GALLERY } from "../cloudinary.js";

// Arsip pakai preset "Karteji Galeri" (kamu belum punya preset khusus arsip)
export async function uploadArchive({ title, tag="", file }) {
  if (!title?.trim()) throw new Error("Judul arsip wajib");
  if (!file) throw new Error("File wajib");

  const media = await uploadToCloudinary(file, PRESET_GALLERY, "karteji/archives");

  return await addDoc(collection(db, "archives"), {
    title: title.trim(),
    tag,
    file: media,
    createdByUid: auth.currentUser?.uid || null,
    createdAt: serverTimestamp()
  });
}

export async function listArchives(max=100) {
  const qRef = query(collection(db, "archives"), orderBy("createdAt","desc"), limit(max));
  const snap = await getDocs(qRef);
  const out = [];
  snap.forEach(d => out.push({ id: d.id, ...d.data() }));
  return out;
}

export async function deleteArchive(id) {
  if (!id) throw new Error("id wajib");
  await deleteDoc(doc(db, "archives", id));
}
