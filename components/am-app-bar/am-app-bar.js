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
                z-index:1;
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
