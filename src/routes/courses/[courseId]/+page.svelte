<script lang="ts">
	import PageTitle from '@components/PageTitle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let selectedTeeBoxId: number | null;

	type TeeBox = (typeof data.course)['tee_boxes'][number];
	const teeBoxesById = data.course['tee_boxes'].reduce<Record<number, TeeBox>>(
		(acc, curr) => ({ ...acc, [curr.id]: curr }),
		{}
	);

	$: selectedTeeBox = selectedTeeBoxId ? teeBoxesById[selectedTeeBoxId] : null;
</script>

<PageTitle><a href="/courses">{data.course.name}</a></PageTitle>

<div class="container">
	<select class="tee-box-select" bind:value={selectedTeeBoxId}>
		<option value={undefined}>Select a tee box</option>
		{#each data.course['tee_boxes'] as teeBox}
			<option value={teeBox.id}>{teeBox.name} ({teeBox.rating} / {teeBox.slope})</option>
		{/each}
	</select>

	{#if selectedTeeBox}
		<table class="table">
			<thead>
				<th>Hole</th>
				<th>Par</th>
				<th>Yardage</th>
				<th>Handicap</th>
			</thead>
			<tbody>
				{#each selectedTeeBox['hole_info'] as hole}
					<tr>
						<td><b>{hole['hole_number']}</b></td>
						<td>{hole.par}</td>
						<td>{hole.yardage}</td>
						<td>{hole.handicap}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<style lang="scss">
	.container {
		padding: 0 1rem;
	}

	.table {
		margin-top: 16px;
		width: 100%;

		td {
			text-align: center;
		}
	}

	.tee-box-select {
		height: 36px;
		width: 100%;
		background-color: var(--dp-12);
		color: #fefefe;
		border: none;
		border-radius: 4px;
		padding: 2px 4px;
		outline-color: var(--primary);
		outline-style: solid;
		outline-width: 1px;
	}
</style>
