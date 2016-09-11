import {autoinject, bindable} from 'aurelia-framework';

@autoinject()
export class ClickTriggerCustomAttribute {
  @bindable event: string;
  @bindable detail: any;

  constructor(protected element: Element) {
    this.element.addEventListener('click', () => {
      const event = new CustomEvent(this.event, {
        detail: this.detail,
        bubbles: true,
        cancelable: true
      });

      this.element.dispatchEvent(event);
    });
  }
}
