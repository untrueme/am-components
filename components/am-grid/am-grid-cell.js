import { LitElement, html, css } from 'lit';
import dayjs from 'dayjs/esm/index.js';
class AmGridCell extends LitElement {
    static get properties() {
        return {
            column: { type: Object },
            value: { type: Object },
            fixed: { type: Boolean, reflect: true },
            title: { type: String, reflect: true}
        }
    }
    static get styles() {
        return css`
            :host {
                display: flex;
                padding: 0px 8px; 
                box-sizing: border-box;
                align-items: center;
                min-height: 32px;
                background: white;
                color: black;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                border-bottom: 1px solid var(--grey-light);
                border-right: 1px solid var(--grey-light);
                width: var(--am-grid-cell-width);
                flex: var(--am-grid-cell-flex, unset);
                left: var(--am-grid-cell-left, none);
            }

            :host(:last-child) {
                border-right:none;
            }


            :host span{
                white-space: inherit;
                overflow: inherit;
                text-overflow: inherit;
                margin: 0;
            }

            :host([fixed]) {
                position: sticky;
                top: 0;
            }
		`;
    }

    willUpdate(args) {
        if(args.has('column')) {
            if (this.column.width) {
                this.style.setProperty('--am-grid-cell-width', `${this.column.width}px`);
                this.style.removeProperty('--am-grid-cell-flex');
    
            } else {
                this.style.setProperty('--am-grid-cell-flex', `1`);
                this.style.removeProperty('--am-grid-cell-width');
            }
            if(this.column.left != undefined) {
                this.style.setProperty('--am-grid-cell-left', `${this.column.left}px`);
            } else {
                this.style.removeProperty('--am-grid-cell-left');
            }
        }
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
