<script lang="ts">
	import feather from 'feather-icons';

	export let name: keyof typeof feather.icons;

	$: icon = feather.icons[name];
</script>

{#if icon}
	{@html icon.toSvg({ ...icon.attrs, height: '1rem', width: '1rem' })}
{/if}
