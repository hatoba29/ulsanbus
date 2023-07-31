import { json } from '@sveltejs/kit'

import apiUlsan from '@/tools/apiUlsan'
import type { Data } from '@/types/api'

const formatRouteName = (name: string, c: number) => {
	const [num] = name.split('(')

	if (c === 0) return num
	return num + `(지원 ${c})`
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
			direction: row.BRTNAME.match(/\((.*)\)/)?.[1],
			directionNum: row.DIRECTION,
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
