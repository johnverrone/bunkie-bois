<script lang="ts">
	import Button from '@components/Button.svelte';
	import Icon from '@components/Icon.svelte';
	import type { PageData } from './$types';
	import RoundConfig from '@components/RoundConfig.svelte';
	import RoundMenu from './RoundMenu.svelte';
	import { popover } from '@utils/popover';

	export let data: PageData;

	let addRoundMode = false;
</script>

{#if data.rounds.length}
	<ul>
		{#each data.rounds as round}
			<li>
				<a href={`/trips/${data.trip.id}/rounds/${round.id}`}>
					<div class="action-menu-container">
						<button
							use:popover={{
								component: RoundMenu,
								props: { roundId: round.id }
							}}
						>
							<Icon name="more-vertical" />
						</button>
					</div>
					<h5>{round.name}</h5>
					<h6>{round.course.name}</h6>
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
	<RoundConfig onClose={() => (addRoundMode = false)} id={data.trip.id} />
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
				position: relative;

				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-end;

				padding: 10px;
				border-radius: 8px;

				background-color: var(--dp-01);
			}
		}
	}

	.button-contents {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.action-menu-container {
		position: absolute;
		top: 0;
		right: 0;

		button {
			color: var(--primary);
			background: none;
			border: none;
			padding: 10px;

			cursor: pointer;
		}
	}
</style>
