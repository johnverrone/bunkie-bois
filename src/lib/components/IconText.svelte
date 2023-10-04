<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Icon from './Icon.svelte';

	export let name: ComponentProps<Icon>['name'];
	export let label: string;
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
