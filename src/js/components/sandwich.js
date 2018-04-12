export default class Sandwich {
    constructor() {
        this.sandwich = document.querySelector('.js-sandwich');
    }

    init() {
        if(!this.sandwich) return;

        this.menu = document.querySelector('.js-menu');

        this.sandwich.addEventListener('click', () => this.toggleMenu());

    }

    toggleMenu() {
        this.menu.classList.toggle('_show');
    }
}