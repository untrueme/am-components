import { LitElement, html, css } from 'lit';

function partMap(parts) {
	return Object.entries(parts)
		.filter(([key, value]) => value)
		.map(([key, value]) => key).join(" ");
}

class AmTab extends LitElement {
	static get styles() {
		return css`
			:host {
				height: 100%;
				width: 100%;
			}

			:host, slot {
				display: block;
				box-sizing: border-box;
			}
      
			span {
				display: inline-block;
			}

			.tabsContainer {
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
			}
			
			.tab-bar {
				display: flex;
				height: 48px;
				border-bottom: 1px solid var(--grey-light);
				font-weight: 500;
				font-size: 14px;
				font-family: 'Golos Bold';
			}
			
			.content {
				border-left: 1px solid var(--color-line);
				border-right: 1px solid var(--color-line);
				border-bottom: 1px solid var(--color-line);
				overflow-y: auto;
				padding:16px;
				position: relative;
				min-width: 1px;
				box-sizing: border-box;
				font-size: 12px;
				width: 100%;
				height: 100%;
			}
			
			.tab {
				color: var(--black-lightest);
				padding: 10px 16px;
				cursor: pointer;
				transition: color .4s ease-in-out, border-color .4s ease-in-out, background-color .4s ease-in-out;
			}
			
			.tab-selected { 
				color: var(--black-dark);
				border-bottom: 2px solid var(--primary-base);
			}
      `;
	}

	get tabs() {
		const slot = this.shadowRoot.querySelector('slot');
		return slot ? slot.assignedElements() : [];
	}

	selectTab(selected) {
		for (let tab of this.tabs)
			tab.selected = tab == selected;
		this.requestUpdate();
	}

	firstUpdated() {
		super.firstUpdated();
		this.tabs.find(tab => tab.selected) || this.selectTab(this.tabs[0])
	}

	render() {
		return html`
			<div class="tabsContainer">
				<nav class="tab-bar">
				${this.tabs.map(tab => html`
					<span class=${partMap({ tab: true, 'tab-selected': tab.selected })} @click=${ev => this.selectTab(tab)}>
					${tab.header}
					</span>
				`)}
				</nav>
				<div class="content">
					<slot @slotchange=${ev => this.requestUpdate()}></slot>
				</div>
			</div>
		`;
	}
}

customElements.define('am-tab', AmTab);
