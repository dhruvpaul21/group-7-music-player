<script>
  import mainStore from "../store.js";

  export let query;

  //declaring required variables
  let playlist_cover;
  let playlist_desc;
  let playlist_date;
  let playlist_title;

  let song_titles = [];
  let song_covers = [];
  let song_artists = [];
  let song_preview = [];

  //setting deezer api
  let options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "26ed9a7238msh42eb30a06cd1235p174ef8jsnae84630d35a5",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  //to fetch songs from the playlist
  fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/" + query, options)
    .then((response) => response.json())
    .then((response) => {
      let { picture_medium } = response;
      let { description } = response;
      let { creation_date } = response;
      let { title } = response;
      playlist_cover = picture_medium;
      playlist_desc = description;
      playlist_date = creation_date;
      playlist_title = title;

      //looping though the songs of the playlist
      for (let i = 0; i < response.tracks.data.length; i++) {
        let { cover_xl } = response.tracks.data[i].album;
        let { title } = response.tracks.data[i];
        let { preview } = response.tracks.data[i];
        let { name } = response.tracks.data[i].artist;

        //trimming the length of the song name to fit grid
        if (title.length > 18) title = title.substring(0, 18) + "...";

        //pushing information to arrays
        song_preview.push(preview);
        song_titles.push(title);
        song_covers.push(cover_xl);
        song_artists.push(name);

        song_titles = song_titles;
        song_covers = song_covers;
        song_titles = song_titles;
        song_preview = song_preview;
      }
    })
    .catch((err) => console.error(err)); //to handle errors

    //function to play song previews
  function play_song(n) {
    mainStore.set({
      songArtist: song_artists,
      songArtwork: song_covers,
      songTitle: song_titles,
      songPreview: song_preview,
      songIndex: n,
    });

    let audio = document.getElementById("audio");
    audio.load();
  }
</script>

<!--changing page head based on playlist selected-->
<svelte:head>
  <title>{playlist_title} - {playlist_desc}</title>
</svelte:head>

<!--layout start-->
<div class="playlistinfo">
  <!--playlist info-->
  <div class="cover">
    <img src={playlist_cover} alt="Cover" />
  </div>
  <div class="text">
    <h4>Playlist</h4>
    <h1>{playlist_title}</h1>
    <h4>{playlist_desc}</h4>
    <h4>{playlist_date}</h4>
  </div>
</div>

<!--displaying songs in a grid-->
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

<!--CSS start-->
<style scoped>
  .text {
    color: white;
  }

  /*for song tiles*/
  .item {
    color: white;
  }

  /*playlist information*/
  .playlistinfo {
    display: flex;
    align-items: center;
    gap: 3rem;
    height: 30vh;
  }

  /*playlist image*/
  .playlistinfo img {
    height: 25vh;
    aspect-ratio: 1/1;
  }

  /*for different screen widths*/
  @media only screen and (max-width: 450px) {
    .playlistinfo h1 {
      font-size: 1.25rem;
    }

    .playlistinfo h4 {
      display: none;
    }

    .playlistinfo {
      display: flex;
      flex-direction: row;
      min-height: 20vh;
      gap: 0.5rem;
    }
  }

  /*for different screen widths*/
  @media only screen and (max-width: 600px) {
    .text h4:nth-child(1),
    .text h4:nth-child(3) {
      display: none;
    }

    .playlistinfo img {
      height: 15vh;
      aspect-ratio: 1/1;
    }

    .playlistinfo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: fit-content;
      min-height: 25vh;
    }

  }
</style>
<!--CSS end-->