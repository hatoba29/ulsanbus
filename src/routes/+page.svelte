<script lang="ts">
	import _ from 'lodash'
	import * as Hangul from 'hangul-js'
	import { goto } from '$app/navigation'

	import LoadingOverlay from '@/components/LoadingOverlay.svelte'
	import api from '@/tools/api'
	import type { Data, Bus, Stop } from '@/types/api'

	let data: Data
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
			data = JSON.parse(localData)
			restoreResult()
		} else {
			console.log('[init] get data from api')
			data = await api.init()
			localStorage.setItem('data', JSON.stringify(data))
		}
	}

	const updateResult = _.debounce(() => {
		busResult = []
		stopResult = []

		if (query.length < 2) {
			return
		}

		// search bus number
		if (!isNaN(Number(query[0]))) {
			busResult = data.buses.filter((r) => r.num.startsWith(query))
		}
		// search bus stop
		const searcher = new Hangul.Searcher(query)
		stopResult = data.stops.filter((r) => searcher.search(r.name) >= 0 || r.id.startsWith(query))

		sessionStorage.setItem('query', query)
		sessionStorage.setItem('busResult', JSON.stringify(busResult))
		sessionStorage.setItem('stopResult', JSON.stringify(stopResult))
	}, 500)

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
		{#if busResult.length > 0}
			<h2 class="subtitle">노선번호</h2>
			{#each busResult as bus}
				<button class="item" on:click={() => openBusInfo(bus)}>
					{bus.name} ({bus.direction})
				</button>
			{/each}
		{/if}

		{#if stopResult.length > 0}
			<h2 class="subtitle">정류장</h2>
			{#each stopResult as stop}
				<button class="item" on:click={() => openArrivalInfo(stop)}>
					{stop.name} ({stop.direction} / {stop.id.slice(-5)})
				</button>
			{/each}
		{/if}
	</div>
{/await}

<style lang="scss">
	@use '@/styles/color';

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
			font-size: 16px;
		}
	}

	.result {
		flex-grow: 1;
	}

	.subtitle {
		color: color.$green;
	}

	.item {
		display: block;
		width: 100%;
		margin: 16px 0;
		border: 1px solid color.$white;
		border-radius: 4px;
		padding: 16px 8px;
		background-color: unset;

		font-size: 18px;

		cursor: pointer;
	}
</style>
