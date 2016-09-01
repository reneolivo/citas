export class ObjectKeysValueConverter {
  toView(value) {
    return Object.getOwnPropertyNames(value);
  }
}
