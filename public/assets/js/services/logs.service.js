// public/assets/js/services/logs.service.js
import {
  collection, addDoc, getDocs,
  query, orderBy, limit, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "../firebase.js";

/**
 * logs schema:
 * { action, entity, entityId, detail, createdByUid, createdAt }
 */

export async function logAction({ action, entity, entityId="", detail={} }) {
  return await addDoc(collection(db, "logs"), {
    action: action || "unknown",
    entity: entity || "unknown",
    entityId: entityId || "",
    detail: detail || {},
    createdByUid: auth.currentUser?.uid || null,
    createdAt: serverTimestamp()
  });
}

export async function listLogs(max=100) {
  const qRef = query(collection(db, "logs"), orderBy("createdAt","desc"), limit(max));
  const snap = await getDocs(qRef);
  const out = [];
  snap.forEach(d => out.push({ id: d.id, ...d.data() }));
  return out;
}
