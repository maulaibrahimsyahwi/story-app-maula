import { LitElement, html, css } from "lit";

class LoadingIndicator extends LitElement {
  static styles = css`
    .spinner-container {
      display: flex;
      justify-content: center;
      padding: 3rem;
    }
    .loader {
      width: 48px;
      height: 48px;
      border: 5px solid #2b5cff;
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: rotation 1s linear infinite;
    }
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  render() {
    return html`<div class="spinner-container">
      <div class="loader"></div>
    </div>`;
  }
}
customElements.define("loading-indicator", LoadingIndicator);
