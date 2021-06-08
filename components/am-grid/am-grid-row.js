import { LitElement, html, css } from 'lit';
import './am-grid-cell.js';
class AmGridRow extends LitElement {
    static get properties() {
        return {
            columns: { type: Array },
            item: { type: Object }
        }
    }
    static get styles() {
        return css`
            :host{
                display: flex;
                flex-direction: row;
                height: 32px;
            }

            :host(:hover) {
                background: #DCDEE1;
                font-weight:bold;
            }
		`;
    }
    render() {
        return html`
            ${this.columns.map((x, idx) => html`
                <am-grid-cell ?hidden=${x.hidden} .value=${this.item[idx]}></am-grid-cell>`
            )}
        `;
    }
}

customElements.define('am-grid-row', AmGridRow);
