import { html, css, LitElement } from 'lit';

export class AmButton extends LitElement {

	static get properties() {
		return {
			label: { type: String },
			disabled: { type: Boolean, reflect: true },
			variant: { type: String, value: 'default' },
            size: { type: String, value: 'medium' }
		}
	}

	static get styles() {
		return css`
			:host {
                display: inline-flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding: 4px 12px;
                height: 32px;
                min-width: fit-content;
                box-sizing: border-box;
                border-radius: 4px;
                color: #FFFFFF;
                user-select: none;
                cursor: pointer;
                outline:none;
            }

            .prefix {
                display: flex;
            }

            .prefix ::slotted(*) {
                margin-right: 8px;
                margin-left: 0px;
                width: 16px;
                height: 16px;
            }

            .suffix {
                display: flex;
            }

            .suffix ::slotted(*) {
                margin-left: 8px;
                margin-right: 0px;
                width: 16px;
                height: 16px;
            }

            /* primary */
            :host([variant=primary]) {
                background: var(--primary-base);
            }

            :host([variant=primary]:hover),:host([variant=primary]:focus) {
                background: var(--primary-dark);
                outline:none;
            }

            :host([variant=primary]:active) {
                background: var(--primary-darkest);
            }

            :host([disabled][variant=primary]) {
                background: var(--grey-light);
                border: none;
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }


            /* secondary */
            :host([variant=secondary]) {
                background: transparent;
                color: var(--primary-base);
                border: 1px solid var(--primary-light);
                
            }

            :host([variant=secondary]:hover),:host([variant=secondary]:focus) {
                background: var(--primary-lightest);
                border: 1px solid var(--primary-light);
                box-sizing: border-box;
                outline:none;
            }

            :host([variant=secondary]:active) {
                background: var(--primary-light);
                border: 1px solid var(--primary-darkest);
                color:  var(--primary-darkest);
                box-sizing: border-box;
            }

            :host([disabled][variant=secondary]) {
                background: transparent;
                border: 1px solid var(--grey-light);
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }

            /* negative */
            :host([variant=negative]) {
                background: var(--negative-base);
            }

            :host([variant=negative]:hover),:host([variant=negative]:focus) {
                background: var(--negative-dark);
                outline:none;
            }

            :host([variant=negative]:active) {
                background: var(--negative-darkest);
            }

            :host([disabled][variant=negative]) {
                background: var(--grey-light);
                border: none;
                color: var(--grey-dark);
                cursor: not-allowed;
                pointer-events: none;
            }
		`;
	}
	render() {
		return html`
			<span class="prefix">
				<slot name="prefix"></slot>
			</span>
			<span>${this.label}</span>
			<span class="suffix">
				<slot name="suffix"></slot>
			</span>
        `;
	}
}

customElements.define('am-button', AmButton);
