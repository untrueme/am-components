import { LitElement, html, css } from 'lit';
import './am-grid-cell.js';
class AmGridRow extends LitElement {

    static get properties() {
        return {
            columns: { type: Array },
            item: { type: Object },
            active: { type: Boolean, reflect: true },
            tpl: {type: Object},
            expanded: { type: Boolean, reflect: true}
        }
    }

    static get styles() {
        return css`
            :host{
                display: flex;
                flex-direction: column;
                min-height: 32px;
                border-bottom: 1px solid rgb(220, 222, 225);
            }

            :host(:hover) am-grid-cell{
                background: #f5f5f5;
                font-weight:bold;
                white-space: normal;
                display: flex;
                flex-direction: row
            }

            :host([active]) am-grid-cell{
                white-space: normal;
                background: #f5f5f5;
            }

            .cellContainer {
                width: 100%;
                display: flex;
            }

            .expandContainer {
                overflow: hidden;
                display: flex;
                padding: 4px;
            }
		`;
    }

    connectedCallback(){
        super.connectedCallback();
    }

    render() {
        return html`
            <div class="cellContainer">
                ${this.columns.map((column) => html`
                    <am-grid-cell ?fixed="${column.fixed}" style="${column.width ? `width:${column.width}px` : "flex:1"}" .column=${column} .value=${this.item}></am-grid-cell>`
                )}
            </div>
            ${this.expanded ? html`<div class="expandContainer">${this.tpl && this.tpl(this.item)}</div>` : null}
        `;
    }

    collapse(){
        this.expanded = false;
    }

    expand(){
        if(this.tpl) {
            this.expanded = true;
        }
    }
}

customElements.define('am-grid-row', AmGridRow);
