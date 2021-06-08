import { LitElement, html, css } from 'lit';

class AmTabItem extends LitElement {
	static get properties() {
		return {
			title: { type: String },
			selected: { type: Boolean, reflect: true }
		}
	}

	static get styles() {
		return css`
			:host(:not([selected])) {
				display: none;
			}
		`;
	}

	render() {
		return html`
	      <slot></slot>
      `;
	}
}

customElements.define('am-tab-item', AmTabItem);