import { LitElement, html, css } from "lit";

class FooterApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: #212529;
      color: white;
      text-align: center;
      padding: 2rem;
      margin-top: 3rem;
    }
    p {
      margin: 0;
      font-family: sans-serif;
      opacity: 0.8;
    }
  `;

  render() {
    return html`<p>&copy; 2026 StoryApp - Maula Ibrahim Syahwi</p>`;
  }
}
customElements.define("footer-app", FooterApp);
