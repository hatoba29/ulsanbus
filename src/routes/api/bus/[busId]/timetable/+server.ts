import { json } from '@sveltejs/kit'

import apiUlsan from '@/tools/apiUlsan'
import type { Timetable } from '@/types/api.js'

export const GET = async ({ params, url }) => {
	const routeNo = parseInt(params.busId.slice(4, 8), 10)
	const dayOfWeek = url.searchParams.get('dayOfWeek') ?? '0'

	const result = await apiUlsan.timetable(routeNo.toString(), dayOfWeek)
	const response: Timetable[] = result.map((row) => {
		const timeString = row.TIME.toString().padStart(4, '0')
		const time = { hour: timeString.slice(0, 2), minute: timeString.slice(2) }

		return {
			time,
			direction: row.DIRECTION,
			classNum: row.CLASS
		}
	})

	return json(response)
}
