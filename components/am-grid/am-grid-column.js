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
                type: Boolean
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
            }
            :host([hidden]) {
                display: none;
            }
            	
        `;
    }
    render() {
        return html`
            ${this.header}
        `;
    }
}

customElements.define('am-grid-column', AmGridColumn);
