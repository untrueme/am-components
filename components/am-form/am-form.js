import { LitElement, html, css } from 'lit';

class AmForm extends LitElement {

	static get properties() {
		return {
			args: { type: Object },
            formTitle: { type: String }
		}
	}
	static get styles() {
		return css`
			:host {
				display: block;
				position: relative;
				min-width: 1px;
				box-sizing:border-box;
				font-size: 12px;
				width: 100%;
				height: 100%;
			}

			:host([hidden]) {
				display: none !important;
			}
		`;
	}
	render() {
		return html`
            <slot></slot>
        `;
	}
}

customElements.define('am-form', AmForm);
