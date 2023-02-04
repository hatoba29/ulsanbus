import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { API_KEY } from '$env/static/private'
import type { RequestHandler } from './$types'
import type { RouteRow, BusStopRow, Data } from '$@types/api'

export const GET = (async () => {
	const parser = new XMLParser()
	const API_URL = 'http://openapi.its.ulsan.kr/UlsanAPI'
	const endpoints = ['/RouteInfo.xo', '/BusStopInfo.xo']
	const axiosConfig = { params: { numOfRows: 10000, serviceKey: API_KEY } }

	const [routeResult, busStopResult] = await Promise.all(
		endpoints.map((endpoint) => axios.get(API_URL + endpoint, axiosConfig))
	)
	const routeParsed = parser.parse(routeResult.data)
	const busStopParsed = parser.parse(busStopResult.data)

	const response: Data = {
		routes: routeParsed.tableInfo.list.row.map((row: RouteRow) => ({
			num: row.BRTNO,
			id: row.BRTID,
			name: row.BRTNAME
		})),
		busStops: busStopParsed.tableInfo.list.row.map((row: BusStopRow) => ({
			id: row.STOPID,
			name: row.STOPNAME
		}))
	}

	return new Response(JSON.stringify(response))
}) satisfies RequestHandler
