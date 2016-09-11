import {
  noView,
  bindable,
  autoinject,
  TemplatingEngine} from 'aurelia-framework';

@noView
@autoinject
export class Compile {
  @bindable content: string = null;
  @bindable context: any = null;

  constructor(
    protected element: Element,
    protected templatingEngine: TemplatingEngine
  ) {}

  attached() {
    this.element.innerHTML = this.content;
    this.templatingEngine.enhance({
      element: this.element,
      bindingContext: this.context
    });
  }
}
