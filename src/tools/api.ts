import axios from 'axios'

import type { Data, Arrival, Timetable } from '@/types/api'

const apiAxios = axios.create({ baseURL: '/api' })

const api = {
	init: async () => {
		const { data } = await apiAxios.get<Data>('/init')
		return data
	},
	arrival: async (stopId: string) => {
		const { data } = await apiAxios.get<Arrival[]>(`/arrival/${stopId}`)
		return data
	},
	timetable: async (busId: string, dayOfWeek: number) => {
		const { data } = await apiAxios.get<Timetable[]>(`/bus/${busId}/timetable`, {
			params: { dayOfWeek }
		})
		return data
	}
}

export default api
