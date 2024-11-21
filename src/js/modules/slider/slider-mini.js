import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
        this.autoplayInterval = null; // Хранение ссылки на интервал
    }

    decorizeSlides() {
        [...this.slides].forEach(slide => {       
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }
        
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.slides[1].tagName === 'BUTTON' && this.slides[2].tagName === 'BUTTON') {
            this.container.appendChild(this.slides[2]);
            this.container.appendChild(this.slides[1]);
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });
    
        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    let activeSlide = this.slides[i];
                    this.container.insertBefore(activeSlide, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });

        // Остановка и возобновление автопрокрутки при наведении на триггеры
        [this.next, this.prev].forEach(trigger => {
            trigger.addEventListener('mouseenter', () => this.stopAutoplay());
            trigger.addEventListener('mouseleave', () => this.startAutoplay());
        });

        // Остановка и возобновление автопрокрутки при наведении на тело слайдера
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }

    startAutoplay() {
        if (this.autoplay) {
            this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplay);
        }
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden; 
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            this.startAutoplay();
        }
    }
}
