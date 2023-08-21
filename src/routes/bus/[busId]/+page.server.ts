import apiUlsan from '@/tools/apiUlsan'
import type { Timetable, Route } from '@/types/api'

export const load = ({ params, url }) => {
	const getRoute = async () => {
		const route = await apiUlsan.route(params.busId)
		const response: Route[] = route.map((row) => {
			return {
				id: row.STOPID.toString(),
				name: row.STOPNM
			}
		})

		return response
	}

	const getTimetable = async () => {
		const busNo = parseInt(params.busId.slice(4, 8), 10)
		const dayOfWeek = url.searchParams.get('dayOfWeek') ?? '0'

		const timetable = await apiUlsan.timetable(busNo.toString(), dayOfWeek)
		const response: Timetable[] = timetable.map((row) => {
			const timeString = row.TIME.toString().padStart(4, '0')
			const time = { hour: timeString.slice(0, 2), minute: timeString.slice(2) }

			return {
				time,
				direction: row.DIRECTION,
				classNum: row.CLASS
			}
		})

		return response
	}

	return { streamed: { route: getRoute(), timetable: getTimetable() } }
}
