import { LitElement, html, css } from 'lit';
import '/components/am-app-bar/am-app-bar.js';
import '/components/am-app-menu/am-app-menu.js';
import '/components/am-form/am-form.js';
import '/components/am-form/am-form-manager.js';

class MainView extends LitElement {
    static get properties() {
        return {
            route: { type: String },
            params: { type: Object },
            query: { type: Object },
            menuItems: { type: Array },
            forms: { type: Array },
            currentForm: { type: Object},
            hidden: {
                type: Boolean,
                reflect: true
            },
            opened: {
                type: Boolean
            }
        };
    }

    static styles = css`
		:host {
            display: flex;
            flex-direction: row;
			width: 100%;
			height: 100%;
            position: relative;
		}

		:host([hidden]) {
			display: none;
		}

        am-app-bar {
            background-color: #1c273d;
            overflow: hidden;
			width: 64px;
		}

        .menuItem {
            color: var(--grey-base);
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            font-size: 12px;
			width:100%;
            cursor: pointer;
            user-select: none;
        }

        .menuItem:hover {
            background-color: var(--primary-base);
        }

        .menuItem[active] {
            background-color: var(--primary-dark);
            color: white;
        }

		am-form-manager {
            display: flex;
            flex-direction: row;
            flex: 1;
            overflow-y: auto;
            overflow-x: auto;
		}

        .logout{
            color: white;
            cursor: pointer;
        }

        @media (min-width: 320px) and (max-width: 768px) {
            :host {
                flex-direction: column;
            }
        }
  `;

    constructor() {
        super();
        this.route = '';
        this.forms = [];
        this.query = {};
        this.menuItems = [];
        this.authorized = false;
        this.opened = false;
        fetch('/getMenu', {
            method: 'GET'
        })
            .then((resp) => {
                resp.json()
                    .then((result) => {
                        this.menuItems = result;
                        if(this.currentForm){
                            this.select();
                        }
                    });
            });
    }

    render() {
        return html`
            <am-app-menu ?opened=${this.opened}></am-app-menu>
            <am-app-bar>
                <div slot="top" style="margin: 16px">
                    <lit-icon iconset="iconset-32" size="32" icon="logo" @click="${this.logoClick}"></lit-icon>
                </div>
                ${this.menuItems.map(i => 
                    html`<div class="menuItem" slot="top" name=${i.name} @click="${this.onMenuClick}">${i.title}</div>`
                )}
                <div class="logout" slot="bottom" @click="${this.onLogout}">
                    <am-icon-button iconset="iconset-32" size="32" icon="logout"></am-icon-button>
                </div>
            </am-app-bar>
            <am-form-manager .current="${this.currentForm}" @on-current-change="${this.currentChange}"></am-form-manager>
		`;
    }

    async onMenuClick(event){
        let formName = event.target.getAttribute('name');
        this.currentForm = formName;
    }

    logoClick(){
        this.currentForm = '';
        history.pushState({}, null, '#');
    }

    onLogout(){
        document.dispatchEvent(new CustomEvent('onUnauthorized'));
    }

    currentChange(event) {
        this.currentForm = event.detail.current;
        this.select();
    }

    select(){
        this.shadowRoot.querySelectorAll('div.menuItem').forEach((el) => {
            if (el.getAttribute('name') === this.currentForm) {
                el.setAttribute('active', 'active')
            }
            else {
                el.removeAttribute('active')
            }
        });
    }
}


customElements.define('am-main', MainView);