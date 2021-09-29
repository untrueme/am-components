import { LitElement, html, css } from 'lit';

class AmFormManager extends LitElement {

    static get properties() {
        return {
            current: { 
                type: String, 
                attribute: false, 
                reflect: false 
            },
            forms: { type: Array }
        }
    }
    static get styles() {
        return css`
			:host{
                display: block;
                height: 100%;
                width: 100%;
                overflow: hidden;
            }

            :host {
                display: block;
            }

            :host > ::slotted(.current){
                height: 100%;
                width: 100%;
                overflow: hidden;
                background: var(--white);
                padding: 16px;
                box-sizing: border-box;
            }

            :host > ::slotted(:not(slot):not(.current)) {
                display: none !important;
            }
        `;
    }
    render() {
        return html`
            <slot></slot>
        `;
    }

    constructor() {
        super();
        this.current = '';
        this.forms = [];
    }

    connectedCallback() {
        super.connectedCallback();
        let hash = document.location.hash;
        if (hash) {
            this.current = hash.replace(/^#/, '');
        } else {
            history.replaceState({}, null, '#');
        }

        onhashchange = (e) => {
            let hash = document.location.hash;
            this.current = hash.replace(/^#/, '');
        }

        onpopstate = (e) => {
            let hash = document.location.hash;
            this.current = hash.replace(/^#/, '');
        }

        this.addEventListener('on-form-close', (e) => {
            this.removeChild(e.target);
            this.forms.splice(this.forms.findIndex(x => x.dom == e.target), 1);
            if (this.forms.length > 0) {
                this.current = this.forms.sort((a, b) => a.time.getTime() - b.time.getTime())[this.forms.length - 1].formName;
            } else {
                this.current = '';
                history.pushState({}, null, '#');
            }
        });

        this.addEventListener('open-form', (e) => {
            this.current = e.detail.formName;
        })
    }

    async willUpdate(args) {
        if (args.has('current')) {
            await this.openForm(this.current);
            this.dispatchEvent(new CustomEvent('on-current-change', { detail: { current: this.current } }));
        }
    }

    async openForm(formName, params) {
        if (formName) {
            const frmIndex = this.forms.findIndex(x => x.formName == formName);
            if (frmIndex == -1) {
                document.querySelector('#preloader').style.display = "block";
                try {
                    await import(`/forms/${formName}.js`);
                    const form = document.createElement(`am-form-${formName}`);
                    form.args = params;
                    this.append(form);
                    this.forms.push({
                        formName: formName,
                        dom: form,
                        time: new Date()
                    });
                } 
                catch(err) {
                    alert('Форма не найдена')
                    document.querySelector('#preloader').style.display = "none";
                }
            } else if (this.forms.length > 0) {
                this.forms.find(x => x.formName == formName).time = new Date();
            }

            document.querySelector('#preloader').style.display = "none";
        }

        this.select(formName);
    }

    select(formName) {
        if (formName) {
            this.forms.forEach((el) => {
                if (el.formName == formName) {
                    el.dom.classList.add('current');
                    if (history.state?.formName === formName) {
                        return
                    } else {
                        history.pushState({
                            formName: formName
                        }, null, `#${formName}`);
                    }
                } else {
                    el.dom.classList.remove('current');
                }
            });
        }
        else {
            this.forms.forEach((el) => {
                el.dom.classList.remove('current');
            });
        }
    }
}

customElements.define('am-form-manager', AmFormManager);
