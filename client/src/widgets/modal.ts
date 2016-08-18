import {autoinject} from 'aurelia-framework';
declare const jQuery: any;

@autoinject
export class Modal {
  constructor(private element: Element) {
  }

  open() {
    jQuery(this.element).children().openModal();
  }

  close() {
    jQuery(this.element).children().closeModal();
  }
}
