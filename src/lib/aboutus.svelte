<script>
    import Contactus from "./contactus.svelte";

</script>
<!--layout start-->
<main>

  <h2>About Us</h2>
  <br>
  <h3>We are world's best music streaming service!</h3>
  <p>With G7, it’s easy to find the right music for every moment – on your phone, your computer, your tablet and more.

    There are millions of tracks on G7. So whether you’re behind the wheel, working out, partying or relaxing, the right music is always at your fingertips. Choose what you want to listen to, or let G7 surprise you.
    
    You can also browse through the collections of playlist and artists.
    
    Soundtrack your life with G7.</p>

    <p><strong>Want to get in touch with us?</strong></p>

    <ul>
      <li><strong>Community</strong>: Get fast support from expert G7  users.</li>
      <li><strong>Contactus</strong>: Drop a question to us on our contactus page and we will get back to you quickly!</li>
      <li><strong>@G7cares</strong>: Feeling sociable? Simply tweet the team and they’ll do all they can to help.</li>
    </ul>

</main>
<!--layout end-->

<!--CSS for the page start-->
<style scoped>
/*for the title*/
h2 {
  margin: 0;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  color: white;
  text-align: center;
  font-weight:bolder;
}

h3 {
  margin: 0;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  color: white;
  font-weight:bold;
  text-align: center;
  font-size:medium;
}

p {
  margin-bottom: 15px;
}

ul {
  margin: 0;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  height: calc(100vh - 155px);
  color: white;
  text-align: left;
  vertical-align: middle;
}

li:not(:last-child) {
    margin-bottom: 15px;
}

/*for the paragraph*/
main {
  height: calc(100vh - 155px);
  color: white;
  text-align: left;
  vertical-align: middle;
}
</style>
<!--CSS for the page end-->