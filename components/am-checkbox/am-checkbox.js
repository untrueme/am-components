import { html, css, LitElement } from 'lit';

export class AmCheckbox extends LitElement {

	static get properties() {
		return {
			label: { type: String },
			variant: { type: String },
			disabled: { type: Boolean },
			checked: { type: Boolean}
		}
	}

	constructor(){
		super();
		this.checked = undefined;
	}

	static get styles() {
		return css`
			:host {
                display: flex;
                position: relative;
                flex-direction: column;
                box-sizing: border-box;
				font-family: 'Golos Regular';
				direction: var(--direction);
				align-items: flex-start;
				outline: none;
                --labeled-text-content-width: 200px;
			}

			:host([variant=horizontal]) {
                flex-direction: row;
				align-items: center;
            }

			:host([variant=horizontal]) label{
                margin-right: 8px;
				width: var(--am-labeled-text-label-width, 140px);
            }

            :host([variant=vertical]) label{
				width: var(--labeled-text-content-width);
            }


			label {
                box-sizing: border-box;
                display: inline-block;
                pointer-events: none;
                user-select: none;
                line-height: 150%;
				font-family: 'Golos Regular';
				font-weight: 500;
				font-size: 12px;
				color: var(--black-lightest);
                text-align: var(--direction, left);
                white-space: normal;
                text-overflow: ellipsis;
                overflow:hidden;
				width: auto;
            }

            label span {
                width: 100%;
            }

            .text {
                display: flex;
                box-sizing: border-box;
				overflow: hidden;
                align-items: center;
                line-height: 150%;
                font-size: 14px;
                width: var(--labeled-text-content-width, auto);
                min-height: 32px;
			}

            :host([disabled]) {
                color: var(--grey-base);
                cursor: not-allowed;
                pointer-events: none;
				user-select: none;
            }
		`;
	}
	render() {
		return html`
			<label id="label">
				<span>${this.label}</span>
			</label>
			<span @click="${this.onClick}">
				${this.checked === undefined
					? html`
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="16" height="16" rx="4" fill="#6C75DC"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M2.75 7.75C2.75 7.33579 3.08579 7 3.5 7H12.25C12.6642 7 13 7.33579 13 7.75C13 8.16421 12.6642 8.5 12.25 8.5H3.5C3.08579 8.5 2.75 8.16421 2.75 7.75Z" fill="white"/>
						</svg>
					`
					:  this.checked
						? html`
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="16" height="16" rx="4" fill="#6C75DC"/>
								<path d="M5 8.5L7 11L11.5 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						`
						: html`
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
								<rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="white"/>
								<rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#E1E5EB"/>
							</svg>
						`
				}
			</span>
		`;
	}

	onClick() {
		this.checked = !this.checked;
	}
}

customElements.define('am-checkbox', AmCheckbox);
