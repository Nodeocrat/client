// Checks for existence of property on 'obj'. Works for nested properties, which
// is a much better alternative than:
// obj.prop1 && obj.prop1.prop2 && obj.prop1.prop2.prop3 ...
// Example usage:
// propExists(obj, 'prop1.prop2.prop3');
export function propExists(obj, nestedProp) {
  const propsToCheck = nestedProp.split('.');
  for (let i = 0; i < propsToCheck.length; i++) {
    if (!obj || !obj.hasOwnProperty(propsToCheck[i]))
      return false;
    obj = obj[propsToCheck[i]];
  }
  return true;
}
