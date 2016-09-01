import {Compile} from './compile';

describe('Compile', () => {
  let domElement;
  let templatingEngine;
  let element;

  beforeEach(() => {
    templatingEngine = jasmine.createSpyObj('TemplatingEngine', [
      'enhance'
    ]);
    domElement = document.createElement('a');

    element = new Compile(domElement, templatingEngine);
  });

  it('should define a .context property', () => {
    expect(element.context).toBeDefined();
  });

  it('should define a .content propety', () => {
    expect(element.content).toBeDefined();
  });

  it('should define a .attached() method', () => {
    expect(typeof element.attached).toBe('function');
  });

  it('should call templatingEngine.enhance() when ready', () => {
    const content = '${helloWorld}';
    const context = { helloWorld: 'Hola Mundo' };
    element.content = content;
    element.context = context;
    element.attached();
    expect(domElement.innerHTML).toBe(content);
    expect(templatingEngine.enhance).toHaveBeenCalledWith({
      element: domElement,
      bindingContext: context
    });
  });
});
