import axios from 'axios'

import type { Arrival, Data } from '@/types/api'

const apiAxios = axios.create({ baseURL: '/api' })

const api = {
	init: async () => {
		const { data } = await apiAxios.get<Data>('/init')
		return data
	},
	arrival: async (stopId: string) => {
		const { data } = await apiAxios.get<Arrival[]>(`/arrival/${stopId}`)
		return data
	}
}

export default api
