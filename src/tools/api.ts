import axios from 'axios'

import type { Timetable, Route } from '@/types/api'

const apiAxios = axios.create({ baseURL: '/api' })

const api = {
	timetable: async (busId: string, dayOfWeek: number) => {
		try {
			const { data } = await apiAxios.get<Timetable[]>(`/bus/${busId}/timetable`, {
				params: { dayOfWeek }
			})
			return data
		} catch {
			return []
		}
	},
	route: async (busId: string) => {
		const { data } = await apiAxios.get<Route[]>(`/bus/${busId}/route`)
		return data
	}
}

export default api
