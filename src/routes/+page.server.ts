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
				return apiUlsan.allBuses().then((response) => {
					const allBuses = response.map((row) => ({
						num: row.BRTNO.toString(),
						id: row.BRTID.toString(),
						name: formatBusName(row.BRTNAME, row.CLASS),
						direction: row.BRTNAME.match(/\((.*)\)/)?.[1],
						directionNum: row.DIRECTION,
						classNum: row.CLASS
					}))

					resolve(allBuses)
				})
			}),
			stops: new Promise((resolve) => {
				return apiUlsan.allStops().then((response) => {
					const allStops = response.map((row) => ({
						id: row.STOPID.toString(),
						name: row.STOPNAME,
						direction: row.STOPREMARK
					}))

					resolve(allStops)
				})
			})
		}
	}

	return response
}
