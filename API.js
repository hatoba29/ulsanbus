var request = require("request");
var xml2js = require("xml2js");
var fs = require("fs");

const ULSANBISAPI = {
  routeInfo: "http://openapi.its.ulsan.kr/UlsanAPI/RouteInfo.xo",
  routeStopInfo: "http://openapi.its.ulsan.kr/UlsanAPI/AllRouteDetailInfo.xo",
  timetable: "http://openapi.its.ulsan.kr/UlsanAPI/BusTimetable.xo",
  stopInfo: "http://openapi.its.ulsan.kr/UlsanAPI/BusStopInfo.xo",
  arrivalInfo: "http://openapi.its.ulsan.kr/UlsanAPI/AllBusArrivalInfo.xo"
};
const APIKEY = "?ServiceKey=bl8rMsNR%2FFJz%2FCoQAMg9FH1bYNQ4E8TvYDLexwZN2W3%2FHvck1vtDe%2BYHdfxkDMjcGTY%2BfHH8I6pyOM8san7nug%3D%3D";
const DEFAULTINPUT = "&pageNo=1&numOfRows=1000";

exports.routeInfo = function() {
  var url = ULSANBISAPI.routeInfo + APIKEY + DEFAULTINPUT;
  request(
    {
      url: url,
      method: "GET"
    },
    function(error, response, body) {
      options = {
        explicitArray: false,
        valueProcessors: [
          function(value, name) {
            value = xml2js.processors.parseNumbers(value);
            return value;
          }
        ]
      };

      xml2js.parseString(body, options, function(err, result) {
        result.tableInfo.list.row.forEach(value => {
          delete value.RNUM;
        });

        fs.writeFile("routeData.json", JSON.stringify(result.tableInfo.list.row, null, "  "), "utf8", () => {});
      });
    }
  );
};

exports.routeStopInfo = function(routeId) {
  var url = ULSANBISAPI.routeInfo + APIKEY + DEFAULTINPUT + "&routeid=" + routeId;
};
