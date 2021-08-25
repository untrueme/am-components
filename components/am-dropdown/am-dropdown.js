import { html, css, LitElement } from "lit";
window.current_overlay_zindex = window.current_overlay_zindex || 5;

function calcPosRect(direction, around, target) {
    let a = { x: null, y: null, height: target.height, width: target.width };
    switch (direction) {
        case 'left':
            a.y = around.top;
            a.x = around.left - target.width;
            break;
        case 'right':
            a.y = around.top;
            a.x = around.right;
            break;
        case 'right-up':
            a.y = around.bottom - target.height;
            a.x = around.right;
            break;
        case 'left-up':
            a.y = around.bottom - target.height;
            a.x = around.left - target.width;
            break;
        case 'up':
            a.y = around.top - target.height;
            a.x = around.left;
            break;
        case 'up-left':
            a.y = around.top - target.height;
            a.x = around.right - target.width;
            break;
        case 'down-left':
            a.y = around.bottom;
            a.x = around.right - target.width;
            break;
        case 'down':
        default:
            a.y = around.bottom;
            a.x = around.left;
    }
    return DOMRect.fromRect(a);
}
function calcIntersect(a, b) {
    let width = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    let height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    if (height <= 0 || width <= 0) return 0
    else return (height * width) / (a.height * a.width);
}
const order = ['down', 'down-left', 'up', 'up-left', 'right', 'right-up', 'left', 'left-up'];

class AmDropdown extends LitElement {
    static get properties() {
        return {
            opened: { type: Boolean, reflect: true },
            fitInto: { value: null },
            direction: { value: 'down' } // down, up, left, right
        }
    }
    static styles = css`
         :host {
                display: none;
                position: fixed;
                z-index: var(--zi,1);
            }
            :host([opened]) {
                display: block;
            }

            .dropdown {
                padding: 8px;
                box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.15);
                border-radius: 8px;
                background: var(--white);
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
    `;
    render() {
        return html`<div id="ddContainer" class="dropdown"><slot></slot></div>`
    }
    constructor() {
        super();
        this._callback = () => {
            this.reFit(this.target, this.fitInto);
        };
        this._close = e => {
            let path = e.composedPath();
            if (!path.includes(this)) {
                e.preventDefault();
                this.close();
            }
        }
    }
    open(target, fitInto) {
        if (this.opened) return;
        this.style.setProperty('--zi', window.current_overlay_zindex++);
        this.opened = true;
        this.target = target;
        this.reFit(target, fitInto);
        addEventListener('resize', this._callback, { passive: true });
        addEventListener('scroll', this._callback, { passive: true });
        addEventListener('click', this._close, { capture: true })
    }
    close() {
        if (!this.opened) return;
        this.opened = false;
        window.current_overlay_zindex--;
        removeEventListener('resize', this._callback);
        removeEventListener('scroll', this._callback);
        removeEventListener('click', this._close);
    }
    reFit(fitAround, fitInto) {
        if (!fitAround) return;
        let fitRect = fitInto?.getBoundingClientRect?.() ?? DOMRect.fromRect({ x: 0, y: 0, width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });
        let s = this.getBoundingClientRect();
        let sl = this.style;
        let t = fitAround.getBoundingClientRect();
        // пробуем для указанного направления
        let a = calcPosRect(this.direction, t, s);
        let iRate = calcIntersect(a, fitRect);
        if (iRate < 1) {
            // если не уместилось перебираем направления пока не влезет, либо оставляем наилучшее
            let bestDir = this.direction;
            for (let d in order) {
                let q = calcPosRect(order[d], t, s);
                let iRate2 = calcIntersect(q, fitRect);
                if (iRate2 > iRate) {
                    bestDir = order[d];
                    a = q;
                    iRate = iRate2;
                }
                if (iRate2 === 1) break;
            }
        }
        sl.left = r(a.x);
        sl.top = r(a.y);
    }
}
function r(x) { return Math.round(x) + 'px'; }

customElements.define('am-dropdown', AmDropdown);