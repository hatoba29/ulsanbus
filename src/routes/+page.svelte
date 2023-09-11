<script lang="ts">
	import _ from 'lodash'
	import * as Hangul from 'hangul-js'
	import SvgIcon from '@jamescoyle/svelte-icon'
	import { mdiBus, mdiMapMarker } from '@mdi/js'
	import { goto } from '$app/navigation'

	import LoadingOverlay from '@/components/LoadingOverlay.svelte'
	import type { Bus, Stop } from '@/types/api'
	import { favorites } from '@/stores/favorites'

	export let data

	let buses: Bus[] = []
	let stops: Stop[] = []
	let busResult: Bus[] = []
	let stopResult: Stop[] = []
	let query: string

	const restoreResult = () => {
		const sessionQuery = sessionStorage.getItem('query')
		const sessionBusResult = sessionStorage.getItem('busResult')
		const sessionStopResult = sessionStorage.getItem('stopResult')

		if (sessionQuery) {
			query = sessionQuery
		}
		if (sessionBusResult) {
			busResult = JSON.parse(sessionBusResult)
		}
		if (sessionStopResult) {
			stopResult = JSON.parse(sessionStopResult)
		}
	}

	const init = async () => {
		const localData = localStorage.getItem('data') ?? ''

		if (localData.length > 0) {
			console.log('[init] localData exists')
			;({ buses, stops } = JSON.parse(localData))
			restoreResult()
		} else {
			console.log('[init] get data from api')
			;[buses, stops] = await Promise.all([data.streamed.buses, data.streamed.stops])
			localStorage.setItem('data', JSON.stringify({ buses, stops }))
		}
	}

	const updateResult = () => {
		if (query.length < 2) {
			busResult = []
			stopResult = []

			sessionStorage.setItem('query', '')
			sessionStorage.setItem('busResult', '')
			sessionStorage.setItem('stopResult', '')
		}

		_.debounce(() => {
			if (query.length < 2) {
				return
			}

			busResult = []
			stopResult = []

			// search bus number
			if (!isNaN(Number(query[0]))) {
				busResult = buses.filter((r) => r.num.startsWith(query))
			}
			// search bus stop
			const searcher = new Hangul.Searcher(query)
			stopResult = stops.filter((r) => searcher.search(r.name) >= 0 || r.id.startsWith(query))

			sessionStorage.setItem('query', query)
			sessionStorage.setItem('busResult', JSON.stringify(busResult))
			sessionStorage.setItem('stopResult', JSON.stringify(stopResult))
		}, 500)()
	}

	const openBusInfo = (bus: Bus) => {
		const state = {
			name: bus.name,
			direction: bus.direction,
			directionNum: bus.directionNum,
			classNum: bus.classNum
		}
		goto(`/bus/${bus.id}`, { state })
	}
	const openArrivalInfo = (stop: Stop) => {
		goto(`/stop/${stop.id}`, { state: { name: stop.name, direction: stop.direction } })
	}
</script>

{#await init()}
	<LoadingOverlay />
{:then}
	<h1 class="title">울산버스</h1>
	<input
		class="searchbox"
		placeholder="노선번호, 정류장명, 정류장번호"
		bind:value={query}
		on:input={updateResult}
	/>
	<div class="result">
		{#if !query && (!_.isEmpty($favorites.buses) || !_.isEmpty($favorites.stops))}
			<h2 class="subtitle">즐겨찾기</h2>
			{#each $favorites.buses as bus}
				<button class="item" on:click={() => openBusInfo(bus)}>
					<SvgIcon type="mdi" path={mdiBus} size={32} />
					<div>
						<div>{bus.name}</div>
						<div class="item-subtitle">{bus.direction}</div>
					</div>
				</button>
			{/each}
			{#each $favorites.stops as stop}
				<button class="item" on:click={() => openArrivalInfo(stop)}>
					<SvgIcon type="mdi" path={mdiMapMarker} size={32} />
					<div>
						<div>{stop.name} ({stop.id.slice(-5)})</div>
						<div class="item-subtitle">{stop.direction}</div>
					</div>
				</button>
			{/each}
		{/if}

		{#if busResult.length > 0}
			<h2 class="subtitle">노선번호</h2>
			{#each busResult as bus}
				<button class="item" on:click={() => openBusInfo(bus)}>
					<SvgIcon type="mdi" path={mdiBus} size={32} />
					<div>
						<div>{bus.name}</div>
						<div class="item-subtitle">{bus.direction}</div>
					</div>
				</button>
			{/each}
		{/if}

		{#if stopResult.length > 0}
			<h2 class="subtitle">정류장</h2>
			{#each stopResult as stop}
				<button class="item" on:click={() => openArrivalInfo(stop)}>
					<SvgIcon type="mdi" path={mdiMapMarker} size={32} />
					<div>
						<div>{stop.name} ({stop.id.slice(-5)})</div>
						<div class="item-subtitle">{stop.direction}</div>
					</div>
				</button>
			{/each}
		{/if}
	</div>
{/await}

<style lang="scss">
	@use '@/styles/color';
	@use '@/styles/button';

	.title {
		font-size: 32px;
		text-align: center;
		color: color.$blue;
	}
	.subtitle {
		text-align: center;
	}

	.searchbox {
		height: 52px;
		width: 100%;
		box-sizing: border-box;
		border: 2px solid color.$white;
		padding: 12px 8px;
		background-color: #0000;

		font-size: 24px;
		font-weight: bold;
		text-align: center;

		&::placeholder {
			position: relative;
			top: -4px;

			font-size: 16px;
		}
	}

	.result {
		margin-top: 16px;
		overflow: auto;

		flex-grow: 1;
	}

	.subtitle {
		color: color.$green;
	}

	.item {
		@extend %button;

		width: 100%;
		margin: 16px 0;
		border: 1px solid color.$white;
		border-radius: 4px;
		padding: 14px 8px;

		gap: 4px;

		font-size: 18px;
		font-weight: bold;
		text-align: left;
		word-break: keep-all;

		.item-subtitle {
			margin-top: 4px;
			font-size: 16px;
			color: color.$blue;
			font-weight: normal;
		}

		:global(svg) {
			flex-shrink: 0;
		}
		:global(path) {
			color: color.$green;
		}
	}
</style>
