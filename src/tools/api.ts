import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { API_KEY } from '$env/static/private'

const apiAxios = axios.create({
	baseURL: 'http://openapi.its.ulsan.kr/UlsanAPI',
	params: { numOfRows: 10000, serviceKey: API_KEY }
})
const xmlParser = new XMLParser()

export const api = {
	routeInfo: async () => {
		const { data } = await apiAxios.get('/RouteInfo.xo')
		const parsed = xmlParser.parse(data)
		return parsed.tableInfo.list.row
	},
	busStopInfo: async () => {
		const { data } = await apiAxios.get('/BusStopInfo.xo')
		const parsed = xmlParser.parse(data)
		return parsed.tableInfo.list.row
	}
}
