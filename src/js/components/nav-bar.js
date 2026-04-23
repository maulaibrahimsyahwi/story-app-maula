import { LitElement, html } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";
import { getLocale, changeLocale } from "../localization.js";

class NavBar extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-md fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#">StoryApp</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" id="offcanvasNavbar">
            <div class="offcanvas-header border-bottom">
              <h5 class="offcanvas-title fw-bold text-primary">Menu</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul
                class="navbar-nav justify-content-end flex-grow-1 pe-3 align-items-center"
              >
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    href="#"
                    id="nav-dashboard"
                    data-bs-dismiss="offcanvas"
                  >
                    ${msg("Beranda", { id: "msg-dashboard" })}
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    id="nav-add-story"
                    data-bs-dismiss="offcanvas"
                  >
                    ${msg("Tambah Cerita", { id: "msg-add-story" })}
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    id="nav-profile"
                    data-bs-dismiss="offcanvas"
                  >
                    ${msg("Profil", { id: "msg-profile" })}
                  </a>
                </li>
                <li class="nav-item dropdown ms-md-3 mt-3 mt-md-0">
                  <button
                    class="btn btn-outline-primary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    ${msg("Bahasa", { id: "msg-language" })}
                    (${getLocale().toUpperCase()})
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        class="dropdown-item"
                        @click=${() => changeLocale("id")}
                      >
                        ID (Indonesia)
                      </button>
                    </li>
                    <li>
                      <button
                        class="dropdown-item"
                        @click=${() => changeLocale("en")}
                      >
                        EN (English)
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define("nav-bar", NavBar);
