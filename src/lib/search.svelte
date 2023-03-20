<script>
  import { useLocation } from "svelte-navigator";
  const location = useLocation();
  import mainStore from "../store.js";
  export let id;
  $: $location, getdata();
  getdata();

  //declaring variables to store deezer information that is fetched
  let song_titles = [];
  let song_covers = [];
  let song_artists = [];
  let song_previews = [];

  // setting deezer API
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "26ed9a7238msh42eb30a06cd1235p174ef8jsnae84630d35a5",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  async function getdata() {
    //waiting for id (search input) from the search box
    await id;
    //fetching from deezer api
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + id, options)
      .then((response) => response.json())
      .then((response) => {
        song_previews = [];
        song_titles = [];
        song_covers = [];
        song_artists = [];
        //looping though all results
        for (let i = 0; i < response.data.length; i++) {
          var { preview } = response.data[i];
          var { title_short } = response.data[i];
          var { cover_xl } = response.data[i].album;
          var { name } = response.data[i].artist;

          //shortening titles length
          if (title_short.length > 20)
            title_short = title_short.substring(0, 20) + "...";

          //pushing track data to array (only previews)
          song_previews.push(preview);
          song_titles.push(title_short);
          song_covers.push(cover_xl);
          song_artists.push(name);
        }
      })
      .catch((err) => console.error(err)); //to handle errors
  }

  //setting to play the song preview
  function play_song(n) {
    mainStore.set({
      songArtist: song_artists,
      songArtwork: song_covers,
      songTitle: song_titles,
      songPreview: song_previews,
      songIndex: n,
    });

    let audio = document.getElementById("audio");
    audio.load();
  }
</script>

<!--changing page head to match the search content-->
<svelte:head>
  <title>Results For {id}</title>
</svelte:head>

<!--layout start-->
<div class="grid">
  {#each song_titles as songtitle, i}
    <div
      class="item"
      on:keydown={() => play_song(i)}
      on:click={() => play_song(i)}
    >
      <img src={song_covers[i]} alt="Cover" />
      <h5>{song_titles[i]}</h5>
    </div>
  {/each}
</div>
<!--layout end-->