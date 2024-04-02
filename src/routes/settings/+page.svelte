<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { pb } from '$lib/pocketbase';

	function signout() {
		pb.authStore.clear();
		goto('/', { invalidateAll: true });
	}
</script>

<PageTitle>Settings</PageTitle>

<Button on:click={signout} variant="secondary">Logout</Button>
