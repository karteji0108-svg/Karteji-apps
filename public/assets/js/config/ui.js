export const $ = (id) => document.getElementById(id);

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (m)=>({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
}[m]));

export const fmtIDR = (n) => Number(n||0).toLocaleString("id-ID");

export function openTab(name) {
  document.querySelectorAll(".tabPanel").forEach(p => p.classList.add("hidden"));
  document.querySelectorAll(".tabBtn").forEach(b => b.classList.remove("bg-emerald-400","text-slate-950","font-extrabold"));
  const panel = document.getElementById(`tab-${name}`);
  const btn = document.querySelector(`.tabBtn[data-tab="${name}"]`);
  if(panel) panel.classList.remove("hidden");
  if(btn) btn.classList.add("bg-emerald-400","text-slate-950","font-extrabold");
}
