// public/assets/js/dashboard-router.js
import { requireLogin } from "./services/auth.service.js";

const map = Object.freeze({
  super_admin: "./dashboards/super-admin.html",
  ketua: "./dashboards/ketua.html",
  wakil_ketua: "./dashboards/wakil-ketua.html",
  sekretaris: "./dashboards/sekretaris.html",
  bendahara: "./dashboards/bendahara.html",
  koordinator: "./dashboards/anggota.html", // bisa dialihkan nanti
  anggota: "./dashboards/anggota.html",
});

export async function routeToDashboard() {
  const me = await requireLogin("./login.html");
  if (!me) return;

  const to = map[me.role] || "./dashboards/anggota.html";
  location.href = to;
}
