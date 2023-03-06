import "../../assets/scss/app.scss";
import { MomentumParallax, gsap, ScrollTrigger } from "momentum-parallax";

class Main {
  constructor() {
    /**
     * 初期設定
     */
    var scrollbar = new MomentumParallax(
      document.querySelector(".MomentumParallax-scrollarea"),
      {
        damping: 0.1,
        delegateTo: document.querySelector(".MomentumParallax-scrollarea"),
        overscrollDamping: 1,
        proxyElem: ".MomentumParallax-scroller",
      }
    );
    document.querySelector(".btn").addEventListener("click", function () {
      scrollbar.scrollobj.scrollIntoView(
        document.querySelector("#trigger-div"),
        {
          alignToTop: true,
          onlyScrollIfNeeded: false,
        }
      );
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#trigger-div",
        scroller: ".MomentumParallax-scroller",
        start: "top top",
        end: "+=500",
        markers: true,
        scrub: 0.7,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });
    tl.fromTo(
      ".box",
      {
        opacity: 1,
        rotate: 0,
      },
      {
        opacity: 1,
        rotate: 360,
        duration: 1,
      },
      ">0"
    );
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new Main();
});
