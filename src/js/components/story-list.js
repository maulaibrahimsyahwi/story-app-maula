import { LitElement, html } from "lit";
import "./story-card.js";

class StoryList extends LitElement {
  static properties = {
    stories: { type: Array },
  };

  constructor() {
    super();
    this.stories = [];
  }

  createRenderRoot() {
    return this;
  }

  render() {
    if (!this.stories || this.stories.length === 0) {
      return html`
        <div class="text-center my-5">
          <h5 class="text-muted">Belum ada cerita yang tersedia saat ini.</h5>
        </div>
      `;
    }

    return html`
      <div class="row g-4">
        ${this.stories.map(
          (story) => html`
            <div class="col-12 col-md-6 col-lg-4">
              <story-card .story=${story}></story-card>
            </div>
          `,
        )}
      </div>
    `;
  }
}

customElements.define("story-list", StoryList);
