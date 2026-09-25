# binary-knight.com

The personal site of Jason Knight. Static HTML, CSS and one small script, with the fonts hosted here so a visitor makes no request to any third party. No build step: edit `index.html` and push.

- `index.html` holds the content, every claim of which comes from the public README of the project it describes.
- `style.css` is the whole design: ink navy on a cool white, one oxblood accent, a navy dark mode that follows the visitor's system setting.
- `board.js` draws the board in the header. Each row is a letter of "b-knight" in binary, and the knight crosses it in five legal moves. It animates once, and not at all when the visitor prefers reduced motion.

Served by GitHub Pages at the domain in `CNAME`.
