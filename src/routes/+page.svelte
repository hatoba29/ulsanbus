<script lang="ts">
	const init = async () => {
		const res = await fetch('/api/init')
		const data = await res.json()
		console.log(data)
		return data
	}
</script>

<main class="wrapper">
	{#await init()}
		<h1>Loading...</h1>
	{:then data}
		<h1 class="title">울산버스</h1>
		<input class="searchbox" placeholder="노선번호, 정류장명, 정류장번호" />
		<p>{data.route.tableInfo.totalCnt}</p>
		<div class="result" />
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
</style>
