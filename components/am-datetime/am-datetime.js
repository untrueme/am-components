import { html, css, LitElement } from 'lit';
import '/components/am-dropdown/am-dropdown.js';
import '/components/am-datetime/am-datetime-calendar.js';

import '/components/am-input/am-input.js';
import IMask from 'imask';

class ShadowHTMLMaskElement extends IMask.HTMLMaskElement {
    get isActive() {
        let active = document.activeElement;
        while (active && active.shadowRoot && active.shadowRoot.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        return this.input === active;
    }
}


class AmDateTime extends LitElement {
	static get properties() {
		return {
			value: { type: String, notify: true },
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

            am-input {
                --input-content-width: 140px;
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
			<am-input id="input" label="datetime">
			    <lit-icon slot="suffix" iconset="iconset-16" size="16" icon="cancel"></lit-icon>
				<lit-icon slot="suffix" iconset="iconset-16" size="16" icon="history" @click="${this._onToggle}"></lit-icon>
			</am-input>
			<am-dropdown id="ddCombo">
				<am-datetime-calendar></am-datetime-calendar>
			</am-dropdown>
		`;
	}

    _compileMask() {
        return {
            mask: Date,  // enable date mask
            placeholderChar: '_',
            lazy: false,
            overwrite: true,
            autofix: false,  // defaults to `false`
            blocks: {
                d: {
                  mask: IMask.MaskedRange,
                  from: 1,
                  to: 31,
                  maxLength: 2,
                },
                m: {
                  mask: IMask.MaskedRange,
                  from: 1,
                  to: 12,
                  maxLength: 2,
                },
                Y: {
                  mask: IMask.MaskedRange,
                  from: 0,
                  to: 9999,
                }
            },
        };
    }

	

    firstUpdated() {
        window.requestAnimationFrame(() => {
            this._input = this.shadowRoot.querySelector('am-input')._input;
            this._imask = new IMask(new ShadowHTMLMaskElement(this._input), this._compileMask());
        });
    }

	_onToggle(event) {
		let d = this.shadowRoot.querySelector('#ddCombo');
		let input = this.shadowRoot.querySelector('#input');
        d.open(input);
	}
}

customElements.define('am-datetime', AmDateTime);