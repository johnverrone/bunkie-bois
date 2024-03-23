/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "n1vyk3ru1k89qt5",
    "created": "2024-03-23 00:09:20.966Z",
    "updated": "2024-03-23 00:09:20.966Z",
    "name": "holeInfo",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "awzuba7c",
        "name": "teeBox",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "wk0de5qc1hytuou",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "zsmbmuqn",
        "name": "holeNumber",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 18,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "r3l07xyu",
        "name": "par",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 3,
          "max": 5,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "n5xhulra",
        "name": "yardage",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "f14d4a2o",
        "name": "handicap",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 18,
          "noDecimal": true
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_GrpNKKV` ON `holeInfo` (\n  `teeBox`,\n  `holeNumber`\n)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("n1vyk3ru1k89qt5");

  return dao.deleteCollection(collection);
})
