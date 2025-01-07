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

function changeImageColor(e){
  let wrapp = e.closest('.card-wrapper');
  let wrappId = wrapp.attr('id');
  let mediaImg = wrapp.find('.card__inner .media img');
  let slider = wrapp.find('.card__inner .swiper');
  let sliderColorVal =  e.attr('color-variant');
  let activeSliderProd = wrapp.find('.active_slider');
  mediaImg.attr('src', e.attr('image-variant'));

  let priceColor = e.attr('price-variant');
  wrapp.find('.price-item--regular .money').text(priceColor);

  let priceDisColor = e.attr('price-variantdis');
  if(priceDisColor.length > 3){
    wrapp.find('el.yas_newd_pric span').text(priceDisColor);
  }

  
  let wrappSize = wrapp.find('.card__content .card_yas_size');
  let countSizeVar = wrappSize.find('div').length;
  console.log(countSizeVar);
  if(countSizeVar > 0){
    wrappSize.find('.card_yas_size_color-otions_active').removeClass('card_yas_size_color-otions_active');
    wrappSize.find('.card_yas_size_color-'+sliderColorVal).addClass('card_yas_size_color-otions_active');
  }
  
  let curentSwiper = wrapp.find('.swiper.swiper-color_'+ sliderColorVal);

  let destroy = document.querySelector('#' + wrappId + ' .active_slider').swiper;

  if(destroy != null){
    destroy.destroy();
  }
  
  activeSliderProd.removeClass('active_slider');
  curentSwiper.addClass('active_slider');
  
  let swiper = new Swiper('#' + wrappId + ' .swiper-color_'+ sliderColorVal, {
    // Optional parameters
    loop: false,
    lazy: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-color_' +sliderColorVal+ ' .swiper-button-next',
      prevEl: '.swiper-color_' +sliderColorVal+ ' .swiper-button-prev',
    },
  });    


 
  let wrappInfoId = wrapp.find('.card_yas_size_color-otions_active > span')[0];

  let var_url = wrappInfoId?.getAttribute('url-variant');

  if (var_url) {
    let mass_a = wrapp.find('a');
    mass_a.each(function(){
      console.log($(this))
      $(this).attr('href', var_url);
    })  
  }
}

upcartOnCartLoaded = (cart) => {
	const widget = document.querySelector('#CartPopup');
	const container = widget.querySelector('.upcart-checkout-button-container');
	const message = `
		<div class="upcart-es-message-wrapper">
			<div class="upcart-es-message-wrapper--item">
				<img src="https://cdn.shopify.com/s/files/1/0620/1648/7614/files/Group_42.svg?v=1734504740">
				<span>100% Satisfaction Guarantee</span>
			</div>
			<div class="upcart-es-message-wrapper--item">
				<img src="https://cdn.shopify.com/s/files/1/0620/1648/7614/files/Group_41.svg?v=1734504740">
				<span>Hassle-Free <br>90-Day Returns</span>
			</div>
		</div>
	`;

	console.log(container);

	const messageElement = document.createElement('div');
	messageElement.innerHTML = message;

	container.append(messageElement);
}