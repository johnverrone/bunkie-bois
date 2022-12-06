<script lang="ts">
	import { clickOutside } from '../../../utils/click_outside';
	import Button from '../../../components/Button.svelte';
	import Input from '../../../components/Input.svelte';
	import Icon from '../../../components/Icon.svelte';
	import type { PageData } from './$types';
	import { randomGolfCourse } from '../../../utils/golf';

	export let data: PageData;

	let addRoundMode = false;
	let newName: string | undefined;
</script>

{#if data.rounds.length}
	<ul>
		{#each data.rounds as round}
			<li>
				<a href={`/${data.id}/rounds/${round.id}`}>
					<h5>{round.name}</h5>
				</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>no rounds yet</p>
{/if}

{#if addRoundMode}
	<form
		class="new-round-form"
		method="post"
		action="?/addRound"
		use:clickOutside
		on:outclick={() => (addRoundMode = false)}
	>
		<input type="hidden" name="tripId" value={data.id} />
		<div class="name">
			<Input
				type="text"
				placeholder={randomGolfCourse()}
				name="name"
				bind:value={newName}
				{focus}
			/>
		</div>
		<Button type="submit">Add</Button>
	</form>
{:else}
	<Button on:click={() => (addRoundMode = true)}>
		<div class="button-contents">
			<Icon name="plus" />
			Add round
		</div>
	</Button>
{/if}

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0;
		list-style: none;

		li {
			height: 150px;
			a {
				color: inherit;
				text-decoration: none;
				width: 100%;
				height: 100%;

				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-end;

				padding: 10px;
				border-radius: 8px;

				background-color: var(--green);
			}
		}
	}

	.button-contents {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.new-round-form {
		display: flex;
		justify-content: space-between;
		gap: 8px;

		.name {
			flex: 1;
		}
	}
</style>
