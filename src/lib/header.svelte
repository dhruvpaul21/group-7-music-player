<script>
  import { navigate } from "svelte-navigator";
</script>

<!--layout start-->
<header>
  <div>
    <!--back button-->
    <button on:click={() => navigate(-1)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"/></svg></button>
    <!--forward button-->
    <button on:click={() => navigate(1)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z"/></svg></button>
  </div>
</header>
<!--layout end-->

<!--CSS start-->
<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    height: 55px;
    position: fixed;
    z-index: 2;
    background-color: #121212;
    width: calc(100% - 240px);
    top: 0;
  }

  /*for the icon of the button*/
  svg {
    height: 20px;
    fill: white;
  }
  
  /*for the button*/
  button {
    background-color: #121212;
    border: none;
    color: white;
    font-size: 1.25rem;
  }

  /*to adapt to different screen size*/
  @media only screen and (max-width: 1000px) {
    header {
      width: calc(100% - 210px);
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
</style>
<!--CSS end-->