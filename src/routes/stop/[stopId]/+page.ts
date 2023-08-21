export const load = ({ params, data }) => {
	return {
		id: params.stopId,
		streamed: data.streamed
	}
}
