<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import BreadcrumbItem from '$lib/components/BreadcrumbItem.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let teeBoxName: string | undefined;
	let rating: number | undefined;
	let slope: number | undefined;
	let holes: Record<
		number,
		{ par: number | undefined; yardage: number | undefined; handicap: number | undefined }
	> = {
		1: { par: undefined, yardage: undefined, handicap: undefined },
		2: { par: undefined, yardage: undefined, handicap: undefined },
		3: { par: undefined, yardage: undefined, handicap: undefined },
		4: { par: undefined, yardage: undefined, handicap: undefined },
		5: { par: undefined, yardage: undefined, handicap: undefined },
		6: { par: undefined, yardage: undefined, handicap: undefined },
		7: { par: undefined, yardage: undefined, handicap: undefined },
		8: { par: undefined, yardage: undefined, handicap: undefined },
		9: { par: undefined, yardage: undefined, handicap: undefined },
		10: { par: undefined, yardage: undefined, handicap: undefined },
		11: { par: undefined, yardage: undefined, handicap: undefined },
		12: { par: undefined, yardage: undefined, handicap: undefined },
		13: { par: undefined, yardage: undefined, handicap: undefined },
		14: { par: undefined, yardage: undefined, handicap: undefined },
		15: { par: undefined, yardage: undefined, handicap: undefined },
		16: { par: undefined, yardage: undefined, handicap: undefined },
		17: { par: undefined, yardage: undefined, handicap: undefined },
		18: { par: undefined, yardage: undefined, handicap: undefined }
	};
</script>

<Breadcrumbs>
	<BreadcrumbItem href={`/settings`} label="Settings" />
	<BreadcrumbItem href={`/courses`} label="Courses" />
	<BreadcrumbItem href={`/courses/${data.course.id}`} label={data.course.name} />
	<BreadcrumbItem label="New Tee Box" />
</Breadcrumbs>

{#if form?.message}<p class="error">{form.message}</p>{/if}

<form class="tee-box-form" method="post" action="?/createTeeBox">
	<input type="hidden" name="courseId" value={data.course.id} />
	<Input
		label="Tee Box Name"
		type="text"
		placeholder="Black"
		name="name"
		bind:value={teeBoxName}
		required
	/>
	<Input
		label="Rating"
		type="number"
		inputmode="decimal"
		placeholder="70.0"
		name="rating"
		step="0.1"
		min="55"
		max="155"
		bind:value={rating}
		required
	/>
	<Input
		label="Slope"
		type="number"
		inputmode="numeric"
		placeholder="113"
		name="slope"
		step="1"
		min="55"
		max="155"
		bind:value={slope}
		required
	/>
	<table>
		<thead>
			<th>Hole</th>
			<th>Par</th>
			<th>Yardage</th>
			<th>Handicap</th>
		</thead>
		<tbody>
			{#each Object.entries(holes) as [number, hole]}
				<tr>
					<td><b>{number}</b></td>
					<td>
						<input
							type="number"
							inputmode="numeric"
							min="3"
							max="5"
							name={`hole-${number}-par`}
							bind:value={hole.par}
						/>
					</td>
					<td>
						<input
							type="number"
							inputmode="numeric"
							min="1"
							max="700"
							name={`hole-${number}-yardage`}
							bind:value={hole.yardage}
						/>
					</td>
					<td>
						<input
							type="number"
							inputmode="numeric"
							min="1"
							max="18"
							name={`hole-${number}-handicap`}
							bind:value={hole.handicap}
						/>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="button-row">
		<a href={`/courses`} class="cancel">Cancel</a>
		<div class="save">
			<Button type="submit" fullWidth>Save</Button>
		</div>
	</div>
</form>

<style lang="scss">
	.tee-box-form {
		display: flex;
		flex-direction: column;
		gap: 16px;

		table {
			table-layout: fixed;
			border-collapse: collapse;
		}

		th,
		td {
			border: thin solid rgba(255, 255, 255, 0.1);
			padding: 10px;
			text-align: center;
		}

		input[type='number'] {
			width: 100%;
			border: none;
			outline: none;
			text-align: center;
			background-color: unset;
			color: var(--secondary);
			font-weight: bold;
		}

		.button-row {
			margin-top: 16px;
			display: flex;
			align-items: center;
			gap: 16px;

			.cancel,
			.save {
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
