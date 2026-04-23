import { LitElement, html } from "lit";

class DevProfile extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">
          <div class="card text-center p-5">
            <div class="mb-4">
              <div
                class="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                style="width: 100px; height: 100px; font-size: 2.5rem; font-weight: bold;"
              >
                MI
              </div>
            </div>
            <h2 class="fw-bold mb-3">Maula Ibrahim Syahwi</h2>
            <p class="lead text-secondary mb-4">
              Front-End Developer & UI/UX Designer
            </p>
            <div class="bg-light p-4 rounded-3 text-start">
              <p class="mb-0 text-muted">
                Mahasiswa S1 Pendidikan Teknik Informatika dan Komputer dengan
                minat kuat pada Web Development, khususnya Front-End dan UI/UX
                Design.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("dev-profile", DevProfile);
