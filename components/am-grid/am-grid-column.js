import { LitElement, html, css } from 'lit';

class AmGridColumn extends LitElement {

    static get properties() {
        return {
            header: {
                type: String
            },
            width: {
                type: String
            },
            field: {
                type: String
            },
            hidden: {
                type: Boolean,
                reflect: true
            },
            kind: {
                type: String
            },
            template: {
                type: Object,
                attribute: false
            }
        }
    }
    static get styles() {
        return css`
            :host{
                width: 100%;;
                color: black;
                font-weight:bold;
                flex-direction: row;
                overflow: hidden;
                display: flex;
                align-items: center;
                background: rgb(32, 156, 238);
                color: white;
                padding: 0 8px;
                border-right: 1px solid #DCDEE1;
                height: 32px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            :host([hidden]) {
                display: none;
            }
            :host ::slotted(*) {
                width: 16px;
                height: 16px;
            }
        `;
    }
    render() {
        return html`
            <slot name="prefix"></slot>
            ${this.header}
        `;
    }

    getTemplate() {
        return this?.template;
    }
}

customElements.define('am-grid-column', AmGridColumn);
