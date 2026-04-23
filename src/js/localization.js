import { configureLocalization } from "@lit/localize";

export const { getLocale, setLocale } = configureLocalization({
  targetLocale: "id",
  sourceLocale: "en",
  localizedTemplates: {
    id: {
      "msg-dashboard": "Beranda",
      "msg-add-story": "Tambah Cerita",
      "msg-profile": "Profil",
      "msg-desc": "Deskripsi",
      "msg-photo": "Foto",
      "msg-submit": "Bagikan Cerita",
    },
  },
});

export const changeLocale = async (lang) => {
  await setLocale(lang);
  localStorage.setItem("lang", lang);
  window.location.reload();
};
