<script lang="ts">
	import Button from '@components/Button.svelte';
	import Icon from '@components/Icon.svelte';
	import type { PageData } from './$types';
	import RoundConfig from '@components/RoundConfig.svelte';

	export let data: PageData;

	let addRoundMode = false;
</script>

{#if data.rounds.length}
	<ul>
		{#each data.rounds as round}
			<li>
				<a href={`/${data.id}/rounds/${round.id}`}>
					<h5>{round.name}</h5>
					{#if round.date}
						<p>
							{round.date.toLocaleDateString(undefined, { dateStyle: 'medium' })}
						</p>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>no rounds yet</p>
{/if}

{#if addRoundMode}
	<RoundConfig onClose={() => (addRoundMode = false)} id={data.id} />
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
</style>
