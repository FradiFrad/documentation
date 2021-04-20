# CSS

**Sources** :

- [CSS shorts](https://www.linkedin.com/learning/css-shorts/multiple-background-images) (limited access)

## Quick tips

### Background and images

##### 2 background images :

`background : url() ... , url() ... ; `

##### Shadow for a png file

```
class {
    filter : brightness(0) blur(2px); //  create a shadow of the png form !
    tranform: translateY(4px) // to slightly move the shadow
}
```

##### Animating backgrounds

```
thingYouWantToAnimate {
    ...
    animation: nameYouChoose timesec linear infinite;
}

@keyframes nameYouChoose {
    0% { background-position: 0 0}
    100% { background-position: -2000px 0}
}
```

##### Parallax scroll effect

==> result here : the image and the content scroll at different pace

```
  the element you want parallax with : ex: main {
     height: 100vh;
     max-height: 100%;
     perspective: 1px // all children will be able ...?
      perspective-origin: center top;
  }

  the image : ex: header {
      background: url()... // has an bg image to do the tricks
      height: 50vh;
      transform-origin: center top;
      transform: translateZ(-1px) scale(2.03) // the element is a bit larger
  }

  the content : ex: section {
      transform: translateZ(0) scale(2.03) // the content will scroll on the image
  }
```

### Display

##### Vertical and center

```
container {
display : table-cell
vertical-align: middle;
}
```

##### CSS Media Query : aspect ratio

- min-aspect-ratio instead of min-width

##### Photo gallery

```
// html
    <section class=gallery>

    // Tip: when click on a label, it will select the good checkbox
    <input type="radio" name="item" id="photo-01" checked>
    <input type="radio" name="item" id="photo-02" >
    ...
        <main>
            <figure>
                <img>
                <figcaption>xx</figcaption>
            </figure>
            <figure>
                <img>
                <figcaption>xx</figcaption>
            </figure>
            ...
        </main>
        <nav>
            <label for="photo-01">
                <img>
            </label>
            <label for="photo-02">
                <img>
            </label>
            ...
        </nav>
    </section>
```

```
// css
.gallery input {
    display: none   // checkboxes are hidden
}
.gallery main figure {
    position: absolute;     // to define position
    top: 0px
    left : 100%   //
    opacity: 0   //
    transition: opacity 1s, left 1s;
}

// Tip : if the nth button is checked, the nth figure will have these properties
//==> it will create a switch of figures in the main element
.gallery input:nth-of-type(1):checked ~ main figure: input:nth-of-type(1),
.gallery input:nth-of-type(2):checked ~ main figure: input:nth-of-type(2) {
    opacity: 1   //
    left: 0;
}

// Tip : same logic, but with the color of the label img border
.gallery input:nth-of-type(1):checked ~ nav figure: label:nth-of-type(1) img,
.gallery input:nth-of-type(2):checked ~ nav figure: label:nth-of-type(2) img, {
    border-color: red;
}

```

##### Mobile menu

==> Result : a vertical navbar slides when a menu button is clicked

```
// html
    <input id="mobile-menu" type="checkbox">
    <nav>
        <label for='mobile-menu'></label>
        <div>
            <a>xx1</a>
            <a>xx2</a>

        </div>
    </nav>
```

```
// css
input#mobile-menu {
    display: none   // checkbox is hidden
}
input#mobile-menu:checked + nav {
    left: 0px;   // menu pops when input is clicked
}
input#mobile-menu:checked + nav label {
    background-image:url(...) // to change the image on click
}
nav {
    position: absolute;     // to define position
    top: 0px
    left : -180px   // to hide it before click
    transition: left .6s ease-in-out;   // to add a transition on click
}
```

### Font

##### OpenType Font

- OpenType Font : check because it adds features to font (padding to letters etc)
