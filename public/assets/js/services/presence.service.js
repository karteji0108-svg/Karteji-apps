// public/assets/js/services/presence.service.js
import { doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "../firebase.js";

export async function touchLastSeen() {
  const u = auth.currentUser;
  if (!u) return;
  try {
    await updateDoc(doc(db, "users", u.uid), { lastSeen: serverTimestamp() });
  } catch {}
}

export function startPresence(intervalMs = 60_000) {
  touchLastSeen();
  const t = setInterval(touchLastSeen, intervalMs);
  const stop = () => clearInterval(t);
  window.addEventListener("beforeunload", stop, { once: true });
  return stop;
}

// Online kalau lastSeen <= thresholdMs (default 2 menit)
export function isOnline(lastSeen, thresholdMs = 120_000) {
  const ts = lastSeen?.toDate ? lastSeen.toDate().getTime() : 0;
  if (!ts) return false;
  return (Date.now() - ts) <= thresholdMs;
}
