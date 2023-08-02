<script setup lang="ts">
	import LoadingOverlay from './LoadingOverlay.svelte'
	import api from '@/tools/api'

	export let id: string

	const init = async () => {
		const route = api.route(id)
		return route
	}
</script>

{#await init()}
	<LoadingOverlay />
{:then route}
	{#each route as stop}
		<div class="stop-item">
			<div class="wrapper">
				<div class="line" />
				<div class="circle" />
			</div>
			{stop.name} ({stop.id.slice(4)})
		</div>
	{/each}
{/await}

<style lang="scss">
	@use '@/styles/color';

	$length: 48px;

	.stop-item {
		display: flex;
		height: $length;

		align-items: center;
	}

	.wrapper {
		position: relative;
		width: $length;
		height: $length;
	}
	.line {
		position: absolute;
		left: calc($length / 2 - 1px);

		width: 0;
		height: 100%;
		border-left: 2px solid color.$white;
	}
	.circle {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 2px solid color.$white;
		background-color: color.$black;
	}
</style>
