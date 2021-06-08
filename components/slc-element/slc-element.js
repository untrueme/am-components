import { LitElement } from "lit";

class SlcElement extends LitElement {
    constructor() {
        super();
        if(this.constructor.properties) {
            for (const prop of Object.keys(this.constructor.properties)) {
                if(this.constructor.properties[prop].value) {
                    this[prop] = this.constructor.properties[prop].value;
                }
            }
        }
    }

    update(changedProps) {
        super.update(changedProps);

        for (const prop of changedProps.keys()) {
            const declaration = this.constructor.properties[prop];
            if (!declaration || !declaration.notify) continue;
            const type = `${prop}-changed`;
            const value = this[prop]
            this.dispatchEvent(new CustomEvent(type, { detail: { value } }));
        }
    }
};

export { SlcElement };
