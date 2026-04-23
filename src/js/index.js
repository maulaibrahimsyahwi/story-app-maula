import "../sass/main.scss";
import * as bootstrap from "bootstrap";
import { setLocale } from "./localization.js";
import { msg } from "@lit/localize";
import "./components/nav-bar.js";
import "./components/story-list.js";
import "./components/add-story.js";
import "./components/footer-app.js";
import "./components/loading-indicator.js";
import "./components/dev-profile.js";
import { formatDate } from "./utils/date-formatter.js";

document.addEventListener("DOMContentLoaded", async () => {
  const savedLang = localStorage.getItem("lang") || "id";
  await setLocale(savedLang);
  const mainContent = document.getElementById("mainContent");

  const updateActiveNav = (id) => {
    const navBarComponent = document.querySelector("nav-bar");
    if (navBarComponent) {
      const navLinks = navBarComponent.querySelectorAll(".nav-link");
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = navBarComponent.querySelector(`#${id}`);
      if (activeLink) activeLink.classList.add("active");
    }
  };

  const renderDashboard = async () => {
    updateActiveNav("nav-dashboard");
    mainContent.innerHTML = "<loading-indicator></loading-indicator>";
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/dicodingacademy/a565-webtools-labs/099-shared-files/proyek-awal/DATA.json",
      );
      const data = await response.json();
      mainContent.innerHTML = "<story-list></story-list>";
      const storyListEl = document.querySelector("story-list");
      storyListEl.stories = data.listStory.map((s) => ({
        ...s,
        formattedDate: formatDate(s.createdAt),
      }));
    } catch (error) {
      mainContent.innerHTML = `<div class="alert alert-danger" role="alert"><h4 class="alert-heading">${msg("Gagal Memuat Data!")}</h4><p>${msg("Terjadi kesalahan saat mengambil data cerita. Pastikan koneksi internet stabil.")}</p></div>`;
    }
  };

  const renderAddStory = () => {
    updateActiveNav("nav-add-story");
    mainContent.innerHTML = "<add-story></add-story>";
  };

  const renderProfile = () => {
    updateActiveNav("nav-profile");
    mainContent.innerHTML = "<dev-profile></dev-profile>";
  };

  document.body.addEventListener("click", (e) => {
    if (e.target.id === "nav-dashboard") {
      e.preventDefault();
      renderDashboard();
    } else if (e.target.id === "nav-add-story") {
      e.preventDefault();
      renderAddStory();
    } else if (e.target.id === "nav-profile") {
      e.preventDefault();
      renderProfile();
    }
  });

  renderDashboard();
});
