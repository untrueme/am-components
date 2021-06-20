import { LitElement, html, css } from 'lit';
import dayjs from 'dayjs/esm/index.js';
class AmGridCell extends LitElement {
    static get properties() {
        return {
            column: { type: Object },
            value: { type: Object },
            hidden: { type: Boolean },
            fixed: { type: Boolean, reflect: true },
            title: { type: String, reflect: true}
        }
    }
    static get styles() {
        return css`
            :host {
                display: flex;
                padding: 4px;
                box-sizing: border-box;
                align-items: center;
                border-right: 1px solid rgb(220, 222, 225);
                border-bottom: 1px solid rgb(220, 222, 225);
                min-height: 32px;
                background: white;
                color: black;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            :host span{
                white-space: inherit;
                overflow: inherit;
                text-overflow: inherit;
                margin: 0;
            }

            :host([hidden]) {
                display: none;
            }

            :host([fixed]) {
                position: sticky;
				left: 0px;
                top: 0;
            }
		`;
    }
    render() {
        return html`<span>${this._getValue()}</span>`;
    }

    _getValue() {
        let tpl = this.column.node.getTemplate();
        if (tpl) {
            return tpl(this.value);
        }

        if (this.column.field) {
            if (this.column.kind) {
                switch (this.column.kind) {
                    case ('date'): {
                        return dayjs(this.value[this.column.field]).format('DD.MM.YYYY');
                    }
                }
            }
            this.title = this.value[this.column.field];
            return this.value[this.column.field];
        }

        return '';
    }
}

customElements.define('am-grid-cell', AmGridCell);
