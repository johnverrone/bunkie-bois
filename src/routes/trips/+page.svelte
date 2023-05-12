<script lang="ts">
	import Icon from '@components/Icon.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import TripMenu from './TripMenu.svelte';
	import { popover } from '@utils/popover';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageTitle>Golf Trips</PageTitle>

<ul>
	{#if data.trips.length}
		{#each data.trips as trip}
			<li>
				<a href={`/trips/${trip.id}/rounds`}>
					<div class="action-menu-container">
						<button
							use:popover={{
								component: TripMenu,
								props: { tripId: trip.id }
							}}
						>
							<Icon name="more-vertical" />
						</button>
					</div>
					<h5>{trip.name}</h5></a
				>
			</li>
		{/each}
	{:else}
		<p>no trips yet</p>
	{/if}
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0 1rem;
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
