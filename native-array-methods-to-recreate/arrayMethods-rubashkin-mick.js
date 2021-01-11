// Array.prototype.find
function myFind(array, callback, thisArg) {
  var myFindCallback = callback;
  var length = array.length;

  if (thisArg) {
    myFindCallback = myFindCallback.bind(thisArg);
  }

  for (var i = 0; i < length; i++) {
    if (myFindCallback(array[i], i, array)) {
      return array[i];
    }
  }
}

// Array.prototype.every
function every(array, callback, thisArg) {
  var everyCallback = callback;
  var length = array.length;
  var startingIndex = 0;

  while (startingIndex in array === false && startingIndex < length) {
    startingIndex++;
  }

  if (thisArg) {
    everyCallback = everyCallback.bind(thisArg);
  }

  for (var i = startingIndex; i < length; i++) {
    if (i in array) {
      if (!everyCallback(array[i], i, array)) {
        return false;
      }
    }
  }

  return true;
}

// Array.prototype.reduceRight
function reduceRight(array, callback, initialValue) {
  var startingIndex = array.length - 1;
  var accumulator = initialValue;
  var arrayIndexes = Object.keys(array);

  // If no initialValue provided
  if (arguments.length < 3) {
    // If array is empty
    if (arrayIndexes.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value.');
    }

    // If array has only one element, return that element.
    if (arrayIndexes.length === 1) {
      var onlyIndex = arrayIndexes[0];
      var onlyElement = array[onlyIndex];
      return onlyElement;
    }

    while (!(startingIndex in array) && startingIndex >= 0) {
      startingIndex--;
    }

    accumulator = array[startingIndex];
    startingIndex -= 1;

    // If initialValue provided
  } else {
    // If array is empty, return initialValue
    if (arrayIndexes.length === 0) {
      return initialValue;
    }
  }

  for (var i = startingIndex; i >= 0; i--) {
    if (i in array) {
      accumulator = callback(accumulator, array[i], i, array);
    }
  }

  return accumulator;
}

// Array.prototype.concat
function concat(oldArray) {
  var newArray = [];

  for (var i = 0; i < oldArray.length; i++) {
    var copiedFromOldArrayElement = oldArray[i];
    newArray.push(copiedFromOldArrayElement);
  }

  for (var i = 1; i < arguments.length; i++) {
    var elementToCopy = arguments[i];
    if (Array.isArray(elementToCopy)) {
      for (var j = 0; j < elementToCopy.length; j++) {
        var valueToCopy = elementToCopy[j];
        newArray.push(valueToCopy);
      }
    } else {
      newArray.push(elementToCopy);
    }
  }

  return newArray;
}

// Array.prototype.slice
function slice(array, start, end) {
  var slicedArray = [];
  var startFromIndex = 0;
  var endBeforeIndex = array.length;

  if (arguments.length > 1) {
    if (typeof start !== 'number') {
      startFromIndex = 0;
    } else {
      startFromIndex = start >= 0 ? start : array.length + start;
    }
  }

  if (arguments.length > 2) {
    if (typeof end !== 'number') {
      endBeforeIndex = array.length;
    } else {
      endBeforeIndex = end >= 0 ? end : array.length + end;
      if (endBeforeIndex > array.length) {
        endBeforeIndex = array.length;
      }
    }
  }

  for (var i = startFromIndex; i < endBeforeIndex; i++) {
    slicedArray.push(array[i]);
  }

  return slicedArray;
}

// Array.prototype.push
function push(array) {
  var length;
  var lengthDescriptor = Object.getOwnPropertyDescriptor(array, 'length');

  if (lengthDescriptor && lengthDescriptor.writable === false) {
    throw new TypeError("Cannot assign to read only property 'length' of object");
  }

  if (array.length && typeof array.length === 'number') {
    length = array.length;
  } else {
    length = 0;
  }



  var indexToAddElement = length;
  var numberOfElementsToAdd = arguments.length - 1;

  for (var i = 1; i <= numberOfElementsToAdd; i++) {
    array[indexToAddElement] = arguments[i];
    indexToAddElement++;
    length++;
  }

  array.length = length;
  return array.length;
}

