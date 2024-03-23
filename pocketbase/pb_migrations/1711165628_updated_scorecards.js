/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iotd0y0motx4m96")

  collection.indexes = [
    "CREATE INDEX `idx_bvTUNQ9` ON `scorecards` (\n  `player`,\n  `round`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iotd0y0motx4m96")

  collection.indexes = []

  return dao.saveCollection(collection)
})
