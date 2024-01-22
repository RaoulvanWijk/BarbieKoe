# De Barbiekoe APP

How to use the BarbieKoe project

## Hoe moet je de app runnen

### De hoofd app

1. `git clone https://github.com/RaoulvanWijk/BarbieKoe.git`
2. `npm install`
3. `npm run tauri dev`
4. `cd server`
5. `npm install`
6. `mklink /J "src/lib/types" "../src/lib/types"` (in admin powershell)
7. `npm run run`

### De python app

1. Make sure to install all the requirements
2. `cd src-py/commands`
3. `py main.py`

## Requirements

### main app

[Rust](https://www.rust-lang.org/tools/install), [Node](https://nodejs.org/en/)

### map generator

[python3](https://www.python.org/downloads/), [openCV](https://pypi.org/project/opencv-python/), [numpy](https://numpy.org/install/)

```
- resources (folder for styling, images and fonts)
- --> styles (folder for styling)
- --> images (folder for images)
- --> fonts (folder for fonts)
- src (folder for the website stuff)
- --> components (folder for all the react components)
- --> lib (folder for backend stuff)
- --> pages (folder for all the pages)
- --> utils (folder for usefull tools that can be used everywhere)
- src-py (program to optimally utilize the ground of an map)
```

