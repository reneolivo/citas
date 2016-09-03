import {autoinject, bindable} from 'aurelia-framework';
declare const jQuery: any;

@autoinject
export class Modal {
  @bindable public width: string = '55%';

  constructor(private element: Element) {}

  open() {
    jQuery(this.element).children().openModal({
      ready: () => this.triggerOpenEvent()
    });
  }

  close() {
    jQuery(this.element).children().closeModal();
  }

  protected triggerOpenEvent() {
    const event = new Event('modal-opened');
    this.element.dispatchEvent(event);
  }
}
