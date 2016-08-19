import {autoinject, ObserverLocator} from 'aurelia-framework';
declare const jQuery: any;

@autoinject()
export class ValidateInputCustomAttribute {
  constructor(
    private element: Element,
    private observer: ObserverLocator
  ) {}

  valueChanged(formElement) {
    if (formElement instanceof Element) {
      this.observeElement(formElement);
    } else {
      this.observeElement(this.element);
    }
  }

  protected observeElement(formElement) {
    formElement.classList.add('validate');

    this.observer.getObserver(formElement, 'value')
    .subscribe(() => {
      if (formElement.checkValidity()) {
        this.markAsValid(formElement);
      }
    });

    jQuery(formElement).on('blur', () => {
      this.checkValidity(formElement);
    });
  }

  protected markAsValid(formElement) {
    this.element.classList.remove('invalid');
    formElement.classList.remove('invalid');
  }

  protected markAsInvalid(formElement) {
    this.element.classList.add('invalid');
    formElement.classList.add('invalid');
  }

  protected checkValidity(formElement) {
    if (formElement.checkValidity()) {
      this.markAsValid(formElement);
    } else {
      this.markAsInvalid(formElement);
    }
  }
}
