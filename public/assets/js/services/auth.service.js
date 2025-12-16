// public/assets/js/services/auth.service.js

import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { auth, db } from "../firebase.js";
import { uploadToCloudinary, PRESET_PROFILE } from "../cloudinary.js";

/**
 * Cache ringan supaya tidak getDoc berulang dalam 1 halaman.
 */
let _meCache = null;

/**
 * Ambil user firebase (Auth) saat ini.
 */
export function getAuthUser() {
  return auth.currentUser || null;
}

/**
 * Ambil data profil user dari Firestore: users/{uid}
 * @returns {Promise<{uid:string, email?:string, role?:string, name?:string, photo?:object, lastSeen?:any}>}
 */
export async function getMe(force = false) {
  if (!force && _meCache) return _meCache;

  const u = getAuthUser();
  if (!u) return null;

  const ref = doc(db, "users", u.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  _meCache = { uid: u.uid, ...snap.data() };
  return _meCache;
}

/**
 * Update lastSeen untuk online/offline.
 */
export async function touchLastSeen() {
  const u = getAuthUser();
  if (!u) return;
  try {
    await updateDoc(doc(db, "users", u.uid), { lastSeen: serverTimestamp() });
  } catch {
    // ignore
  }
}

/**
 * Listener auth yang sekaligus mengembalikan data profile (users/{uid})
 * @param {(payload:{user:any, profile:any})=>void} onReady
 * @param {(reason:string)=>void} onDenied
 */
export function onAuthReady(onReady, onDenied) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) return onDenied?.("NOT_LOGGED_IN");

    const profile = await getMe(true);
    if (!profile) return onDenied?.("PROFILE_NOT_FOUND");

    onReady?.({ user, profile });
  });
}

/**
 * Wajib login. Kalau tidak, redirect.
 */
export async function requireLogin(redirectTo = "../login.html") {
  const u = getAuthUser();
  if (!u) {
    location.href = redirectTo;
    return null;
  }
  const me = await getMe(true);
  if (!me) {
    location.href = redirectTo;
    return null;
  }
  return me;
}

/**
 * Wajib role tertentu.
 * @param {string|string[]} roles - contoh: "bendahara" atau ["ketua","wakil_ketua"]
 */
export async function requireRole(roles, redirectTo = "../dashboard.html") {
  const me = await requireLogin("../login.html");
  if (!me) return null;

  const allowed = Array.isArray(roles) ? roles : [roles];
  if (!allowed.includes(me.role)) {
    location.href = redirectTo;
    return null;
  }
  return me;
}

/**
 * Logout.
 */
export async function logout(redirectTo = "../login.html") {
  await signOut(auth);
  _meCache = null;
  location.href = redirectTo;
}

/**
 * Update profil sendiri: name + optional photo file
 * - Foto diupload ke Cloudinary preset "Karteji" (PRESET_PROFILE)
 */
export async function updateMyProfile({ name, photoFile } = {}) {
  const u = getAuthUser();
  if (!u) throw new Error("Belum login");

  const payload = {};
  if (typeof name === "string" && name.trim()) payload.name = name.trim();

  if (photoFile) {
    const media = await uploadToCloudinary(photoFile, PRESET_PROFILE, `karteji/users/${u.uid}`);
    payload.photo = media;
  }

  if (!Object.keys(payload).length) return null;

  await updateDoc(doc(db, "users", u.uid), payload);
  _meCache = null; // reset cache
  return await getMe(true);
}

/**
 * Utility: Start heartbeat lastSeen tiap X ms (default 60s).
 * return: stop function
 */
export function startPresenceHeartbeat(intervalMs = 60_000) {
  touchLastSeen(); // immediate
  const t = setInterval(touchLastSeen, intervalMs);
  return () => clearInterval(t);
}
