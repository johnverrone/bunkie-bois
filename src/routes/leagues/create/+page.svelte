<script lang="ts">
	import { goto } from '$app/navigation';
	import { createLeague } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Main from '$lib/components/Main.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';

	let name: string | undefined;
	let errorMessage: string | undefined;

	async function handleSubmit() {
		if (!name) {
			errorMessage = 'Invalid trip information.';
			return;
		}

		try {
			const league = await createLeague(name);
			goto(`/leagues/${league.id}`);
		} catch (e) {
			console.error(e);
		}
	}
</script>

<PageTitle>Create League</PageTitle>

<Main>
	<form class="round-form" on:submit|preventDefault={handleSubmit}>
		<Input
			label="League Name"
			type="text"
			placeholder="AGL 2024"
			name="name"
			bind:value={name}
			required
		/>

		{#if errorMessage}<p class="error">{errorMessage}</p>{/if}

		<div class="button-row">
			<a href="/leagues" class="cancel">Cancel</a>
			<div class="save">
				<Button type="submit" fullWidth>Save</Button>
			</div>
		</div>
	</form>
</Main>

<style lang="scss">
	.round-form {
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
</style>
