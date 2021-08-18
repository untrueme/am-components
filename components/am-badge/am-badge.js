import { LitElement, html, css } from 'lit';

class AmBadge extends LitElement {
	static get properties() {
		return {
			pulse: {
				type: Boolean,
				reflect: true
			}
		}
	}
	static get styles() {
		return css`
           :host {
                display: inline-flex;
				align-items: center;
				background-color: var(--primary-base);
				box-sizing: border-box;
				border-radius:18px;
				color: rgb(255, 255, 255);
				display: flex;
				font-size: 12px;
				font-weight: 500;
				height: 18px;
				justify-content: center;
				line-height: 12px;
				padding: 3px 6px;
				user-select: none;
				white-space: nowrap;
            }

			:host([pulse]) {
				animation: pulse 1.5s infinite;
			}

			@keyframes pulse {
				0% {
					box-shadow: 0 0 0 0 var(--primary-light);
				}
				70% {
					box-shadow: 0 0 0 0.5rem transparent;
				}
				100% {
					box-shadow: 0 0 0 0 transparent;
				}
			}
		`;
	}
	render() {
		return html`
        <span role="status">
          <slot></slot>
        </span>
      `;
	}
}

customElements.define('am-badge', AmBadge);
