# row-to-tree

Converts an array of objects into a tree structure

## Why?

When you make a SQL request, you often get an array of rows, each of them being linked to another one in a parent/child relation. And you may want to use this array to display a tree, for example in a [Vuetify component](https://vuetifyjs.com/en/components/treeview).

This module helps you convert the original array into an array of parents and child, building the expected tree:

> ![Expected output][expectedOutput]

## Example

The test file provides an example of what could be done. Suppose you have the following table:

| id  | id_parent |    name     |
| :-: | :-------: | :---------: |
|  1  |   null    |    ROOT     |
|  2  |     1     |   LEAF 2    |
|  4  |     1     | LEAF SISTER |
|  6  |     2     | OTHER LEAF  |
|  5  |   null    |  NEW ROOT   |

You will end up with an array of objects,

## How?

### Installation

```sh
npm install --save row-to-tree
```

### Usage

```javascript
const { rowToTree } = require("row-to-tree");

const data = [
  { id: 1, id_parent: null, name: "ROOT" },
  { id: 2, id_parent: 1, name: "LEAF 2" },
  { id: 4, id_parent: 1, name: "LEAF SISTER" },
  { id: 6, id_parent: 2, name: "OTHER LEAF" },
  { id: 5, id_parent: null, name: "NEW ROOT" },
];

console.log(rowToTree(data));
```

You will get this nested array:

```javascript
[
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
```

### API

`rowToTree(data, options)`

Convert an array of objects into a tree structure.

- `data` (Array): _the array of objects to convert;_
- `options` (JSON, optional): _the JSON of customized paramaters_
  - `idKey` (String, optional): _the name of the key that identifies an object (default: "id");_
  - `parentKey` (String, optional): _the name of the key that identifies the parent of an object (default: "id_parent");_
  - `childrenKey` (String, optional): _the name of the key that will contain the children of an object (default: "children")._
  - `cleanEmptyChildren` (Boolean, optional): _delete the `childrenKey` if the node has no child, i.e. a leaf._

Returns an array of root objects.

## Licence

MIT

[expectedOutput]: ./docs/images/diagram.png "Expected output"
