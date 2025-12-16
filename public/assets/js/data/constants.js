// public/assets/js/data/constants.js

// ===== ROLE =====
export const ROLE = Object.freeze({
  SUPER_ADMIN: "super_admin",
  KETUA: "ketua",
  WAKIL: "wakil_ketua",
  SEKRETARIS: "sekretaris",
  BENDAHARA: "bendahara",
  KOORDINATOR: "koordinator",
  ANGGOTA: "anggota",
});

// ===== STATUS UMUM =====
export const STATUS = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
});

// ===== TRANSAKSI =====
export const FINANCE_TYPE = Object.freeze({
  INCOME: "income",
  EXPENSE: "expense",
});

// ===== MENU KEY =====
export const MENU = Object.freeze({
  DASHBOARD: "dashboard",
  PROFILE: "profile",
  USERS: "users",
  STRUCTURE: "structure",
  ACTIVITIES: "activities",
  FINANCE: "finance",
  ARCHIVES: "archives",
  LETTERS: "letters",
  MINUTES: "minutes",
  NOTIFICATIONS: "notifications",
  LOGS: "logs",
  SETTINGS: "settings",
});

// ===== ICON (Material Symbols) =====
export const ICON = Object.freeze({
  DASHBOARD: "dashboard",
  PROFILE: "person",
  USERS: "group",
  STRUCTURE: "account_tree",
  ACTIVITIES: "event",
  FINANCE: "account_balance_wallet",
  ARCHIVES: "folder",
  LETTERS: "mail",
  MINUTES: "description",
  NOTIFICATIONS: "campaign",
  LOGS: "history",
  SETTINGS: "settings",
});

// ===== DEFAULT =====
export const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dbxktcwug/image/upload/v1/karteji/default-avatar.png";
