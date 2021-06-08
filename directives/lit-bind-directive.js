import { directive, Directive } from 'lit/directive.js';

class Bind extends Directive {
    update(part, properties) {
        const syncProp = properties[0];
        if(part.options.host[syncProp] !== undefined) {
            part.element[part.name] = part.options.host[syncProp];
        }

        if (!part.syncInitialized) {
            part.syncInitialized = true;
            const notifyingElement = part.element;
            const notifyingProperty = part.name;
            const notifyingEvent = `${notifyingProperty.toLowerCase()}-changed`;

            notifyingElement.addEventListener(notifyingEvent, (e) => {
                const oldValue = part.options.host[syncProp];
                if(oldValue === e.detail.value) {
                    return
                }
                if(e.detail.value !== undefined) {
                    part.options.host[syncProp] = e.detail.value;
                } else {
                    part.element[part.name] = part.options.host[syncProp];
                }
            });
        }
    };
}

export default directive(Bind);
