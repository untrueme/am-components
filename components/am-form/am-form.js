import { LitElement, html, css } from 'lit';

class AmForm extends LitElement {

	static get properties() {
		return {
			args: { type: Object },
			formTitle: { type: String }
		}
	}
	static get styles() {
		return css`
			
		`;
	}
	render() {
		return html`
            <slot></slot>
        `;
	}

	close() {
		this.dispatchEvent(new CustomEvent('on-form-close', { composed: true, bubbles: true }));
	}
}

customElements.define('am-form', AmForm);
