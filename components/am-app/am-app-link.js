import { LitElement, html, css } from 'lit';
import { navigator } from '../../mixins/lit-element-router.js';

class Link extends navigator(LitElement) {
	static get styles() {
		return css`
			a {
                color: white;
            }
		`;
	}
    static get properties() {
        return {
            href: { type: String },
            name: { type: String},
            active: {
                reflect: true,
                type: Boolean
            }
        };
    }
    constructor() {
        super();
        this.href = '';
    }
    render() {
        return html`
            <a href='${this.href}' @click='${this.linkClick}'>
                <slot></slot>
            </a>
        `;
    }
    linkClick(event) {
        event.preventDefault();
        this.navigate(this.href);
    }
}
 
customElements.define('app-link', Link);
