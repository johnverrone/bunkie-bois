<script lang="ts">
	type TeeBox = {
		id: number;
		name: string;
		course_id: number;
		rating: number;
		slope: number;
		hole_info: {
			tee_box_id: number;
			hole_number: number;
			par: number;
			yardage: number;
			handicap: number;
		}[];
	};

	export let courseTeeBox: TeeBox;
	export let front9: Record<number, number | null> = {};
	export let back9: Record<number, number | null> = {};
	export let readonly = false;

	$: holes = courseTeeBox.hole_info;
	$: front9Holes = holes.filter((hole) => hole.hole_number <= 9);
	$: back9Holes = holes.filter((hole) => hole.hole_number > 9);

	let front9Inputs: Record<number, HTMLInputElement> = {};
	let back9Inputs: Record<number, HTMLInputElement> = {};

	function maybeMoveNext(event: KeyboardEvent, next: number) {
		const t = event.target as HTMLInputElement;
		if (!/^[0-9]$/i.test(event.key)) return;
		if (parseInt(t.value) > 1 || t.value.length >= 2) {
			if (next <= 9) {
				front9Inputs[next]?.focus();
			} else if (next <= 18) {
				back9Inputs[next]?.focus();
			}
		}
	}

	$: front9Total = Object.values(front9).reduce<number>((acc, curr) => (acc += curr ?? 0), 0);
	$: back9Total = Object.values(back9).reduce<number>((acc, curr) => (acc += curr ?? 0), 0);

	$: score = front9Total + back9Total;

	$: front9Yards = front9Holes.reduce<number>((acc, curr) => (acc += curr.yardage ?? 0), 0);
	$: back9Yards = back9Holes.reduce<number>((acc, curr) => (acc += curr.yardage ?? 0), 0);
	$: front9Par = front9Holes.reduce<number>((acc, curr) => (acc += curr.par ?? 0), 0);
	$: back9Par = back9Holes.reduce<number>((acc, curr) => (acc += curr.par ?? 0), 0);
</script>

<div class="scorecard">
	<table id="front9">
		<thead>
			<tr>
				<th>Hole</th>
				{#each front9Holes as hole}
					<th>{hole.hole_number}</th>
				{/each}
				<th>Out</th>
			</tr>
			<tr>
				<th>Yards</th>
				{#each front9Holes as hole}
					<th>{hole.yardage}</th>
				{/each}
				<th>{front9Yards}</th>
			</tr>
			<tr>
				<th>Par</th>
				{#each front9Holes as hole}
					<th>{hole.par}</th>
				{/each}
				<th>{front9Par}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Score</td>
				{#each front9Holes as hole}
					<td>
						{#if readonly}
							<span
								class:birdie={front9[hole.hole_number] === hole.par - 1}
								class:bogey={front9[hole.hole_number] === hole.par + 1}
								class:double={front9[hole.hole_number] === hole.par + 2}
								class:triple={front9[hole.hole_number] ?? 0 >= hole.par + 3}
							>
								{front9[hole.hole_number]}
							</span>
						{:else}
							<input
								type="number"
								inputmode="numeric"
								autocomplete="off"
								min="1"
								max="9"
								name={`hole-${hole.hole_number}-score`}
								bind:value={front9[hole.hole_number]}
								bind:this={front9Inputs[hole.hole_number]}
								on:keyup={(e) => maybeMoveNext(e, hole.hole_number + 1)}
							/>
						{/if}
					</td>
				{/each}
				<td>{front9Total}</td>
			</tr>
		</tbody>
	</table>

	<table id="back9">
		<thead>
			<tr>
				<th>Hole</th>
				{#each back9Holes as hole}
					<th>{hole.hole_number}</th>
				{/each}
				<th>In</th>
				<th>Total</th>
			</tr>
			<tr>
				<th>Yards</th>
				{#each back9Holes as hole}
					<th>{hole.yardage}</th>
				{/each}
				<th>{back9Yards}</th>
				<th>{front9Yards + back9Yards}</th>
			</tr>
			<tr>
				<th>Par</th>
				{#each back9Holes as hole}
					<th>{hole.par}</th>
				{/each}
				<th>{back9Par}</th>
				<th>{front9Par + back9Par}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Score</td>
				{#each back9Holes as hole}
					<td>
						{#if readonly}
							<span
								class:birdie={back9[hole.hole_number] === hole.par - 1}
								class:bogey={back9[hole.hole_number] === hole.par + 1}
								class:double={back9[hole.hole_number] === hole.par + 2}
								class:triple={back9[hole.hole_number] ?? 0 >= hole.par + 3}
							>
								{back9[hole.hole_number]}
							</span>
						{:else}
							<input
								type="number"
								inputmode="numeric"
								autocomplete="off"
								min="1"
								max="9"
								name={`hole-${hole.hole_number}-score`}
								bind:value={back9[hole.hole_number]}
								bind:this={back9Inputs[hole.hole_number]}
								on:keyup={(e) => maybeMoveNext(e, hole.hole_number + 1)}
							/>
						{/if}
					</td>
				{/each}
				<td>{back9Total}</td>
				<td>{score}</td>
			</tr>
		</tbody>
	</table>
</div>

<style lang="scss">
	#front9 {
		margin-bottom: 16px;
	}

	.scorecard {
		overflow-x: auto;

		table {
			table-layout: fixed;
			border-collapse: collapse;

			th {
				min-width: 50px;
			}

			td {
				text-align: center;
				background-color: var(--dp-02);
				position: relative;

				input[type='number'] {
					width: 100%;
					border: none;
					outline: none;
					text-align: center;
					background-color: unset;
					color: var(--secondary);
					font-weight: bold;
				}

				.birdie:before {
					display: inline-block;
					content: '';
					position: absolute;
					border: thin solid var(--gold);
					border-radius: 50%;
					top: 10%;
					left: 10%;
					right: 10%;
					margin: auto;
					height: 80%;
					aspect-ratio: 1/1;
				}

				.bogey:before {
					display: inline-block;
					content: '';
					position: absolute;
					border: thin solid var(--bogey);
					top: 10%;
					left: 10%;
					right: 10%;
					margin: auto;
					height: 80%;
					aspect-ratio: 1/1;
				}

				.double:before {
					display: inline-block;
					content: '';
					position: absolute;
					border: 3px double var(--bogey);
					top: 10%;
					left: 10%;
					right: 10%;
					margin: auto;
					height: 80%;
					aspect-ratio: 1/1;
				}

				.triple:before {
					display: inline-block;
					content: '';
					position: absolute;
					border: 3px double var(--triple);
					top: 10%;
					left: 10%;
					right: 10%;
					margin: auto;
					height: 80%;
					aspect-ratio: 1/1;
				}
			}
		}
	}

	th,
	td {
		border: thin solid;
		padding: 10px;
	}

	td input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
