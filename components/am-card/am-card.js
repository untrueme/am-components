import { html, css, LitElement } from 'lit';

class AmCard extends LitElement {
    static get properties() {
        return {
            header: { type: String },
            fit: { type: String }
        }
    }

    static get styles() {
        return css`
            :host{
                display: flex;
                flex-direction: column;
                border: 1px solid var(--grey-light);
                border-radius: 4px;
                width: fit-content;
                height: fit-content;
            }

            :host([fit=horizontal]) {
                width: 100% !important;
            }

            :host([fit=vertical]) {
                height: 100% !important;
            }

            :host([fit=all]) {
                height: 100% !important;
                width: 100% !important;
            }

            .header {
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 48px;
                box-sizing: border-box;
                justify-content: space-between;
                margin: 0 16px 0px;
                gap: 8px;
            }

            .header-text {
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 150%;
                color: var(--black);
            }

            .header-text:empty{
                display: none;
            }

            .content {
                height: 100%;
                border-top: 1px solid var(--grey-light);
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
            <div class="header">
                <slot name="header"></slot>
                <span class="header-text">${this.header}</span>
                <slot name="tools"></slot>
            </div>
            <div class="content">
                <slot></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>
		`;
    }
}

customElements.define('am-card', AmCard);
