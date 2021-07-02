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
                top: 0px;
                will-change: contents;
                z-index: 999;
            }

            .container.contained  {
                position: absolute;
            }

            .container.left  {
                left: -130%;
                transition: left .4s cubic-bezier(0.820, 0.085, 0.195, 0.895);
            }

            .container.left.opened  {
                left: 0px;
            }

            .container.right  {
                right: -130%;
                transition: right .4s cubic-bezier(0.820, 0.085, 0.395, 0.895);
            }

            .container.right.opened  {
                right: 0px;
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