// Array.prototype.unshift
function unshift(array, element) {
  var lengthDescriptor = Object.getOwnPropertyDescriptor(array, 'length');

  if (lengthDescriptor && lengthDescriptor.writable === false) {
    throw new TypeError("Cannot assign to read only property 'length' of object");
  }

  if (!array.length) {
    array.length = 0;
  }

  if (array.length && !(typeof array.length === 'number')) {
    array.length = 0;
  }

  var length = array.length;
  var numberOfelementsToInsert = arguments.length - 1;

  var k = length;
  while (k > 0) {
    var newIndex = k + numberOfelementsToInsert - 1;
    var itemToShift = array[k - 1];
    array[newIndex] = itemToShift;
    k--;
  }

  for (var i = 0; i < numberOfelementsToInsert; i++) {
    array[i] = arguments[i + 1];
  }

  array.length = length + numberOfelementsToInsert;

  return array.length;
}

// Array.prototype.fill
function fill(array, value, start, end) {
  var lengthDescriptor = Object.getOwnPropertyDescriptor(array, 'length');
  var length = array.length;
  var startFromIndex, endBeforeIndex;

  // Handle no length property.
  if (typeof length !== 'number') {
    return array;
  }

  // Handle non-writable length property.
  if (length && lengthDescriptor.writable === false) {
    throw new TypeError('Cannot assign to read only property length of object.');
  }

  // Normalize start index.
  if (arguments.length >= 3) {
    startFromIndex = Number(start);
    startFromIndex = parseInt(startFromIndex);
    startFromIndex = startFromIndex || 0;
  } else {
    startFromIndex = 0;
  }

  // Normalize end index.
  if (arguments.length >= 4) {
    endBeforeIndex = Number(end);
    endBeforeIndex = parseInt(endBeforeIndex);
  } else {
    endBeforeIndex = length;
  }

  // Handle negative start index.
  if (startFromIndex < 0) {
    startFromIndex = length + startFromIndex;
  }

  // Handle negative end index.
  if (endBeforeIndex < 0) {
    endBeforeIndex = length + endBeforeIndex;
  }

  // Filling the array.
  for (var i = startFromIndex; i < endBeforeIndex; i++) {
    array[i] = value;
  }

  return array;
}

// Array.prototype.reverse
function reverse(array) {

  // If non-writable length property, throw TypeError
  var lengthPropertyDescriptor = Object.getOwnPropertyDescriptor(array, 'length');

  if (lengthPropertyDescriptor && !lengthPropertyDescriptor.writable) {
    throw new TypeError('Cannot assign to read only property of object');
  }

  // If argument type is not an Object, return new Object(arg) and do nothing.
  if (array instanceof Object === false) {
    return new Object(array);

    // If argument is undefined or null, throw new TypeError
  } else if (typeof array === 'undefined' || array === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }



  // Length normalisation.
  var length = Number(lengthPropertyDescriptor.value);
  // If NaN, make it 0
  if (Number.isNaN(length)) {
    length = 0;
  }
  // Make length integer
  length = Number.parseInt(length);
  // If length <= 0, make it 0
  if (length <= 0) {
    length = 0;
  }

  // Main reverse logic.
  var middle = Math.floor(length / 2);
  var lowerIndex = 0;

  for (var i = lowerIndex; i < middle; i++) {
    var upperIndex = length - 1 - i;
    var lowerItem = array[i];
    var upperItem = array[upperIndex];
    array[i] = upperItem;
    array[upperIndex] = lowerItem;
  }

  return array;
}

