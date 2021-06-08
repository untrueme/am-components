import { LitElement, html, css } from 'lit';
import LitNotify from '../../mixins/lit-notify.js';
import "/components/am-button/am-button.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
class MyElement extends LitNotify(LitElement) {
	static get styles() {
		return css`
			:host {
				display: block;
				border: solid 1px gray;
				width: 484px;
			}
		`;
	}

	static get properties() {
		return {
			elementData: {
				type: String,
				notify: true
			},
			count: {
				type: Number
			},
			data: {
				type: Array,
				notify: true
			},
			el: {
				type: String,
				notify: true
			}
		};
	}

	constructor() {
		super();
		this.count = 0;
		this.elementData = '';
		this.data = [];
	}

	render() {
		return html`
			<div style="margin: 16px">
				<h1>Hello, ${this.elementData}!</h1>
				<am-button label="Clicks: ${this.count}" @click=${this._onClick}></am-button>
				<slot></slot>
			</div>
		`;
	}

	_onClick() {
		this.count++;
		this.elementData = this.count;
		this.data.push({
			name: this.count
		});
	}
}

customElements.define('my-element', MyElement);
