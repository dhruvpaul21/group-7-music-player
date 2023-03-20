<script>
  import { Router, Route, navigate } from "svelte-navigator";

  //importing all pages built for the site
  import Header from "./lib/header.svelte";
  import Sidenav from "./lib/sidenav.svelte";
  import Search from "./lib/search.svelte";
  import Rap from "./lib/rap.svelte";
  import Lofi from "./lib/lofi.svelte";
  import Charts from "./lib/charts.svelte";
  import PlaylistViewer from "./lib/playlistViewer.svelte";
  import Aboutus from "./lib/aboutus.svelte";
  import Contactus from "./lib/contactus.svelte";
  import Footer from "./lib/footer.svelte";
  import "carbon-components-svelte/css/g10.css";

  let searchField, width;

  async function search() {
    navigate("/search/" + searchField, { replace: true });
  }
  console.log(import.meta.env.VITE_SVELTE_APP_SUPABASE_URL)
  console.log(import.meta.env.VITE_SVELTE_APP_SUPABASE_ANON_KEY)
</script>

<!--layout start-->
<!--sidebar with links to different pages-->
<Sidenav />
<!--music player-->
<Footer />
<main>
  <!--only showing the header when screen width is large-->
  {#if width > 1000}
    <Header />
  {/if}
  <!--body of the page-->
  <Router>
    <div class="content">
      <Route path="/">
        <!--different playlist categories-->
        <Rap />
        <Lofi />
        <Charts />
      </Route>
      <!--routing for separate pages for each playlist-->
      <Route path="playlist/:query" let:params>
        <PlaylistViewer query={params.query} />
      </Route>
      <!--search box-->
      <Route path="search/*" primary={false}>
        <form on:submit|preventDefault={search}>
          <input
            bind:value={searchField}
            placeholder="Search..."
            on:input={search}
          />
        </form>
        <Route path="/">
          <div class="searchmsg">
            <h1>Search for tracks, podcasts, and playlists.</h1>
          </div>
        </Route>
        <Route path=":id" component={Search}/>
      </Route>
      <!--about us page-->
      <Route path="aboutus" component={Aboutus}/>
      <!--contact us page-->
      <Route path="contactus" component={Contactus}/>
    </div>
  </Router>
</main>
<svelte:window bind:innerWidth={width} />
<!--layout end-->

<!--CSS start-->
<style scoped>
  /*search box*/
  .searchmsg {
    height: calc(100vh - 200px);
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  /*whole page default*/
  main {
    margin-left: 240px;
    margin-top: 55px;
    margin-bottom: 100px;
    background-color: #121212; /*dhruv change*/
  }

  .content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  h1 {
    color: white;
  }

  form input {
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    border-radius: 10px;
    outline: none;
    margin-bottom: 1rem;
    border: none;
  }

  /*adjusting for different screen widths*/
  @media only screen and (max-width: 1000px) {
    main {
      margin-left: 210px;
      margin-top: 10px;
      margin-bottom: 100px;
    }

    .content {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }

  @media only screen and (max-width: 900px) {
    main {
      margin-left: 0px;
      margin-top: 10px;
      margin-bottom: 120px;
    }
  }
</style>
<!--CSS end-->