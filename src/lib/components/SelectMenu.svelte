<script lang="ts">
	interface SelectMenuProps {
		name: string;
		label?: string;
		value?: string | number;
		options: { id: string | number; name: string }[];
	}

	let { name, label, value = $bindable(), options }: SelectMenuProps = $props();
</script>

<label for={name}>
	{#if label}{label}{/if}
	<select {name} id={name} bind:value>
		<option value={undefined}>Select a course</option>
		{#each options as option}
			<option value={option.id}>{option.name}</option>
		{/each}
	</select>
</label>

<style lang="scss">
	select {
		display: block;
		width: 100%;
		height: 36px;
		background-color: var(--dp-12);
		color: #fefefe;
		border: none;
		border-radius: 4px;
		padding: 2px 4px;
		outline-color: var(--primary);
		outline-style: solid;
		outline-width: 1px;
	}
</style>
