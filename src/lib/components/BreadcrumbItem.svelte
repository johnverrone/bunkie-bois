<script lang="ts">
	interface BreadcrumbItemProps {
		label: string;
		href?: string;
	}
	let { label, href = undefined }: BreadcrumbItemProps = $props();
</script>

{#if href}
	<span class="crumb">
		<a {href}>{label}</a>
	</span>
{:else}
	<span>{label}</span>
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
