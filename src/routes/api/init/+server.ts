import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'
import { API_KEY } from '$env/static/private'
import type { RequestHandler } from './$types'

export const GET = (async () => {
	const parser = new XMLParser()
	const API_URL = 'http://openapi.its.ulsan.kr/UlsanAPI'
	const endpoints = ['/RouteInfo.xo', '/BusStopInfo.xo']
	const axiosConfig = { params: { numOfRows: 10000, serviceKey: API_KEY } }

	const [routeResult, busStopResult] = await Promise.all(
		endpoints.map((endpoint) => axios.get(API_URL + endpoint, axiosConfig))
	)
	const res = { route: parser.parse(routeResult.data), busStop: parser.parse(busStopResult.data) }

	return new Response(JSON.stringify(res))
}) satisfies RequestHandler
