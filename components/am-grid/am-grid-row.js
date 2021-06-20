import { LitElement, html, css } from 'lit';
import './am-grid-cell.js';
class AmGridRow extends LitElement {

    static get properties() {
        return {
            columns: { type: Array },
            item: { type: Object },
            active: { type: Boolean, reflect: true }
        }
    }

    static get styles() {
        return css`
            :host{
                display: flex;
                flex-direction: row;
                min-height: 32px;
                box-sizing: border-box;
            }


            :host(:hover) am-grid-cell{
                background: #DCDEE1;
                font-weight:bold;
                white-space: normal;
            }

            :host([active]) am-grid-cell{
                white-space: normal;
            }
		`;
    }

    connectedCallback(){
        super.connectedCallback();

        this.addEventListener('click', (ev) => {
            this.active = true;
        })
    }

    render() {
        return html`
            ${this.columns.map((column) => html`
                <am-grid-cell ?fixed="${column.fixed}" style="${column.width ? `width:${column.width}px` : "flex:1"}" .column=${column} .value=${this.item}></am-grid-cell>`
        )}
        `;
    }
}

customElements.define('am-grid-row', AmGridRow);
