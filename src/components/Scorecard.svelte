<script lang="ts">
	import { scorecardsById, type Scorecard } from '../data/course';

	const scorecard = scorecardsById['crown-park']!;

	const front9Score = scorecard.front9;
	const back9Score = scorecard.back9;

	const front9HoleNumbers = Object.keys(front9Score);
	const front9HoleDetails = Object.values(front9Score);
	const back9HoleNumbers = Object.keys(back9Score);
	const back9HoleDetails = Object.values(back9Score);

	function range(size: number, startAt = 0) {
		return [...Array(size).keys()].map((i) => i + startAt);
	}

	$: front9Total = Object.values(front9Score).reduce<number>(
		(acc, curr) => (acc += curr.score ?? 0),
		0
	);
	$: back9Total = Object.values(back9Score).reduce<number>(
		(acc, curr) => (acc += curr.score ?? 0),
		0
	);

	$: front9Par = Object.values(front9Score).reduce<number>(
		(acc, curr) => (acc += curr.par ?? 0),
		0
	);
	$: back9Par = Object.values(back9Score).reduce<number>((acc, curr) => (acc += curr.par ?? 0), 0);
</script>

<h2>this is a scorecard</h2>
<div class="scorecard">
	<table id="front9">
		<thead>
			<th>Hole</th>
			{#each front9HoleNumbers as hole}
				<th>{hole}</th>
			{/each}
			<th>Out</th>
		</thead>
		<tbody>
			<tr>
				<td>Par</td>
				{#each front9HoleDetails as hole}
					<th>{hole.par}</th>
				{/each}
				<td>{front9Par}</td>
			</tr>
			<tr>
				<td>Score</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={front9Score[1]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={front9Score[2]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={front9Score[3]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={front9Score[4]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={front9Score[5]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={front9Score[6]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={front9Score[7]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={front9Score[8]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={front9Score[9]} />
				</td>
				<td>{front9Total}</td>
			</tr>
		</tbody>
	</table>

	<table id="back9">
		<thead>
			<th>Hole</th>
			{#each back9HoleNumbers as hole}
				<th>{hole}</th>
			{/each}
			<th>In</th>
		</thead>
		<tbody>
			<tr>
				<td>Par</td>
				{#each back9HoleDetails as hole}
					<th>{hole.par}</th>
				{/each}
				<td>{back9Par}</td>
			</tr>
			<tr>
				<td>Score</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={back9Score[10]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={back9Score[11]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={back9Score[12]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={back9Score[13]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={back9Score[14]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={back9Score[15]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={back9Score[16]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={back9Score[17]} />
				</td>
				<td>
					<input type="number" autocomplete="off" min="1" max="9" bind:value={back9Score[18]} />
				</td>
				<td>{back9Total}</td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	.scorecard {
		width: 500px;
		margin: 0 auto;
	}

	table {
		table-layout: fixed;
	}

	table,
	th,
	td {
		border: thin solid;
		padding: 5px;
	}

	td {
		text-align: center;
	}

	td input[type='number'] {
		width: 100%;
		border: none;
		outline: none;
		text-align: center;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
