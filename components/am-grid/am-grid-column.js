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
                color: white;
                min-height: 32px;
                overflow: hidden;
            }
            :host([hidden]) {
                display: none;
            }
            :host ::slotted(*) {
                width: 16px;
                height: 16px;
            }

            .header {
                font-weight:bold;
                text-overflow: ellipsis;
                width: 100%;
                padding: 0 8px;
            }

            .resizer{
                cursor: ew-resize;
                border-right: 1px solid #DCDEE1;
                height: 100%;
                width:2px;
            }
        `;
    }
    render() {
        return html`
            <span class="header"><slot name="prefix"></slot>${this.header}</span>
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
