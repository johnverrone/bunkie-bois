<div class="spinner">
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>

<style lang="scss">
	.spinner {
		--diameter: 50px;
		position: absolute;
		top: calc(50% - var(--diameter) / 2);
		left: calc(50% - var(--diameter) / 2);
		width: var(--diameter);
		height: var(--diameter);

		div {
			position: absolute;
			width: 100%;
			height: 100%;
			border: 5px solid;
			border-radius: 50%;
			border-color: var(--gold) transparent transparent transparent;
			animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

			&:nth-child(1) {
				animation-delay: -0.45s;
			}
			&:nth-child(2) {
				animation-delay: -0.3s;
			}
			&:nth-child(3) {
				animation-delay: -0.15s;
			}
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
