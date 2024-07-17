<script lang="ts">
	import feather from 'feather-icons';

	interface IconProps {
		name: keyof typeof feather.icons;
	}

	let { name }: IconProps = $props();

	let icon = $derived(feather.icons[name]);
</script>

{#if icon}
	{@html icon.toSvg({ ...icon.attrs, height: '1rem', width: '1rem' })}
{/if}
