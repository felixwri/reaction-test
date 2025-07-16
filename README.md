# Reaction Game in PixiJS

## Running the project

```bash
npm i
npm run dev
```

## To add

#### Design

* More GSAP animations
* Replace some Graphics with Sprites
* Add persistent storage for good times

#### Technical

* Better router type annotation \
  It currently relys on casting but could be improved to be explicit
* Switch to bitmap text for the stopwatch since it's updated every frame

## Notes

Encounted a bug? where a tint of #000000 is treated as a invalid value instead of black
by the PixiJS GSAP plugin

The font is RacingSans from Google Fonts
  
