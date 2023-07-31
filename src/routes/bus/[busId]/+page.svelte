<script lang="ts">
	import Navigation from '@/components/Navigation.svelte'

	type Tabs = 'timetable' | 'route'

	let name = '733' // dummy data while developing
	let direction = '덕하공영차고지(종점) 방면' // dummy data while developing
	let tab: Tabs = 'timetable'
</script>

<Navigation />
<h1 class="title">{name}</h1>
<h3 class="subtitle">{direction}</h3>

<div class="tabs">
	<button class="tab" class:selected={tab === 'timetable'} on:click={() => (tab = 'timetable')}>
		시간표
	</button>
	<button class="tab" class:selected={tab === 'route'} on:click={() => (tab = 'route')}>
		노선도
	</button>
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
</style>
