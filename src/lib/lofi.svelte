<script>
  import { Link } from "svelte-navigator";

  //setting up deezer API
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "26ed9a7238msh42eb30a06cd1235p174ef8jsnae84630d35a5",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  
  //fetching specific playlists for lofi
  let deezer_lofi = [
    "3338949242", "1306085715",
    "8749345882", "2994534926",
    "6399372064", "9858729782"
  ];

  //variables to store information that the api fetches
  let song_titles = [];
  let song_covers = [];
  let playlist_id = [];

  //fetching playlist titles and covers
  for (let i = 0; i < deezer_lofi.length; i++) {
    fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/playlist/" + deezer_lofi[i],
      options
    )
      .then((response) => response.json())
      .then((response) => {
        var { title } = response;
        var { picture_medium } = response;
        var { id } = response;

        //reducing length of titles if long
        if (title.length > 20) title = title.substring(0, 20) + "...";

        //pushing titles and covers into variables
        playlist_id.push(id);
        song_titles.push(title);
        song_covers.push(picture_medium);
        song_titles = song_titles;
        song_covers = song_covers;
        song_titles = song_titles;
      })
      .catch((err) => console.error(err)); //to handle errors
  }
</script>

<!--layout start-->
<br><br> 
<h5>__________________________</h5> 
<h2>Lofi</h2> 
<!--displaying playlists in grid form-->
<div class="grid">
  {#each song_titles as songtitle, i}
    <Link to="/playlist/{playlist_id[i]}">
      <div class="item">
        <img src={song_covers[i]} alt="Cover" />
        <h5>{song_titles[i]}</h5> 
      </div>
    </Link>
  {/each}
</div>
<!--layout end-->

<!--CSS part start-->
<style scoped>
  /*for the title*/
  h2 {
    margin: 0;
    margin-top: 0.25rem;
    margin-bottom: 1rem;
    color: white;
    font-weight:bolder;
  }
  /*for the playlist names*/
  h5 {
    color: white;
  }
</style>
<!--CSS part end-->