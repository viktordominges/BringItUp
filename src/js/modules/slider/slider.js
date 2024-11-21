export default class Slider {
    constructor({
        container = null, 
        btns = null, 
        next = null, 
        prev = null,
        activeClass = '',
        animate = false,
        autoplay,} = {}) {
        this.container = document.querySelector(container);
        this.slides = this.container.children; // Преобразуем в массив;  this.slides является HTMLCollection, а не массивом, поэтому метод forEach не работает.
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }
}