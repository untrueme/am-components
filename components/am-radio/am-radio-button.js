import { html, css, LitElement } from 'lit';

export class AmRadioButton extends LitElement {

	static get properties() {
		return {
			label: { type: String },
			caption: {  type: String }
		}
	}

	static get styles() {
		return css`
			:host {
                display: flex;
            }
			.radio {
				cursor: pointer;
				padding: 4px 0;
				border-radius: 6px;
				overflow: hidden;
				transition: all 0.2s ease;
				display: flex;
			}
			
			.radio .radio-button {
				position: relative;
				width: 18px;
				height: 18px;
				border-radius: 18px;
				transform: scale(1);
				border: 1px solid var(--surface3);
				transition: all 0.2s ease;
				box-shadow: var(--nv-box-shadow);
			}
			.nv-radio .radio span:last-child {
				padding-left: 8px;
				align-self: center;
			}
			.radio:hover .radio-button {
				border-color: var(--nv-primary);
			}
			.radio:hover .inp-radio:checked + .radio-button {
				border-color: hsl(var(--nv-primary-hue) var(--nv-primary-saturation) calc(var(--nv-primary-lightness) * 1.18) );
				background-color: hsl(var(--nv-primary-hue) var(--nv-primary-saturation) calc(var(--nv-primary-lightness) * 1.18) );
			}

			.inp-radio {
				position: absolute;
				visibility: hidden;
			}
			.inp-radio:checked + .radio-button {
				border-color: var(--nv-primary);
				box-shadow: inset 0 0 0 4px var(--nv-primary);
				animation: wave 0.4s ease;
			}
			
			@keyframes wave {
				50% {
					transform: scale(0.9);
				}
			}
		`;
	}
	render() {
		return html`
			<label class="radio">
				<input
					type="radio"
					class="inp-radio" 
				>
				<span class="radio-button"></span>
				<span>${this.label}</span>
			</label>
        `;
	}
}

customElements.define('am-radio-button', AmRadioButton);
