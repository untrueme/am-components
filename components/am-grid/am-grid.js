import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './am-grid-row.js';
import './am-grid-column.js';
import { AmGridTreeController } from "./am-grid-tree-controller.js";
import { AmGridExpandController } from "./am-grid-expand-controller.js";

class AmGrid extends LitElement {
    static get properties() {
        return {
            data: {
                type: Array,
                attribute: false
            },
            selected: {
                type: Object
            },
            expandTemplate: {
                type: Object,
                attribute: false
            },
            noFit: {
                type: Boolean,
                reflect: true
            },
            tree: {
                type: Boolean
            }
        }
    }

    static get styles() {
        return css`
            :host {
				width: 100%;
				max-height: 100%;
                height: 100%;
				overflow: auto;
				box-sizing: border-box;
                border: 1px solid var(--grey-light);
                font-family: 'Golos Regular';
                font-size: 13px;
            }

            :host([no-fit]) {
                height: auto;
            }

            :host([no-fit]) #container {
                height: auto;
            }
            #container {
				display: flex;
				width: var(--am-grid-container-width, 100%);
                height: 100%;
				flex-direction: column;
                overflow: auto;
            }

            #headerContainer{
                display: flex;
				width: 100%;
				position: sticky;
                background: var(--grey-lightest);
				z-index: 2;
				top: 0;
            }

            #header{
                display: flex;
                width: var(--am-grid-total-width, 100%)
            }

            #rowsContainer {
                width: var(--am-grid-total-width, 100%)
            }
		`;
    }

    constructor() {
        super();
        this.columns = [];
        this.data = [];
        this.vdata = [];
    }

    connectedCallback() {
        super.connectedCallback();
        if(this.tree) {
            this.treeController = new AmGridTreeController(this);
        }

        if(this.expandTemplate) {
            this.expandController = new AmGridExpandController(this);
        }

        this._observer = new MutationObserver((rec) => {
            requestAnimationFrame(() => {
                // if(rec.length == 1) {
                //     let el = rec[0];
                //     if(el.attributeName == 'width') {
                //         el.target.style.setProperty('--am-header-width', `${el.target.width}px`);
                //         this.requestUpdate();
                //     }
                // } else {
                //     this._columnsChanged();
                // }
                this._columnsChanged();

            })
        });

        this._observer.observe(this, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: ['hidden', 'width', 'fixed']
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._observer.disconnect();
    }

    willUpdate(args) {
        if (args.get('data')) {
            if (this.tree) {
                this.vdata = this.data.filter(x => x._level == 0);
            } else {
                this.vdata = this.data;
            }
        }
    }

    render() {
        return html`
            <div id="container">
                <div id="headerContainer">
                    <div id="header">
                        ${repeat(this.columns,
            (column) => column,
            (column, idx) => html`<slot name=${this._getSlotName(idx)}></slot>`)
            }
                    </div>
                </div>
                <div id="rowsContainer">
                        ${repeat(this.vdata,
                (item) => item,
                (item) => html`<am-grid-row ?tree="${this.tree}" .tpl=${this.expandTemplate} .columns="${this.columns}" .item="${item}"></am-grid-row>`)
            }
                    </div>
                </div>
            </div>
        `;
    }

    firstUpdated(args) {
        super.firstUpdated(args);
        this._columnsChanged();
    }

    _columnsChanged() {
        const columnsNodes = Array.prototype.slice.call(this.querySelectorAll('am-grid-column:not([hidden])'));
        const columns = columnsNodes.map((column, index) => {
            column.setAttribute('slot', `column-${index}`);

            if (column.width) {
                column.style.setProperty('--am-header-width', `${column.width}px`);
                column.style.removeProperty('--am-header-flex');
    
            } else {
                column.style.setProperty('--am-header-flex', `1`);
                column.style.removeProperty('--am-header-width');
            }
            
            column.info = {
                kind: column.kind,
                header: column.header,
                field: column.field,
                width: column.width,
                resizable: column.resizable,
                node: column,
                fixed: column.fixed || false
            };

            if (column.fixed) {
                column.style.left = index == 0 ? '0px' : columnsNodes[index - 1].width + 'px';
                column.info.left = index == 0 ? '0' : columnsNodes[index - 1].width;
            }

            return column.info;
        });

        this.columns = columns;
        const totalWidth = columns.map(x => x.width).reduce((a, b) => a + b, 0);
        if (!Number.isNaN(totalWidth)) {
            this.style.setProperty('--am-grid-container-width', `${Math.min(this.scrollWidth, this.clientWidth + this.scrollLeft)}px`);
            this.style.setProperty('--am-grid-total-width', `${totalWidth}px`);
        }

        this.requestUpdate();
    }

    _getSlotName(index) {
        return `column-${index}`;
    }
}

customElements.define('am-grid', AmGrid);
