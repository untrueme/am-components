import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class AmFlexLayout extends LitElement {
    static get properties() {
        return {
            vertical: {
                type: Boolean,
                reflect: false
            },
            wrap: {
                type: Boolean,
                reflect: false
            },
            fitHorizontal: {
                type: Boolean,
                reflect: false
            },
            fitVertical: {
                type: Boolean,
                reflect: false
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
                position: relative;
                height: 100%;
                width: 100%;
            }

            :host .layout {
                box-sizing: border-box;
                display: flex;
                width: fit-content;
                height: fit-content;
                gap: 8px;
                align-items: start;
            }

            :host .layout.horizontal {
                -ms-flex-direction: row;
                -webkit-flex-direction: row;
                flex-direction: row;
            }

            :host .layout.fit-horizontal {
                width: 100%;
            }

            :host .layout.vertical {
                -ms-flex-direction: column;
                -webkit-flex-direction: column;
                flex-direction: column;
            }

            :host .layout.fit-vertical {
               height: 100%;
            }

            :host .wrap {
                flex-wrap: wrap;
            }
       `;
    }

    render() {
        return html`
            <div class=${classMap({
                'layout': true,
                'horizontal': !this.vertical,
                'vertical': this.vertical,
                'wrap': this.wrap,
                'fit-vertical': this.fitVertical,
                'fit-horizontal': this.fitHorizontal
            })}>
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('am-flex-layout', AmFlexLayout);
