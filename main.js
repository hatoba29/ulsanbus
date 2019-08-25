var request = require("request");

var url = "http://openapi.its.ulsan.kr/UlsanAPI/BusTimetable.xo";
var queryParams =
  "?" +
  encodeURIComponent("ServiceKey") +
  "=bl8rMsNR%2FFJz%2FCoQAMg9FH1bYNQ4E8TvYDLexwZN2W3%2FHvck1vtDe%2BYHdfxkDMjcGTY%2BfHH8I6pyOM8san7nug%3D%3D"; /* Service Key*/
queryParams +=
  "&" +
  encodeURIComponent("pageNo") +
  "=" +
  encodeURIComponent("1"); /* 기본1 */
queryParams +=
  "&" +
  encodeURIComponent("numOfRows") +
  "=" +
  encodeURIComponent("10"); /* 기본10 */
queryParams +=
  "&" +
  encodeURIComponent("routeNo") +
  "=" +
  encodeURIComponent(
    "304"
  ); /* 노선번호 6번 노선정보 오퍼레이션을 통해 확인 가능. */
queryParams +=
  "&" +
  encodeURIComponent("dayOfWeek") +
  "=" +
  encodeURIComponent(
    "0"
  ); /* 0: 평일 1: 토요일 2: 주말,공휴일 3: 방학(평일) 4: 방학(토요일) 5: 방학(일요일) */

request(
  {
    url: url + queryParams,
    method: "GET"
  },
  function(error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    console.log("Reponse received", body);
  }
);
