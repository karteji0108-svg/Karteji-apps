// public/assets/js/services/members.service.js
import { collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "../firebase.js";
import { isOnline } from "./presence.service.js";

export async function listMembers(max = 300) {
  const q = query(collection(db, "users"), orderBy("name", "asc"), limit(max));
  const snap = await getDocs(q);
  const out = [];
  snap.forEach(d => {
    const u = d.data();
    out.push({
      uid: d.id,
      name: u.name || "-",
      role: u.role || "anggota",
      lastSeen: u.lastSeen || null,
      online: isOnline(u.lastSeen),
    });
  });
  return out;
}

// Versi aman untuk role yang hanya boleh lihat nama + online
export async function listMembersPublic(max = 300) {
  const members = await listMembers(max);
  return members.map(m => ({ name: m.name, online: m.online }));
}
