import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './am-grid-row.js';
class AmGrid extends LitElement {
    static get properties() {
        return {
            data: {
                type: Array,
                attribute: false
            },
            selected: {
                type: Object
            }
        }
    }

    static get styles() {
        return css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                overflow: auto;
                box-sizing: border-box;
                border: 1px solid rgb(32, 156, 238);
            }

            #container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            #headerContainer{
                width: 100%;
                display: flex;
                flex-direction:row;
                box-sizing: border-box;
            }

            #filterContainer{
                width: 100%;
                display: flex;
                flex-direction:row;
                box-sizing: border-box;
            }

            #rowsContainer {
                flex: 1;
                overflow: auto;
            }

            #footerContainer{
                display: flex;
                flex-direction: row;
                box-sizing: border-box;
            }

            .filter {
                width: 100%;
                color: green;
                height: 32px;
                padding: 0px 8px;
                border-right: 1px solid rgb(220, 222, 225);
                border-bottom: 1px solid rgb(220, 222, 225);
            }

            .summary {
                width: 100%;
                color: green;
                height: 32px;
                padding: 0px 8px;
                border-right: 1px solid rgb(220, 222, 225);
                border-top: 1px solid rgb(220, 222, 225);
            }
		`;
    }

    constructor() {
        super();
        this.columns = [];
        this.data = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this._observer = new MutationObserver((rec) => {
            this._columnsChanged();
        });

        this._observer.observe(this, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: ['hidden', 'width']
        });

    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._observer.disconnect();
    }

    render() {
        return html`
            <div id="container">
                <div id="headerContainer">
                    ${repeat(this.columns,
                        (column) => column,
                            (column, idx) => html`<slot name=${this._getSlotName(idx)}></slot>`)
                        }
                </div>
                <!-- <div id="filterContainer">
                    ${repeat(this.columns,
                        (column) => column,
                        (column, idx) => html`${!column.hidden
                            ? html`
                                <div class="filter" style="${column.width ? `width:${column.width}px`: null}">
                                    <slot name=${this._getFilterSlotName(idx)}></slot>
                                </div>`
                            : null}`)
                    }
                </div> -->
                <div id="rowsContainer">
                    ${repeat(this.data,
                        (item) => item,
                        (item) => html`<am-grid-row .columns="${this.columns}" .item="${item}"></am-grid-row>`)
                    }
                </div>
                <div id="footerContainer">
                    ${repeat(this.columns,
                        (column) => column,
                        (column, idx) => html`${!column.hidden
                            ? html`<div style="${column.width ? `width:${column.width}px`: 'flex:1'}" class="summary">
                                        <slot name=${this._getSummarySlotName(idx)}></slot>
                                    </div>`
                            : null}`
                        )
                    }
                </div>
            </div>
        `;
    }

    firstUpdated(args) {
        super.firstUpdated(args);
        this._columnsChanged();
    }

    _columnsChanged() {
        const columnsNodes = Array.prototype.slice.call(this.querySelectorAll('am-grid-column'));
        this.hasFilter = false;
        this.hasSummary = false;
        const self = this;
        const columns = columnsNodes.map((column, index) => {
            column.setAttribute('slot', `column-${index}`);

            const summary = column.querySelector('am-grid-column-summary');
            if (summary) {
                summary.setAttribute('slot', `column-summary-${index}`);
                self.appendChild(summary);
            }

            const filter = column.querySelector('am-grid-column-filter');
            if (filter) {
                filter.setAttribute('slot', `column-filter-${index}`);
                self.appendChild(filter);
            }
            if(column.width) {
                column.style.width = column.width + 'px';
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
                hidden: column.hidden || false
            };

            return column.info;
        });

        this.columns = columns;
        this.requestUpdate();
    }

    _getSlotName(index) {
        return `column-${index}`;
    }

    _getSummarySlotName(index) {
        return `column-summary-${index}`;
    }

    _getFilterSlotName(index) {
        return `column-filter-${index}`;
    }

}

customElements.define('am-grid', AmGrid);
