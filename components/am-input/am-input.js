import { LitElement, html, css } from 'lit';
import LitNotify from '../../mixins/lit-notify.js'

class AmInput extends LitNotify(LitElement) {
	static get properties() {
		return {
			value: { type: String, notify: true },
			disabled: { type: Boolean, reflect: true },
			placeHolder: { type: String },
			type: { type: String },
			invalid: { type: Boolean, reflect: true },
			label: { type: String },
			variant: { type: String },
			size: { type: String },
			min: { type: Number },
            max: { type: Number },
            step: { type: String }
		};
	}

	static get styles() {
		return css`
			:host {
                display: flex;
                position: relative;
                flex-direction: column;
                box-sizing: border-box;
				font-family: 'Golos Regular';
				direction: var(--direction);
				align-items: flex-start;
				outline: none;
				--input-content-width: 200px;
			}

			:host([variant=horizontal]) {
                flex-direction: row;
				align-items: center;
            }

			:host([variant=horizontal]) label{
                margin-right: 8px;
            }

			label {
                box-sizing: border-box;
                display: inline-block;
                pointer-events: none;
                user-select: none;
                line-height: 150%;
				font-family: 'Golos Regular';
				font-weight: 500;
				font-size: 12px;
				color: var(--black-lightest);
                text-align: var(--direction, left);
                white-space: normal;
                text-overflow: ellipsis;
                overflow:hidden;
				width: 100px;
            }

            label span {
                width: 100%;
            }

            :host([disabled]) {
                color: var(--grey-base);
                cursor: not-allowed;
                pointer-events: none;
				user-select: none;
            }

            :host([disabled]) .input-content,
			:host([disabled]) .prefix ::slotted(*),
			:host([disabled]) .suffix ::slotted(*),
			:host([disabled]) ::placeholder {
				color: var(--grey-base);
                background: var(--grey-lightest);
            }

            :host(:hover) .input-content{
                border: 1px solid var(--grey-dark);
			}

            :host(:active) .input-content{
                border: 1px solid var(--primary-base);
			}

			.input-content:focus-within{
                border: 1px solid var(--primary-base) !important;
			}

			:host([invalid]) .input-content {
				border: 1px solid var(--negative-base) !important;
			}

			input {
				background: inherit;
				color: inherit;
				border: none;
                outline:none;
				padding: 0px;
                font-size: 14px;
				width: 100%;
				height: 100%;
			}

			.input-content {
                display: flex;
				height: 32px;
				width: var(--input-content-width);
                flex-direction: row;
                box-sizing: border-box;
				overflow: hidden;
				border: 1px solid var(--grey-light);
				border-radius: 4px;
				padding: 0 12px;
			}

			::placeholder {
				color: var(--grey-dark);
			}

			.prefix {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            :host .prefix ::slotted(*) {
                align-self: center;
				margin-right: 8px;
				margin-left: 0px;
                color: var(--grey-dark);
				width: 16px;
				height: 16px;
            }

			.suffix {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            :host .suffix ::slotted(*) {
                align-self: center;
				margin-right: 0px;
				margin-left: 8px;
                color: var(--grey-dark);
				width: 16px;
				height: 16px;
    	`;
	}

	render() {
		return html`
			<label id="label" aria-hidden="true" slot="label">
				<span>${this.label}</span>
			</label>
			<div class="input-content">
				<span class="prefix">
					<slot name="prefix"></slot>
				</span>
				<input
					tabindex="${this.disabled ? -1 : 0}"
					type="${this.type}"
					title="${this.value}"
					value="${this.value}"
					placeholder="${this.placeHolder}"
					@focus="${this._onFocus}"
					@keyup="${this._onKeyUp}"
					@change="${this._onChange}"
					@blur="${this._onBlur}"
					min="${this.min}"
					max="${this.max}"
					step="${this.step}"
					>
				<span class="suffix">
                	<slot name="suffix"></slot>
            	</span>
				<slot></slot>
			</div>
		`;
	}

	constructor() {
		super();
		this._input = {};
		this.type = 'text';
		this.label = '';
		this.invalid = !true;
		this.role = 'input';
	}

	updated(args) {
		super.updated(args);
		if (args.has('value') && args.get('value') != undefined) {
			this._input.value = this.value;
		}
	}

	_onFocus(event) {
		var length = this.value?.length || 0;
		event.target.setSelectionRange(length, length);
	}

	firstUpdated() {
		// Save input reference for performance
		this._input = this.shadowRoot.querySelector('input');
		this._input.value = this.value ?? '';
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