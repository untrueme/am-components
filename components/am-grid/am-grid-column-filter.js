import { LitElement, html, css } from 'lit';

class AmGridColumnFilter extends LitElement {

    static get properties() {
        return {
           
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
           <slot></slot>
        `;
    }
}

customElements.define('am-grid-column-filter', AmGridColumnFilter);
