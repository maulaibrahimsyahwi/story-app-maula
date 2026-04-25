import { LitElement, html } from "lit";
import { msg } from "@lit/localize";
import api from "../network/api.js";
import Swal from "sweetalert2";

class AddStory extends LitElement {
  static properties = {
    isLoading: { type: Boolean },
    errorMessage: { type: String },
  };

  constructor() {
    super();
    this.isLoading = false;
    this.errorMessage = "";
  }

  createRenderRoot() {
    return this;
  }

  async _handleSubmit(e) {
    e.preventDefault();
    const description = this.querySelector("#description").value;
    const photo = this.querySelector("#photo").files[0];

    if (!photo) {
      this.errorMessage = msg("Pilih foto terlebih dahulu.");
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);

    try {
      await api.post("/stories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await Swal.fire({
        icon: "success",
        title: msg("Berhasil!"),
        text: msg("Cerita baru berhasil ditambahkan."),
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      document.getElementById("nav-dashboard").click();
    } catch (error) {
      this.errorMessage =
        error.response?.data?.message || msg("Gagal menambahkan cerita.");

      Swal.fire({
        icon: "error",
        title: msg("Oops..."),
        text: this.errorMessage,
      });
    } finally {
      this.isLoading = false;
    }
  }

  render() {
    return html`
      <div class="card mx-auto mt-4" style="max-width: 600px;">
        <div class="card-body">
          <h2 class="card-title mb-4">${msg("Tambah Cerita Baru")}</h2>
          ${this.errorMessage
            ? html`<div class="alert alert-danger">${this.errorMessage}</div>`
            : ""}
          <form @submit=${this._handleSubmit}>
            <div class="mb-3">
              <label for="photo" class="form-label">${msg("Foto")}</label>
              <input
                type="file"
                class="form-control"
                id="photo"
                accept="image/*"
                required
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label"
                >${msg("Deskripsi")}</label
              >
              <textarea
                class="form-control"
                id="description"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="btn btn-primary w-100"
              ?disabled=${this.isLoading}
            >
              ${this.isLoading
                ? html`<span class="spinner-border spinner-border-sm"></span>
                    ${msg("Mengunggah...")}`
                : msg("Unggah Cerita")}
            </button>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("add-story", AddStory);
