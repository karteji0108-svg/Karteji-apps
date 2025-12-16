// public/assets/js/ui/activity-ui.js
import { createActivity, listActivities, setActivityStatus, deleteActivity } from "../services/activities.service.js";
import { $ } from "../ui.js";
import { activityCard, btn } from "../templates.js";

export async function renderActivities({ containerId="actList", status=null } = {}) {
  const el = $(containerId);
  if (!el) return;
  el.innerHTML = `<div class="px-4 py-4 text-sm text-slate-300">Loading...</div>`;
  const items = await listActivities({ status, max: 50 });
  if (!items.length) {
    el.innerHTML = `<div class="px-4 py-4 text-sm text-slate-300">Belum ada kegiatan.</div>`;
    return;
  }
  el.innerHTML = items.map(activityCard).join("");
}

export function bindActivityCreate({
  titleId="actTitle", dateId="actDate", locId="actLoc", descId="actDesc",
  coverId="actCover", btnId="actCreateBtn", statusId="statusMsg",
  after=()=>{}
} = {}) {
  const setStatus = (t="") => { const s=$(statusId); if(s) s.textContent=t; };

  $(btnId)?.addEventListener("click", async ()=>{
    try{
      setStatus("Membuat kegiatan...");
      const title = $(titleId)?.value?.trim() || "";
      const date = $(dateId)?.value?.trim() || "";
      const location = $(locId)?.value?.trim() || "";
      const description = $(descId)?.value?.trim() || "";
      const coverFile = $(coverId)?.files?.[0] || null;

      await createActivity({ title, date, location, description, coverFile });

      if ($(titleId)) $(titleId).value = "";
      if ($(dateId)) $(dateId).value = "";
      if ($(locId)) $(locId).value = "";
      if ($(descId)) $(descId).value = "";
      if ($(coverId)) $(coverId).value = "";

      setStatus("Kegiatan dibuat ✅");
      await after();
    }catch(e){
      setStatus(e.message || "Gagal buat kegiatan");
    }
  });
}

// Optional: action buttons injection (kalau kamu mau UI tombol approve/reject/delete di list)
export function injectActivityActions(containerId="actList", mode="approval") {
  const el = $(containerId);
  if (!el) return;

  // Tambah tombol di setiap card via event delegation
  el.addEventListener("click", async (ev)=>{
    const t = ev.target;
    if (!(t instanceof HTMLElement)) return;

    const id = t.getAttribute("data-id");
    if (!id) return;

    if (t.matches("[data-act='approve']")) await setActivityStatus(id,"approved");
    if (t.matches("[data-act='reject']")) await setActivityStatus(id,"rejected");
    if (t.matches("[data-act='delete']")) await deleteActivity(id);

    // refresh trigger (event)
    el.dispatchEvent(new CustomEvent("activities:changed"));
  });
}

// Helper untuk bikin tombol (dipakai kalau kamu custom template)
export function activityActionButtons(id) {
  return `
    <div class="flex justify-end gap-2 px-4 pb-3">
      ${btn("Approve","bg-emerald-400 text-slate-950 hover:bg-emerald-300",`data-id="${id}" data-act="approve"`)}
      ${btn("Reject","bg-white/5 border border-white/10 hover:bg-white/10",`data-id="${id}" data-act="reject"`)}
      ${btn("Delete","bg-rose-500 text-white hover:bg-rose-400",`data-id="${id}" data-act="delete"`)}
    </div>
  `;
}
