<script lang="ts">
	import IconText from '@components/IconText.svelte';
	import List from '@components/List.svelte';
	import ListItem from '@components/ListItem.svelte';
	import Main from '@components/Main.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import { trip } from '$lib/stores/trip';
	import { supabase } from '$lib/supabaseClient';
	import Button from '../../components/Button.svelte';

	async function signout() {
		const { error } = await supabase.auth.signOut();
		if (!error) window.location.reload();
	}
</script>

<PageTitle>Settings</PageTitle>

<a href={$trip ? `/trips/${$trip}` : '/trips'} class="exit"><IconText name="x" label="Exit" /></a>

<Main>
	<List>
		<ListItem href="/courses" title="Manage Courses" />
		<ListItem href="/trips" title="Change Trip" />
		<Button on:click={signout} variant="secondary">Logout</Button>
	</List>
</Main>

<style lang="scss">
	.exit {
		text-align: center;
	}
</style>
