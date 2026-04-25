import { LitElement, html } from "lit";

class StoryCard extends LitElement {
  static properties = {
    story: { type: Object },
  };

  createRenderRoot() {
    return this;
  }

  render() {
    if (!this.story) return html``;

    return html`
      <div class="card h-100 shadow-sm border-0">
        <img
          src="${this.story.photoUrl}"
          class="card-img-top"
          alt="${this.story.name}"
          style="height: 250px; object-fit: cover;"
          crossorigin="anonymous"
        />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fw-bold text-truncate">${this.story.name}</h5>
          <h6 class="card-subtitle mb-3 text-muted" style="font-size: 0.85rem;">
            ${this.story.formattedDate || this.story.createdAt}
          </h6>
          <p
            class="card-text flex-grow-1"
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
