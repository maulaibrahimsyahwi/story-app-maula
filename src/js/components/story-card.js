import { LitElement, html } from "lit";
import { formatDate } from "../utils/date-formatter.js";

class StoryCard extends LitElement {
  static properties = {
    story: { type: Object },
  };

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="card h-100">
        <img
          src="${this.story.photoUrl}"
          class="card-img-top"
          alt="Foto dari ${this.story.name}"
        />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-truncate">${this.story.name}</h5>
          <h6 class="card-subtitle mb-3 text-muted" style="font-size: 0.85rem;">
            ${formatDate(this.story.createdAt)}
          </h6>
          <p
            class="card-text text-secondary"
            style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;"
          >
            ${this.story.description}
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define("story-card", StoryCard);
