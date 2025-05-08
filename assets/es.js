document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

class ESCardProduct extends HTMLElement {
  constructor() {
    super();

    this.modalOpener = this.querySelector(".open-modal");
    this.modalContainer = this.querySelector(".quick-add-popup");
    this.modalCloser = this.querySelector(".close-quick-add");
    this.variantInputs = this.querySelectorAll(".variant-swatch-input");
    this.colorVariants = this.querySelectorAll("fieldset[name='color'] input");
    this.selectedVariantId = this.querySelector(".selected-variant-id");
    this.variantDataElement = this.querySelector('script[type="application/json"]');
    this.medias = this.querySelectorAll(".card__media img");
    this.mainImage = this.querySelector(".main-custom-featured-image-info");
    this.hoverImage = this.querySelector(".hover-custom-featured-image-info");
    this.mainTitle = this.querySelector(".es-secondary-title");
    this.subTitle = this.querySelector(".es-secondary-sub-title");

    if (this.variantDataElement) {
      this.variantData = JSON.parse(this.variantDataElement.textContent);
    }

    this.init();
  }

  modalOpen() {
    this.modalContainer.style.display = "block";
  }

  modalClose() {
    this.modalContainer.style.display = "none";
  }

  handleVariantChange = (event) => {
    const selectedOption = event.target.value;
    let publicTitle = "";

    const checkedInputs = this.querySelectorAll('input[type="radio"]:checked');

    checkedInputs.forEach((input, i) => {
      if (i > 0) {
        publicTitle += " / ";
      }
      publicTitle += input.value;
    });

    console.log("publicTitle:", publicTitle);

    const selectedVariant = this.variantData.find(variant => variant.title === publicTitle);

    if (selectedVariant) {
      this.selectedVariantId.value = selectedVariant.id;
      console.log("Selected Variant ID:", this.selectedVariantId);
    } else {
      console.log("No matching variant found.");
    }

  };

  handleColorVariantChange = (event) => {
    const value = event.target.value;

    if (this.mainImage) {
      if (event.target.dataset.image) {
        this.mainImage.setAttribute("src", event.target.dataset.image);
      }
      if (event.target.dataset.hoverImage) {
        this.hoverImage.setAttribute("src", event.target.dataset.hoverImage);
      }
      if (event.target.dataset.title) {
        this.mainTitle.textContent = event.target.dataset.title;
      }
      if (event.target.dataset.subTitle) {
        this.subTitle.textContent = event.target.dataset.subTitle;
      }
    } else {
      this.medias.forEach(media => {
        if (media.getAttribute("alt").indexOf(value) > -1) {
          media.classList.add("active");
        } else {
          media.classList.remove("active");
        }
      })
    }
  }

  init() {
    if (this.modalOpener && this.modalContainer && this.modalCloser) {
      this.modalOpener.addEventListener("click", this.modalOpen.bind(this));
      this.modalCloser.addEventListener("click", this.modalClose.bind(this));
    } else {
      console.error("Modal elements not found inside ESCardProduct.");
    }

    this.variantInputs.forEach((input) => {
      input.addEventListener("change", this.handleVariantChange.bind(this));
    
      if (input.nextElementSibling) {
        input.nextElementSibling.addEventListener("click", () => {
          input.click();
        });
      }
    });
    
    this.colorVariants.forEach((input) => {
      input.addEventListener("change", this.handleColorVariantChange.bind(this));
    })
  }
}

customElements.define("es-card-product", ESCardProduct);

document.dispatchEvent(new CustomEvent("swym:collections-loaded"));

$('.popup-defolt').magnificPopup({
  type: 'inline',
  preloader: false,
  mainClass: 'yas-videom-pop',
  callbacks: {
    beforeClose: function() {
      document.querySelector('.white-popup-block video').pause();
    },
    open: function() {
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

	const messageElement = document.createElement('div');
	messageElement.innerHTML = message;

  const footer = widget.querySelector(".upcart-footer");
  const div = document.createElement("div");
  div.classList.add("checkout-note");
  div.textContent = "Your total includes all customs duties and taxes. We guarantee no additional charges on delivery.";
  footer.querySelector(".styles_Footer__checkoutButton__").prepend(div);
}

console.log('details');

$("#FacetFiltersForm .js-filter")?.each((index, details) => {
  $(details).on("click", function () {
    $("#FacetFiltersForm .js-filter")?.each((i, d) => {
      if (d != details) {
        $(d).removeAttr('open');
      }
    })
  })
})


const KlaviyoReady = () => {
  const reviewsCarousels = document.querySelectorAll('#klaviyo-featured-reviews-carousel');

  reviewsCarousels?.forEach(function (el) {
    const widget = el?.querySelector('.swiper');
    
    if (!widget) return;

    if (widget) {
      // if (widget.swiper) {
      //   widget.swiper.destroy(true, true);
      // }

      const paginationEl = document.createElement('div');
      paginationEl.classList.add('swiper-pagination');
      widget.appendChild(paginationEl);

      const sw = new Swiper(widget, {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: el.querySelector('.kl_reviews__carousel__next_button'),
          prevEl: el.querySelector('.kl_reviews__carousel__prev_button'),
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }
  })
}

const observer = new MutationObserver((mutations, obs) => {
  const reviewsCarousel = document.querySelector('#klaviyo-featured-reviews-carousel .kl_reviews__carousel__content_body');
  if (reviewsCarousel) {
    KlaviyoReady();
    obs.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });