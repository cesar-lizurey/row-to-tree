function rowToTree(data, options = {}) {
  const defaultOptions = {
    idKey: "id",
    parentKey: "id_parent",
    childrenKey: "children",
    cleanEmptyChildren: false,
  };
  const mergedOptions = { ...defaultOptions, ...options };

  const map = {};
  const roots = [];

  data.forEach((item) => {
    const id = item[mergedOptions.idKey];
    const parentId = item[mergedOptions.parentKey];

    if (!map[id]) {
      map[id] = { ...item, [mergedOptions.childrenKey]: [] };
    } else {
      Object.assign(map[id], item);
    }

    const node = map[id];

    if (parentId === null) {
      roots.push(node);
    } else {
      if (!map[parentId]) {
        map[parentId] = { [mergedOptions.childrenKey]: [] };
      }
      map[parentId][mergedOptions.childrenKey].push(node);
    }
  });

  // Deletion of empty children arrays if cleanEmptyChildren is true
  if (mergedOptions.cleanEmptyChildren) {
    function cleanTree(node) {
      if (Array.isArray(node)) {
        node.forEach(cleanTree);
      } else if (
        node[mergedOptions.childrenKey] &&
        node[mergedOptions.childrenKey].length === 0
      ) {
        delete node[mergedOptions.childrenKey];
      } else {
        node[mergedOptions.childrenKey].forEach(cleanTree);
      }
    }
    cleanTree(roots);
  }

  return roots;
}

module.exports = {
  rowToTree,
};
