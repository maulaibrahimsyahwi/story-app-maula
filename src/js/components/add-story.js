import { LitElement, html } from "lit";

class AddStory extends LitElement {
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const form = this.querySelector(".needs-validation");
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          const alertPlaceholder = document.getElementById("alertPlaceholder");
          alertPlaceholder.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Berhasil!</strong> Cerita baru telah ditambahkan.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
          form.reset();
          form.classList.remove("was-validated");
          return;
        }
        form.classList.add("was-validated");
      },
      false,
    );
  }

  render() {
    return html`
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="card p-4 p-md-5">
            <h2 class="mb-4 fw-bold">Buat Story Baru</h2>
            <div id="alertPlaceholder"></div>
            <form class="needs-validation" novalidate>
              <div class="mb-4">
                <label for="description" class="form-label fw-semibold"
                  >Deskripsi Cerita</label
                >
                <textarea
                  class="form-control"
                  id="description"
                  rows="5"
                  placeholder="Tuliskan apa yang sedang terjadi..."
                  required
                ></textarea>
                <div class="invalid-feedback">
                  Deskripsi cerita tidak boleh kosong.
                </div>
              </div>
              <div class="mb-4">
                <label for="photo" class="form-label fw-semibold"
                  >Unggah Foto</label
                >
                <input
                  class="form-control"
                  type="file"
                  id="photo"
                  accept="image/*"
                  required
                />
                <div class="invalid-feedback">
                  Silakan pilih berkas foto untuk diunggah.
                </div>
              </div>
              <button class="btn btn-primary w-100 py-3" type="submit">
                Bagikan Cerita
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("add-story", AddStory);
