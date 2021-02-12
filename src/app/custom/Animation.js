import config from '../../config';
import { gsap } from 'gsap/all';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

export default class Animation {
  constructor() {
    this._rocketElement = document.getElementsByClassName('rocket');
    this._backgroundElement = document.getElementsByClassName('background');
    this._svgPath = config.svgPath;
    this._rocketTween = null;
  }

  async start() {
    const that = this;
    this._rocketTween = new gsap.timeline();

    gsap.registerPlugin(MotionPathPlugin);

    this._backgroundElement[0].addEventListener('click', function () {
      that.killTimeline(that);
    });

    this.addAnimation();
  }

  addAnimation() {
    this._rocketTween.add(gsap.to(this._rocketElement, {
      duration: 10,
      repeat: -1,
      motionPath: {
        path: this._svgPath,
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
    })
    )
  }

  killTimeline(that) {
    if (that._rocketTween !== null) {
      that._rocketTween.kill();
      that._rocketTween = null;
    } else {
      that._rocketTween = new gsap.timeline();
      that.addAnimation();
    }
  }
}
