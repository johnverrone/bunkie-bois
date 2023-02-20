<script lang="ts">
	import Button from '@components/Button.svelte';
	import Scorecard from '@components/Scorecard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: teeBoxes = data.courseData.tee_boxes;

	type TeeBoxesById = { [key: string]: typeof teeBoxes[number] };
	$: teeBoxesById = data.courseData.tee_boxes.reduce<TeeBoxesById>(
		(acc, curr) => ({ ...acc, [curr.id]: curr }),
		{}
	);

	let selectedTeeBoxId: number | null;
	$: selectedTeeBox = selectedTeeBoxId ? teeBoxesById[selectedTeeBoxId] : null;
</script>

<div class="scorecard-container">
	<p>{`${data.player.name}'s Scorecard`}</p>

	<select class="tee-box-select" bind:value={selectedTeeBoxId}>
		<option>Select tee box</option>
		{#each teeBoxes as teeBox}
			<option value={teeBox.id}>{teeBox.name}</option>
		{/each}
	</select>

	{#if !!selectedTeeBox}
		<Scorecard courseTeeBox={selectedTeeBox} />
	{/if}

	<Button fullWidth>Submit</Button>
</div>

<style lang="scss">
	.scorecard-container {
		overflow: auto;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.tee-box-select {
		height: 36px;
		background-color: var(--dp-12);
		color: #fefefe;
		border: none;
		border-radius: 4px;
		padding: 2px 4px;
		outline-color: var(--primary);
		outline-style: solid;
		outline-width: 1px;
		outline-offset: -1px;
	}
</style>
