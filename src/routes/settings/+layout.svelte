<script>
	import Main from '$lib/components/Main.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';

	let { children } = $props();
</script>

<PageTitle>Settings</PageTitle>

<Main>
	{@render children()}
</Main>
