# My Movie Hub

A responsive movie website for VS Code.

## Folder structure

- `index.html` — main page
- `css/style.css` — professional responsive styling
- `js/movies.js` — movie titles, posters and video file paths
- `js/app.js` — cards, pagination and WhatsApp button
- `movies/` — put your movie files here
- `images/` — put your poster images here

## Add a movie

1. Put the video inside `movies/`.
2. Put its poster inside `images/`.
3. Open `js/movies.js`.
4. Add a movie object like:

{
  title: "My Movie",
  year: "2026",
  genre: "Action",
  duration: "2h 00m",
  poster: "images/my-movie.jpg",
  video: "movies/my-movie.mp4"
}

The page automatically displays only 6 movies at a time and creates page buttons for additional movies.

## WhatsApp

Open `js/app.js` and replace:

const WHATSAPP_NUMBER = "2567XXXXXXXX";

with your real WhatsApp number in international format, without `+` or spaces.

Example:
const WHATSAPP_NUMBER = "256701234567";

## Important hosting note

For other people to watch and download the movies through a shared website link, the movie files must be uploaded to the web host/server along with the site. Opening the HTML locally in VS Code is not enough for other people on the internet.

Use video formats such as MP4 (H.264/AAC) for broad browser compatibility.

Only upload and distribute movies that you own or have permission/licensing to distribute.
