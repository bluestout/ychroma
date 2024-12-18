$('.popup-defolt').magnificPopup({
  type: 'inline',
  preloader: false,
  mainClass: 'yas-videom-pop',
  callbacks: {
    beforeClose: function() {
      document.querySelector('.white-popup-block video').pause();
    },
    open: function() {
      swiper.autoplay.stop();
      document.querySelector('.mfp-wrap video').play();
    },
  }
});