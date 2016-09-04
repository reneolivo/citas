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

  @computedFrom('element')
  get content() {
    return this.element.innerHTML;
  }
}
