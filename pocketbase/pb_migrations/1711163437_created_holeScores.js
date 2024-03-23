/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hnh6zsmtg1u5stl",
    "created": "2024-03-23 03:10:37.269Z",
    "updated": "2024-03-23 03:10:37.269Z",
    "name": "holeScores",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nua0q8yg",
        "name": "scorecard",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "iotd0y0motx4m96",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "8ws0gkdh",
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
        "id": "wzkcra1g",
        "name": "score",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_Oi62FcA` ON `holeScores` (\n  `scorecard`,\n  `holeNumber`\n)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hnh6zsmtg1u5stl");

  return dao.deleteCollection(collection);
})
