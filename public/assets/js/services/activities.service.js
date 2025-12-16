// public/assets/js/services/activities.service.js
import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
  query, where, orderBy, limit, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "../firebase.js";
import { uploadToCloudinary, PRESET_GALLERY } from "../cloudinary.js";

export async function createActivity({ title, date="", location="", description="", coverFile=null }) {
  if (!title?.trim()) throw new Error("Judul kegiatan wajib");

  let cover = null;
  if (coverFile) cover = await uploadToCloudinary(coverFile, PRESET_GALLERY, "karteji/activities");

  return await addDoc(collection(db, "activities"), {
    title: title.trim(),
    date, location, description,
    cover,
    status: "pending",
    createdByUid: auth.currentUser?.uid || null,
    createdAt: serverTimestamp()
  });
}

export async function listActivities({ status=null, max=50 } = {}) {
  let qRef = query(collection(db, "activities"), orderBy("createdAt","desc"), limit(max));
  if (status) {
    qRef = query(collection(db, "activities"), where("status","==",status), orderBy("createdAt","desc"), limit(max));
  }
  const snap = await getDocs(qRef);
  const out = [];
  snap.forEach(d => out.push({ id: d.id, ...d.data() }));
  return out;
}

export async function setActivityStatus(id, status) {
  if (!id) throw new Error("id wajib");
  if (!["pending","approved","rejected"].includes(status)) throw new Error("status tidak valid");
  await updateDoc(doc(db, "activities", id), { status });
}

export async function deleteActivity(id) {
  if (!id) throw new Error("id wajib");
  await deleteDoc(doc(db, "activities", id));
}
