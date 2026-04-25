import { LitElement, html } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

class NavBar extends LitElement {
  static properties = {
    isLoggedIn: { type: Boolean },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.isLoggedIn = !!localStorage.getItem("token");
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#">StoryApp</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              ${this.isLoggedIn
                ? html`
                    <li class="nav-item">
                      <a class="nav-link" id="nav-dashboard" href="#"
                        >${msg(`Dasbor`)}</a
                      >
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="nav-add-story" href="#"
                        >${msg(`Tambah Cerita`)}</a
                      >
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="nav-profile" href="#"
                        >${msg(`Profil`)}</a
                      >
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="nav-logout" href="#"
                        >${msg(`Keluar`)}</a
                      >
                    </li>
                  `
                : html`
                    <li class="nav-item">
                      <a class="nav-link" id="nav-login" href="#"
                        >${msg(`Masuk`)}</a
                      >
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="nav-register" href="#"
                        >${msg(`Daftar`)}</a
                      >
                    </li>
                  `}
            </ul>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("nav-bar", NavBar);
