<script lang="ts">
	export let label: string;
	export let href: string | undefined = undefined;
</script>

{#if href}
	<span class="crumb">
		<a {href}>{label}</a>
	</span>
{:else}
	{label}
{/if}

<style lang="scss">
	.crumb {
		color: grey;

		a {
			text-decoration: none;
			color: inherit;

			&:hover {
				text-decoration: underline;
			}
		}

		&::after {
			content: '/';
			margin-left: 4px;
		}
	}
</style>
