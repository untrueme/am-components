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
                position: fixed;
                background: #fff;
                box-shadow: var(--nv-box-shadow);
                top: 0px;
                will-change: contents;
                left: -130%;
                z-index: 999;
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
            <am-button label="close" @click="${this.close}"></am-button>
		`;
    }

    close(){
        this.dispatchEvent(new CustomEvent('close'));
    }
}

customElements.define('am-drawer', AmDrawer);
