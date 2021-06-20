import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './am-grid-row.js';
import './am-grid-column.js';

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
				width: 100%;
				max-height: 100%;
                height: 100%;
				overflow: auto;
				box-sizing: border-box;
				border: 1px solid #484848;
            }

            #container {
				display: flex;
				height: 100%;
				width: 100%;
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
            }

            .row {
                display: flex
            }

            #rowsContainer {
                flex: 1;
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
            window.requestAnimationFrame(()=>{
                this._columnsChanged()
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
                    ${repeat(this.data,
                            (item) => item,
                            (item) => html`<am-grid-row  .columns="${this.columns}" .item="${item}"></am-grid-row>`)
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
        const columnsNodes = Array.prototype.slice.call(this.querySelectorAll('am-grid-column'));
        const columns = columnsNodes.map((column, index) => {
            column.setAttribute('slot', `column-${index}`);
           
            if(column.width) {
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
                fixed: column.fixed || false,
                hidden: column.hidden || false
            };

            return column.info;
        });

        this.columns = columns;
        const totalWidth = columns.map(x => x.width).reduce((a, b) => a + b, 0);
        if(!Number.isNaN(totalWidth)) {
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
