<script lang="ts">
	import Icon from './Icon.svelte';
	import Actions from './Actions.svelte';
	import type { Snippet } from 'svelte';

	interface ListItemProps {
		title: string | null;
		href?: string | null;
		actionMenu?: Snippet;
		children?: Snippet;
	}

	let { title = null, href = null, actionMenu, children }: ListItemProps = $props();

	// action menu
	let hasActionMenu = $derived(!!actionMenu);
	let actionMenuAnchor = $state<HTMLElement>();
	let actionMenuOpened = $state(false);

	function onActionMenuClick(e: MouseEvent) {
		e.preventDefault();
		actionMenuOpened = true;
	}
</script>

<li>
	<a {href}>
		<h5>{title}</h5>
		{#if hasActionMenu}
			<button
				class="action-menu-button"
				bind:this={actionMenuAnchor}
				onclick={onActionMenuClick}
				aria-haspopup="menu"
				aria-controls="actionMenu"
			>
				<Icon name="more-vertical" />
			</button>
		{/if}
		{@render children?.()}
	</a>
	{#if actionMenuOpened && !!actionMenu}
		<Actions bind:opened={actionMenuOpened} anchor={actionMenuAnchor}>
			{@render actionMenu()}
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

		&:hover {
			background-color: var(--dp-01);
		}
	}
</style>
