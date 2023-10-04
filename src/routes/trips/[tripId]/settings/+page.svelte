<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import { supabase } from '$lib/supabaseClient';

	async function signout() {
		const { error } = await supabase.auth.signOut();
		if (!error) window.location.reload();
	}
</script>

<List>
	<ListItem href="/courses" title="Manage Courses" />
	<ListItem href="/trips" title="Change Trip" />
	<Button on:click={signout} variant="secondary">Logout</Button>
</List>
