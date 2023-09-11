<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	import Navigation from '@/components/Navigation.svelte'
	import RouteInfo from '@/components/RouteInfo.svelte'
	import TimetableInfo from '@/components/TimetableInfo.svelte'
	import { busFavorites } from '@/stores/favorites'

	interface State {
		name: string
		direction?: string
		directionNum: number
		classNum: number
	}
	type Tabs = 'timetable' | 'route'

	export let data

	let name: string = ''
	let direction: string | undefined
	let directionNum: number
	let classNum: number

	let tab: Tabs = 'timetable'
	let favorite: boolean = busFavorites.has(data.id)

	onMount(() => {
		if (!history.state.name) {
			window.alert('메인 페이지를 통해서 접근해주세요.')
			goto('/')
		}
		const state = history.state as State
		;({ name, direction, directionNum, classNum } = state)
	})

	const toggleFavorite = () => {
		if (favorite) {
			busFavorites.remove(data.id)
		} else {
			const num = name.split('(')[0]
			busFavorites.add({ id: data.id, num, name, direction, directionNum, classNum })
		}
		favorite = !favorite
	}
</script>

<Navigation {favorite} on:toggle={toggleFavorite} />
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
		<TimetableInfo getTimetable={data.streamed.timetable} {directionNum} {classNum} />
	{:else}
		<RouteInfo getRoute={data.streamed.route} />
	{/if}
</div>

<style lang="scss">
	@use '@/styles/color';
	@use '@/styles/button';

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
		@extend %button;

		border-bottom: 1px solid color.$white;
		padding: 3px;

		flex-grow: 1;
		justify-content: center;

		font-size: 18px;
		font-weight: bold;

		&.selected {
			border-bottom-width: 4px;
			padding-bottom: 0;
		}
	}

	.list-wrapper {
		position: relative;
		padding: 16px 0;
		overflow: auto;

		flex-grow: 1;
	}
</style>
