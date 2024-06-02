function rowToTree(data, idKey = 'id', parentKey = 'id_parent', childrenKey = 'children') {
    const map = {};
    const roots = [];
  
    data.forEach((item) => {
      const newItem = { ...item, [childrenKey]: [] };
      map[newItem[idKey]] = newItem;
      const parent = map[newItem[parentKey]];
      if (parent) {
        parent[childrenKey].push(newItem);
      } else {
        roots.push(newItem);
      }
    });
  
    return roots;
  }

  module.exports = {
    rowToTree
  };