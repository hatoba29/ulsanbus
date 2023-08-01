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
		<h3>{hour}</h3>
		{#each timetable[hour] as row}
			<span>{row.time.minute}</span>
		{/each}
	{/each}
{/await}

<style lang="scss"></style>
