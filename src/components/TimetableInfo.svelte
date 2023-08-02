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

	let promise: Promise<any>
	let isVacation = false
	let dayOfWeek: DayType = Day.Weekday
	let hours: string[]

	const fetch = async () => {
		const data = await api.timetable(id, isVacation ? dayOfWeek + 3 : dayOfWeek)
		const timetable = data.filter((d) => d.direction === directionNum && d.classNum === classNum)
		const timetableByHour = _.groupBy(timetable, 'time.hour')
		hours = _.sortBy(Object.keys(timetableByHour), Number)

		return timetableByHour
	}
	promise = fetch()

	$: {
		promise = fetch()
		// This line is trick to make this reactive statement depends on below variables
		;[isVacation, dayOfWeek]
	}
</script>

{#await promise}
	<LoadingOverlay />
{:then timetable}
	<div class="options">
		<label for="vacation">
			<input type="checkbox" id="vacation" bind:checked={isVacation} />
			방학 시간표
		</label>
		<div class="day-of-week">
			<label for="weekday">
				<input
					type="radio"
					bind:group={dayOfWeek}
					name="day-of-week"
					id="weekday"
					value={Day.Weekday}
				/>
				평일
			</label>
			<label for="sat">
				<input type="radio" bind:group={dayOfWeek} name="day-of-week" id="sat" value={Day.Sat} />
				토요일
			</label>
			<label for="sun">
				<input type="radio" bind:group={dayOfWeek} name="day-of-week" id="sun" value={Day.Sun} />
				주말
			</label>
		</div>
	</div>

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
	.options {
		display: flex;
		margin-bottom: 16px;
	}
	.day-of-week {
		margin-left: 16px;
	}

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