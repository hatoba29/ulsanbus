import { json } from '@sveltejs/kit'

import apiUlsan from '@/tools/apiUlsan'
import type { Data } from '@/types/api'

const formatRouteName = (name: string, c: number) => {
	const [num] = name.split('(')
	const direction = name.match(/\((.*)\)/)?.[1]

	let result = num
	if (c !== 0) result += `(지원 ${c})`
	if (direction) result += ` (${direction})`

	return result
}

export const GET = async () => {
	const [routeResult, busStopResult] = await Promise.all([
		apiUlsan.routeInfo(),
		apiUlsan.busStopInfo()
	])

	const response: Data = {
		routes: routeResult.map((row) => ({
			num: row.BRTNO.toString(),
			id: row.BRTID.toString(),
			name: formatRouteName(row.BRTNAME, row.CLASS),
			direction: row.DIRECTION,
			class: row.CLASS
		})),
		busStops: busStopResult.map((row) => ({
			id: row.STOPID.toString(),
			name: row.STOPNAME,
			direction: row.STOPREMARK
		}))
	}

	return json(response)
}
