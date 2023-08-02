import { json } from '@sveltejs/kit'

import apiUlsan from '@/tools/apiUlsan'
import type { Data } from '@/types/api'

const formatBusName = (name: string, c: number) => {
	const [num] = name.split('(')

	if (c === 0) return num
	return num + `(지원 ${c})`
}

export const GET = async () => {
	const [allBuses, allStops] = await Promise.all([apiUlsan.allBuses(), apiUlsan.allStops()])

	const response: Data = {
		buses: allBuses.map((row) => ({
			num: row.BRTNO.toString(),
			id: row.BRTID.toString(),
			name: formatBusName(row.BRTNAME, row.CLASS),
			direction: row.BRTNAME.match(/\((.*)\)/)?.[1],
			directionNum: row.DIRECTION,
			classNum: row.CLASS
		})),
		stops: allStops.map((row) => ({
			id: row.STOPID.toString(),
			name: row.STOPNAME,
			direction: row.STOPREMARK
		}))
	}

	return json(response)
}
