<script>
    import { createForm } from "svelte-forms-lib";
    import { supabase } from "../supabaseClient";
    import { TextInput, TextArea, Button, FormGroup, Form, InlineNotification } from "carbon-components-svelte";
    let apiResult = null;
    const { form, errors, handleChange, handleSubmit, isSubmitting, handleReset } = createForm({
        initialValues: { name: "", email: "", message: "" },
        onSubmit: async values => {

            try {
                const { data, error } = await supabase.from("contact").insert(values).select();
                console.log(data)
                if (data != null) {
                    apiResult = true;
                } else {
                    apiResult = false;
                }

            } catch (ex) {
                //apiResult = false;
            }
            handleReset();
      }
    });
</script>

<!--layout start-->
<div class="page">  
  <h2>Contact Us</h2>
    <p>Enter the details to get in touch with us.</p> <br/><br/>

    {#if apiResult != null}

    {#if apiResult == true}
    <InlineNotification
        lowContrast
        kind="success"
        title="Success:"
        subtitle="Your message has been received"
    />
    {:else}
    <InlineNotification lowContrast kind="error"
        title="Error:"
        subtitle="An internal server error occurred."
    />

    {/if}    
{/if}

  <!--Form for contacting us start-->
  <form on:submit={handleSubmit}>
    <label for="name">Name:</label>
    <input
    id="name"
    name="name"
    on:change={handleChange}
    bind:value={$form.name}
  />
    <br><br>
    <label for="email">E-mail:</label>
    <input
      id="email"
      name="email"
      on:change={handleChange}
      bind:value={$form.email}
    />
    <br><br>
    <label for="message">Message:</label>
    <input
      id="message"
      name="message"
      on:change={handleChange}
      bind:value={$form.message}
    />
    <br><br>
    <button type="submit">Submit</button>
  </form>
  <!--Form for contacting us end-->
</div>
<!--layout end-->

<!--CSS start-->
<style scoped>
  /*for the whole page*/
  .page {
    height: calc(100vh - 155px);
    color: white;
  }
  /*for the title of the page*/
  h2 {
    margin: 0;
    margin-top: 0.25rem;
    margin-bottom: 1rem;
    color: white;
    font-weight:bolder;
  }
</style>
<!--CSS end-->