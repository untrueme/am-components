import { LitElement, html, css } from 'lit';
import '/forms/login.js';
import "/forms/main.js"
import "/components/am-iconset/am-iconset.js";

class App extends LitElement {
	static get properties() {
		return {
			authorized: { type: Boolean},
		};
	}

	constructor() {
		super();
		this.authorized = localStorage.getItem('isAuthorized') || false;
	}

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener('onAuthorized', (ev) => {
			localStorage.setItem('isAuthorized', true);
			this.authorized = true;
		});

		document.addEventListener('onUnauthorized', (ev) => {
			localStorage.setItem('isAuthorized', false);
			this.authorized = false;
		});
	}

	render() {
		return html`
			<am-login .hidden=${this.authorized}></am-login>
			<am-main .hidden=${!this.authorized}></am-main>
		`;
	}
}

customElements.define('am-app', App);