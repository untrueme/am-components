import { LitElement, html, css } from 'lit';

class AmGridColumnSummary extends LitElement {

    static get properties() {
        return {
            field: {
                type: String
            },
            hidden: {
                type: Boolean
            },
            data: {
                type:String
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
                background: transparent;
                color: black;
                padding: 0 8px;
                height: 32px;
            }
            :host([hidden]) {
                display: none;
            }
            	
        `;
    }
    render() {
        return html`
            ${this.data}
        `;
    }
}

customElements.define('am-grid-column-summary', AmGridColumnSummary);
