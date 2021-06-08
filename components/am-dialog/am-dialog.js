import { LitElement, html, css } from 'lit';

class AmDialog extends LitElement {
    static get properties() {
        return {
            open: { 
                type: Boolean
            }
        };
    }

    constructor(){
        super();
        this.open = false;
    }

    static get styles() {
        return css`
        .wrapper {
            opacity: 0;
            transition: visibility 0s, opacity 0.25s ease-in;
        }
        .wrapper:not(.open) {
            visibility: hidden;
        }
        .wrapper.open {
            align-items: center;
            display: flex;
            justify-content: center;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 1;
            visibility: visible;
        }
        .overlay {
            background: rgba(0, 0, 0, 0.8);
            height: 100%;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
        }
        .dialog {
            background: #ffffff;
            max-width: 600px;
            padding: 1rem;
            position: fixed;
        }`;
    }

    render() {
        return html`
        <div class="wrapper ${this.open ? 'open' : ''}" aria-hidden="${!this.open}">
        <div class="overlay" @click="${this.close}"></div>
        <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
            <button class="close" aria-label="Close" @click=${this.close}>✖️</button>
            <h1 id="title"><slot name="heading"></slot></h1>
            <div id="content" class="content">
            <slot></slot>
            </div>
        </div>
        </div>`;
    }

    firstUpdated() {
        this._watchEscape = this._watchEscape.bind(this);
        document.addEventListener('keydown', this._watchEscape);
    }

    _watchEscape(event) {
        if (event.key === 'Escape') {
            this.close();   
        }
    }

    close() {
        this.open = false
        this.dispatchEvent(new CustomEvent('dialog-closed'));
    }
}

customElements.define('am-dialog', AmDialog);
