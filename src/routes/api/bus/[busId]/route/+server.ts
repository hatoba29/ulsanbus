import { json } from '@sveltejs/kit'

import apiUlsan from '@/tools/apiUlsan'
import type { Route } from '@/types/api'

export const GET = async ({ params }) => {
	const route = await apiUlsan.route(params.busId)
	const response: Route[] = route.map((row) => {
		return {
			id: row.STOPID.toString(),
			name: row.STOPNM
		}
	})

	return json(response)
}
