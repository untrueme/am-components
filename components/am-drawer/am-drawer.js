import { html, css, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class AmDrawer extends LitElement {
    static get properties() {
        return {
            opened: { type: Boolean },
            position: { type: String },
            contained: { type: Boolean }
        }
    }
    constructor() {
        super();
        this.opened = false;
        this.contained = false;
        this.position = 'left';
    }

    static get styles() {
        return css`
            .container {
                padding: 16px;
                width: 300px;
                height: 100%;
                position: fixed;
                background: #fff;
                box-shadow: var(--nv-box-shadow);
                will-change: contents;
                z-index: 999;
                top: 0px;
                box-sizing: border-box;
                visibility: hidden;
            }

            .container.contained  {
                position: absolute;
            }

            .container.left  {
                left: -130%;
                transition: ease 0.5s;
            }

            .container.left.opened  {
                left: 0px;
                visibility: visible;
            }

            .container.right  {
                right: -130%;
                transition: right .4s cubic-bezier(0.820, 0.085, 0.395, 0.895);
            }

            .container.right.opened  {
                right: 0px;
                visibility: visible;
            }
        `
    }

    render() {
        return html`
            <div class=${classMap({
                'container': true,
                'left': this.position == 'left',
                'right': this.position == 'right',
                'opened': this.opened,
                'contained': this.contained
            })}>
                <slot></slot>
                <am-button label="close" @click="${this.close}"></am-button>
            </div>
		`;
    }

    close() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}

customElements.define('am-drawer', AmDrawer);
