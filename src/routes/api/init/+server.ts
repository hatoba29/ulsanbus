import { json } from '@sveltejs/kit'

import { api } from '@/tools/api'
import type { RouteRow, BusStopRow, Data } from '@/types/api'

export const GET = async () => {
	const [routeResult, busStopResult] = await Promise.all([api.routeInfo(), api.busStopInfo()])

	const response: Data = {
		routes: routeResult.map((row: RouteRow) => ({
			num: row.BRTNO.toString(),
			id: row.BRTID.toString(),
			name: row.BRTNAME
		})),
		busStops: busStopResult.map((row: BusStopRow) => ({
			id: row.STOPID.toString().slice(-5),
			name: row.STOPNAME
		}))
	}

	return json(response)
}
