import { html, css } from 'lit';
import { SlcElement} from "../slc-element/slc-element.js";

export class AmButton extends SlcElement {

	static get properties() {
		return {
			label: { type: String, value: 'label' },
			disabled: { type: Boolean, reflect: true }
		}
	}
	static get styles() {
		return css`
          :host {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			position: relative;
			box-sizing: border-box;
			background: transparent;
			outline-width: 0;
			cursor: pointer;
			font-weight: normal;
			white-space: nowrap;
			min-width: fit-content;
			line-height: 32px;
			padding: 12px 12px;
			height: 32px;
			background: #209CEE;
			color: white;
		}

		:host([hidden]) {
			display: none !important;
		}

		:host([disabled]) {
			background: #f5f7f8;
			color: lightgray;
			cursor: default;
			pointer-events: none;
			user-select: none;
		}

		:host .prefix {
			display: flex;
		}

		:host .prefix ::slotted(*) {
			margin-right: 8px;
			width: 16px;
			height: 16px;
		}

		:host .suffix {
			display: flex;
		}

		:host .suffix ::slotted(*) {
			margin-left: 8px;
			width: 16px;
			height: 16px;
		}
		`;
	}
	render() {
		return html`
		<span class="prefix">
			<slot name="prefix"></slot>
		</span>
		<span>${this.label}</span>
		<span class="suffix">
			<slot name="suffix"></slot>
		</span>
        `;
	}
}

customElements.define('am-button', AmButton);
