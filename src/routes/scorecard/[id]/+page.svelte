<script lang="ts">
	import type { PageData } from './$types';
	import Scorecard from '../../../components/Scorecard.svelte';

	export let data: PageData;
</script>

<a href="/">go back</a>
<h1>Scorecard {data.id}</h1>

<Scorecard />
