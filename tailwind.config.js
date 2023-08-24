/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        spotify_brown: "#f49c4c",
        spotify_dark_brown: "#8c542c",
        spotify_topArtist_bg: "#67401e",
        spotify_bg: "#121212",
        spotify_artistcard_bg: "#181818",
      },
    },
  },
  plugins: [],
};
