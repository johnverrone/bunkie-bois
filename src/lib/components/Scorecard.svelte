<script lang="ts">
	import type { TeeBox } from '$lib/pocketbase';

	interface ScorecardProps {
		courseTeeBox: TeeBox;
		front9: Record<number, number | null>;
		back9: Record<number, number | null>;
		readonly?: boolean;
	}

	let {
		courseTeeBox,
		front9 = $bindable({}),
		back9 = $bindable({}),
		readonly = false
	}: ScorecardProps = $props();

	let holes = $derived(courseTeeBox.expand?.holeInfo_via_teeBox ?? []);
	let front9Holes = $derived(holes.filter((hole) => hole.holeNumber <= 9));
	let back9Holes = $derived(holes.filter((hole) => hole.holeNumber > 9));

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

	let front9Total = $derived(
		Object.values(front9).reduce<number>((acc, curr) => (acc += curr ?? 0), 0)
	);
	let back9Total = $derived(
		Object.values(back9).reduce<number>((acc, curr) => (acc += curr ?? 0), 0)
	);

	let score = $derived(front9Total + back9Total);

	let front9Yards = $derived(
		front9Holes.reduce<number>((acc, curr) => (acc += curr.yardage ?? 0), 0)
	);
	let back9Yards = $derived(
		back9Holes.reduce<number>((acc, curr) => (acc += curr.yardage ?? 0), 0)
	);
	let front9Par = $derived(front9Holes.reduce<number>((acc, curr) => (acc += curr.par ?? 0), 0));
	let back9Par = $derived(back9Holes.reduce<number>((acc, curr) => (acc += curr.par ?? 0), 0));
</script>

<div class="scorecard">
	<table id="front9">
		<thead>
			<tr>
				<th>Hole</th>
				{#each front9Holes as hole}
					<th>{hole.holeNumber}</th>
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
					<td
						class="score"
						class:eagle={(front9[hole.holeNumber] ?? 10) <= hole.par - 2}
						class:birdie={front9[hole.holeNumber] === hole.par - 1}
						class:bogey={front9[hole.holeNumber] === hole.par + 1}
						class:double={front9[hole.holeNumber] === hole.par + 2}
						class:triple={(front9[hole.holeNumber] ?? 0) >= hole.par + 3}
					>
						{#if readonly}
							<span> {front9[hole.holeNumber]} </span>
						{:else}
							<input
								type="number"
								inputmode="numeric"
								autocomplete="off"
								min="1"
								max="9"
								name={`hole-${hole.holeNumber}-score`}
								bind:value={front9[hole.holeNumber]}
								bind:this={front9Inputs[hole.holeNumber]}
								onkeyup={(e) => maybeMoveNext(e, hole.holeNumber + 1)}
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
					<th>{hole.holeNumber}</th>
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
					<td
						class="score"
						class:eagle={(back9[hole.holeNumber] ?? 10) <= hole.par - 2}
						class:birdie={back9[hole.holeNumber] === hole.par - 1}
						class:bogey={back9[hole.holeNumber] === hole.par + 1}
						class:double={back9[hole.holeNumber] === hole.par + 2}
						class:triple={(back9[hole.holeNumber] ?? 0) >= hole.par + 3}
					>
						{#if readonly}
							<span>{back9[hole.holeNumber]}</span>
						{:else}
							<input
								type="number"
								inputmode="numeric"
								autocomplete="off"
								min="1"
								max="9"
								name={`hole-${hole.holeNumber}-score`}
								bind:value={back9[hole.holeNumber]}
								bind:this={back9Inputs[hole.holeNumber]}
								onkeyup={(e) => maybeMoveNext(e, hole.holeNumber + 1)}
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

				&:after {
					display: inline-block;
					content: '';
					position: absolute;
					pointer-events: none;
					top: 10%;
					left: 10%;
					right: 10%;
					bottom: 10%;
					margin: auto;
				}

				&.eagle:after {
					border: 3px double var(--eagle);
					border-radius: 50%;
				}

				&.birdie:after {
					border: thin solid var(--birdie);
					border-radius: 50%;
				}

				&.bogey:after {
					border: thin solid var(--bogey);
				}

				&.double:after {
					border: 3px double var(--double);
				}

				&.triple:after {
					border: 3px double var(--triple);
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
