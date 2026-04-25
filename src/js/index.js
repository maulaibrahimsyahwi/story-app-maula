import "../sass/main.scss";
import "bootstrap";
import { setLocale } from "./localization.js";
import { msg } from "@lit/localize";
import "./components/nav-bar.js";
import "./components/story-list.js";
import "./components/add-story.js";
import "./components/footer-app.js";
import "./components/loading-indicator.js";
import "./components/dev-profile.js";
import "./components/login-form.js";
import "./components/register-form.js";
import { formatDate } from "./utils/date-formatter.js";
import api from "./network/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const savedLang = localStorage.getItem("lang") || "id";
  await setLocale(savedLang);
  const mainContent = document.getElementById("mainContent");
  const navBar = document.querySelector("nav-bar");

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (navBar) {
      navBar.isLoggedIn = !!token;
    }
    return !!token;
  };

  const updateActiveNav = (id) => {
    if (navBar) {
      const navLinks = navBar.querySelectorAll(".nav-link");
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = navBar.querySelector(`#${id}`);
      if (activeLink) activeLink.classList.add("active");
    }
  };

  const renderDashboard = async () => {
    if (!checkAuth()) return renderLogin();
    updateActiveNav("nav-dashboard");
    mainContent.innerHTML = "<loading-indicator></loading-indicator>";
    try {
      const response = await api.get("/stories");
      const data = response.data;
      mainContent.innerHTML = "<story-list></story-list>";
      const storyListEl = document.querySelector("story-list");
      storyListEl.stories = data.listStory.map((s) => ({
        ...s,
        formattedDate: formatDate(s.createdAt),
      }));
    } catch (error) {
      mainContent.innerHTML = `<div class="alert alert-danger" role="alert"><h4 class="alert-heading">${msg("Gagal Memuat Data!")}</h4><p>${error.response?.data?.message || msg("Terjadi kesalahan saat mengambil data.")}</p></div>`;
    }
  };

  const renderAddStory = () => {
    if (!checkAuth()) return renderLogin();
    updateActiveNav("nav-add-story");
    mainContent.innerHTML = "<add-story></add-story>";
  };

  const renderProfile = () => {
    if (!checkAuth()) return renderLogin();
    updateActiveNav("nav-profile");
    mainContent.innerHTML = "<dev-profile></dev-profile>";
  };

  const renderLogin = () => {
    if (checkAuth()) return renderDashboard();
    updateActiveNav("nav-login");
    mainContent.innerHTML = "<login-form></login-form>";
  };

  const renderRegister = () => {
    if (checkAuth()) return renderDashboard();
    updateActiveNav("nav-register");
    mainContent.innerHTML = "<register-form></register-form>";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    checkAuth();
    renderLogin();
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
    } else if (e.target.id === "nav-login") {
      e.preventDefault();
      renderLogin();
    } else if (e.target.id === "nav-register") {
      e.preventDefault();
      renderRegister();
    } else if (e.target.id === "nav-logout") {
      e.preventDefault();
      handleLogout();
    }
  });

  document.body.addEventListener("login-success", () => {
    checkAuth();
    renderDashboard();
  });

  document.body.addEventListener("register-success", () => {
    renderLogin();
  });

  if (checkAuth()) {
    renderDashboard();
  } else {
    renderLogin();
  }
});
