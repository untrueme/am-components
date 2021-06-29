import { html, css, LitElement } from 'lit';

class AmAppMenu extends LitElement {
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
                position: absolute;
                overflow:hidden;
                width: 300px;
                height: 100%;
                top: 0;
                right: 0;
                bottom: 0;
                left:0;
                box-shadow: 8px 0 20px 0 rgba(150, 160, 173, 0.2);
                will-change: contents;
                transform: translate3d(-100px, 0, 0);
                border-left: 1px solid #42436A;
                visibility: hidden;
                flex-direction: column;
                z-index: 4;
                transition: ease 0.5s;
            }

            :host([opened]) {
                display: flex;
                visibility: visible;
                left:64px;
                transform: translate3d(0, 0, 0);
                background: rgb(28, 39, 61);
            }

            @media (min-width: 320px) and (max-width: 768px) {
                :host {
                    top: 48px;
                    height: calc(100% - 48px);
                }

                :host([opened]) {
                    left:0;
                }
            }
        `
    }

    render() {
        return html`
            
		`;
    }
}

customElements.define('am-app-menu', AmAppMenu);
