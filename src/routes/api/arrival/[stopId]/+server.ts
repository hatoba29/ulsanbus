import { json } from '@sveltejs/kit'

import apiUlsan from '@/tools/apiUlsan'
import type { Arrival } from '@/types/api'

export const GET = async ({ params }) => {
	const result = await apiUlsan.arrivalInfo(params.stopId)
	const response: Arrival[] = result.map((row) => ({
		id: row.ROUTEID,
		name: row.ROUTENM,
		arrivalTime: row.ARRIVALTIME,
		stopCount: row.PREVSTOPCNT,
		stopName: row.PRESENTSTOPNM,
		vehicleNumber: row.VEHICLENO.slice(2)
	}))

	return json(response)
}