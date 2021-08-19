import { html, css, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class AmDrawer extends LitElement {
    static get properties() {
        return {
            opened: { type: Boolean },
            position: { type: String },
            contained: { type: Boolean },
            size: { type: String },
            header: { type: String }
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
                width: 320px;
                height: 100%;
                position: fixed;
                background: #fff;
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
                transition: ease 0.2s;
            }

            .container.left.opened  {
                left: 0px;
                visibility: visible;
            }

            .container.right  {
                right: -130%;
                transition: ease 0.2s;
            }

            .container.right.opened  {
                right: 0px;
                visibility: visible;
            }

            .header {
                display: flex;
                flex-direction: row;
                align-items: baseline;
                height: 48px;
                box-sizing: border-box;
                margin: 16px 16px 0px 16px;
                justify-content: space-between;
            }

            .header-text {
                font-style: normal;
                font-weight: 500;
                font-size: 18px;
                line-height: 150%;
                color: var(--black-dark);
            }

            .content {
                height: 100%;
                border-top: 1px solid var(--grey-light);
                border-bottom: 1px solid var(--grey-light);
            }

            .footer{
                display: flex;
                flex-direction: row;
                align-items: baseline;
                height: 48px;
                box-sizing: border-box;
                margin: 16px 16px 0px 16px;
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
                <div class="header">
                    <span class="header-text">${this.header}</span>
                    <lit-icon iconset="iconset-32" size="32" icon="close" @click="${this.close}"></lit-icon>
                </div>
                <div class="content">
                    <slot></slot>
                </div>
                <div class="footer">
                    <slot></slot>
                </div>
            </div>
		`;
    }

    close() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}

customElements.define('am-drawer', AmDrawer);
