# De Barbiekoe APP

How to use the BarbieKoe project

## Hoe moet je de app runnen

### De hoofd app

1. `git clone https://github.com/RaoulvanWijk/BarbieKoe.git`
2. `npm install`
3. `npm run tauri dev`

### De python app

1. Make sure to install all the requirements
2. `cd src-py/commands`
3. `py main.py`

## Requirements

### main app

[Rust](https://www.rust-lang.org/tools/install), [Node](https://nodejs.org/en/)

### map generator

[python3](https://www.python.org/downloads/), [openCV](https://pypi.org/project/opencv-python/), [numpy](https://numpy.org/install/)

## Code structure

- src: the main program
- src-py: program to optimally utilize the ground of an map
