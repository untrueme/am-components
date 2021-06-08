import { LitElement } from 'lit';

class AmFetch extends LitElement {
    static get properties() {
        return {
            endpoint: { type: String },
            method: { type: String }
        }
    }

    async execute(params) {
        let req = await fetch(this.endpoint, {
            headers: { 'Content-Type': 'application/json' },
            method: this.method,
            body: JSON.stringify(params),
        });
        let data = await req.json();
        this.dispatchEvent(new CustomEvent('request-completed', {
            detail: {
                data: data
            },
            composed: true
        }));

        return data;
    }
}

customElements.define('am-fetch', AmFetch);
