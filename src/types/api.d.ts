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

export interface TimetableRow {
	DIRECTION: number
	TIME: string
	CLASS: number
}

export interface Route {
	num: string
	id: string
	name: string
	direction?: string
	directionNum: number
	classNum: number
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

export interface Timetable {
	time: { hour: string; minute: string }
	direction: number
	classNum: number
}

export interface Data {
	routes: Route[]
	busStops: BusStop[]
}
