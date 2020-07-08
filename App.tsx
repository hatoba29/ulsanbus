import React, { SyntheticEvent, useState } from "react"
import { render } from "react-dom"
import axios from "axios"
import "./style.scss"
import key from "key"

function Main() {
	const APIKEY = "?" + key
	const DEFAULTINPUT = "&pageNo=1&numOfRows=1000"
	const PROXY = "http://openapi.its.ulsan.kr/"
	const URL = "http://UlsanAPI/RouteInfo.xo"

	let query = ""
	const [isLoading, setLoading] = useState(true)
	let route = {}

	function handleChange(e: SyntheticEvent<HTMLInputElement>) {
		query = e.currentTarget.value
	}

	function routeInfo() {
		axios.get(PROXY + URL + APIKEY + DEFAULTINPUT)
			.then(
				(v) => { console.log(v.data) },
				(err) => console.log(err)
			)
	}

	routeInfo()

	/* Render Section */

	if (isLoading) return (<h1>Loading...</h1>)

	return (
		<>
			<h1>고래버스</h1>
			<input placeholder="노선번호/정류장번호/정류장이름" onChange={handleChange} />
		</>
	)
}

render(<Main />, document.getElementById("App"))
