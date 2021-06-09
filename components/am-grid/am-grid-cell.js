import { LitElement, html, css } from 'lit';
import dayjs from 'dayjs/esm/index.js';
class AmGridCell extends LitElement {
    static get properties() {
        return {
            column: { type: Object },
            value: { type: String },
            hidden: { type: Boolean }
        }
    }
    static get styles() {
        return css`
            :host {
                display: flex;
                padding: 0px 8px;
                align-items: center;
                width: 100%;
                border-right: 1px solid rgb(220, 222, 225);
                border-bottom: 1px solid rgb(220, 222, 225);
                overflow: hidden;
                text-overflow: ellipsis;
            }

            :host([hidden]) {
                display: none;
            }
		`;
    }
    render() {
        return html`${this._getValue()}`;
    }

    _getValue() {
        let tpl = this.column.node.getTemplate();
        if (tpl) {
            return tpl;
        }
        if (this.column.kind) {
            switch (this.column.kind) {
                case ('date'): {
                    return dayjs(this.value).format('DD.MM.YYYY')
                }
            }
        }
        return this.value;
    }
}

customElements.define('am-grid-cell', AmGridCell);
