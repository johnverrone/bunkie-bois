<script lang="ts">
	import Breadcrumbs from '@components/Breadcrumbs.svelte';
	import BreadcrumbItem from '@components/BreadcrumbItem.svelte';
	import Scorecard from '@components/Scorecard.svelte';
	import type { PageData } from './$types';
	import Button from '@components/Button.svelte';

	export let data: PageData;

	type TeeBoxesById = { [key: string]: (typeof data.courseData.tee_boxes)[number] };
	$: teeBoxesById = data.courseData.tee_boxes.reduce<TeeBoxesById>(
		(acc, curr) => ({ ...acc, [curr.id]: curr }),
		{}
	);

	$: teeBox = teeBoxesById[data.scorecard.tee_box_id];

	$: front9 = data.scorecard.hole_scores
		.filter((hole) => hole.hole_number <= 9)
		.reduce(
			(acc, holeScore) => ({ ...acc, [holeScore.hole_number]: holeScore.score }),
			{} as Record<number, number | null>
		);

	$: back9 = data.scorecard.hole_scores
		.filter((hole) => hole.hole_number > 9)
		.reduce(
			(acc, holeScore) => ({ ...acc, [holeScore.hole_number]: holeScore.score }),
			{} as Record<number, number | null>
		);
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

	<div class="spacer" />

	{#if teeBox}
		<Scorecard courseTeeBox={teeBox} {front9} {back9} readonly />
	{/if}

	<div class="spacer" />

	<div class="button-container">
		<form method="post" action="?/deleteScore">
			<input type="hidden" name="id" value={data.scorecard.id} />
			<Button variant="destructive" type="submit">Delete Score</Button>
		</form>
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
