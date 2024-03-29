<script lang="ts">
	import { onMount } from 'svelte'

	import LoadingOverlay from '@/components/LoadingOverlay.svelte'
	import Navigation from '@/components/Navigation.svelte'
	import dayjs from '@/tools/dayjs'
	import { stopFavorites } from '@/stores/favorites'

	interface State {
		name: string
		direction: string
	}

	export let data

	let name = ''
	let direction = ''
	let favorite: boolean = stopFavorites.has(data.id)

	onMount(() => {
		if (!history.state.name) {
			window.alert('메인 페이지를 통해서 접근해주세요.')
			location.pathname = '/'
		} else {
			const state = history.state as State
			;({ name, direction } = state)
		}
	})

	const init = async () => {
		const arrivals = await data.streamed.arrivals
		return arrivals
	}

	const toggleFavorite = () => {
		if (favorite) {
			stopFavorites.remove(data.id)
		} else {
			stopFavorites.add({ id: data.id, name, direction })
		}
		favorite = !favorite
	}
	const formatTime = (seconds: number) => {
		if (isNaN(seconds)) return '0'
		if (seconds < 60) return '잠시'

		const minutes = dayjs.duration(seconds, 'seconds').asMinutes()
		return `${Math.floor(minutes)}분`
	}
	const formatCount = (count: number) => {
		if (count === 0) return '전 정류장 출발'
		return `${count} 정류장 전`
	}
</script>

<Navigation {favorite} on:toggle={toggleFavorite} />
<h1 class="title">{name}</h1>
<h3 class="subtitle">{direction} ({data.id.slice(-5)})</h3>
<div class="list-wrapper">
	{#await init()}
		<LoadingOverlay />
	{:then arrivals}
		{#each arrivals as arrival}
			<div class="item">
				<div class="item-left">
					<span class="name">{arrival.name}</span>
					{#if arrival.direction}
						<span>{arrival.direction}</span>
					{/if}
					<span>{arrival.vehicleNumber}</span>
				</div>
				<div class="item-right">
					<span class="arrival-time">{formatTime(arrival.arrivalTime)} 후 도착 예정</span>
					<span>{formatCount(arrival.stopCount)}</span>
					<span>({arrival.stopName})</span>
				</div>
			</div>
		{/each}
	{/await}
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

	.list-wrapper {
		position: relative;
		margin-top: 16px;
		overflow: auto;

		flex-grow: 1;
	}
	.item {
		margin: 16px 8px;
		border: 1px solid color.$white;
		border-radius: 4px;
		padding: 16px 8px;

		display: flex;
	}
	.item-left {
		display: flex;
		flex-direction: column;
	}
	.item-right {
		margin-left: auto;

		display: flex;
		flex-direction: column;

		text-align: right;
	}
	.name,
	.arrival-time {
		margin-bottom: 8px;

		font-size: 18px;
		font-weight: bold;
	}
</style>
