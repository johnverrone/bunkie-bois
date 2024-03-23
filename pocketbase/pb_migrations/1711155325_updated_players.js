/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n76trctxqi74i5q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "je1lgqkm",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n76trctxqi74i5q")

  // remove
  collection.schema.removeField("je1lgqkm")

  return dao.saveCollection(collection)
})
