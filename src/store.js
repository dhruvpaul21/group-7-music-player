import { writable } from "svelte/store";

const mainStore = writable({
  songArtist: [],
  songArtwork: [],
  songTitle: [],
  songPreview: [],
  songIndex: 0,
});

export default mainStore;
