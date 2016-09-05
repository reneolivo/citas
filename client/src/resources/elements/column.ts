import {
  bindable,
  processContent,
  autoinject,
  noView,
  computedFrom} from 'aurelia-framework';

@processContent(false)
@noView
export class Column {
  @bindable header;
  constructor(
    protected element: Element
  ) {}

  @computedFrom('element.innerHTML')
  get content() {
    return this.element.innerHTML;
  }
}
