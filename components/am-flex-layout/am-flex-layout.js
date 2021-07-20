import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class AmFlexLayout extends LitElement {
    static get properties() {
        return {
            vertical: {
                type: Boolean,
                reflect: true
            },
            wrap: {
                type: Boolean,
                reflect: true
            },
            fitHorizontal: {
                type: Boolean,
                reflect: true
            },
            fitVertical: {
                type: Boolean,
                reflect: true
            },
            scrollable: {
                type: Boolean,
                reflect: true
            }
        };
    }

    constructor() {
        super();
        this.vertical = false;
        this.wrap = false;
        this.fitHorizontal = false;
        this.fitVertical = false;
    }

    static get styles() {
        return css`
            :host {
                box-sizing: border-box;
                display: flex;
                width: fit-content;
                height: fit-content;
                gap: 8px;
                position: relative;
                flex-direction: row;
                align-items: flex-start;
            }


            :host([fit-horizontal]) {
                width: 100% !important;
            }

            :host([vertical]) {
                -ms-flex-direction: column;
                -webkit-flex-direction: column;
                flex-direction: column;
            }

            :host([fit-vertical]) {
               height: 100% !important;
            }

            :host([wrap]) {
                flex-wrap: wrap;
            }

            :host([scrollable]) {
                overflow: auto
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
