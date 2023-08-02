<script lang="ts">
	import Navigation from '@/components/Navigation.svelte'
	import RouteInfo from '@/components/RouteInfo.svelte'
	import TimetableInfo from '@/components/TimetableInfo.svelte'
	import { onMount } from 'svelte'

	interface State {
		name: string
		direction?: string
		directionNum: number
		classNum: number
	}
	type Tabs = 'timetable' | 'route'

	export let data

	let name: string
	let direction: string | undefined
	let directionNum: number
	let classNum: number
	let tab: Tabs = 'timetable'

	onMount(() => {
		const state = history.state as State
		;({ name, direction, directionNum, classNum } = state)
	})
</script>

<Navigation />
<h1 class="title">{name}</h1>
{#if direction}
	<h3 class="subtitle">{direction}</h3>
{/if}

<div class="tabs">
	<button class="tab" class:selected={tab === 'timetable'} on:click={() => (tab = 'timetable')}>
		시간표
	</button>
	<button class="tab" class:selected={tab === 'route'} on:click={() => (tab = 'route')}>
		노선도
	</button>
</div>

<div class="list-wrapper">
	{#if tab === 'timetable'}
		<TimetableInfo id={data.id} {directionNum} {classNum} />
	{:else}
		<RouteInfo id={data.id} />
	{/if}
</div>

<style lang="scss">
	@use '@/styles/color';

	.title,
	.subtitle {
		text-align: center;
	}
	.subtitle {
		margin: 0;
	}

	.tabs {
		display: flex;
		height: 64px;
		min-height: 64px;
		margin-top: 8px;
	}
	.tab {
		border: none;
		border-bottom: 1px solid color.$white;
		padding: 3px;
		background-color: unset;

		flex-grow: 1;

		cursor: pointer;

		font-size: 18px;
		font-weight: bold;

		&.selected {
			border-bottom-width: 4px;
			padding-bottom: 0;
		}
	}

	.list-wrapper {
		margin: 16px 0;
		overflow: auto;
	}
</style>
