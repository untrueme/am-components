import IMask from 'imask';
import { LitElement } from 'lit';

class ShadowHTMLMaskElement extends IMask.HTMLMaskElement {
    get isActive() {
        let active = document.activeElement;
        while (active && active.shadowRoot && active.shadowRoot.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        return this.input === active;
    }
}

class AmInputMask extends LitElement {
    static get properties() {
        return {
            mask: { type: String }
        }
    }

    firstUpdated() {
        this._input = this.parentElement.shadowRoot.querySelector('input');
        this._imask = new IMask(new ShadowHTMLMaskElement(this._input), this._compileMask());
    }

    _compileMask() {
        return {
            mask: this.mask,
            placeholderChar: '_',
            lazy: false,
            overwrite: true
        };
    }
}


customElements.define('am-input-mask', AmInputMask);