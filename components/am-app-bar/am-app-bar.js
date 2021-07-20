import { html, css, LitElement } from 'lit';

class AmAppBar extends LitElement {
    static get styles() {
        return css`
            :host {
                width: 64px;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                color: white;
                flex-shrink: 0;
                z-index:5;
            }

            .menu-top {
                display: flex;
                align-items: center;
                flex-direction: column;
            }
            .menu-bottom {
                display: flex;
                align-items: center;
                flex-direction: column;
            }

            @media (min-width: 320px) and (max-width: 768px) {
                :host {
                    flex-direction: row;
                    width: 100% !important;
                    height: 48px
                }
                .menu-top {
                    padding: 0;
                    flex-direction: row;
                }
                .menu-bottom {
                    padding: 0;
                    flex-direction: row;
                }
            }
        `
    }

    render() {
        return html`
			 <div class="menu-top">
              <slot name="top"></slot>
            </div>
            <div class="menu-bottom">
              <slot name="bottom"></slot>
            </div>
            <slot></slot>
		`;
    }
}

customElements.define('am-app-bar', AmAppBar);
