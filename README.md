# Pride Flags & Gradients: A Figma plugin
🌈 Pride Flags & Gradients is a small Figma plugin allowing designers to implement Pride flags and colors via gradients. The patterns fill in a selected shape, making them fully resizable, rotatble, and editable, without distorting the ratios of the flags. The plugin can be installed from its [Figma Community page](https://www.figma.com/community/plugin/1002324870709884461).

&nbsp;<br>

## Contents
At the moment, the plugin contains these gradients:
- Pride flag
- Transgender flag
- Subtle trans gradient
- Nonbinary flag
- Subtle NB gradient
- Bisexual flag
- Subtle bi gradient
- Pansexual flag
- Asexual flag
- Subtle ace gradient
- Lesbian flag
- MLM flag

&nbsp;<br>

New flags and gradients can be added by editing the `src/app/assets/flags.json` file, expanding the `flags` array with a flag's ID, name (displayed in the plugin), and background. The background defines the flag/gradient. It's format is similar to a CSS linear-gradient:

`[0-360]deg, #hexcode1 start% end%, #hexcode2 start% end%, #hexcode3 start% end%`

&nbsp;<br>

For example, the bisexual flag's background is:

`180deg, #D60270 0% 40%, #9B4F96 40% 60%, #0038A8 60% 100%`

&nbsp;<br>

## How it works
A section explaining some of the code of the plugin will be added soon.
