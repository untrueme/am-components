import { LitElement, html, css } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import './am-grid-cell.js';
import './am-grid-tree-cell.js';

class AmGridRow extends LitElement {
    static get properties() {
        return {
            columns: { type: Array },
            item: { type: Object },
            active: { type: Boolean, reflect: true },
            tpl: { type: Object },
            expanded: { type: Boolean, reflect: true },
            tree: { type: Boolean },
            hidden: { type: Boolean, reflect: true },
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

            :host([hidden]) {
                display: none;
            }

            :host(:hover) am-grid-cell, :host(:hover) am-grid-tree-cell, :host([active]) am-grid-cell, :host([active]) am-grid-tree-cell{
                white-space: normal;
                background: #d3d3d3;
                font-weight:bold;
                flex-direction: row;
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

    render() {
        return html`
            <div class="cellContainer" @click="${this.onClick}">
                ${this.tree ? html`<am-grid-tree-cell .item=${this.item} ?opened=${this.item._opened} .level=${this.item._level} ?leaf=${this.item._leaf}></am-grid-tree-cell>` : null}
                ${this.columns.map((column) => html`
                    <am-grid-cell 
                        ?fixed="${column.fixed}" 
                        style=${styleMap({
                                width: column.width ? column.width + 'px' : null,
                                flex: !column.width ? 1 : null,
                                left: column.left ? column.left : null,
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

    onClick(event){
        if(this.tpl) {
            this.dispatchEvent(new CustomEvent('expand-node-toggle', {
                bubbles: true,
                composed: true,
                detail: {
                    item: this
                }
            }));
    
        }
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
