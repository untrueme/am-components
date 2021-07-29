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
            }

            :host([no-fit]) {
                height: auto;
            }

            :host([no-fit]) #container {
                height: auto;
            }
            #container {
				display: flex;
				width: 100%;
                height: 100%;
				flex-direction: column;
                overflow: auto;
            }

            #headerContainer{
                display: flex;
				width: 100%;
				position: sticky;
                background: rgb(28, 39, 61);
				z-index: 2;
				top: 0;
            }

            #header{
                display: flex;
                width: 100%;
            }

            .row {
                display: flex
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
            window.requestAnimationFrame(() => {
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
                column.style.width = column.width + 'px';
                column.style.flex = null;
            } else {
                column.style.flex = '1';
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
                column.style.left = index == 0 ? 0 : columnsNodes[index - 1].width + 'px';
                column.info.left = index == 0 ? 0 : columnsNodes[index - 1].width + 'px';
            }

            return column.info;
        });

        this.columns = columns;
        const totalWidth = columns.map(x => x.width).reduce((a, b) => a + b, 0);
        if (!Number.isNaN(totalWidth)) {
            this.shadowRoot.querySelector('#container').style.width = `${Math.min(this.scrollWidth, this.clientWidth + this.scrollLeft)}px`;
            this.shadowRoot.querySelector('#header').style.width = `${totalWidth}px`;
            this.shadowRoot.querySelector('#rowsContainer').style.width = `${totalWidth}px`;
        }

        this.requestUpdate();
    }

    _getSlotName(index) {
        return `column-${index}`;
    }
}

customElements.define('am-grid', AmGrid);
