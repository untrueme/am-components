import { LitElement, html, css } from 'lit';
class AmGridTreeCell extends LitElement {
    static get properties() {
        return {
            level: { type: Number },
            leaf: { type: Boolean },
            hidden: { type: Boolean },
            opened: { type: Boolean },
            item: {type: Object}
        }
    }
    static get styles() {
        return css`
            :host {
                display: flex;
                padding: 0px 0 0 8px; 
                box-sizing: border-box;
                align-items: center;
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
                width: 8px;
            }

            :host([hidden]) {
               display:none;
            }
		`;
    }
    render() {
        return html`
                <span style=${this._getPadding()} @click="${this.onTreeCellClick}">
                    ${this.leaf ? ' ' : this.opened ? '-': '+'}
                </span>`;
    }

    _getPadding() {
        return `padding-left: ${this.level * 24 + 'px'}`;
    }

    onTreeCellClick() {
        this.item._opened = !this.item._opened;
        this.opened = !this.opened;
        this.dispatchEvent(new CustomEvent('tree-node-toggle', {
            bubbles: true,
            composed: true,
            detail: {
                item: this.item
            }
        }));
    }
}

customElements.define('am-grid-tree-cell', AmGridTreeCell);
