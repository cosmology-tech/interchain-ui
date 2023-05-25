# How icons work

We are using a simple icon system due to the limitations of mitosis and we want it to work for any framework.

Our icon component will load 1 single svg file which contains multiple `<symbol />` with `id` attribute meaning the name of the icon. When you need to load a specific icon you just need to specify its name with a `<use xlinkHref="<id>" />` tag. This works similarly to a sprite sheet in video game.

## Adding an icon

- To add an icon, first off open the `icons.svg` file and create a `<symbol />`
- Copy the svg code inside that `<symbol />` tag, remove any unnecessary attributes
- Copy over the `viewBox` attribute to `<symbol />`
- Make sure any `<path />` or other svg shapes inside `<symbol />` has attribute `fill="currentColor"` for it to inherit CSS color from parent element
- Add your icon name (symbol's id) to `icon.types.tsx`. Ideally this step should be automated, this will be improved later
