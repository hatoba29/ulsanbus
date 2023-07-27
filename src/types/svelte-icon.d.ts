declare module '@jamescoyle/svelte-icon' {
	import type { ComponentType, SvelteComponent } from 'svelte'

	interface SvgIconProps {
		type?: string
		path: string
		size?: string | number
		viewbox?: string
		flip?: 'horizontal' | 'vertical' | 'both' | 'none'
		rotate?: number
	}

	const SvgIcon: ComponentType<SvelteComponent<SvgIconProps>>

	export default SvgIcon
}
