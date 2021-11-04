"use strict";

window.addEventListener("DOMContentLoaded", start);

function start(){
    console.log("DOM is loaded");
    addArrowAnimation();
    addScrollAnimation();
}

function addArrowAnimation(){
    const properties = {
        duration: 800,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-out",
      };
      
    const keyframes = [{ transform: `translate(0, 1vw)` }, { tranform: `transform: translate(0,0)` }];
      
    const arrow = document.querySelector(".arrow");
    const animation = arrow.animate(keyframes, properties);

    // arrow.addEventListener("click", () => {
    //     gsap.to(window, { duration: 1, scrollTo: "#portfolio_projects" });
// });
}

function addScrollAnimation(){
    // Code from greensock scrolltrigger demos

    let bodyScrollBar = Scrollbar.init(document.querySelector(".scroller"), {
        damping: 0.1,
      });
      
      ScrollTrigger.scrollerProxy(".scroller", {
        scrollTop(value) {
          if (arguments.length) {
            bodyScrollBar.scrollTop = value;
          }
          return bodyScrollBar.scrollTop;
        },
      });
      
      bodyScrollBar.addListener(ScrollTrigger.update);
   
    //Sets the z-index on the panel
    gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });
    
    //Makes array with the images
    var images = gsap.utils.toArray('.panel:not(.app)');

    //Animation for each image
    images.forEach((image, i) => {
    
        var tl = gsap.timeline({
          
          scrollTrigger: {
            trigger: "section.portfolio",
            scroller: ".scroller",
            start: () => "top -" + (window.innerHeight*(i+0.5)),
            end: () => "+=" + window.innerHeight,
            scrub: true,
            toggleActions: "play none reverse none",
            invalidateOnRefresh: true,     
          }
          
        })
        
        tl
        .to(image, { height: 0 })
        ;
        
      });

      //Sets the z-index on the text-panel - REMOVED - made text unable to click
      // gsap.set(".panel-text", { zIndex: (i, target, targets) => targets.length - i });

      //Makes array with the text
      var texts = gsap.utils.toArray('.panel-text');

      //Animation for each text
      texts.forEach((text, i) => {
    
        var tl = gsap.timeline({
          
          scrollTrigger: {
            trigger: "section.portfolio",
            scroller: ".scroller",
            start: () => "top -" + (window.innerHeight*i),
            end: () => "+=" + window.innerHeight,
            scrub: true,
            toggleActions: "play none reverse none",
            invalidateOnRefresh: true,     
          }
          
        })
        
        tl
        .to(text, { duration: 0.33, opacity: 1, y:"40%" })  
        .to(text, { duration: 0.33, opacity: 0, y:"0%" }, 0.66)
        ;
        
      });

      ScrollTrigger.create({
  
        trigger: "section.portfolio",
        scroller: ".scroller",
        scrub: true,
        markers: false,
        pin: true,
        start: () => "top top",
        end: () => "+=" + ((images.length + 1) * window.innerHeight),
        invalidateOnRefresh: true,
    
    });

}