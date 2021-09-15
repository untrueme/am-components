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

		this.resizers = [];
  
		this.addEventListener('resize-notify-required', (ev) => {
		  ev.stopPropagation();
		  this.resizers.push(ev.detail)
		});
		
		
		const resizeObserver = new ResizeObserver(() => {
			window.requestAnimationFrame(() => {
				this.resizers.forEach(el => el.cb());
			});
		});
		  
		resizeObserver.observe(document.body);
	}

	firstUpdated(args){
		super.firstUpdated(args);
		document.querySelector('#preloader').style.display="none";
	}

	render() {
		return html`
			<am-login .hidden=${this.authorized}></am-login>
			<am-main .hidden=${!this.authorized}></am-main>
		`;
	}
}

customElements.define('am-app', App);