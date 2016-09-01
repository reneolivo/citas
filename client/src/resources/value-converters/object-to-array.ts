export class ObjectToArrayValueConverter {
  toView(value) {
    let result = [];
    for(var key in value) {
      result.push({
        key: key,
        value: value[key]
      });
    }
    return result;
  }
}
