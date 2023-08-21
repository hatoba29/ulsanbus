<script setup lang="ts">
	import { onMount } from 'svelte'
	import _ from 'lodash'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	import LoadingOverlay from './LoadingOverlay.svelte'
	import type { Timetable } from '@/types/api'

	const Day = {
		Weekday: 0,
		Sat: 1,
		Sun: 2
	} as const
	type DayType = (typeof Day)[keyof typeof Day]

	export let getTimetable: Promise<Timetable[]>
	export let directionNum: number
	export let classNum: number

	let promise: Promise<any> = new Promise(() => {})
	let isVacation = false
	let dayOfWeek: DayType
	let hours: string[]

	const fetch = async () => {
		const data = await getTimetable
		const timetable = data.filter((d) => d.direction === directionNum && d.classNum === classNum)
		const timetableByHour = _.groupBy(timetable, 'time.hour')
		hours = _.sortBy(Object.keys(timetableByHour), Number)

		return timetableByHour
	}
	const refresh = () => {
		if (dayOfWeek >= 0) {
			promise = fetch()
		}
	}

	onMount(() => {
		const param = $page.url.searchParams.get('dayOfWeek') ?? '0'
		dayOfWeek = parseInt(param) as DayType
	})

	$: if (dayOfWeek >= 0) {
		goto(`?dayOfWeek=${isVacation ? dayOfWeek + 3 : dayOfWeek}`)
	}
	$: {
		refresh()
		// This line is trick to make this reactive statement depends on below variables
		;[getTimetable]
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
	@use '@/styles/color';

	.options {
		display: flex;
		margin-bottom: 16px;
	}
	.day-of-week {
		margin-left: 16px;
	}

	.timetable-row {
		display: flex;
		border-bottom: 1px solid color.$white;

		&:last-of-type {
			border: none;
		}
	}
	.hour {
		margin: 0;
		border-right: 1px solid color.$white;
		padding: 16px;

		text-align: center;
	}
	.minute {
		display: inline-block;
		margin: 8px;
	}
</style>
