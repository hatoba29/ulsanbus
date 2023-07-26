export interface RouteRow {
	BRTNO: number
	BRTID: number
	BRTNAME: string
}

export interface BusStopRow {
	STOPID: number
	STOPNAME: string
}

export interface ArrivalRow {
	VEHICLENO: number
	PREVSTOPCNT: number
	ARRIVALTIME: number
	ROUTEID: number
	REMARK: string
	PRESENTSTOPNM: string
	ROUTENM: string
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
