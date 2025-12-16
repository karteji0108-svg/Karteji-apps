// public/assets/js/ui/archive-ui.js
import { uploadArchive, listArchives, deleteArchive } from "../services/archive.service.js";
import { $ } from "../ui.js";
import { archiveRow, btn } from "../templates.js";

export async function renderArchives({ containerId="aList" } = {}) {
  const el = $(containerId);
  if (!el) return;

  el.innerHTML = `<div class="px-4 py-4 text-sm text-slate-300">Loading...</div>`;
  const items = await listArchives(100);

  if (!items.length) {
    el.innerHTML = `<div class="px-4 py-4 text-sm text-slate-300">Belum ada arsip.</div>`;
    return;
  }

  el.innerHTML = items.map(a => `
    ${archiveRow(a)}
    <div class="flex justify-end gap-2 px-4 pb-3">
      ${btn("Delete","bg-rose-500 text-white hover:bg-rose-400",`data-id="${a.id}" data-arc="delete"`)}
    </div>
  `).join("");
}

export function bindArchiveUpload({
  titleId="aTitle", tagId="aTag", fileId="aFile",
  btnId="aUploadBtn", statusId="statusMsg", after=()=>{}
} = {}) {
  const setStatus = (t="") => { const s=$(statusId); if(s) s.textContent=t; };

  $(btnId)?.addEventListener("click", async ()=>{
    try{
      const title = $(titleId)?.value?.trim() || "";
      const tag = $(tagId)?.value?.trim() || "";
      const file = $(fileId)?.files?.[0] || null;

      setStatus("Upload arsip...");
      await uploadArchive({ title, tag, file });

      if ($(titleId)) $(titleId).value="";
      if ($(tagId)) $(tagId).value="";
      if ($(fileId)) $(fileId).value="";

      setStatus("Arsip terupload ✅");
      await after();
    }catch(e){
      setStatus(e.message || "Gagal upload arsip");
    }
  });
}

export function bindArchiveActions({ containerId="aList", after=()=>{} } = {}) {
  const el = $(containerId);
  if (!el) return;

  el.addEventListener("click", async (ev)=>{
    const t = ev.target;
    if (!(t instanceof HTMLElement)) return;

    const id = t.getAttribute("data-id");
    if (!id) return;

    if (t.matches("[data-arc='delete']")) {
      if (!confirm("Hapus arsip ini?")) return;
      await deleteArchive(id);
      el.dispatchEvent(new CustomEvent("archives:changed"));
      await after();
    }
  });
}
