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
	num: string
	id: string
	name: string
}

export interface BusStop {
	id: string
	name: string
}

export interface Data {
	routes: Route[]
	busStops: BusStop[]
}
