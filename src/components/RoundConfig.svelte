<script lang="ts">
	import { clickOutside } from '@utils/click_outside';
	import Button from '@components/Button.svelte';
	import Input from '@components/Input.svelte';
	import { randomGolfCourse } from '@utils/golf';

	export let onClose: () => void = () => {};
	export let id: number;

	let newName: string | undefined;
</script>

<form class="round-form" method="post" action="?/addRound" use:clickOutside on:outclick={onClose}>
	<input type="hidden" name="tripId" value={id} />
	<div class="name">
		<Input type="text" placeholder={randomGolfCourse()} name="name" bind:value={newName} {focus} />
	</div>
	<Button type="submit">Add</Button>
</form>

<style lang="scss">
	.round-form {
		display: flex;
		justify-content: space-between;
		gap: 8px;

		.name {
			flex: 1;
		}
	}
</style>
