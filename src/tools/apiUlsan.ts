import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { API_KEY } from '$env/static/private'

import type { RouteRow, BusStopRow, ArrivalRow } from '@/types/api'

const xmlParser = new XMLParser()
const apiAxios = axios.create({
	baseURL: 'http://openapi.its.ulsan.kr/UlsanAPI',
	params: { numOfRows: 10000, serviceKey: API_KEY }
})

const parse = (data: string) => {
	return xmlParser.parse(data).tableInfo.list.row
}

const apiUlsan = {
	routeInfo: async () => {
		const { data } = await apiAxios.get('/RouteInfo.xo')
		return parse(data) as RouteRow[]
	},
	busStopInfo: async () => {
		const { data } = await apiAxios.get('/BusStopInfo.xo')
		return parse(data) as BusStopRow[]
	},
	arrivalInfo: async (id: string) => {
		const { data } = await apiAxios.get('/getBusArrivalInfo.xo', { params: { stopid: id } })
		return parse(data) as ArrivalRow[]
	}
}

export default apiUlsan
