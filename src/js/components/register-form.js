import { LitElement, html } from "lit";
import { msg } from "@lit/localize";
import api from "../network/api.js";
import Swal from "sweetalert2";

class RegisterForm extends LitElement {
  static properties = {
    isLoading: { type: Boolean },
    errorMessage: { type: String },
    showPassword: { type: Boolean },
  };

  constructor() {
    super();
    this.isLoading = false;
    this.errorMessage = "";
    this.showPassword = false;
  }

  createRenderRoot() {
    return this;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async _handleRegister(e) {
    e.preventDefault();
    const name = this.querySelector("#name").value;
    const email = this.querySelector("#email").value;
    const password = this.querySelector("#password").value;

    if (password.length < 8) {
      this.errorMessage = msg("Password minimal 8 karakter");
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";

    try {
      await api.post("/register", { name, email, password });

      await Swal.fire({
        icon: "success",
        title: msg("Pendaftaran Berhasil!"),
        text: msg("Silakan masuk menggunakan akun baru Anda."),
        confirmButtonText: msg("Lanjut ke Login"),
        confirmButtonColor: "#0d6efd",
      });

      this.dispatchEvent(
        new CustomEvent("register-success", { bubbles: true, composed: true }),
      );
    } catch (error) {
      this.errorMessage =
        error.response?.data?.message ||
        msg("Gagal mendaftar. Silakan coba lagi.");

      Swal.fire({
        icon: "error",
        title: msg("Registrasi Gagal"),
        text: this.errorMessage,
      });
    } finally {
      this.isLoading = false;
    }
  }

  render() {
    return html`
      <div class="card mx-auto mt-5" style="max-width: 400px;">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">${msg("Daftar")}</h2>
          ${this.errorMessage
            ? html`<div class="alert alert-danger">${this.errorMessage}</div>`
            : ""}
          <form @submit=${this._handleRegister}>
            <div class="mb-3">
              <label for="name" class="form-label">${msg("Nama")}</label>
              <input type="text" class="form-control" id="name" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">${msg("Email")}</label>
              <input type="email" class="form-control" id="email" required />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label"
                >${msg("Password")}</label
              >
              <div class="input-group">
                <input
                  type=${this.showPassword ? "text" : "password"}
                  class="form-control"
                  id="password"
                  minlength="8"
                  required
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click=${this.togglePassword}
                >
                  ${this.showPassword ? msg("Sembunyikan") : msg("Lihat")}
                </button>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-primary w-100"
              ?disabled=${this.isLoading}
            >
              ${this.isLoading
                ? html`<span class="spinner-border spinner-border-sm"></span>
                    ${msg("Memuat...")}`
                : msg("Daftar")}
            </button>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("register-form", RegisterForm);
