import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    './attributes/validate-input',
    './elements/modal',
    './elements/modal-form',
    './elements/endpoint-manager',
    './value-converters/object-to-array',
    './elements/compile',
    './elements/column',
    './elements/main-section'
  ]);
}
