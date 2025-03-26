<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import BreadcrumbItem from '$lib/components/BreadcrumbItem.svelte';
	import Button from '$lib/components/Button.svelte';
	import Scorecard from '$lib/components/Scorecard.svelte';
	import type { TeeBox } from '$lib/pocketbase';
	import { deleteScorecard } from '$lib/api';
	import { goto, invalidate } from '$app/navigation';

	let { data } = $props();

	type TeeBoxesById = { [key: string]: TeeBox };
	let teeBoxesById = $derived(
		data.courseData.expand?.teeBoxes_via_course.reduce<TeeBoxesById>(
			(acc, curr) => ({ ...acc, [curr.id]: curr }),
			{}
		)
	);

	let teeBox = $derived(teeBoxesById?.[data.scorecard.expand?.teeBox?.id ?? '']);

	let front9 = $derived(
		data.scorecard.expand?.holeScores_via_scorecard
			.filter((hole) => hole.holeNumber <= 9)
			.reduce(
				(acc, holeScore) => ({ ...acc, [holeScore.holeNumber]: holeScore.score }),
				{} as Record<number, number | null>
			) ?? {}
	);

	let back9 = $derived(
		data.scorecard.expand?.holeScores_via_scorecard
			.filter((hole) => hole.holeNumber > 9)
			.reduce(
				(acc, holeScore) => ({ ...acc, [holeScore.holeNumber]: holeScore.score }),
				{} as Record<number, number | null>
			) ?? {}
	);

	async function handleDelete() {
		await deleteScorecard(data.scorecard.id);
		await invalidate(`trips:${data.trip.id}`);
		goto(`/trips/${data.trip.id}/rounds/${data.round.id}`);
	}
</script>

<div class="scorecard-container">
	<Breadcrumbs>
		<BreadcrumbItem href={`/trips/${data.trip.id}/rounds`} label="Rounds" />
		<BreadcrumbItem
			href={`/trips/${data.trip.id}/rounds/${data.round.id}`}
			label={data.round.name}
		/>
		<BreadcrumbItem label={data.player.name} />
	</Breadcrumbs>

	<div class="spacer"></div>

	{#if teeBox}
		<Scorecard courseTeeBox={teeBox} {front9} {back9} readonly />
	{/if}

	<div class="spacer"></div>

	<div class="button-container">
		<Button onclick={handleDelete} variant="destructive">Delete Score</Button>
	</div>
</div>

<style lang="scss">
	.scorecard-container {
		overflow-x: auto;
		overflow-y: visible;
	}

	.spacer {
		height: 36px;
	}
</style>
