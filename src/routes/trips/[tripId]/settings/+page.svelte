<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import { pb } from '$lib/pocketbase';

	function signout() {
		pb.authStore.clear();
		goto('/', { invalidateAll: true });
	}
</script>

<List>
	<ListItem href="/courses" title="Manage Courses" />
	<ListItem href="/trips" title="Change Trip" />
	<Button on:click={signout} variant="secondary">Logout</Button>
</List>
