import { LitElement, html, css } from 'lit';
import LitNotify from '../../mixins/lit-notify.js'

class AmInput extends LitNotify(LitElement) {
	static get styles() {
		return css`
			:host {
				display: inline-block;
				position: relative;
                box-sizing: border-box;
                border: 1px solid var(--grey-light);
                box-sizing: border-box;
                border-radius: 4px;
			}

            :host([disabled]) {
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }

            :host([disabled]) input{
                background: var(--grey-lightest);
            }


            :host(:hover) {
                border: 1px solid var(--grey-dark);
			}

            :host(:active) {
                border: 1px solid var(--primary-base);
			}

			input {
                box-sizing: border-box;
				width: 250px;
				height: 32px;
				padding: 12px 12px;
                border: none;
                outline:none;
                font-size: 14px;
                line-height: 150%;
			}

			/* Placeholder color */
			::placeholder {
				color: var(--grey-dark)
			}
    	`;
	}

	static get properties() {
		return {
			value: { type: String, notify: true },
			placeHolder: { type: String }
		};
	}

	constructor() {
		super();
		this._input = {};
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
			type="text"
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
		this.focus()

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

	_onBlur(event) {
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