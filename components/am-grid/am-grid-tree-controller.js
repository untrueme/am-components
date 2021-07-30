export class AmGridTreeController {
    constructor(host) {
        this.host = host;
        host.addController(this);
    }

    hostConnected() {
        this.host.addEventListener('tree-node-toggle', this.onTreeNodeToggle.bind(this));
    }

    hostDisconnected() {
        this.host.removeEventListener('tree-node-toggle', this.onTreeNodeToggle.bind(this));
    }

    onTreeNodeToggle(ev){
        if(ev.detail.item._leaf) {
            return;
        }
        if (ev.detail.item._opened) {
            this.showChilds(ev.detail.item);
        } else {
            this.hideChilds(ev.detail.item);
        }
        this.host.requestUpdate();
    }

    showChilds(item) {
        let it = item;

        const pendingShow = [];
        const vindex = this.host.vdata.indexOf(it);
        const addData = this.host.data.filter((i, c) => {
            if (i.parent_id == it.id && it !== null) {
                i._level = it._level + 1;
                if (i._opened) pendingShow.push(i);
                i._pitem = it;
                return true;
            }
        });
        if (addData.length > 0) {
            this.host.vdata.splice(vindex + 1, 0, ...addData);
            it._childsCount = addData.length;
            while (it._pitem) {
                it._pitem._childsCount += item._childsCount;
                it = it._pitem;
            }
            pendingShow.forEach(i => this.showChilds(i));
        }
    }

    hideChilds(item) {
        let it = item;
        const vindex = this.host.vdata.indexOf(it);
        this.host.vdata.splice(vindex + 1, it._childsCount);
        while (it._pitem) {
            it._pitem._childsCount -= it._childsCount;
            it = it._pitem;
        }

        item._childsCount = null;
    }
}
