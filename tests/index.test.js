const { rowToTree } = require("../index");

describe("rowToTree", () => {
  it("should convert an array of objects into a tree structure", () => {
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
                children: [],
              },
            ],
          },
          {
            id: 4,
            id_parent: 1,
            name: "LEAF SISTER",
            children: [],
          },
        ],
      },
      {
        id: 5,
        id_parent: null,
        name: "NEW ROOT",
        children: [],
      },
    ];

    expect(rowToTree(data)).toEqual(expected);
  });

  it("should take into account all the options", () => {
    const data = [
      { ident: 1, idParent: null, name: "ROOT" },
      { ident: 2, idParent: 1, name: "LEAF 2" },
      { ident: 4, idParent: 1, name: "LEAF SISTER" },
      { ident: 6, idParent: 2, name: "OTHER LEAF" },
      { ident: 5, idParent: null, name: "NEW ROOT" },
    ];

    const expected = [
      {
        ident: 1,
        idParent: null,
        name: "ROOT",
        sons: [
          {
            ident: 2,
            idParent: 1,
            name: "LEAF 2",
            sons: [
              {
                ident: 6,
                idParent: 2,
                name: "OTHER LEAF",
                sons: [],
              },
            ],
          },
          {
            ident: 4,
            idParent: 1,
            name: "LEAF SISTER",
            sons: [],
          },
        ],
      },
      {
        ident: 5,
        idParent: null,
        name: "NEW ROOT",
        sons: [],
      },
    ];

    expect(
      rowToTree(data, {
        idKey: "ident",
        parentKey: "idParent",
        childrenKey: "sons",
      })
    ).toEqual(expected);
  });

  it("should take into account partial options", () => {
    const data = [
      { id: 1, idParent: null, name: "ROOT" },
      { id: 2, idParent: 1, name: "LEAF 2" },
      { id: 4, idParent: 1, name: "LEAF SISTER" },
      { id: 6, idParent: 2, name: "OTHER LEAF" },
      { id: 5, idParent: null, name: "NEW ROOT" },
    ];

    const expected = [
      {
        id: 1,
        idParent: null,
        name: "ROOT",
        sons: [
          {
            id: 2,
            idParent: 1,
            name: "LEAF 2",
            sons: [
              {
                id: 6,
                idParent: 2,
                name: "OTHER LEAF",
                sons: [],
              },
            ],
          },
          {
            id: 4,
            idParent: 1,
            name: "LEAF SISTER",
            sons: [],
          },
        ],
      },
      {
        id: 5,
        idParent: null,
        name: "NEW ROOT",
        sons: [],
      },
    ];

    expect(
      rowToTree(data, {
        parentKey: "idParent",
        childrenKey: "sons",
      })
    ).toEqual(expected);
  });

  it("should remove the children key if it's a leaf", () => {
    const data = [
      { id: 1, idParent: null, name: "ROOT" },
      { id: 2, idParent: 1, name: "LEAF 2" },
      { id: 4, idParent: 1, name: "LEAF SISTER" },
      { id: 6, idParent: 2, name: "OTHER LEAF" },
      { id: 5, idParent: null, name: "NEW ROOT" },
    ];

    const expected = [
      {
        id: 1,
        idParent: null,
        name: "ROOT",
        sons: [
          {
            id: 2,
            idParent: 1,
            name: "LEAF 2",
            sons: [
              {
                id: 6,
                idParent: 2,
                name: "OTHER LEAF",
              },
            ],
          },
          {
            id: 4,
            idParent: 1,
            name: "LEAF SISTER",
          },
        ],
      },
      {
        id: 5,
        idParent: null,
        name: "NEW ROOT",
      },
    ];

    expect(
      rowToTree(data, {
        parentKey: "idParent",
        childrenKey: "sons",
        cleanEmptyChildren: true,
      })
    ).toEqual(expected);
  });
});
