// public/assets/js/references.js

export const COL = Object.freeze({
  USERS: "users",
  ACTIVITIES: "activities",
  FINANCE: "financial_records",
  MINUTES: "minutes",
  LETTERS: "letters",
  ARCHIVES: "archives",
  NOTIFICATIONS: "notifications",
  LOGS: "logs",
});

export const ROLE = Object.freeze({
  SUPER_ADMIN: "super_admin",
  KETUA: "ketua",
  WAKIL: "wakil_ketua",
  SEKRETARIS: "sekretaris",
  BENDAHARA: "bendahara",
  KOORDINATOR: "koordinator",
  ANGGOTA: "anggota",
});

export const STATUS = Object.freeze({
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
});

export const FIN_TYPE = Object.freeze({
  INCOME: "income",
  EXPENSE: "expense",
});
