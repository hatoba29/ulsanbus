import { writable, get } from 'svelte/store'
import _ from 'lodash'
import { browser } from '$app/environment'

interface BusFavorite {
	num: string
	id: string
	name: string
	direction?: string
	directionNum: number
	classNum: number
}
interface StopFavorite {
	id: string
	name: string
	direction: string
}
interface Favorites {
	buses: BusFavorite[]
	stops: StopFavorite[]
}

export const favorites = writable<Favorites>({ buses: [], stops: [] })
if (browser) {
	favorites.update((s) => {
		const localData = JSON.parse(localStorage.getItem('favorites') ?? '{}')
		if (!_.isEmpty(localData)) {
			_.assign(s, localData)
		}

		return s
	})
}
favorites.subscribe((s) => {
	if (!browser) return
	localStorage.setItem('favorites', JSON.stringify({ buses: s.buses, stops: s.stops }))
})

export const busFavorites = {
	add: (data: BusFavorite) => {
		favorites.update((s) => {
			s.buses.push(data)
			return s
		})
	},
	remove: (id: string) => {
		favorites.update((s) => {
			_.remove(s.buses, { id })
			return s
		})
	},
	has: (id: string) => {
		const { buses } = get(favorites)
		if (_.some(buses, { id })) {
			return true
		}
		return false
	}
}
export const stopFavorites = {
	add: (data: StopFavorite) => {
		favorites.update((s) => {
			s.stops.push(data)
			return s
		})
	},
	remove: (id: string) => {
		favorites.update((s) => {
			_.remove(s.stops, { id })
			return s
		})
	},
	has: (id: string) => {
		const { stops } = get(favorites)
		if (_.some(stops, { id })) {
			return true
		}
		return false
	}
}
