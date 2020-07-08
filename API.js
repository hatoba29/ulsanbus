var request = require("request")
var xml2js = require("xml2js")
var fs = require("fs")

const ULSANBISAPI = {
  routeInfo: "http://openapi.its.ulsan.kr/UlsanAPI/RouteInfo.xo",
  routeStopInfo: "http://openapi.its.ulsan.kr/UlsanAPI/AllRouteDetailInfo.xo",
  timetable: "http://openapi.its.ulsan.kr/UlsanAPI/BusTimetable.xo",
  stopInfo: "http://openapi.its.ulsan.kr/UlsanAPI/BusStopInfo.xo",
  arrivalInfo: "http://openapi.its.ulsan.kr/UlsanAPI/AllBusArrivalInfo.xo",
}
const APIKEY = "?your_api_key"
const DEFAULTINPUT = "&pageNo=1&numOfRows=1000"

exports.routeInfo = function () {
  var url = ULSANBISAPI.routeInfo + APIKEY + DEFAULTINPUT
  request(
    {
      url: url,
      method: "GET",
    },
    function (error, response, body) {
      options = {
        explicitArray: false,
        valueProcessors: [
          function (value, name) {
            value = xml2js.processors.parseNumbers(value)
            return value
          },
        ],
      }

      xml2js.parseString(body, options, function (err, result) {
        result.tableInfo.list.row.forEach((value) => {
          delete value.RNUM
        })
        console.log(result.tableInfo)
      })
      return "fuck"
    }
  )
}

exports.routeStopInfo = function (routeId) {
  var url =
    ULSANBISAPI.routeInfo + APIKEY + DEFAULTINPUT + "&routeid=" + routeId
}
