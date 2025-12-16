// public/assets/js/ui/finance-ui.js
import { createTransaction, listTransactions, updateTransaction, deleteTransaction, summarize } from "../services/finance.service.js";
import { $ } from "../ui.js";
import { financeRow, btn } from "../templates.js";
import { fmtIDR } from "../ui.js";

export async function renderFinance({ containerId="finList", status=null, sumIds=null } = {}) {
  const el = $(containerId);
  if (!el) return;

  el.innerHTML = `<div class="px-4 py-4 text-sm text-slate-300">Loading...</div>`;
  const items = await listTransactions({ status, max: 50 });

  if (!items.length) {
    el.innerHTML = `<div class="px-4 py-4 text-sm text-slate-300">Belum ada transaksi.</div>`;
    if (sumIds) {
      $(sumIds.income)?.textContent = "Rp 0";
      $(sumIds.expense)?.textContent = "Rp 0";
      $(sumIds.balance)?.textContent = "Rp 0";
    }
    return;
  }

  if (sumIds) {
    const s = summarize(items);
    $(sumIds.income).textContent = `Rp ${fmtIDR(s.income)}`;
    $(sumIds.expense).textContent = `Rp ${fmtIDR(s.expense)}`;
    $(sumIds.balance).textContent = `Rp ${fmtIDR(s.balance)}`;
  }

  el.innerHTML = items.map(t => `
    ${financeRow(t)}
    <div class="flex justify-end gap-2 px-4 pb-3">
      ${btn("Edit","bg-white/10 hover:bg-white/15",`data-id="${t.id}" data-fin="edit"`)}
      ${btn("Delete","bg-rose-500 text-white hover:bg-rose-400",`data-id="${t.id}" data-fin="delete"`)}
    </div>
  `).join("");
}

export function bindFinanceCreate({
  typeId="finType", amtId="finAmt", catId="finCat", noteId="finNote", proofId="finProof",
  btnId="finCreateBtn", statusId="statusMsg", after=()=>{}
} = {}) {
  const setStatus = (t="") => { const s=$(statusId); if(s) s.textContent=t; };

  $(btnId)?.addEventListener("click", async ()=>{
    try{
      setStatus("Menyimpan transaksi...");
      const type = $(typeId)?.value;
      const amount = Number($(amtId)?.value || 0);
      const category = $(catId)?.value?.trim() || "";
      const note = $(noteId)?.value?.trim() || "";
      const proofFile = $(proofId)?.files?.[0] || null;

      await createTransaction({ type, amount, category, note, proofFile });

      if ($(amtId)) $(amtId).value = "";
      if ($(catId)) $(catId).value = "";
      if ($(noteId)) $(noteId).value = "";
      if ($(proofId)) $(proofId).value = "";

      setStatus("Transaksi ditambahkan ✅");
      await after();
    }catch(e){
      setStatus(e.message || "Gagal tambah transaksi");
    }
  });
}

export function bindFinanceActions({ containerId="finList", onEdit=(id)=>{} , after=()=>{} } = {}) {
  const el = $(containerId);
  if (!el) return;

  el.addEventListener("click", async (ev)=>{
    const t = ev.target;
    if (!(t instanceof HTMLElement)) return;

    const id = t.getAttribute("data-id");
    if (!id) return;

    if (t.matches("[data-fin='edit']")) return onEdit(id);

    if (t.matches("[data-fin='delete']")) {
      if (!confirm("Hapus transaksi ini?")) return;
      await deleteTransaction(id);
      el.dispatchEvent(new CustomEvent("finance:changed"));
      await after();
    }
  });
}
