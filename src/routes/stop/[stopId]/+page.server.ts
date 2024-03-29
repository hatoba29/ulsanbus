import apiUlsan from '@/tools/apiUlsan'
import type { Arrival } from '@/types/api'

export const load = async ({ params }) => {
	const getArrivals = async () => {
		const arrivals = await apiUlsan.arrivals(params.stopId)
		const response: Arrival[] = arrivals.map((row) => {
			const [name] = row.ROUTENM.toString().split('(')
			const direction = row.ROUTENM.toString().match(/\((.*)\)/)?.[1]

			return {
				id: row.ROUTEID.toString(),
				name,
				direction,
				arrivalTime: row.ARRIVALTIME,
				stopCount: row.PREVSTOPCNT,
				stopName: row.PRESENTSTOPNM,
				vehicleNumber: row.VEHICLENO.slice(2)
			}
		})

		return response
	}

	return { streamed: { arrivals: getArrivals() } }
}
