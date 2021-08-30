import { LitElement, html, css } from 'lit';

class AmLabeledText extends LitElement {
    static get properties() {
        return {
            disabled: { type: Boolean, reflect: true },
            label: { type: String },
            variant: { type: String },
            text: { type: String }
        };
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
            <span class="text">${this.text}</span>
			
		`;
    }
}

customElements.define('am-labeled-text', AmLabeledText);