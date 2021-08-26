import { LitElement, html, css } from 'lit';

class AmGridColumn extends LitElement {

    static get properties() {
        return {
            header: {
                type: String
            },
            width: {
                type: Number,
                reflect: true
            },
            field: {
                type: String
            },
            hidden: {
                type: Boolean,
                reflect: true
            },
            kind: {
                type: String
            },
            resizable: {
                type: Boolean
            },
            template: {
                type: Object,
                attribute: false
            },
            fixed: {
                type: Boolean,
                reflect: true
            }
        }
    }
    static get styles() {
        return css`
            :host{
                box-sizing: border-box;
                flex-direction: row;
                display: flex;
                align-items: center;
                min-height: 32px;
                overflow: hidden;
                background: var(--grey-lightest);
                color: var(--black-lightest);
                z-index: 2;
                font-weight: 500;
                border-bottom: 1px solid var(--grey-light);
                border-right: 1px solid var(--grey-light);
				position: sticky;
				top: 0px;
                font-family: 'Golos Bold';
                font-weight: 500;
                width: var(--am-header-width, auto);
                flex: var(--am-header-flex, unset);
            }

            :host(:last-child) {
                border-right:none;
            }

            :host([hidden]) {
                display: none;
            }

            :host([fixed]) {
                z-index: 3;
                left: 0;
                top: 0;
                will-change: transform;
            }

            :host ::slotted(*) {
                width: 16px;
                height: 16px;
            }

            .header {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
                margin: 0 8px;
            }

            .resizer{
                cursor: ew-resize;
                height: 100%;
                width:4px;
            }
        `;
    }
    render() {
        return html`
            <span class="header">
                <slot name="prefix"></slot>
                ${this.header}
            </span>
            ${this.resizable ? html`<span class="resizer" @mousedown="${this.onResize}"></span>` : null}
        `;
    }

    getTemplate() {
        return this?.template;
    }

    onResize(event) {
        if (!this.width) this.width = this.offsetWidth;
        this._resizeBase = { baseSize: this.width, baseMoveOffset: event.screenX };
        event.preventDefault();
        const moveHandler = (event) => {
            this.width = Math.max(50, this._resizeBase.baseSize + (event.screenX - this._resizeBase.baseMoveOffset));
        };
        const removeHandlers = () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
        };
        const upHandler = (event) => {
            removeHandlers();
        };
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);
    }
}

customElements.define('am-grid-column', AmGridColumn);