// Array.prototype.copyWithin
function copyWithin(array, target, start, end) {
  var len = array.length;

  // Normalizing passed in arguments to Integer.
  var relativeTarget = parseInt(Number(target));
  var relativeStart = parseInt(Number(start));
  var relativeEnd = parseInt(Number(end));

  if (isNaN(relativeTarget)) {
    relativeTarget = 0;
  }

  if (isNaN(relativeStart)) {
    relativeStart = 0;
  }

  if (isNaN(relativeEnd)) {
    relativeEnd = len;
  }

  // Manage negative arguments.
  var from = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
  var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
  var to = relativeTarget < 0 ? Math.max(len + relativeTarget, 0) : Math.min(relativeTarget, len);
  var count = Math.min(final - from, len - to);

  // Set normal direction to copy-paste (left->right).
  var direction = 1;

  // If copy and paste ranges overlap, will change direction to right->left.
  if (from < to && to < from + count) {
    direction = -1;
    from = from + count - 1;
    to = to + count - 1;
  }

  // Main logic for copy-paste operations.
  while (count > 0) {
    var fromKey = from;
    var toKey = to;
    var fromValue = array[fromKey];

    // If toKey and fromKey property exists
    if (array.hasOwnProperty(toKey) && array.hasOwnProperty(fromKey)) {
      // Check if non-writable index properties, and throw TypeError.
      var fromKeyDescriptor = Object.getOwnPropertyDescriptor(array, fromKey);
      var toKeyDescriptor = Object.getOwnPropertyDescriptor(array, toKey);
      var isNonWritable = !(fromKeyDescriptor.writable && toKeyDescriptor.writable)
      if (isNonWritable) {
        throw new TypeError('Cannot assign to read only property of object.');
      }
    }

    array[toKey] = fromValue;
    from = from + direction;
    to = to + direction;
    count = count - 1;
  }

  return array;
}

// Array.prototype.sort
function sort(array, compareFunction) {

  // PART1 | DECLARE FUNCTION FOR INNER SORT TO COMPARE ARRAY ELEMENTS.
  function innerSort(prev, next) {
    // If compareFunction provided, it should be used for comparing array elements.
    if (prev === undefined && next === undefined) {
      return 0;
    } else if (prev === undefined) {
      return 1;
    } else if (next === undefined) {
      return -1;
    }

    if (compareFunction) {
      var compareResult = compareFunction(prev, next);
      return compareResult;
    }

    // If no compareFunction provided, innerSort should sort an array
    // in ascending order by converting array elements to strings
    // and comparing them in UTF-16 code units order.
    var prevAsString = String(prev);
    var nextAsString = String(next);

    if (prevAsString < nextAsString) {
      return -1;
    }

    if (prevAsString > nextAsString) {
      return 1;
    }

    return 0;
  }

  // PART2 | PUTS ALL EMPTY ELEMENTS TO THE END OF THE ARRAY BEFORE COMPARING ELEMENTS TO SORT.
  var len = array.length;

  if (len === undefined) {
    return array;
  }

  // for (var i = 0; i < len - 1; i++) {
  //   var prev = array[i];
  //   var next = array[i + 1];
  //   if (!array.hasOwnProperty(i)) {
  //     array[i] = next;
  //     array[i + 1] = prev;
  //   }
  // }

  // PART3 | SORTING ALGORITHM.

  // TODO: It should compare only elements with integer keys that are less than len.
  var arrayIsSorted = false; // is true when array is sorted.
  var elementsWasSwapped = false; // is true when elements are swapped.
  var keys = Object.keys(array);

  // While array is unsorted.
  while (!arrayIsSorted) {
    for (var i = 0; i < array.length - 1; i++) {
      // Pass in elements to compare only if.
      if (array.hasOwnProperty(i)) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(array, i);
        var isWritable = propertyDescriptor.writable;

        // Check if element has non-writable property and throw TypeError if so.
        if (isWritable === false) {
          throw new TypeError('Cannot assign to read only property of object.');
        }
      }

      // Process holes.
      if (!array.hasOwnProperty(i)) {
        delete array[i];
      }

      var key = keys[i];
      var prevValue = array[i];
      var nextValue = array[i + 1];
      var notIndexKey = isNaN(+key);

      // Process elements with nonIndex keys in array-like obj to the end.
      if (notIndexKey) {
        array[i] = nextValue;
        array[i + 1] = prevValue;
      }

      // If previous element < next element, swap them.
      // Then set elementsWasSwapped to true.
      if (innerSort(prevValue, nextValue) > 0) {
        array[i] = nextValue;
        array[i + 1] = prevValue;
        //
        elementsWasSwapped = true;
      }
    }

    // If elements were swapped, hence array still unsorted.
    // If no elements were swapped in the entire for loop, hence array is sorted.
    arrayIsSorted = !elementsWasSwapped;

    // Set elementsWasSwapped to false for the next for loop iteration.
    elementsWasSwapped = !elementsWasSwapped;
  }

  return array;
}

