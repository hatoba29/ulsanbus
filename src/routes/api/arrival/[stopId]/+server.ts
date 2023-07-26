import { json } from '@sveltejs/kit'

import { api } from '@/tools/api'
import type { ArrivalRow } from '@/types/api'

export const GET = async ({ params }) => {
	const result = await api.arrivalInfo(params.stopId)
	const response = result.map((row: ArrivalRow) => ({
		id: row.ROUTEID,
		name: row.ROUTENM,
		direction: row.REMARK,
		arrivalTime: row.ARRIVALTIME,
		stopCount: row.PREVSTOPCNT,
		stopName: row.PRESENTSTOPNM,
		vehicleNumber: row.VEHICLENO
	}))

	return json(response)
}
