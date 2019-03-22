/**
* Speed Module
* ============
*
* The Speed Module is where the slider to alter the game speed is created
* as well as the visual representation of the current speed.
* The render method at the end creates the elements, inserts them
* into the provided root element, and sets the corresponding bindings
*
* @param {function} speedCallback - Callback to handle speed changes
* @param {number} [speed=3] - Initial speed
* @param {number} [minSpeed=0] - Minimum speed
* @param {number} [maxSpeed=0] - Maximum speed
*
* @author  Díaz Agustín
*
*/
import { template } from '../utility.js';

export class Speed {
    constructor(speedCallback, speed = 3, minSpeed = 1, maxSpeed = 10){
        this.speed = speed;
        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;
        this.speedCallback = speedCallback;
        this.slider;
        this.currentSpeedValue;
    }
    updateSpeed(newSpeed) {
        this.speed = newSpeed;
        this.currentSpeedValue.innerHTML = newSpeed;
        this.speedCallback(newSpeed);
    }
    render(root) {
        let speedTemplate = template(`<section class="speed sm-whole md-3rd">
                <label class="speed__label">SPEED:<span id="speed-value" class="speed__value">{speed}</span></label>
                <input id="speed-slider" class="speed__slider" type="range" min="{minSpeed}" max="{maxSpeed}" value="{speed}" onchange="" />
            </section>`)({speed:this.speed, minSpeed:this.minSpeed, maxSpeed:this.maxSpeed});
        root.insertAdjacentHTML('beforeend', speedTemplate);
        this.slider = root.getElementsByClassName('speed__slider')[0];
        this.currentSpeedValue = root.getElementsByClassName('speed__value')[0];
        this.slider.addEventListener('change', () => this.updateSpeed(this.slider.value));
     }
    
};
