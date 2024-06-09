async function getMatchData() {
  return await fetch(
    "https://api.cricapi.com/v1/cricScore?apikey=bfa92191-d3e4-4ac0-aa0c-31e66c2df2a8"
  )
    .then((data) => data.json())
    .then((data) => {
      if (data.status != "success") return;

      const matchesList = data.data;

      if (!matchesList) return [];

      //add your api key from cricketdata.org
      const relevantData = matchesList
        .filter((match) => match.series == "ICC Mens T20 World Cup 2024")
        .filter((match) => match.status == "Match not started")

        .map((match) => `${match.t1} VS ${match.t2} , ${match.dateTimeGMT}`);

      document.getElementById("matches").innerHTML = relevantData
        .map((match) => `<li>${match} </li>`)
        .join("");

      return relevantData;
    })
    .catch((e) => console.log(e));
}

getMatchData();
