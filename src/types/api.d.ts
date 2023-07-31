export interface RouteRow {
	BRTNO: number
	BRTID: number
	BRTNAME: string
	CLASS: number
	DIRECTION: number
}

export interface BusStopRow {
	STOPID: number
	STOPNAME: string
	STOPREMARK: string
}

export interface ArrivalRow {
	VEHICLENO: string
	PREVSTOPCNT: number
	ARRIVALTIME: number
	ROUTEID: number
	PRESENTSTOPNM: string
	ROUTENM: string
}

export interface Route {
	num: string
	id: string
	name: string
	direction?: string
	directionNum: number
	class: number
}

export interface BusStop {
	id: string
	name: string
	direction: string
}

export interface Arrival {
	id: number
	name: string
	direction?: string
	arrivalTime: number
	stopCount: number
	stopName: string
	vehicleNumber: string
}

export interface Data {
	routes: Route[]
	busStops: BusStop[]
}
