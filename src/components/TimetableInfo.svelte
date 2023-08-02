<script setup lang="ts">
	import _ from 'lodash'

	import LoadingOverlay from './LoadingOverlay.svelte'
	import api from '@/tools/api'

	const Day = {
		Weekday: 0,
		Sat: 1,
		Sun: 2
	} as const
	type DayType = (typeof Day)[keyof typeof Day]

	export let id: string
	export let directionNum: number
	export let classNum: number

	let isVacation = false
	let dayOfWeek: DayType = Day.Weekday
	let hours: string[]

	const init = async () => {
		const data = await api.timetable(id, isVacation ? dayOfWeek + 3 : dayOfWeek)
		const timetable = data.filter((d) => d.direction === directionNum && d.classNum === classNum)
		const timetableByHour = _.groupBy(timetable, 'time.hour')
		hours = _.sortBy(Object.keys(timetableByHour), Number)

		return timetableByHour
	}
</script>

{#await init()}
	<LoadingOverlay />
{:then timetable}
	{#each hours as hour}
		<div class="timetable-row">
			<h3 class="hour">{hour}</h3>
			<div>
				{#each timetable[hour] as row}
					<span class="minute">{row.time.minute}</span>
				{/each}
			</div>
		</div>
	{/each}
{/await}

<style lang="scss">
	.timetable-row {
		display: flex;
		border-bottom: 1px solid white;

		&:last-of-type {
			border: none;
		}
	}
	.hour {
		margin: 0;
		border-right: 1px solid white;
		padding: 16px;

		text-align: center;
	}
	.minute {
		display: inline-block;
		margin: 8px;
	}
</style>
