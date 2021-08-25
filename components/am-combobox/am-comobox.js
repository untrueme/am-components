import { html, css, LitElement } from 'lit';
import '/components/am-dropdown/am-dropdown.js';

class AmCombobox extends LitElement {
	static get properties() {
		return {
			value: { type: String, notify: true },
			disabled: { type: Boolean, reflect: true },
			placeHolder: { type: String },
			type: { type: String },
			invalid: { type: Boolean, reflect: true },
			label: { type: String },
			variant: { type: String }
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
				align-items: flex-start
			}

			am-dropdown {
				width: 200px;
				height: 200px;
			}

			lit-icon {
				width: 16px;
				height: 16px;
				cursor: pointer;
			}

			lit-icon:hover {
				color: var(--black-light);
				stroke:  var(--black-light);
			}
    	`;
	}

	render() {
		return html`
			<am-input id="input" label="combobox">
			<lit-icon slot="suffix" iconset="iconset-16" size="16" icon="cancel" @click="${this._onToggle}"></lit-icon>
				<lit-icon slot="suffix" iconset="iconset-16" size="16" icon="chevron_down" @click="${this._onToggle}"></lit-icon>
			</am-input>
			<am-dropdown id="ddCombo" direction="down">
				комбобокс
			</am-dropdown>
		`;
	}

	_onToggle(event) {
		let d = this.shadowRoot.querySelector('#ddCombo');
		let input = this.shadowRoot.querySelector('#input').shadowRoot.querySelector('.input-content');
        d.open(input);
	}
}

customElements.define('am-combobox', AmCombobox);