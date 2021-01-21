# Tarot - The Keyword Based Color Palette Generator

Generate conceptual color palettes for any project where you might want a color scheme!
Renovating the bathroom with a coastal theme? Try "mediterranean" or "big sur".
Building a Star Wars fan site? Try "Mandalorian".
The results can be surprisingly accurate or hilariously off the wall.

Tarot works by utilizing the Flickr API to query images, gather color data from said images (in the backend which you can checkout [here](https://github.com/rynmgdlno/TarotBackend)), and return that as hex and rgb color codes. 

## Libraries and Technologies 

This project was built entirely with React, vanilla CSS/SASS, and Firebase for user auth and Firestore (saving of palettes).

Currently state management is handled solely with component based state, mostly functional hooks and one quite large class component in the "Tarot" page component. This was intended as an exercise to see just how convoluted sticking to component based state management can become (prop drilling galore), and to help myself learn redux in the process of converting it over. I intend to develop my own "best practices" of what state management to use when and where by going through the "Tarot" component and converting it to Redux / Hooks / Context where applicable. 

### Libraries used:
- [Color](https://www.npmjs.com/package/color) For handling luminosity dependent rendering and some other color value tasks
- [Email Validator](https://www.npmjs.com/package/email-validator) To quickly and easily handle email validation. 
- [React Router](https://www.npmjs.com/package/react-router) For navigation.

## Planned Updates

This is a work in progress. Along with some bug fixing, refactoring and the aforementioned Redux conversion, I have some other planned changes and updates:
- Tutorial overlay
- UX improvements
- CMYK and HSL support for color editors.
- Global palette editor.
- Sharing of user palettes and collections.
- Monochromatic and dominant color options/controls.
- Better handling of similar colors in the same palette. 
- Separate browser for saved palettes




