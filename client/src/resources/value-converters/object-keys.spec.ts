import {ObjectToArrayValueConverter} from './object-to-array';

describe('ObjectToArray (Value Converter)', () => {
  let converter;

  beforeEach(() => {
    converter = new ObjectToArrayValueConverter();
  });

  it('should define a .toView() method', () => {
    expect(typeof converter.toView).toBe('function');
  });

  it('should return the object keys as an array', () => {
    const value = { first: 1, second: 2, third: 3 };
    const expectedResult = [
      { key: 'first', value: 1 },
      { key: 'second', value: 2 },
      { key: 'third', value: 3 }
    ];
    const result = converter.toView(value);
    expect(result).toEqual(expectedResult);
  });
});
