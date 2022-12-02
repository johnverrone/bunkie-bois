<script lang="ts">
	import feather from 'feather-icons';

	export let name: keyof typeof feather.icons;

	$: icon = feather.icons[name];
	$: icon.attrs.height = '1rem';
	$: icon.attrs.width = '1rem';
</script>

{#if icon}
	{@html icon.toSvg()}
{/if}
