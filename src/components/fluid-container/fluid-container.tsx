import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'fluid-container',
  styleUrl: 'fluid-container.css',
  shadow: true
})
export class FluidContainer {
  @Element() el: HTMLElement;

  componentWillLoad() {
    if (!this.el.querySelector('fluid-element')) {
      console.error(this.el, `\nNo children found. <fluid-container> needs to have at least one <fluid-element>.`);
    }
  }
  render() {
    return (
      <Host class="test">
        <slot>Liquid container</slot>
      </Host>
    );
  }
}
