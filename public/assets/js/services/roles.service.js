// public/assets/js/services/roles.service.js
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "../firebase.js";

export const ROLES = Object.freeze({
  SUPER_ADMIN: "super_admin",
  KETUA: "ketua",
  WAKIL: "wakil_ketua",
  SEKRETARIS: "sekretaris",
  BENDAHARA: "bendahara",
  KOORDINATOR: "koordinator",
  ANGGOTA: "anggota",
});

export function canEditRole(actorRole, targetRole) {
  // super admin boleh semua
  if (actorRole === ROLES.SUPER_ADMIN) return true;

  // ketua/wakil boleh atur pengurus, tapi tidak boleh ubah super_admin
  if (actorRole === ROLES.KETUA || actorRole === ROLES.WAKIL) {
    if (targetRole === ROLES.SUPER_ADMIN) return false;
    return true;
  }

  return false;
}

export async function getMyRole() {
  const u = auth.currentUser;
  if (!u) return null;
  const snap = await getDoc(doc(db, "users", u.uid));
  return snap.exists() ? (snap.data().role || null) : null;
}

export async function setUserRole(actorRole, targetUid, newRole) {
  if (!targetUid) throw new Error("targetUid wajib");
  if (!newRole) throw new Error("newRole wajib");

  const targetSnap = await getDoc(doc(db, "users", targetUid));
  if (!targetSnap.exists()) throw new Error("User target tidak ditemukan");

  const targetRole = targetSnap.data().role;

  if (!canEditRole(actorRole, targetRole)) {
    throw new Error("Tidak punya izin ubah role user ini");
  }

  // ketua/wakil tidak boleh mengubah super_admin (sudah dicek), dan boleh ubah ketua? (pilihan kamu)
  // sesuai aturanmu: Ketua/Wakil mengatur struktur pengurus (kecuali ubah superadmin).
  // agar aman, kita juga LOCK role ketua agar tidak diubah selain super_admin.
  if ((actorRole === ROLES.KETUA || actorRole === ROLES.WAKIL) && targetRole === ROLES.KETUA) {
    throw new Error("Tidak boleh ubah role Ketua (kecuali Super Admin)");
  }

  await updateDoc(doc(db, "users", targetUid), { role: newRole });
  return true;
}
