import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { API_KEY } from '$env/static/private'

const xmlParser = new XMLParser()
const apiAxios = axios.create({
	baseURL: 'http://openapi.its.ulsan.kr/UlsanAPI',
	params: { numOfRows: 10000, serviceKey: API_KEY }
})

const parse = (data: string) => {
	return xmlParser.parse(data).tableInfo.list.row
}

export const api = {
	routeInfo: async () => {
		const { data } = await apiAxios.get('/RouteInfo.xo')
		return parse(data)
	},
	busStopInfo: async () => {
		const { data } = await apiAxios.get('/BusStopInfo.xo')
		return parse(data)
	},
	arrivalInfo: async (id: string) => {
		const { data } = await apiAxios.get('/getBusArrivalInfo.xo', { params: { stopid: id } })
		return parse(data)
	}
}
