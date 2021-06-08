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

            #rowsContainer {
                flex: 1;
            }

            #footerContainer{
                height: 32px;
                background:red;
                display: flex;
                flex-direction: row;
            }

            #footerContainer ::slotted(*) {
                width: 100%;
                color: green;
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
                <div id="rowsContainer">
                    ${repeat(this.data, 
                        (item) => item, 
                        (item, idx) => html`<am-grid-row .columns="${this.columns}" .item="${item}"></am-grid-row>`)
                    }
                </div>
                <div id="footerContainer">
                    ${repeat(this.columns, 
                        (column) => column, 
                        (column, idx) => html`${this._getNode(column)}`)
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
        const columns = columnsNodes.map((column, index) => {
            column.setAttribute('slot', `column-${index}`);

            column.info = {
                header: column.header,
                field: column.field,
                width: column.width,
                node: column,
                hidden: column.hidden || false
            };

            return column.info;
        });
        let data2 = [
            [
                { id: 1, fio: 'Иванов Иван Иванович', gender: 'Мужской', birthdate: '2003-06-30T00:00:00.000+04:00' }
            ],
            [
                { id: 2, fio: 'Петрова Лариса Сидоровна', gender: 'Женский', birthdate: '2002-06-30T00:00:00.000+04:00' }
            ]
        ]

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

}

customElements.define('am-grid', AmGrid);
