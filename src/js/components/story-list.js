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
    return html`
      <div class="row g-4">
        ${this.stories.map(
          (story) => html`
            <div class="col-12 col-md-6 col-lg-4">
              <story-card .story="${story}"></story-card>
            </div>
          `,
        )}
      </div>
    `;
  }
}

customElements.define("story-list", StoryList);
