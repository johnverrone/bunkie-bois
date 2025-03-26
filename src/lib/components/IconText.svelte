<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Icon from './Icon.svelte';

	interface IconTextProps {
		name: ComponentProps<typeof Icon>['name'];
		label: string;
	}

	let { name, label }: IconTextProps = $props();
</script>

<span class="row">
	<Icon {name} />
	{label}
</span>

<style lang="scss">
	.row {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}
</style>
