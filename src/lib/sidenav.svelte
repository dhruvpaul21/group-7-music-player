<script>
  import { Link, Router } from "svelte-navigator";
  import mainStore from "../store.js";
</script>

<!--layout start-->
<nav>
  <div class="padding">
    <!--title/group name-->
    <div class="logo">
      <br>
      <h1>G7 Music</h1>
    </div>
    <!--links to different pages of the site-->
    <div class="links">
      <Router>
        <!--link to home page-->
        <Link class="link" to="/" style="font-size: 1.5rem;">
          <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
            ><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
              d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
            /></svg> Home</p></Link>

        <!--link to search page-->
        <Link class="link" to="/search" style="font-size: 1.5rem;">
          <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
          ><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
          /></svg> Search</p></Link>

          <!--link to about us page-->
          <Link class="link" to="/aboutus" style="font-size: 1.5rem;">
            <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
          ><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
             d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
             /></svg> About</p></Link>

          <!--link to contact us page-->
          <Link class="link" to="/contactus" style="font-size: 1.5rem;">
            <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
          ><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
             d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
             /></svg> Contact</p></Link>
      </Router>
    </div>
  </div>
  <!--showing the cover art of the song being played-->
  {#if $mainStore.songArtwork[$mainStore.songIndex]}
    <img src={$mainStore.songArtwork[$mainStore.songIndex]} alt="Cover Art" />
  {/if}
</nav>
<!--layout end-->

<!--CSS start-->
<style scoped>
  /*whole page default*/
  nav {
    width: 240px;
    height: calc(100vh - 91px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: black; /*dhruv change*/
    color: white;
    position: fixed;
    top: 0;
  }

  /*main heading*/
  h1 {
    font-weight: bold;
    color: white;
    margin-bottom: 10px;
  }

  /*main text*/
  p {
    margin-top: 5px;
    margin-bottom: -10px;
    margin-left: 10px;
    font-size: 21px;
    color: white;
  }

  /*icons*/
  img {
    width: 100%;
  }

  svg {
    fill: white;
    height: 1rem;
  }

  /*for the links*/
  .links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .padding {
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /*for different screen widths*/
  @media only screen and (max-width: 1000px) {
    nav {
      width: 210px;
    }
  }

  /*for different screen widths*/
  @media only screen and (max-width: 900px) {
    nav {
      width: 100vw;
      height: 60px;
      top: auto;
      bottom: -1px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    p {
    margin-top: 0px;
    margin-bottom: -10px;
    font-size: 17px;
    color: white;
    }

    .links,
    .padding {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      width: 100%;
    }

    /*removing logo for different width*/
    img,
    .logo {
      display: none;
    }
  }

  /*for different screen widths*/
  @media only screen and (max-width: 800px) {
    nav {
      border-radius: 5px;
    }
  }
</style>
<!--CSS end-->