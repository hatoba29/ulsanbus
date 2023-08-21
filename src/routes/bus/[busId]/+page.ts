export const load = ({ params, data }) => {
	return {
		id: params.busId,
		streamed: data.streamed
	}
}
