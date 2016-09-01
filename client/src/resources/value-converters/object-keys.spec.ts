import {ObjectKeysValueConverter} from './object-keys';

describe('ObjectKeys (Value Converter)', () => {
  let converter;

  beforeEach(() => {
    converter = new ObjectKeysValueConverter();
  });

  it('should define a .toView() method', () => {
    expect(typeof converter.toView).toBe('function');
  });

  it('should return the object keys as an array', () => {
    const value = { first: 1, second: 2, third: 3 };
    const expectedResult = [ 'first', 'second', 'third' ];
    const result = converter.toView(value);
    expect(result).toEqual(expectedResult);
  });
});
