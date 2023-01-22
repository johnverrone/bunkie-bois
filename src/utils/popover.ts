import { createPopper, type Instance } from '@popperjs/core';
import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

type PopoverOptions<T extends SvelteComponent> = {
	component: ComponentType<T>;
	props?: ComponentProps<T>;
};

export function popover<T extends SvelteComponent>(
	node: HTMLElement,
	{ component, props }: PopoverOptions<T>
) {
	const button = node;
	let open = false;
	let componentInstance: SvelteComponent | null;
	let renderedComponent: HTMLElement | null;
	let popperInstance: Instance | null = null;

	function toggleMenu(e: MouseEvent) {
		e.preventDefault();
		open ? closeMenu() : openMenu();
	}

	function detectClickOutside(event: MouseEvent) {
		if (
			open &&
			renderedComponent &&
			event.target instanceof Element &&
			!button.contains(event.target) &&
			!renderedComponent.contains(event.target)
		) {
			closeMenu();
		}
	}

	function openMenu() {
		componentInstance = new component({
			target: document.body,
			props
		});
		open = true;
		// A component rendered with this must have an id of 'popover' for the time
		// being until I figure this shit out.
		renderedComponent = document.querySelector('#popover');

		if (renderedComponent) {
			popperInstance = createPopper(button, renderedComponent, {
				placement: 'bottom-end'
			});
		}

		document.addEventListener('click', detectClickOutside);
	}

	function closeMenu() {
		renderedComponent = null;
		componentInstance?.$destroy();
		open = false;
		if (popperInstance) {
			popperInstance.destroy();
			popperInstance = null;
		}
	}

	button.addEventListener('click', toggleMenu);

	return {
		destroy() {
			button.removeEventListener('click', toggleMenu);
			document.removeEventListener('click', detectClickOutside);
		}
	};
}
