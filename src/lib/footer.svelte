<script>
  import { FastAverageColor } from "fast-average-color";

  //importing function for footer color
  const fast_avg_color = new FastAverageColor();

  import mainStore from "../store.js";

  //initializing audio variables
  let volume = 100,
    durationCompleted = 0,
    audioElement,
    time = 0,
    duration,
    paused = false,
    ended,
    width,
    footer,
    svgColor = "#fff",
    viewAudio = false;

  $: ended, ended == true ? forward_audio() : console.log("not ended");
  $: time, (durationCompleted = (time / duration) * 100);

  $: $mainStore, footer_color();
  $: $mainStore, media_update();
  $: viewAudio, overflow_hidden();

  //to update media when new song is selected
  function media_update() {
    if ("mediaSession" in navigator && $mainStore.songArtwork[$mainStore.songIndex]) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: $mainStore.songTitle[$mainStore.songIndex],
      artist: $mainStore.songArtist[$mainStore.songIndex],
      album: "",
      artwork: [
      {
        src: $mainStore.songArtwork[$mainStore.songIndex],
        type: "image/png",
        sizes: "250x250",
      },
      ],
    });
    navigator.mediaSession.setActionHandler("play", function () {
      audioElement.play();
    });
    navigator.mediaSession.setActionHandler("pause", function () {
      audioElement.pause();
    });
    navigator.mediaSession.setActionHandler("seekbackward", function () {
      audioElement.currentTime = Math.max(audioElement.currentTime - 5, 0);
    });
    navigator.mediaSession.setActionHandler("seekforward", function () {
      audioElement.currentTime = Math.max(audioElement.currentTime + 5, 0);
    });
    navigator.mediaSession.setActionHandler("previoustrack", function () {
      backward_audio();
    });
    navigator.mediaSession.setActionHandler("nexttrack", function () {
      forward_audio();
    });
    }
  }

  function overflow_hidden() {
    if (viewAudio == true) {
    document.querySelector("body").style.overflow = "hidden";
    } else {
    document.querySelector("body").style.overflow = "auto";
    }
  }

  //to set footer color close to song cover
  function footer_color() {
    fast_avg_color
    .getColorAsync($mainStore.songArtwork[$mainStore.songIndex])
    .then((color) => {
      footer.style.backgroundColor = color.rgba;
      footer.style.color = color.isDark ? "#fff" : "#000";
      svgColor = color.isDark ? "#fff" : "#000";
      console.log(svgColor);
      console.log("Average color", color);
    })
    .catch((e) => {
      console.log(e);
    });
  }

  //to play next song
  async function forward_audio() {
    await audioElement;
    mainStore.set({
    songArtist: $mainStore.songArtist,
    songArtwork: $mainStore.songArtwork,
    songTitle: $mainStore.songTitle,
    songPreview: $mainStore.songPreview,
    songIndex: $mainStore.songIndex + 1,
    });
    audioElement.load();
  }

  //to play previous song
  async function backward_audio() {
    await audioElement;
    mainStore.set({
    songArtist: $mainStore.songArtist,
    songArtwork: $mainStore.songArtwork,
    songTitle: $mainStore.songTitle,
    songPreview: $mainStore.songPreview,
    songIndex: $mainStore.songIndex - 1,
    });
    audioElement.load();
  }

  //to pause audio
  async function pause_audio() {
    await audioElement;
    if (audioElement.paused) {
    audioElement.play();
    } else {
    audioElement.pause();
    }
    event.stopPropagation();
  }

  //to change volume
  function change_vol() {
    audioElement.volume = volume / 100;
  }

  //to change seeker
  async function change_time() {
    await audioElement;
    audioElement.currentTime = (durationCompleted / 100) * duration;
  }
</script>

