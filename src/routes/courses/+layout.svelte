<script>
	import { page } from '$app/stores';
	import Main from '@components/Main.svelte';
	import NavBar from '@components/NavBar.svelte';
	import PageTitle from '@components/PageTitle.svelte';
</script>

<PageTitle>Courses</PageTitle>

<NavBar
	items={[
		{
			href: `/trips`,
			label: 'Trips',
			active: $page.route.id?.startsWith('/trips') ?? false
		},
		{
			href: `/courses`,
			label: 'Courses',
			active: $page.route.id?.startsWith('/courses') ?? false
		}
	]}
/>

<Main>
	<slot />
</Main>
