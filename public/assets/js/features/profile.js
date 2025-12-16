// public/assets/js/ui/profile.js
import { updateMyProfile } from "../services/auth.service.js";
import { $ } from "../ui.js";

export function bindProfileUI({
  nameInputId = "meName",
  photoInputId = "mePhotoInput",
  photoImgId = "mePhoto",
  nameTextId = "meNameText",
  saveBtnId = "saveProfileBtn",
  statusId = "statusMsg",
} = {}) {

  const setStatus = (t="") => { const el = $(statusId); if (el) el.textContent = t; };

  async function save() {
    try {
      setStatus("Menyimpan...");
      const name = $(nameInputId)?.value || "";
      const file = $(photoInputId)?.files?.[0] || null;
      const me = await updateMyProfile({ name, photoFile: file });
      if (me?.photo?.url && $(photoImgId)) $(photoImgId).src = me.photo.url;
      if (me?.name && $(nameTextId)) $(nameTextId).textContent = me.name;
      setStatus("Profil tersimpan ✅");
    } catch (e) {
      setStatus(e.message || "Gagal simpan profil");
    }
  }

  $(saveBtnId)?.addEventListener("click", save);

  return { save };
}
