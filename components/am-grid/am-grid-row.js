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
            ${this.columns.map((column) => html`
                <am-grid-cell style="${column.width ? `width:${column.width}px`: "flex:1"}" .column=${column} ?hidden=${column.hidden} .value=${this.item}></am-grid-cell>`
            )}
        `;
    }
}

customElements.define('am-grid-row', AmGridRow);
