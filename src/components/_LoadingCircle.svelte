<script lang="ts">
	export let color = '#ffffff'
	export let size = 32

	const style = `
    --color: ${color};
    width: ${size}px;
    height: ${size}px;
  `
</script>

<svg class="spinner" {style} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
	<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" />
</svg>

<style lang="scss">
	$color: var(--color);
	$offset: 187;
	$duration: 1.4s;

	.spinner {
		animation: circle-rotator $duration linear infinite;
		* {
			line-height: 0;
			box-sizing: border-box;
		}
	}

	@keyframes circle-rotator {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(270deg);
		}
	}

	.path {
		stroke-dasharray: $offset;
		stroke-dashoffset: 0;
		transform-origin: center;
		animation: circle-dash $duration ease-in-out infinite,
			circle-colors ($duration * 4) ease-in-out infinite;
	}

	@keyframes circle-colors {
		0% {
			stroke: $color;
		}
		100% {
			stroke: $color;
		}
	}

	@keyframes circle-dash {
		0% {
			stroke-dashoffset: $offset;
		}
		50% {
			stroke-dashoffset: calc($offset / 4);
			transform: rotate(135deg);
		}
		100% {
			stroke-dashoffset: $offset;
			transform: rotate(450deg);
		}
	}
</style>
