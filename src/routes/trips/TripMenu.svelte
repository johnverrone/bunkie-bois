<script lang="ts">
	import Icon from '@components/Icon.svelte';
	export let id = 'popover';
	export let tripId: number | undefined;
</script>

<div {id} class="action-menu">
	<a href={`/trips/${tripId}/edit`} class="edit">
		<Icon name="trash" /> Edit Trip
	</a>
</div>

<style lang="scss">
	.action-menu {
		background: var(--secondary-background);
		padding: 4px 8px;
		border-radius: 4px;
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

		.edit {
			display: flex;
			align-items: center;
			gap: 8px;
		}
	}
</style>
