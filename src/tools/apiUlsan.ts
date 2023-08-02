import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { API_KEY } from '$env/static/private'

import type { BusRow, StopRow, ArrivalRow, TimetableRow } from '@/types/api'

const xmlParser = new XMLParser()
const apiAxios = axios.create({
	baseURL: 'http://openapi.its.ulsan.kr/UlsanAPI',
	params: { numOfRows: 10000, serviceKey: API_KEY }
})

const parse = (data: string) => {
	return xmlParser.parse(data).tableInfo.list.row
}

const apiUlsan = {
	allBuses: async () => {
		const { data } = await apiAxios.get('/RouteInfo.xo')
		return parse(data) as BusRow[]
	},
	allStops: async () => {
		const { data } = await apiAxios.get('/BusStopInfo.xo')
		return parse(data) as StopRow[]
	},
	arrivals: async (id: string) => {
		const { data } = await apiAxios.get('/getBusArrivalInfo.xo', { params: { stopid: id } })
		return parse(data) as ArrivalRow[]
	},
	timetable: async (routeNo: string, dayOfWeek: string) => {
		const { data } = await apiAxios.get('/BusTimetable.xo', { params: { routeNo, dayOfWeek } })
		return parse(data) as TimetableRow[]
	}
}

export default apiUlsan
