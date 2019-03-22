/**
* Dot Module
* ==========
*
* In this module we create de Dots.
* We need a Size, a speed, a position, a callback to execute when
* clicked and, optionally, a fallRate.
* As it is in the lowest order of modules, it will only interact directly 
* with the MainArea module, and execute the provided callback.
* The render method at the end creates the element, inserts it
* into the provided root element, and sets the corresponding bindings
*
* @param {number} size - Size of the dot in pixels
* @param {number} speed - Current game speed
* @param {number} position - Horizontal position of the dot in pixels
* @param {function} clickCallback - Function to execute on click
* @param {number} [fallRate=3] - The rate at which dots fall
*
*
* @author  Díaz Agustín
*
*/
export class Dot {
    constructor(size, speed, position, clickCallback, fallRate = 10) {
        this.size = size;
        this.speed = speed;
        this.position = position;
        this.clickCallback = clickCallback;
        this.fallRate = fallRate;
        this.id = Date.now();
        // this.score = 100 / size;
        this.score = (110 - size) / 10; // This isn't exactly inversely proportional, but I think is better this way
        this.dot;
        this.fallInterval;
    }
    clicked() {
        this.clickCallback(this);
    }
    togglePauseResume(newSpeed) {
      this.updateSpeed(newSpeed);
      clearInterval(this.fallInterval);
      if(newSpeed === 0) {
        this.stop();
      } else {
        this.fall();
      }
    }
    updateSpeed(newSpeed) {
        this.speed = newSpeed;
    }
    updateDimensions(oldWidth, newWidth) {
      this.position = parseInt(this.position / oldWidth * newWidth);
      const correctedPosition = (this.position + this.size > newWidth) ?  newWidth - this.size - 3: this.position;
      this.dot.style.left = `${correctedPosition}px`;
    }
    stop() {
      let computedStyle = window.getComputedStyle(this.dot),
          top = computedStyle.getPropertyValue('top');
      this.dot.style.top = top;
    }
    fall() {
        setTimeout(() => {
            const newHeight = parseInt(this.dot.style.top) + this.fallRate * this.speed
            this.dot.style.top = `${newHeight}px`;
        }, 0);
        this.fallInterval = setInterval(() => {
            if(this.dot.offsetTop > document.body.offsetHeight) { // Disappeared or clicked?
                this.clicked();
            }
            const newHeight = parseInt(this.dot.style.top) + this.fallRate * this.speed
            this.dot.style.top = `${newHeight}px`;
        }, 1000);
    }
    render(root, config) {
        this.dot = document.createElement('div');

      
        if(config.dotTheme === '8-bit') {
          // Enable this block instead the line above for 8-bit-esque dots
          const dot = document.createElement('div');
          dot.classList.add(`dot-${this.size/10}`); 
          this.dot.appendChild(dot);
          this.dot.classList.add('dot-wrapper');
        } else {
          // Enable this class instead the block below for extra performance
          this.dot.classList.add('dot');  
        }
      
        
        this.dot.id = this.id;
        this.dot.style.height = `${this.size}px`;
        this.dot.style.width = `${this.size}px`;
        
        switch (config.appears) {
          case 'header': this.dot.style.top = 0; break;
          case 'main': this.dot.style.top = `${root.offsetTop}px`; break;
          case 'middle': this.dot.style.top = `${root.offsetTop - this.size/2}px`; break;
          default: this.dot.style.top = 0;
        }

        this.dot.style.left = `${this.position}px`;
        this.dot.addEventListener('click', ()=>this.clicked());
        root.appendChild(this.dot);
    }
}