import { LitElement, html, css } from 'lit';
import LitNotify from '../../mixins/lit-notify.js'
import { classMap } from 'lit/directives/class-map.js';

class AmInput extends LitNotify(LitElement) {
	static get styles() {
		return css`
			:host {
				display: inline-block;
				position: relative;
                box-sizing: border-box;
				font-family: 'Golos Regular';
			}

            :host([disabled]) {
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
				user-select: none;
            }

            :host([disabled]) input{
                background: var(--grey-lightest);
            }

            :host(:hover) input{
                border: 1px solid var(--grey-dark);
			}

            :host(:active) input{
                border: 1px solid var(--primary-base);
			}

			input:focus{
                border: 1px solid var(--primary-base) !important;
			}

			.invalid {
				border: 1px solid var(--negative-base) !important;
			}

			input {
                box-sizing: border-box;
				width: 200px;
				height: 32px;
				padding: 12px 12px;
                border: 1px solid var(--grey-light);
				font: var(--nf-font-md);
				border-radius: 4px;
                outline:none;
                font-size: 14px;
                line-height: 150%;
			}

			/* Placeholder color */
			::placeholder {
				color: var(--grey-dark);
			}
    	`;
	}

	static get properties() {
		return {
			value: { type: String, notify: true },
			disabled: { type: Boolean, reflect: true },
			placeHolder: { type: String },
			type: { type: String },
			invalid: { type: Boolean }
		};
	}

	constructor() {
		super();
		this._input = {};
		this.type = 'text';
		this.invalid = !true;
	}

	updated(args) {
		super.updated(args);
		if (args.has('value') && args.get('value') != undefined) {
			this._input.value = this.value;
		}
	}

	render() {
		return html`
			<input
			class="${classMap({
				'invalid': this.invalid
			})}"
			type="${this.type}"
			title="${this.value}"
			value="${this.value}"
			placeholder="${this.placeHolder}"
			@keyup="${this._onKeyUp}"
			@change="${this._onChange}"
			@blur="${this._onBlur}">
			`;
	}

	firstUpdated() {
		// Save input reference for performance
		this._input = this.shadowRoot.querySelector('input');
		this._input.value = this.value || '';
	}

	_onChange(event) {
		this.dispatchEvent(new CustomEvent('change', {
			detail: {
				value: this._input.value
			},
			composed: true,
			bubbles: true
		}));
	}

	_onKeyUp(event) {
		this.value = this._input.value;
		// If Enter key pressed, fire 'enter-pressed'
		if (event.keyCode == 13) {
			this.dispatchEvent(new CustomEvent('enter-pressed', {
				detail: {
					value: this._input.value
				},
				composed: true,
				bubbles: true
			}));
			event.preventDefault();
		} else {
			// If any other key, fire 'key-pressed'
			this.dispatchEvent(new CustomEvent('key-pressed', {
				detail: {
					value: this._input.value
				},
				composed: true,
				bubbles: true
			}));
		}
	}

	_onFocus(event) {
		this._active = true;
	}

	_onBlur(event) {
		this._active = false;

		this.dispatchEvent(new CustomEvent('focus-lost', {
			detail: {
				value: this._input.value
			},
			composed: true,
			bubbles: true
		}));
	}
}

customElements.define('am-input', AmInput);