/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4r1rz8r8mradchc",
    "created": "2024-04-24 04:39:36.387Z",
    "updated": "2024-04-24 04:39:36.387Z",
    "name": "leagues",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vjooycyv",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\"",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4r1rz8r8mradchc");

  return dao.deleteCollection(collection);
})
