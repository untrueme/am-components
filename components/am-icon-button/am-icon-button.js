import { html, css, LitElement } from 'lit';
import 'lit-icon/pkg/dist-src/lit-icon.js';

export class AmIconButton extends LitElement {
	static get properties() {
		return {
			iconset: { type: String },
            icon: { type: String},
			disabled: { type: Boolean, reflect: true }
		}
	}

	static get styles() {
		return css`
			:host {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
                box-sizing: border-box;
                border-radius: 4px;
                color: var(--grey-dark);
                user-select: none;
                cursor: pointer;
                outline: none;
            }

            :host(:hover),:host(:focus) {
                background: var(--grey-light);
                color: var(--black-base);
            }

            :host(:active) {
                background: var(--grey-base);
                color: var(--black-base);
            }

            :host([disabled]) {
                color: var(--grey-base);
                cursor: not-allowed;
                pointer-events: none;
            }

            lit-icon {
                width: 16px;
                height: 16px;
            }
		`;
	}
	render() {
		return html`
            <lit-icon .iconset="${this.iconset}" size="16" .icon="${this.icon}"></lit-icon>
        `;
	}
}

customElements.define('am-icon-button', AmIconButton);
