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

    this.observeValueChanges(formElement);
    this.observeParentFormSubmission(formElement);
    this.observeBlur(formElement);
  }

  protected observeValueChanges(formElement) {
    this.observer.getObserver(formElement, 'value')
    .subscribe(() => {
      if (formElement.checkValidity()) {
        this.markAsValid(formElement);
      }
    });
  }

  protected observeParentFormSubmission(formElement) {
    jQuery(formElement.form).on('submitAttempt', () => {
      if (!formElement.checkValidity()) {
        this.markAsInvalid(formElement);
      }
    });
  }

  protected observeBlur(formElement) {
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
