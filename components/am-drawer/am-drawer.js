import { html, css, LitElement } from 'lit';

class AmDrawer extends LitElement {
    static get properties() {
        return {
            opened: { type: Boolean, reflect: true }
        }
    }
    constructor() {
        super();
        this.opened = false;
    }

    static get styles() {
        return css`
            :host {
                padding: 16px;
                width: 300px;
                height: 100%;
                position: absolute;
                background: red;
                top: 0px;
                left: -130%;
                z-index: 3;
                transition: left .3s cubic-bezier(0.820, 0.085, 0.395, 0.895);
            }

            :host([opened]) {
                left: 0px;
            }
        `
    }

    render() {
        return html`
            <slot></slot>
		`;
    }
}

customElements.define('am-drawer', AmDrawer);
