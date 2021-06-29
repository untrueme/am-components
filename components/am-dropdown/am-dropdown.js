import {html, css, LitElement} from "lit";

class AmDropdown extends LitElement {
    static get properties() {
        return {
            opened: { type: Boolean }
        }
    }
    constructor() {
        super();
        this.opened = false;
    }
    static styles = css`
        :host {
            position: relative;
        }
        .dropdown {
            position: absolute;
            min-height: fit-content;
            min-width: 300px;
            max-height: 600px;
            overflow: auto;
            border: 1px solid #AAAAAA;
            background-color: #FFFFFF;
            display: none;
            z-index: 1;
        }
        .dropdown[opened] {
            display: block;
        }
        .dropdown ::slotted(:hover) {
          background-color: #0a125b;
          color: #FFFFFF;
        }
    `;
    render() {
        return html`<div class="dropdown" ?opened="${this.opened}"><slot></slot></div>`
    }
}

customElements.define('am-dropdown', AmDropdown);