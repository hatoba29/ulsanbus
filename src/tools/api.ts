import axios from 'axios'

import type { Data, Arrival, Timetable, Route } from '@/types/api'

const apiAxios = axios.create({ baseURL: '/api' })

const api = {
	init: async () => {
		try {
			const { data } = await apiAxios.get<Data>('/init')
			return data
		} catch {
			return { buses: [], stops: [] }
		}
	},
	arrivals: async (stopId: string) => {
		try {
			const { data } = await apiAxios.get<Arrival[]>(`/arrival/${stopId}`)
			return data
		} catch {
			return []
		}
	},
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