<!--layout start-->
{#if viewAudio}
  <div
    class="viewAudio"
    style="color: {svgColor}; background-image: url({$mainStore.songArtwork[
      $mainStore.songIndex
    ]})"
  >
    <div class="bottom">
      <p>{Math.ceil(time)}</p>
      <input
        bind:value={durationCompleted}
        type="range"
        min="0"
        max="100"
        on:input={change_time}
        on:change={change_time}
      />
      <p>{Math.ceil(duration)}</p>
    </div>
    <!--different buttons for the player-->
    <div class="btns">
      <!--previous song-->
      <button on:click={backward_audio}
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
          ><path
            d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"
          /></svg
        ></button
      >
      {#if paused}
      <!--pause and unpause-->  
      <button on:click={pause_audio}
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
            ><path
              d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
            /></svg
          ></button
        >{:else}
        <button on:click={pause_audio}
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
            ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
              d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
            /></svg
          ></button
        >
      {/if}
      <!--next song-->
      <button on:click={forward_audio}
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
          ><path
            d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"
          /></svg
        ></button
      >
    </div>
  </div>
{/if}

<!--for different width functionality-->
<footer
  bind:this={footer}
  on:click={() => (width < 500 ? (viewAudio = true) : (viewAudio = false))}
  on:keydown={() => (width < 500 ? (viewAudio = true) : (viewAudio = false))}
>
  <div class="songPlaying">
    {#if $mainStore.songTitle[$mainStore.songIndex]}
      <h3>{$mainStore.songTitle[$mainStore.songIndex]}</h3>
      <p>{$mainStore.songArtist[$mainStore.songIndex]}</p>
    {/if}
  </div>
  {#if width > 800}
    <div class="audioControls">
      <div class="top">
        <button on:click={backward_audio}
          ><svg
            style="fill: {svgColor};"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            ><path
              d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"
            /></svg
          ></button
        >
        {#if paused}
          <button on:click={pause_audio}
            ><svg
              style="fill: {svgColor};"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              ><path
                d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
              /></svg
            ></button
          >{:else}
          <button on:click={pause_audio}
            ><svg
              style="fill: {svgColor};"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
              /></svg
            ></button
          >
        {/if}
        <button on:click={forward_audio}
          ><svg
            style="fill: {svgColor};"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            ><path
              d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"
            /></svg
          ></button
        >
      </div>
      <div class="bottom">
        {#if !isNaN(duration)}
          <p>{Math.ceil(time)}</p>
          <input
            bind:value={durationCompleted}
            type="range"
            min="0"
            max="100"
            on:input={change_time}
            on:change={change_time}
          />
          <p>{Math.ceil(duration)}</p>
        {/if}
      </div>
    </div>
    <div class="audioVolume">
      {#if volume == 100}
        <svg
          style="fill: {svgColor};"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          ><path
            d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"
          /></svg
        >
      {:else if volume < 100 && volume > 0}
        <svg
          style="fill: {svgColor};"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          ><path
            d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"
          /></svg
        >
      {:else}
        <svg
          style="fill: {svgColor};"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          ><path
            d="M320 64c0-12.6-7.4-24-18.9-29.2s-25-3.1-34.4 5.3L131.8 160H64c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64h67.8L266.7 471.9c9.4 8.4 22.9 10.4 34.4 5.3S320 460.6 320 448V64z"
          /></svg
        >
      {/if}
      <input
        type="range"
        min="0"
        max="100"
        bind:value={volume}
        on:change={change_vol}
        on:input={change_vol}
      />
    </div>
  {:else if paused}
    <button on:click={pause_audio}
      ><svg
        style="fill: {svgColor};"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        ><path
          d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
        /></svg
      ></button
    >{:else}
    <button on:click={pause_audio}
      ><svg
        style="fill: {svgColor};"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
          d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
        /></svg
      ></button
    >
  {/if}
</footer>
<!--layout end-->

<audio
  id="audio"
  bind:this={audioElement}
  autoPlay
  bind:currentTime={time}
  bind:duration
  bind:paused
  bind:ended
>
  <source id="audioSource" src={$mainStore.songPreview[$mainStore.songIndex]} />
  Your browser does not support the audio format.
</audio>

<svelte:window bind:innerWidth={width} />

<!--CSS start-->
<style scoped>
  /*default*/
  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 91px;
    max-height: 91px;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: #181818;
    color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .audioControls,
  .audioVolume,
  .songPlaying {
    flex-basis: 100%;
  }

  /*buttons*/
  button {
    background-color: transparent;
    border: none;
    aspect-ratio: 1/1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 35px;
  }

  button:focus {
    outline: #181818;
  }

  svg {
    height: 1.1rem;
  }

  .audioControls input {
    width: 35vw;
  }

  .audioVolume {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .audioControls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .bottom {
    height: 20px;
    margin-top: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
  }

  .top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
  }

  .viewAudio {
    position: fixed;
    top: 0;
    z-index: 100;
    height: 100vh;
    width: 100vw;
    background-color: #181818;
    padding: 1rem;
    display: grid;
    place-content: center;
    gap: 5vh;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .viewAudio input[type="range"] {
    width: 55vw;
  }

  .viewAudio button {
    background-color: white;
  }

  .btns {
    display: flex;
    justify-content: space-between;
  }

  .viewAudio .bottom {
    display: flex;
    justify-content: center;
  }

  .viewAudio button {
    height: 2.5rem;
    width: 2.5rem;
  }

  /*for different width*/
  @media only screen and (max-width: 900px) {
    footer {
      bottom: 55px;
      height: 75px;
    }
  }

  /*for different width*/
  @media only screen and (max-width: 800px) {
    footer {
      bottom: 55px;
      height: 55px;
      width: 95%;
      margin-left: 2.5%;
      border-radius: 5px;
    }

    .songPlaying h3,
    .songPlaying p {
      margin: 0;
    }
  }
</style>
<!--CSS end-->