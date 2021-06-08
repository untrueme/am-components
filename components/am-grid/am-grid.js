import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './am-grid-row.js';
class AmGrid extends LitElement {
    static get properties() {
        return {
            data: { type: Array }
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
            }

            #filterContainer{
                width: 100%;
                display: flex;
                flex-direction:row;
            }

            #rowsContainer {
                flex: 1;
            }

            #footerContainer{
                display: flex;
                flex-direction: row;
            }

            .filter {
                width: 100%;
                color: green;
                height: 32px;
                border-right: 1px solid rgb(220, 222, 225);
                border-bottom: 1px solid rgb(220, 222, 225);
            }

            .summary {
                width: 100%;
                color: green;
                height: 32px;
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
    render() {
        return html`
            <div id="container">
                <div id="headerContainer">
                    ${repeat(this.columns,
                        (column) => column,
                        (column, idx) => html`<slot name=${this._getSlotName(idx)}></slot>`)
                        }
                </div>
                <div id="filterContainer">
                    ${repeat(this.columns,
                        (column) => column,
                        (column, idx) => html`${!column.hidden && this.hasFilter
                            ? html`<div class="filter">
                                <slot name=${this._getFilterSlotName(idx)}></slot>
                            </div>`
                            : null}`)
                    }
                </div>
                <div id="rowsContainer">
                    ${repeat(this.data,
                        (item) => item,
                        (item, idx) => html`<am-grid-row .columns="${this.columns}" .item="${item}"></am-grid-row>`)
                    }
                </div>
                <div id="footerContainer">
                    ${repeat(this.columns,
                        (column) => column,
                        (column, idx) => html`${!column.hidden 
                            ? html`<div class="summary">
                                <slot name=${this._getSummarySlotName(idx)}></slot>
                            </div>`
                            : null}`)
                    }
                </div>
            </div>
        `;
    }

    _getNode(col) {
        return col.node.children[0];
    }

    firstUpdated(args) {
        super.firstUpdated(args);
        const columnsNodes = Array.prototype.slice.call(this.querySelectorAll('am-grid-column'));

        const self = this;
        const columns = columnsNodes.map((column, index) => {
            column.setAttribute('slot', `column-${index}`);

            const summary = column.querySelector('am-grid-column-summary');
            if(summary) {
                summary.setAttribute('slot', `column-summary-${index}`);
                self.appendChild(summary);
            }

            const filter = column.querySelector('am-grid-column-filter');
            if(filter) {
                filter.setAttribute('slot', `column-filter-${index}`);
                self.appendChild(filter);
            }

            column.info = {
                header: column.header,
                field: column.field,
                width: column.width,
                node: column,
                hidden: column.hidden || false
            };

            return column.info;
        });

        this.hasFilter = true;
        let data = [
            [
                "1",
                "Иванов Иван Иванович",
                "Мужской",
                "2003-06-30T00:00:00.000+04:00"
            ],
            [
                "2",
                "Петрова Лариса Сидоровна",
                "Женский",
                "2021-05-31T00:00:00.000+03:00"
            ]
        ]

        this.columns = columns;
        this.data = data;
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
