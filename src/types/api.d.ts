export interface BusRow {
	BRTNO: number
	BRTID: number
	BRTNAME: string
	CLASS: number
	DIRECTION: number
}

export interface StopRow {
	STOPID: number
	STOPNAME: string
	STOPREMARK: string
}

export interface RouteRow {
	STOPID: number
	STOPNM: string
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

export interface Bus {
	num: string
	id: string
	name: string
	direction?: string
	directionNum: number
	classNum: number
}

export interface Stop {
	id: string
	name: string
	direction: string
}

export interface Arrival {
	id: string
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

export interface Route {
	id: string
	name: string
}

export interface Data {
	streamed: {
		buses: Promise<Bus[]>
		stops: Promise<Stop[]>
	}
}
