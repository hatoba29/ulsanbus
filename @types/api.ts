export interface RouteRow {
	BRTNO: number
	BRTID: number
	BRTNAME: string
}

export interface BusStopRow {
	STOPID: number
	STOPNAME: string
}

export interface Route {
	num: number
	id: number
	name: string
}

export interface BusStop {
	id: number
	name: string
}

export interface Data {
	routes: Route[]
	busStops: BusStop[]
}
