import { LitElement, html, css } from 'lit';

class AmFlexLayout extends LitElement {
    static get properties() {
        return {
            vertical: {
                type: Boolean,
                reflect: true
            },
            hidden: {
                type: Boolean,
                reflect: true
            },
            wrap: {
                type: Boolean,
                reflect: true
            },
            fit: {
                type: String,
                reflect: true
            },
            scrollable: {
                type: Boolean,
                reflect: true
            },
            align: {
                type: String,
                reflect: true
            },
            justify: {
                type: String,
                reflect: true
            }
        };
    }

    constructor() {
        super();
        this.vertical = false;
        this.wrap = false;
        this.fit = 'none';
    }

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                gap: 8px;
                width: fit-content;
                height: fit-content;
                position: relative;
                box-sizing: border-box;
            }

            :host([hidden]) {
                display: none;
            }

            :host([vertical]) {
                flex-direction: column;
            }

            :host([wrap]) {
                flex-wrap: wrap;
            }

            :host([scrollable]) {
                overflow: auto
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

            :host([justify=flex-start]) {
                justify-content: flex-start;
            }

            :host([justify=center]) {
                justify-content: center;
            }

            :host([justify=flex-end]) {
                justify-content: flex-end;
            }

            :host([justify=space-between]) {
                justify-content: space-between;
            }

            :host([align=flex-start]) {
                align-items: flex-start;
            }

            :host([align=center]) {
                align-items: center;
            }

            :host([align=flex-end]) {
                align-items: flex-end;
            }

            :host([align=baseline]) {
                align-items: baseline;
            }
       `;
    }

    render() {
        return html`
            <slot></slot>
        `;
    }
}

customElements.define('am-flex-layout', AmFlexLayout);
