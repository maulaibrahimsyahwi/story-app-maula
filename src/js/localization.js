import { configureLocalization } from "@lit/localize";

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale: "id",
  targetLocales: ["en"],
  loadLocale: async (locale) => {
    if (locale === "en") {
      return {
        templates: {
          "msg-dashboard": "Dashboard",
          "msg-add-story": "Add Story",
          "msg-profile": "Developer Profile",
          "msg-language": "Language",
          "msg-footer": "StoryApp - Built with Bootstrap & Lit",
          "msg-desc-label": "Story Description",
          "msg-photo-label": "Upload Photo",
          "msg-btn-share": "Share Story",
        },
      };
    }
    return { templates: {} };
  },
});

export const changeLocale = async (lang) => {
  await setLocale(lang);
  localStorage.setItem("lang", lang);
  window.location.reload();
};
