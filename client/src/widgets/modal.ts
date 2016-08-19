import {autoinject, bindable} from 'aurelia-framework';
declare const jQuery: any;

@autoinject
export class Modal {
  @bindable public width: string = '55%';

  constructor(private element: Element) {
  }

  open() {
    jQuery(this.element).children().openModal();
  }

  close() {
    jQuery(this.element).children().closeModal();
  }
}
