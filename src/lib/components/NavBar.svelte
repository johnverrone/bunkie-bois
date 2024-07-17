<script lang="ts">
	type NavItem = {
		href: string;
		label: string;
		active: boolean;
	};

	interface NavBarProps {
		items: NavItem[];
	}

	let { items }: NavBarProps = $props();
</script>

<nav>
	<ul>
		{#each items as item}
			<li class:active={item.active}>
				<a href={item.href}>{item.label}</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	nav {
		/* --bg-base: 210deg 9%; */
		--bg-base: 205deg 20%;
		--bg-normal: hsl(var(--bg-base) 13%);
		--bg-active: hsl(var(--bg-base) 10%);

		--fg-normal: #fefefe;
		--fg-active: var(--primary);

		position: fixed;
		height: var(--nav-height);
		bottom: 0;
		left: 0;
		right: 0;

		grid-area: nav;
	}

	ul {
		display: flex;
		list-style: none;
		padding-left: 0;
		height: 100%;
	}

	li {
		background: none;
		border: none;
		flex: 1;
		padding-bottom: 20px; // safe area for iPhone home swipe

		background-color: var(--bg-normal);
		color: var(--fg-normal);

		transition: all 100ms ease-in-out;
		transition-property: color, background-color;
	}

	li.active {
		background-color: var(--bg-active);
		color: var(--fg-active);
		border-top: 1px solid var(--fg-active);
	}

	li a {
		color: inherit;
		text-decoration: none;
		width: 100%;
		height: 100%;

		display: grid;
		place-items: center;
	}
</style>
