// public/assets/js/data/menu-by-role.js
import { ROLE, MENU, ICON } from "./constants.js";

export const MENU_BY_ROLE = Object.freeze({

  // ================= SUPER ADMIN =================
  [ROLE.SUPER_ADMIN]: [
    {
      key: MENU.DASHBOARD,
      label: "Dashboard",
      icon: ICON.DASHBOARD,
      href: "../dashboards/super-admin.html",
    },
    {
      key: MENU.USERS,
      label: "Manajemen User",
      icon: ICON.USERS,
      href: "../dashboards/super-admin.html#users",
    },
    {
      key: MENU.STRUCTURE,
      label: "Struktur Organisasi",
      icon: ICON.STRUCTURE,
      href: "../dashboards/super-admin.html#structure",
    },
    {
      key: MENU.ACTIVITIES,
      label: "Kegiatan",
      icon: ICON.ACTIVITIES,
      href: "../dashboards/super-admin.html#activities",
    },
    {
      key: MENU.FINANCE,
      label: "Keuangan",
      icon: ICON.FINANCE,
      href: "../dashboards/super-admin.html#finance",
    },
    {
      key: MENU.ARCHIVES,
      label: "Arsip",
      icon: ICON.ARCHIVES,
      href: "../dashboards/super-admin.html#archives",
    },
    {
      key: MENU.NOTIFICATIONS,
      label: "Pengumuman",
      icon: ICON.NOTIFICATIONS,
      href: "../dashboards/super-admin.html#notifications",
    },
    {
      key: MENU.LOGS,
      label: "Log Aktivitas",
      icon: ICON.LOGS,
      href: "../dashboards/super-admin.html#logs",
    },
    {
      key: MENU.SETTINGS,
      label: "Pengaturan",
      icon: ICON.SETTINGS,
      href: "../dashboards/super-admin.html#settings",
    },
  ],

  // ================= KETUA =================
  [ROLE.KETUA]: [
    {
      key: MENU.DASHBOARD,
      label: "Dashboard",
      icon: ICON.DASHBOARD,
      href: "../dashboards/ketua.html",
    },
    {
      key: MENU.STRUCTURE,
      label: "Struktur Pengurus",
      icon: ICON.STRUCTURE,
      href: "../dashboards/ketua.html#structure",
    },
    {
      key: MENU.ACTIVITIES,
      label: "Kegiatan",
      icon: ICON.ACTIVITIES,
      href: "../dashboards/ketua.html#activities",
    },
    {
      key: MENU.FINANCE,
      label: "Keuangan",
      icon: ICON.FINANCE,
      href: "../dashboards/ketua.html#finance",
    },
    {
      key: MENU.NOTIFICATIONS,
      label: "Pengumuman",
      icon: ICON.NOTIFICATIONS,
      href: "../dashboards/ketua.html#notifications",
    },
  ],

  // ================= WAKIL KETUA =================
  [ROLE.WAKIL]: [
    {
      key: MENU.DASHBOARD,
      label: "Dashboard",
      icon: ICON.DASHBOARD,
      href: "../dashboards/wakil-ketua.html",
    },
    {
      key: MENU.STRUCTURE,
      label: "Struktur Pengurus",
      icon: ICON.STRUCTURE,
      href: "../dashboards/wakil-ketua.html#structure",
    },
    {
      key: MENU.ACTIVITIES,
      label: "Kegiatan",
      icon: ICON.ACTIVITIES,
      href: "../dashboards/wakil-ketua.html#activities",
    },
    {
      key: MENU.FINANCE,
      label: "Keuangan",
      icon: ICON.FINANCE,
      href: "../dashboards/wakil-ketua.html#finance",
    },
  ],

  // ================= SEKRETARIS =================
  [ROLE.SEKRETARIS]: [
    {
      key: MENU.DASHBOARD,
      label: "Dashboard",
      icon: ICON.DASHBOARD,
      href: "../dashboards/sekretaris.html",
    },
    {
      key: MENU.MINUTES,
      label: "Notulen",
      icon: ICON.MINUTES,
      href: "../dashboards/sekretaris.html#notulen",
    },
    {
      key: MENU.LETTERS,
      label: "Surat",
      icon: ICON.LETTERS,
      href: "../dashboards/sekretaris.html#surat",
    },
    {
      key: MENU.ARCHIVES,
      label: "Arsip",
      icon: ICON.ARCHIVES,
      href: "../dashboards/sekretaris.html#arsip",
    },
  ],

  // ================= BENDAHARA =================
  [ROLE.BENDAHARA]: [
    {
      key: MENU.DASHBOARD,
      label: "Dashboard",
      icon: ICON.DASHBOARD,
      href: "../dashboards/bendahara.html",
    },
    {
      key: MENU.FINANCE,
      label: "Keuangan",
      icon: ICON.FINANCE,
      href: "../dashboards/bendahara.html#finance",
    },
  ],

  // ================= KOORDINATOR =================
  [ROLE.KOORDINATOR]: [
    {
      key: MENU.DASHBOARD,
      label: "Dashboard",
      icon: ICON.DASHBOARD,
      href: "../dashboards/anggota.html",
    },
    {
      key: MENU.ACTIVITIES,
      label: "Kegiatan",
      icon: ICON.ACTIVITIES,
      href: "../dashboards/anggota.html#kegiatan",
    },
    {
      key: MENU.ANGGOTA,
      label: "Anggota",
      icon: ICON.USERS,
      href: "../dashboards/anggota.html#anggota",
    },
  ],

  // ================= ANGGOTA =================
  [ROLE.ANGGOTA]: [
    {
      key: MENU.DASHBOARD,
      label: "Beranda",
      icon: ICON.DASHBOARD,
      href: "../dashboards/anggota.html",
    },
    {
      key: MENU.ACTIVITIES,
      label: "Kegiatan",
      icon: ICON.ACTIVITIES,
      href: "../dashboards/anggota.html#kegiatan",
    },
    {
      key: MENU.FINANCE,
      label: "Kas",
      icon: ICON.FINANCE,
      href: "../dashboards/anggota.html#kas",
    },
    {
      key: MENU.ANGGOTA,
      label: "Anggota",
      icon: ICON.USERS,
      href: "../dashboards/anggota.html#anggota",
    },
  ],

});
