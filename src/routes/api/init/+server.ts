import { json } from '@sveltejs/kit'

import apiUlsan from '@/tools/apiUlsan'
import type { Data } from '@/types/api'

export const GET = async () => {
	const [routeResult, busStopResult] = await Promise.all([
		apiUlsan.routeInfo(),
		apiUlsan.busStopInfo()
	])

	const response: Data = {
		routes: routeResult.map((row) => ({
			num: row.BRTNO.toString(),
			id: row.BRTID.toString(),
			name: row.BRTNAME
		})),
		busStops: busStopResult.map((row) => ({
			id: row.STOPID.toString().slice(-5),
			name: row.STOPNAME
		}))
	}

	return json(response)
}
