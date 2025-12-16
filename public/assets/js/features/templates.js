// public/assets/js/templates.js
import { esc, fmtIDR } from "./ui.js";

export function badge(text, variant="default") {
  const base = "inline-flex items-center rounded-full px-2 py-1 text-[10px] font-extrabold border";
  const map = {
    default: "bg-white/5 border-white/10 text-slate-200",
    ok: "bg-emerald-400/10 border-emerald-400/20 text-emerald-200",
    warn: "bg-amber-400/10 border-amber-400/20 text-amber-200",
    bad: "bg-rose-500/10 border-rose-500/20 text-rose-200",
  };
  return `<span class="${base} ${map[variant] || map.default}">${esc(text)}</span>`;
}

export function btn(label, cls="", attrs="") {
  return `<button ${attrs} class="rounded-xl px-3 py-2 text-xs font-extrabold active:scale-[.99] ${cls}">${esc(label)}</button>`;
}

export function rowKV(k, v) {
  return `<div class="text-xs text-slate-400">${esc(k)}: <span class="text-slate-200">${esc(v)}</span></div>`;
}

export function activityCard(a) {
  const st = a.status || "pending";
  const stBadge = st === "approved" ? badge(st,"ok") : st === "rejected" ? badge(st,"bad") : badge(st,"default");
  const cover = a.cover?.url ? `<a target="_blank" rel="noreferrer" class="text-emerald-300 hover:underline text-xs" href="${a.cover.url}">lihat cover</a>` : `<span class="text-xs text-slate-500">-</span>`;
  return `
    <div class="px-4 py-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="text-sm font-extrabold">${esc(a.title || "-")} <span class="ml-2">${stBadge}</span></div>
          <div class="text-xs text-slate-400">${esc(a.date||"")} • ${esc(a.location||"")}</div>
          <div class="text-xs text-slate-300 mt-1 whitespace-pre-line">${esc(a.description||"")}</div>
          <div class="mt-1">${cover}</div>
        </div>
      </div>
    </div>`;
}

export function financeRow(t) {
  const type = t.type === "income" ? "Kas Masuk" : "Kas Keluar";
  const proof = t.proof?.url ? `<a target="_blank" rel="noreferrer" class="text-emerald-300 hover:underline text-xs" href="${t.proof.url}">lihat</a>` : `<span class="text-xs text-slate-500">-</span>`;
  return `
    <div class="px-4 py-3">
      <div class="grid grid-cols-12 items-center gap-2">
        <div class="col-span-9">
          <div class="text-sm font-extrabold">${esc(type)} • Rp ${fmtIDR(t.amount)}</div>
          <div class="text-xs text-slate-400">${esc(t.category||"-")} • ${esc(t.note||"")}</div>
        </div>
        <div class="col-span-3 text-right">${proof}</div>
      </div>
    </div>`;
}

export function archiveRow(a) {
  const link = a.file?.url ? `<a target="_blank" rel="noreferrer" class="text-emerald-300 hover:underline text-xs" href="${a.file.url}">lihat file</a>` : `<span class="text-xs text-slate-500">-</span>`;
  return `
    <div class="px-4 py-3 flex items-start justify-between gap-3">
      <div>
        <div class="text-sm font-extrabold">${esc(a.title||"-")}</div>
        <div class="text-xs text-slate-400">${esc(a.tag||"")}</div>
        <div class="mt-1">${link}</div>
      </div>
    </div>`;
}
