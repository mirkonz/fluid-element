import { Component, Host, h, Element, Prop, State, Watch } from '@stencil/core';
import { TimelineLite, Power2 } from 'gsap';

const speed = 0.3;

@Component({
  tag: 'fluid-element',
  styleUrl: 'fluid-element.css',
  shadow: true
})
export class FluidElement {
  @Element() element: HTMLElement;

  timeline = null;
  progress = null;

  @Prop({ reflect: true }) show: boolean;
  @Prop() isAnimating: boolean = false;
  @State() hidden: boolean = false;

  componentDidLoad() {
    if (!this.show) {
      this.element.classList.add('hidden');
    }
  }

  @Watch('show')
  showChanged(newValue: boolean) {
    if (this.timeline) {
      if (this.timeline.isActive()) {
        this.timeline.reverse();
        return;
      }
      this.timeline.kill();
    }
    if (newValue) {
      this.showElement();
    } else {
      this.hideElement();
    }
  }

  showElement() {
    this.timeline = new TimelineLite({
      onUpdate: () => {
        this.isAnimating = true;
        this.element.classList.remove('hidden');
        this.hidden = false;
      },
      onComplete: () => {
        this.isAnimating = false;
        this.element.style.height = 'auto';
      },
      onReverseComplete: () => {
        this.isAnimating = false;
        this.element.classList.add('hidden');
        this.element.style.height = 'auto';
        this.hidden = true;
      }
    });
    this.timeline.fromTo(
      this.element,
      speed,
      {
        height: 0,
        opacity: 0
      },
      {
        height: this.getMaxHeight(),
        ease: Power2.easeInOut
      }
    );
    this.timeline.to(this.element, speed, {
      opacity: 1,
      ease: Power2.easeInOut
    });
  }

  hideElement() {
    this.timeline = new TimelineLite({
      onUpdate: () => {
        this.isAnimating = true;
        this.element.classList.remove('hidden');
        this.hidden = false;
      },
      onComplete: () => {
        this.isAnimating = false;
        this.element.classList.add('hidden');
        this.element.style.height = 'auto';
        this.hidden = true;
      },
      onReverseComplete: () => {
        this.isAnimating = false;
        this.element.style.height = 'auto';
      }
    });
    this.timeline.fromTo(
      this.element,
      speed,
      {
        height: this.getMaxHeight(),
        opacity: 1
      },
      {
        opacity: 0,
        ease: Power2.easeInOut
      }
    );
    this.timeline.to(this.element, speed, {
      height: 0,
      ease: Power2.easeInOut
    });
  }

  getMaxHeight() {
    let maxHeight;
    this.element.classList.remove('hidden');
    maxHeight = this.element.getBoundingClientRect().height;
    this.element.classList.add('hidden');
    return maxHeight;
  }

  render() {
    return (
      <Host class={{ animating: this.isAnimating }}>
        <slot>Liquid element</slot>
      </Host>
    );
  }
}
