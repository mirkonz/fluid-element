import { Component, Host, h, Element, Prop, State, Watch } from '@stencil/core';
import { TimelineLite, Power2 } from 'gsap';

const speed = 0.3;

@Component({
  tag: 'fluid-element',
  styleUrl: 'fluid-element.css',
  shadow: true
})
export class FluidElement {
  @Element() el: HTMLElement;

  tl = new TimelineLite({
    paused: true,
    onUpdate: () => {
      this.isAnimating = true;
      this.el.classList.remove('hidden');
      this.hidden = false;
    },
    onComplete: () => {
      this.isAnimating = false;
      this.el.style.height = 'auto';
    },
    onReverseComplete: () => {
      this.isAnimating = false;
      this.el.classList.add('hidden');
      this.hidden = true;
    }
  });

  @Prop({ reflect: true }) show: boolean;
  @Prop() isAnimating: boolean = false;
  @Prop() removeContent: boolean = false;
  @State() hidden: boolean = false;
  // @State() height: number;

  // componentWillLoad() {
  //   if (!this.el.closest('fluid-container')) {
  //     console.error(this.el, `\nParent needs to be a <fluid-container>`);
  //   }
  // }

  componentDidLoad() {
    this.tl.set(this.el, { height: 'auto', opacity: 0 });
    this.tl.from(this.el, speed, {
      height: 0,
      ease: Power2.easeInOut
    });
    this.tl.to(this.el, speed, {
      opacity: 1,
      ease: Power2.easeInOut
    });
    this.tl.set(this.el, { height: 'auto' });

    if (!this.show) {
      this.el.classList.add('hidden');
    } else {
      this.tl.progress(1);
    }
  }

  @Watch('show')
  showChanged(newValue: boolean) {
    if (newValue && this.tl.totalProgress() !== 1) {
      this.tl.play();
    } else {
      this.tl.reverse();
    }
  }

  /*   expandFadeIn() {
    this.tl.set(this.el, { height: 'auto', opacity: 0 });
    this.tl.from(this.el, speed, {
      height: 0,
      ease: Power2.easeInOut
    });
    this.tl.to(this.el, speed, {
      opacity: 1,
      ease: Power2.easeInOut
    });
  } */

  /*   getHeight() {
    if (!this.show) {
      // this.el.classList.remove('hidden');
      this.el.style.height = 'auto';
    }
    this.height = this.el.getBoundingClientRect().height;
    console.log(this.height);
    if (!this.show) {
      // this.el.classList.add('hidden');
      this.el.style.height = '0px';
    }
  } */

  render() {
    return <Host class={{ animating: this.isAnimating }}>{this.hidden ? '' : <slot>Liquid element</slot>}</Host>;
  }
}
