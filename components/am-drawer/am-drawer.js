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
        this.size = 'small';
    }

    static get styles() {
        return css`
            .container {
                height: 100%;
                position: fixed;
                background: rgb(255, 255, 255);
                will-change: contents;
                z-index: 999;
                top: 0px;
                box-sizing: border-box;
                visibility: hidden;
                display: flex;
                flex-direction: column;
                transition: ease 0.2s;
            }

            :host([size=small]) .container{
                width: 320px;
            }

            :host([size=medium]) .container{
                width: 560px;
            }

            :host([size=large]) .container{
                width: 920px;
            }

            .container.contained  {
                position: absolute;
            }

            .container.left  {
                left: -130%;
            }

            .scrim {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              background: var(--black-dark);
              opacity: 0;              
              transition: opacity 220ms;
              z-index: 100;
              display: none;
            }

            .scrim.opened {
              opacity: 0.3;
              display: block;
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            }

            .container.left.opened  {
                left: 0px;
                visibility: visible;
            }

            .container.right  {
                right: -130%;
            }

            .container.right.opened  {
                right: 0px;
                visibility: visible;
            }

            .header {
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 64px;
                box-sizing: border-box;
                margin: 0 16px 0px;
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

            .footer ::slotted(*) {
                display: flex;
                flex-direction: row;
                box-sizing: border-box;
                padding: 8px;
                height: 48px;
            }
        `
    }

    render() {
        return html`
            <div class=${classMap({
                'scrim': true,
                'opened': this.opened
            })}></div>
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
                    <slot name="footer"></slot>
                </div>
            </div>
		`;
    }

    close() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}

customElements.define('am-drawer', AmDrawer);
