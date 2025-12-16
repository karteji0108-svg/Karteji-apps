// public/assets/js/services/notify.service.js
import {
  collection, addDoc, getDocs, doc, deleteDoc,
  query, orderBy, limit, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "../firebase.js";

/**
 * notifications schema:
 * { title, body, level: "normal"|"important", createdAt, createdByUid }
 */

export async function createNotification({ title, body, level="normal" }) {
  if (!title?.trim()) throw new Error("Judul pengumuman wajib");
  if (!body?.trim()) throw new Error("Isi pengumuman wajib");
  if (!["normal","important"].includes(level)) level = "normal";

  return await addDoc(collection(db, "notifications"), {
    title: title.trim(),
    body: body.trim(),
    level,
    createdByUid: auth.currentUser?.uid || null,
    createdAt: serverTimestamp()
  });
}

export async function listNotifications(max=30) {
  const qRef = query(collection(db, "notifications"), orderBy("createdAt","desc"), limit(max));
  const snap = await getDocs(qRef);
  const out = [];
  snap.forEach(d => out.push({ id: d.id, ...d.data() }));
  return out;
}

export async function deleteNotification(id) {
  if (!id) throw new Error("id wajib");
  await deleteDoc(doc(db, "notifications", id));
}