// Array.prototype.splice
function splice(array, start, deleteCount) {
  // Normalizing passed in arguments to Integer.
  start = parseInt(Number(start));
  deleteCount = parseInt(Number(deleteCount));

  if (isNaN(start)) {
    start = 0;
  }

  if (isNaN(deleteCount)) {
    deleteCount = 0;
  }

  var len = array.length;
  var indexToStart = parseInt(start) || 0; // position to start changing the array;
  var itemsToDeleteCount = len - indexToStart; // number of elements to delete from the array;
  var itemsToInsertCount = 0; //number of items to insert to the array;
  var itemsToShiftCount = 0;
  var removedItems = []; // array to store deleted elements;
  var itemsToInsert = []; // array to store items to insert;
  var itemsToShift = []; // array to store rest elements of the array;

  // If only array, or nothing passed in as arguments, do nothing and return empty removedItems array.
  if (arguments.length < 2) {
    return removedItems;
  }

  // If deleteCount passed in, update itemsToDeleteCount and itemsToShiftCount.
  if (arguments.length > 2) {
    itemsToDeleteCount = parseInt(deleteCount) || 0;
    itemsToShiftCount = itemsToDeleteCount;
  }

  // If start > array.length, set indexToStart to array.length, and itemsToDelete to 0.
  if (start > array.length) {
    indexToStart = array.length;
    itemsToDeleteCount = 0;
  }

  if (start < 0) {
    indexToStart = Math.max(len + start, 0);
  }

  // If non-writable properties, throw TypeError.
  var keys = Object.keys(array);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var propertyDescriptor = Object.getOwnPropertyDescriptor(array, key);
    if (!propertyDescriptor.writable) {
      throw new TypeError('Cannot assign to read only property of object.');
    }
  }

  // Step 1. If items to insert passed in, populate the itemsToInsert array, and update itemsToInsertCount.
  if (arguments.length > 3) {

    for (var i = 3; i < arguments.length; i++) {
      var item = arguments[i];
      itemsToInsert.push(item);
    }

    itemsToInsertCount = itemsToInsert.length;

    // If no items to delete and items to insert, populate the itemsToShift array with elements from start index.
    if (itemsToDeleteCount === 0) {
      for (var i = start; i < len; i++) {
        var item = array[i];
        itemsToShift.push(item);
      }
    }
  }

  // Step 2. Populate removedItems array with elements to delete, and itemsToShift array with rest elements.
  for (var i = 0; i < itemsToDeleteCount; i++) {
    var indexToRemove = indexToStart + i;
    var itemToRemove = array[indexToRemove];
    removedItems.push(itemToRemove);
    delete array[indexToRemove];

    var indexToShift = indexToRemove + itemsToDeleteCount;
    if (indexToShift in array) {
      var itemToShift = array[indexToShift];
      itemsToShift.push(itemToShift);
    }
  }

  array.length = indexToStart; // to remove all elements after start.

  // Step 3. Insert new items to the array at start position.
  var k = 0; // index to iterate through the itemsToInsertArray;
  for (var i = indexToStart; i < indexToStart + itemsToInsertCount; i++) {
    var item = itemsToInsert[k];
    array[i] = item;
    k++;
  }
  array.length = indexToStart + itemsToInsertCount; // Explicitly update array.length to handle objects with length and zero-based keys.

  // Step 4. Add itemsToShift to the array.
  var offset = array.length;
  array.length += itemsToShift.length; // Explicitly update array.length to handle objects with length and zero-based keys.
  for (var i = 0; i < itemsToShift.length; i++) {
    var item = itemsToShift[i];
    var nextIndex = offset + i;
    array[nextIndex] = item;
  }

  return removedItems;
}