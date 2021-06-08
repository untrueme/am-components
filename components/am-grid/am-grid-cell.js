import { LitElement, html, css } from 'lit';

class AmGridCell extends LitElement {
    static get properties() {
        return {
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
                }
            :host([hidden]) {
                display: none;
            }
		`;
    }
    render() {
        return html`
            ${this.value}
        `;
    }
}

customElements.define('am-grid-cell', AmGridCell);
