import apiUlsan from '@/tools/apiUlsan'
import type { Data } from '@/types/api'

const formatBusName = (name: string, c: number) => {
	const [num] = name.split('(')

	if (c === 0) return num
	return num + `(지원 ${c})`
}

export const load = async () => {
	const response: Data = {
		streamed: {
			buses: new Promise((resolve) => {
				console.log('[buses] start')
				return apiUlsan.allBuses().then((response) => {
					const allBuses = response.map((row) => ({
						num: row.BRTNO.toString(),
						id: row.BRTID.toString(),
						name: formatBusName(row.BRTNAME, row.CLASS),
						direction: row.BRTNAME.match(/\((.*)\)/)?.[1],
						directionNum: row.DIRECTION,
						classNum: row.CLASS
					}))
					console.log('[buses] end')

					resolve(allBuses)
				})
			}),
			stops: new Promise((resolve) => {
				console.log('[stops] start')
				return apiUlsan.allStops().then((response) => {
					const allStops = response.map((row) => ({
						id: row.STOPID.toString(),
						name: row.STOPNAME,
						direction: row.STOPREMARK
					}))
					console.log('[stops] end')

					resolve(allStops)
				})
			})
		}
	}

	return response
}
