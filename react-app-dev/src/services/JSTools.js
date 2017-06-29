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




//clone any JS object
// see Stack Overflow:
// http://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
// http://stackoverflow.com/questions/30626070/shallow-clone-an-es6-map-or-set

/*function clone(obj) {
    let copy;

    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Map) {
    	return new Map(clone(Array.from(obj)));
    }

    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        copy = {};
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }
    throw new Error('Unable to copy object! Its type isn\'t supported');
}

const original = new Map([['fred', { 'foo': 'blub' }]]);
const cloned = clone(original);
original.get('fred').foo = 'waldo';
console.log(cloned.get('fred').foo);*/
