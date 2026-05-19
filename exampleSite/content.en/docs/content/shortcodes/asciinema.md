# Asciinema

Embed terminal recordings with the [Asciinema](https://asciinema.org/) player.

## Syntax

```tpl
{{</* asciinema
  cast="recording.cast"
  loop=true
  autoplay=true
  speed=2 */>}}
```

The `cast` parameter accepts page resources, site resources, or remote URLs.

## Example

{{< asciinema
  cast="asciinema-627097.cast"
  loop=true
  autoplay=true
  speed=2 >}}

## Parameters

`cast`
: Path to the `.cast` file. Can be a local resource or a remote URL.

All other parameters are passed directly to the Asciinema player. See the [Asciinema player options](https://docs.asciinema.org/manual/player/options/) for the full list.

Common options: `autoplay`, `loop`, `speed`, `theme`, `cols`, `rows`, `idleTimeLimit`, `preload`.
