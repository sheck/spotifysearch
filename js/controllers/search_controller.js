import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['artist', 'song']

  get artist() { return this.artistTarget.value }
  get song()   { return this.songTarget.value }

  go(event) {
    event.preventDefault()
    const options = [
      'site:"spotify.com"',
      'inurl:playlist',
      '-inurl:user',
      '"By Spotify"',
      `"${this.artist}"`,
      `"${this.song}"`,
    ]
    const query = new URLSearchParams({
      safe: 'active',
      q: options.join(' ')
    })
    const url = "https://google.com/search?" + query.toString()
    window.location = url
  }
}
