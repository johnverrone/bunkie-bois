<script lang="ts">
	import Icon from './Icon.svelte';
	import Actions from './Actions.svelte';

	// item props
	export let title: string | null = null;

	// link props
	export let href: string | null = null;

	// action menu
	$: hasActionMenu = $$slots.actionMenu;
	let actionMenuAnchor: HTMLElement;
	let actionMenuOpened = false;
</script>

<li>
	<a {href}>
		<h5>{title}</h5>
		{#if hasActionMenu}
			<button
				class="action-menu-button"
				bind:this={actionMenuAnchor}
				on:click|preventDefault={() => (actionMenuOpened = true)}
			>
				<Icon name="more-vertical" />
			</button>
		{/if}
		<slot />
	</a>
	{#if actionMenuOpened}
		<Actions bind:opened={actionMenuOpened} anchor={actionMenuAnchor}>
			<slot name="actionMenu" />
		</Actions>
	{/if}
</li>

<style lang="scss">
	li {
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

	.action-menu-button {
		position: absolute;
		top: 0;
		right: 0;
		color: var(--primary);
		background: none;
		border: none;
		padding: 10px;

		cursor: pointer;
	}
</style>
