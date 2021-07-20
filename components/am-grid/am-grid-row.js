import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import './am-grid-cell.js';

class AmGridRow extends LitElement {
    static get properties() {
        return {
            columns: { type: Array },
            item: { type: Object },
            active: { type: Boolean, reflect: true },
            tpl: { type: Object },
            expanded: { type: Boolean, reflect: true }
        }
    }

    static get styles() {
        return css`
            :host{
                display: flex;
                flex-direction: column;
                min-height: 32px;
                background: white;
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
                z-index: 1;
            }

            .expandContainer .expanded {
                height: auto;
                width: 100%;
                display: flex;
                min-height: fit-content;
                padding: 0px 8px;
                box-sizing: border-box;
                overflow: hidden;
                -webkit-animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	            animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
            }

            @keyframes slide-bottom{
                0% {
                    transform:translateY(-32px)
                }
                100%{
                    transform:translateY(0px)
                }
            }
		`;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        return html`

            <div class="cellContainer">
                ${this.columns.map((column) => html`
                    <am-grid-cell 
                        ?fixed="${column.fixed}" 
                        style=${styleMap({ 
                                width: column.width ? column.width + 'px': null, 
                                flex: !column.width ? 1 : null ,
                                left: column.left ? column.left : null
                            })
                        }
                        .column=${column} 
                        .value=${this.item}>
                    </am-grid-cell>`
        )}
            </div>
            <div class="expandContainer">
                ${this.expanded ? html`<div class="expanded">${this.tpl && this.tpl(this.item)}</div>` : null}
            </div>
        `;
    }

    collapse() {
        this.expanded = false;
    }

    expand() {
        if (this.tpl) {
            this.expanded = true;
        }
    }
}

customElements.define('am-grid-row', AmGridRow);
