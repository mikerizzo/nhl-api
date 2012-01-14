var jsdom  = require("jsdom")
var jquery = "http://code.jquery.com/jquery-1.5.min.js"

exports.team = function(team, season, cb){
  // 1. fetch stats page for given season
  // 2. parse the page
  // 3. build into array of players

  // http://oilers.nhl.com/club/stats.htm?season=20102011
  var url = "http://" + team + ".nhl.com/club/stats.htm?season=" + season

  jsdom.env(url, [jquery], function(err, window){
    if(err) return cb(null)

    var $ = window.$

    var playerRows = $(".data").first().find("tr").not(".hdr")
    var goalieRows = $(".data:eq(1)").find("tr").not(".hdr")
    var players = []

    $(playerRows).each(function(i){
      var tds = $(playerRows[i]).find("td")
      var player = {
        sweater  : $(tds[0]).find(".sweaterNo").html(),
        position : $(tds[1]).html(),
        name     : $(tds[2]).find("a").html(),
        games    : $(tds[3]).html(),
        goals    : $(tds[4]).html(),
        assists  : $(tds[5]).html(),
        points   : $(tds[6]).html()
      }
      players.push(player)
    })

    $(goalieRows).each(function(i){
      var tds = $(goalieRows[i]).find("td")
      var goalie = {
        sweater         : $(tds[0]).find(".sweaterNo").html(),
        position        : "G",
        name            : $(tds[1]).find("a").html(),
        games_played_in : $(tds[2]).html(),
        games_started   : $(tds[3]).html(),
        wins            : $(tds[6]).html(),
        losses          : $(tds[7]).html(),
        overtime_losses : $(tds[8]).html(),
        shutouts        : $(tds[9]).html(),
        goals           : $(tds[13]).html(),
        assists         : $(tds[14]).html()
      }
      players.push(goalie)
    })
    cb(players)
  })
}