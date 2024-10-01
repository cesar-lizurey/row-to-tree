function rowToTree(data, options = {}) {
  const defaultOptions = {
    idKey: 'id',
    parentKey: 'id_parent',
    childrenKey: 'children'
  };
  const mergedOptions = { ...defaultOptions, ...options };

  // Row sort so that rows are treated in order
  data.sort((a, b) => {
    if (a[mergedOptions.parentKey] === null) return -1;
    if (b[mergedOptions.parentKey] === null) return 1;
    return a[mergedOptions.parentKey] - b[mergedOptions.parentKey];
  });

  const map = {};
  const roots = [];

  data.forEach((item) => {
    const newItem = { ...item, [mergedOptions.childrenKey]: [] };
    map[newItem[mergedOptions.idKey]] = newItem;
    const parent = map[newItem[mergedOptions.parentKey]];
    if (parent) {
      parent[mergedOptions.childrenKey].push(newItem);
    } else {
      roots.push(newItem);
    }
  });

  /*
    There may be several roots, that's why an Array is returned.
    The roots are sorted by their id, in order to prevent a random order of the items
  */
  return roots.sort((a,b) => a[mergedOptions.idKey] > b[mergedOptions.idKey] ? 1 : -1);
}

module.exports = {
  rowToTree
};