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

routerAdd('GET', '/api/bb/getTripLeaderboard', (c) => {
  const tripId = c.queryParam('tripId');
  const roundIds = c.queryParam('rounds').split(',');

  // get trip players
  const players = $app.dao().findRecordsByFilter(
    'players',
    "trips?~{:tripId}",
    "-name",
    undefined,
    undefined,
    { tripId }
  );

  // for each player fetch scorecards
  const leaderboard = [];
  players.forEach(p => {
    const records = $app.dao().findRecordsByFilter(
      "scorecards",
      "player={:playerId} && round.trip={:tripId} && {:roundIds}?~round.id",
      undefined,
      undefined,
      undefined,
      { playerId: p.id, tripId, roundIds }
    );

    $app.dao().expandRecords(records, ['holeScores_via_scorecard'])

    let gross = 0;
    let handicap = 0;
    for (const card of records) {
      for (const hole of card?.expandedAll('holeScores_via_scorecard') ?? []) {
        gross += hole.getInt('score');
        if (hole.getInt('holeNumber') === 1) {
          //new scorecard, add course handicap
          handicap += card.getInt('playerHandicap');
        }
      }
    }

    leaderboard.push({ player: p.getString('name'), score: { gross, handicap }});
  });

  return c.json(200, { leaderboard });
});
