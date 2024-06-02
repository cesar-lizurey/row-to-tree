const { rowToTree } = require('../index');

describe('rowToTree', () => {
  it('should convert an array of objects into a tree structure', () => {
    const data = [
      { id: 1, id_parent: null, name: "ROOT" },
      { id: 2, id_parent: 1, name: "LEAF 2" },
      { id: 4, id_parent: 1, name: "LEAF SISTER" },
      { id: 6, id_parent: 2, name: "OTHER LEAF" },
      { id: 5, id_parent: null, name: "NEW ROOT" },
    ];

    const expected = [
      {
        id: 1,
        id_parent: null,
        name: "ROOT",
        children: [
          {
            id: 2,
            id_parent: 1,
            name: "LEAF 2",
            children: [
              {
                id: 6,
                id_parent: 2,
                name: "OTHER LEAF",
                children: []
              }
            ]
          },
          {
            id: 4,
            id_parent: 1,
            name: "LEAF SISTER",
            children: []
          }
        ]
      },
      {
        id: 5,
        id_parent: null,
        name: "NEW ROOT",
        children: []
      },
    ];

    expect(rowToTree(data)).toEqual(expected);
  });
});