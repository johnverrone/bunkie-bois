<script lang="ts">
	import Button from '@components/Button.svelte';
	import Scorecard from '@components/Scorecard.svelte';
	import type { ActionData, PageData } from './$types';
	import { calculateCourseHandicap } from '@utils/handicap';

	export let data: PageData;
	export let form: ActionData;

	$: teeBoxes = data.courseData.tee_boxes;

	type TeeBoxesById = { [key: string]: (typeof data.courseData.tee_boxes)[number] };
	$: teeBoxesById = data.courseData.tee_boxes.reduce<TeeBoxesById>(
		(acc, curr) => ({ ...acc, [curr.id]: curr }),
		{}
	);

	let selectedTeeBoxId: number | null;
	$: selectedTeeBox = selectedTeeBoxId ? teeBoxesById[selectedTeeBoxId] : null;
	$: par = Object.values(selectedTeeBox?.hole_info ?? []).reduce(
		(acc, curr) => (acc += curr.par),
		0
	);
</script>

<form class="scorecard-container" method="post" action="?/logScore">
	<p>{`${data.player.name}'s Scorecard`}</p>
	<input type="hidden" name="playerId" value={data.player.id} />
	<input type="hidden" name="roundId" value={data.round.id} />
	<input
		type="hidden"
		name="courseHandicap"
		value={!!selectedTeeBox
			? calculateCourseHandicap(
					data.player.handicap,
					selectedTeeBox.slope,
					selectedTeeBox.rating,
					par
			  )
			: 0}
	/>

	<select class="tee-box-select" name="teeBoxId" bind:value={selectedTeeBoxId}>
		<option>Select tee box</option>
		{#each teeBoxes as teeBox}
			<option value={teeBox.id}>{teeBox.name}</option>
		{/each}
	</select>

	{#if !!selectedTeeBox}
		<Scorecard courseTeeBox={selectedTeeBox} />
	{/if}

	{#if form?.message}<p class="error">{form.message}</p>{/if}

	<Button type="submit" fullWidth>Submit</Button>
</form>

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
