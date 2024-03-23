<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import BreadcrumbItem from '$lib/components/BreadcrumbItem.svelte';
	import IconText from '$lib/components/IconText.svelte';
	import type { PageData } from './$types';
	import type { TeeBox } from '$lib/pocketbase';

	export let data: PageData;
	const teeBoxes = data.course.expand?.['teeBoxes_via_course'] ?? [];

	let selectedTeeBoxId: number | null;

	const teeBoxesById =
		teeBoxes.reduce<Record<number, TeeBox>>((acc, curr) => ({ ...acc, [curr.id]: curr }), {}) ?? {};

	$: selectedTeeBox = selectedTeeBoxId ? teeBoxesById[selectedTeeBoxId] : null;
	$: holes = selectedTeeBox?.expand?.holeInfo_via_teeBox;
</script>

<Breadcrumbs>
	<BreadcrumbItem href="/courses" label="Courses" />
	<BreadcrumbItem label={data.course?.name || ''} />
</Breadcrumbs>

<select class="tee-box-select" bind:value={selectedTeeBoxId}>
	<option value={undefined}>Select a tee box</option>
	{#each teeBoxes ?? [] as teeBox}
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
			{#if holes}
				{#each holes as hole}
					<tr>
						<td><b>{hole.holeNumber}</b></td>
						<td>{hole.par}</td>
						<td>{hole.yardage}</td>
						<td>{hole.handicap}</td>
					</tr>
				{/each}
			{:else}
				<tr><td colspan="4">missing hole information</td></tr>
			{/if}
		</tbody>
	</table>
{/if}

<a class="add-tee-box-button" href={`/courses/${data.course?.id}/createTeeBox`}>
	<IconText name="plus" label="Add tee box" />
</a>

<style lang="scss">
	.add-tee-box-button {
		display: block;
		margin-top: 1rem;
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
