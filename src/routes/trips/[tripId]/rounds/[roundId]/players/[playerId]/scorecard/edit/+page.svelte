<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { logScore, scoresSchemas } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import Scorecard from '$lib/components/Scorecard.svelte';
	import type { TeeBox } from '$lib/pocketbase';
	import { calculateCourseHandicap } from '$lib/utils/handicap';
	import type { PageData } from './$types';

	export let data: PageData;
	let errorMessage: string | undefined;

	$: teeBoxes = data.courseData.expand?.teeBoxes_via_course ?? [];

	type TeeBoxesById = { [key: string]: TeeBox };
	$: teeBoxesById = teeBoxes?.reduce<TeeBoxesById>(
		(acc, curr) => ({ ...acc, [curr.id]: curr }),
		{}
	);

	let selectedTeeBoxId: number | null;
	$: selectedTeeBox = selectedTeeBoxId ? teeBoxesById?.[selectedTeeBoxId] : null;
	$: par = Object.values(selectedTeeBox?.expand?.holeInfo_via_teeBox ?? []).reduce(
		(acc, curr) => (acc += curr.par),
		0
	);

	let front9 = selectedTeeBox?.expand?.holeInfo_via_teeBox
		.filter((hole) => hole.holeNumber <= 9)
		.reduce(
			(acc, holeScore) => ({ ...acc, [holeScore.holeNumber]: null }),
			{} as Record<number, number | null>
		);

	let back9 = selectedTeeBox?.expand?.holeInfo_via_teeBox
		.filter((hole) => hole.holeNumber > 9)
		.reduce(
			(acc, holeScore) => ({ ...acc, [holeScore.holeNumber]: null }),
			{} as Record<number, number | null>
		);

	async function handleSubmit() {
		const parseResult = scoresSchemas.updateScorecardSchema.safeParse({
			playerId: data.player.id,
			roundId: data.round.id,
			teeBoxId: selectedTeeBoxId,
			courseHandicap: !!selectedTeeBox
				? calculateCourseHandicap(
						data.player.handicap,
						selectedTeeBox.slope,
						selectedTeeBox.rating,
						par
				  )
				: 0,
			scores: { ...front9, ...back9 }
		});
		if (!parseResult.success) {
			console.error(parseResult.error);
			return;
		}

		await logScore(parseResult.data);
		await invalidate(`trips:${data.trip.id}`);
		goto(`/trips/${data.trip.id}/rounds/${data.round.id}`);
	}
</script>

<form class="scorecard-container" on:submit|preventDefault={handleSubmit}>
	<p>{`${data.player.name}'s Scorecard`}</p>
	<select class="tee-box-select" name="teeBoxId" bind:value={selectedTeeBoxId}>
		<option>Select tee box</option>
		{#each teeBoxes as teeBox}
			<option value={teeBox.id}>{teeBox.name}</option>
		{/each}
	</select>

	{#if !!selectedTeeBox}
		<Scorecard courseTeeBox={selectedTeeBox} bind:front9 bind:back9 />
	{/if}

	{#if errorMessage}<p class="error">{errorMessage}</p>{/if}

	<Button type="submit" disabled={!selectedTeeBox} fullWidth>Submit</Button>
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
