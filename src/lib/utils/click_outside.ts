export function clickOutside(node: HTMLElement) {
	const handleClick = (event: MouseEvent) => {
		if (event.target instanceof Element && !node.contains(event.target)) {
			event.preventDefault();
			event.stopPropagation();
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
