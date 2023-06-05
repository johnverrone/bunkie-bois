<script lang="ts">
	import BreadcrumbItem from '@components/BreadcrumbItem.svelte';
	import Breadcrumbs from '@components/Breadcrumbs.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<Breadcrumbs>
		<BreadcrumbItem href={`/trips/${data.trip.id}/games`} label="Games" />
		<BreadcrumbItem label="Skins" />
	</Breadcrumbs>
	<ol>
		<li>
			<span>John</span>
			<span>
				<span class="hole">2</span>
				<span class="hole">11</span>
				<span class="hole">18</span>
			</span>
		</li>
		<li>
			<span>Alex</span>
			<span>
				<span class="hole">1</span>
				<span class="hole">3</span>
				<span class="hole">4</span>
				<span class="hole">13</span>
				<span class="hole">16</span>
			</span>
		</li>
	</ol>
</div>

<style lang="scss">
	ol {
		list-style: none;
		padding-inline-start: 0;
		margin: 0;
	}

	li {
		display: flex;
		justify-content: space-between;
		padding: 8px 0;
	}

	.hole {
		display: inline-grid;
		place-items: center;
		width: 3ch;
		height: 3ch;
		background-color: var(--dp-02);
		border-radius: 50%;
	}
</style>
