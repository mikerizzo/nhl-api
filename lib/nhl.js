var jsdom  = require("jsdom")
var jquery = "http://code.jquery.com/jquery-1.5.min.js"

exports.team = function(team, season, gameType, cb){
  // 1. fetch stats page for given season
  // 2. parse the page
  // 3. build into array of players

  // http://oilers.nhl.com/club/stats.htm?gameType=2&season=20102011
  var url = "http://" + team + ".nhl.com/club/stats.htm?gameType=" + gameType + "&season=" + season

  jsdom.env(url, [jquery], function(err, window){
    if(err) return cb(null)

    var $ = window.$

    var titleText = $('title').text()
    if (gameType === "3" && titleText != null && titleText.indexOf("Playoffs") == -1) return cb(null)
    if (titleText.indexOf(season.substring(0,4) + "-" + season.substring(4)) == -1) return cb(null)

    var playerRows = $(".data").first().find("tr").not(".hdr")
    var goalieRows = $(".data:eq(1)").find("tr").not(".hdr")
    var players = []

    $(playerRows).each(function(i){
      var tds = $(playerRows[i]).find("td")
      var player = {
        sweater  : $(tds[0]).find(".sweaterNo").html(),
        position : $(tds[1]).html(),
        name     : $(tds[2]).find("a").html(),
        games    : parseInt($(tds[3]).html()),
        goals    : parseInt($(tds[4]).html()),
        assists  : parseInt($(tds[5]).html()),
        points   : parseInt($(tds[6]).html())
      }
      players.push(player)
    })

    $(goalieRows).each(function(i){
      var tds = $(goalieRows[i]).find("td")
      var goalie = {
        sweater         : $(tds[0]).find(".sweaterNo").html(),
        position        : "G",
        name            : $(tds[1]).find("a").html(),
        games_played_in : parseInt($(tds[2]).html()),
        games_started   : parseInt($(tds[3]).html()),
        wins            : parseInt($(tds[6]).html()),
        losses          : parseInt($(tds[7]).html()),
        overtime_losses : parseInt($(tds[8]).html()),
        shutouts        : parseInt($(tds[9]).html()),
        goals           : parseInt($(tds[13]).html()),
        assists         : parseInt($(tds[14]).html())
      }
      players.push(goalie)
    })
    cb(players)
  })
}
