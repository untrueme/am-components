export class AmGridExpandController {
    constructor(host) {
        this.host = host;
        host.addController(this);
    }

    hostConnected() {
        this.host.addEventListener('expand-node-toggle', this.onExpandNodeToggle.bind(this));
    }

    hostDisconnected() {
        this.host.removeEventListener('expand-node-toggle', this.onExpandNodeToggle.bind(this));
    }

    onExpandNodeToggle(event){
        const rows = Array.prototype.slice.call(this.host.shadowRoot.querySelectorAll('am-grid-row'));
        rows.forEach(row => {
            if (row != event.detail.item) {
                row.active = false;
                row.collapse();
            }
        });
        event.detail.item.active = true;
        if (event.detail.item.tpl) {
            event.detail.item.expanded = !event.detail.item.expanded;
        }
        this.host.requestUpdate();
    }
}
