<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import BreadcrumbItem from '$lib/components/BreadcrumbItem.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { randomGolfCourse } from '$lib/utils/golf';
	import { createCourse } from '$lib/api';
	import { goto } from '$app/navigation';
	import Papa from 'papaparse';

	let courseName = $state<string>();
	let errorMessage = $state<string>();

	type CSVRow = {
		Hole: number;
		Handicap: number;
		Par: number;
		[key: string]: number;
	};
	let files = $state<FileList>();
	let output = $state<CSVRow[]>();
	let teeBoxes = $state<string[]>();
	let uploadErrorMessage = $state<string>();

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!courseName) return;
		try {
			await createCourse(courseName);
			goto('/courses');
		} catch (e) {
			console.error(e);
			errorMessage = 'There was an error creating the course.';
		}
	}

	function handleUpload() {
		const file = files?.[0];
		if (!file) {
			uploadErrorMessage = 'Please select one file to upload.';
			return;
		}
		uploadErrorMessage = '';
		Papa.parse(file, {
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true,
			complete: (results) => {
				output = results.data as CSVRow[];
				const keys = Object.keys(output[0] ?? {});
				teeBoxes = keys.filter((key) => key !== 'Hole' && key !== 'Handicap' && key !== 'Par');
			},
			error: (error) => {
				console.error('Error parsing CSV:', error);
			}
		});
	}
</script>

<Breadcrumbs>
	<BreadcrumbItem href="/settings" label="Settings" />
	<BreadcrumbItem href="/courses" label="Courses" />
	<BreadcrumbItem label="Create" />
</Breadcrumbs>

<form class="course-form" onsubmit={handleSubmit}>
	<Input
		label="Course Name"
		type="text"
		placeholder={randomGolfCourse()}
		name="name"
		bind:value={courseName}
		required
	/>

	{#if errorMessage}<p class="error">{errorMessage}</p>{/if}

	<div class="upload-container">
		<input name="courseCSV" type="file" accept=".csv" bind:files onchange={() => handleUpload()} />
		{#if uploadErrorMessage}<p class="error">{uploadErrorMessage}</p>{/if}
		{#if output && output.length > 0}
			<div class="scorecard">
				<div class="scorecard-col">
					<div>Hole</div>
					<div>Par</div>
					<div>Handicap</div>
					{#each teeBoxes ?? [] as teeBox (teeBox)}
						<div>{teeBox}</div>
					{/each}
				</div>
				{#each output as row (row.Hole)}
					<div class="scorecard-col">
						<div>{row.Hole}</div>
						<div>{row.Par}</div>
						<div>{row.Handicap}</div>
						{#each teeBoxes ?? [] as teeBox (teeBox)}
							<div>{row[teeBox]}</div>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<div class="button-row">
		<a href="/courses" class="cancel">Cancel</a>
		<div class="save">
			<Button type="submit" fullWidth>Save</Button>
		</div>
	</div>
</form>

<style lang="scss">
	.course-form {
		display: flex;
		flex-direction: column;
		gap: 8px;

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

	.upload-container {
		margin-block: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.scorecard {
		display: grid;
		grid-template-columns: repeat(19, 1fr);
	}
</style>
