/// <reference path="../pb_data/types.d.ts" />

routerAdd('POST', '/api/bb/createHoleScores', (c) => {
	const data = $apis.requestInfo(c).data;
	const { scores } = data;

	const holeScoresCollection = $app.dao().findCollectionByNameOrId('holeScores');

	// TODO: request validation before trying to save to PB
	scores.forEach(s => {
		const record = new Record(holeScoresCollection);
		const form = new RecordUpsertForm($app, record);
		form.loadData(s);
		form.submit();
	});

	return c.json(200, { scores });
});
