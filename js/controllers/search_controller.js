import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['artist', 'song']

  connect() {
    console.log('hi')
  }

  go(event) {
    event.preventDefault()
    const options = [
      'site:"spotify.com"',
      'inurl:playlist',
      '-inurl:user',
      '"By Spotify"',
      `"${this.artistTarget.value}"`,
      `"${this.songTarget.value}"`,
    ]
    const query = new URLSearchParams({
      safe: 'active',
      q: options.join(' ')
    })
    const url = "https://google.com/search?" + query.toString()
    // alert(url)
    window.location = url
  }
}
