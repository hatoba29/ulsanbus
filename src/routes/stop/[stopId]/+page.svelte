<script lang="ts">
	import SvgIcon from '@jamescoyle/svelte-icon'
	import { mdiChevronLeft } from '@mdi/js'

	import LoadingOverlay from '@/components/LoadingOverlay.svelte'
	import api from '@/tools/api'
	import dayjs from '@/tools/dayjs'
	import stop from '@/stores/stop'

	export let data

	const init = async () => {
		const arrivals = await api.arrival(data.id)
		return arrivals
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

{#await init()}
	<LoadingOverlay />
{:then arrivals}
	<nav>
		<SvgIcon type="mdi" path={mdiChevronLeft} size={32} />
		뒤로
	</nav>
	<h1 class="title">{$stop.name}</h1>
	<h3 class="subtitle">{$stop.direction} ({data.id.slice(-5)})</h3>
	<div class="list-wrapper">
		{#each arrivals as arrival}
			<div class="item">
				<div class="item-left">
					<span class="name">{arrival.name}</span>
					<span>{arrival.vehicleNumber}</span>
				</div>
				<div class="item-right">
					<span class="arrival-time">{formatTime(arrival.arrivalTime)} 후 도착 예정</span>
					<span>{formatCount(arrival.stopCount)}</span>
					<span>({arrival.stopName})</span>
				</div>
			</div>
		{/each}
	</div>
{/await}

<style lang="scss">
	@use '@/styles/color';

	nav {
		height: 64px;
		margin-top: 8px;

		display: flex;
		align-items: center;

		font-size: 20px;
	}

	.title,
	.subtitle {
		text-align: center;
	}
	.subtitle {
		margin: 0;
	}

	.list-wrapper {
		margin-top: 16px;
		overflow: auto;
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