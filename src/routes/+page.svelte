<script lang="ts">
	import _ from 'lodash'
	import axios from 'axios'
	import * as Hangul from 'hangul-js'

	import type { Data, Route, BusStop } from '@/types/api'

	let data: Data
	let busResult: Route[] = []
	let stopResult: BusStop[] = []

	const init = async () => {
		const localData = localStorage.getItem('data') ?? ''

		if (localData.length > 0) {
			console.log('[init] localData exists')
			data = JSON.parse(localData)
		} else {
			console.log('[init] get data from api')
			const res = await axios.get('/api/init')
			data = res.data
			localStorage.setItem('data', JSON.stringify(data))
		}
	}

	const updateResult = _.debounce((e: Event) => {
		const target = e.target as HTMLInputElement
		const query = target.value

		busResult = []
		stopResult = []

		if (query.length < 2) {
			return
		}

		// search bus number
		if (!isNaN(Number(query[0]))) {
			busResult = data.routes.filter((r) => r.num.startsWith(query))
		}
		// search bus stop
		const searcher = new Hangul.Searcher(query)
		stopResult = data.busStops.filter((r) => searcher.search(r.name) >= 0 || r.id.startsWith(query))
	}, 500)
</script>

<main class="wrapper">
	{#await init()}
		<h1>Loading...</h1>
	{:then}
		<h1 class="title">울산버스</h1>
		<input class="searchbox" placeholder="노선번호, 정류장명, 정류장번호" on:input={updateResult} />
		<div class="result">
			{#if busResult.length > 0}
				<h2 class="subtitle">노선번호</h2>
				{#each busResult as bus}
					<p class="item">{bus.name}</p>
				{/each}
			{/if}

			{#if stopResult.length > 0}
				<h2 class="subtitle">정류장</h2>
				{#each stopResult as stop}
					<p class="item">{stop.name} ({stop.id})</p>
				{/each}
			{/if}
		</div>
	{/await}
</main>

<style lang="scss">
	.wrapper {
		height: 100%;
		max-width: 480px;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
	}

	.title {
		font-size: 32px;
		text-align: center;
		color: #61afef;
	}

	.searchbox {
		height: 52px;
		width: 100%;
		box-sizing: border-box;
		border: 2px solid #d7dae0;
		padding: 12px 8px;
		background-color: #0000;

		color: #d7dae0;
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
		color: #98c379;
	}

	.item {
		color: #d7dae0;
	}
</style>
