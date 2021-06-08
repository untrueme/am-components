import { LitElement, html } from 'lit';
import { outlet } from '../../mixins/lit-element-router.js';
 
class Main extends outlet(LitElement) {
  render() {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define('app-main', Main);
