<script lang="ts">
	import PageTitle from '@components/PageTitle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageTitle>{data.course.name}</PageTitle>

<ul>
	{#each data.course['tee_boxes'] as teeBox}
		<li>
			<h3>{teeBox.name} ({teeBox.rating} / {teeBox.slope})</h3>
			<table class="table">
				<thead>
					<th>Hole</th>
					<th>Par</th>
					<th>Yardage</th>
					<th>Handicap</th>
				</thead>
				<tbody>
					{#each teeBox['hole_info'] as hole}
						<tr>
							<td><b>{hole['hole_number']}</b></td>
							<td>{hole.par}</td>
							<td>{hole.yardage}</td>
							<td>{hole.handicap}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</li>
	{/each}
</ul>

<style>
	.table {
		width: 100%;
	}
</style>
