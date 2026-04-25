import { LitElement, html } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

class LoadingIndicator extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div
        class="d-flex flex-column justify-content-center align-items-center"
        style="min-height: 50vh;"
      >
        <div
          class="spinner-border text-primary"
          role="status"
          style="width: 3rem; height: 3rem;"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted fw-semibold">${msg("Memuat data...")}</p>
      </div>
    `;
  }
}

customElements.define("loading-indicator", LoadingIndicator);
