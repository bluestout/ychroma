$(function(){
  $('.yas_look_slider-main .yas-look-slider_image').click(function(){
      let produrl = $(this).attr('data-produrl');
      let prodVarId = $(this).attr('data-variantid');
      fetch(`${produrl}?variant=${prodVarId}`)
        .then((response) => response.text())
        .then((responseText) => {
          let html = new DOMParser().parseFromString(responseText, 'text/html').documentElement;
          let destination = html.querySelector(`.yas_product-main`);
          let title = destination.querySelector(`.product__title h1`).textContent ;
          let titleunder = destination.querySelector(`.product__title span`).textContent;
          let slider = destination.querySelector('.collection_all_images_info .active_slider').outerHTML;
         // console.log(title.innerText + ' ' + titleunder.innerText);
          let content = destination.querySelector('.autor_content-yas').outerHTML;
  
        $.magnificPopup.open({
          items: [
              {
                src: '<div class="mfp-figure">'+
                        '<div class="mfp-close" onclick="$.magnificPopup.close();"><svg xmlns="http://www.w3.org/2000/svg" width="45.274" height="45.274" viewBox="0 0 45.274 45.274"><g transform="translate(-6421.873 -245.873)"><line y2="62.028" transform="translate(6466.44 246.58) rotate(45)" fill="none" stroke="#f7b716" stroke-width="2"/><line y2="62.028" transform="translate(6466.44 290.44) rotate(135)" fill="none" stroke="#f7b716" stroke-width="2"/></g></svg></div>'+
                        '<div class="yas-popop_look-wrapp">'+
                          `<div class="yas-popop_look-slider">${slider}</div>`+
                          '<div class="yas-popop_look-info">'+
                            `<div class="mfp-title">${title}</div>`+
                            `<div class="mfp-undertitle">${titleunder}</div>`+
                            content +
                            `<a href="${produrl}?variant=${prodVarId}" class="prod_var_link_pop">EXPLORE PRODUCT</a>`+
                          '</div>'+
                        '</div>'+
                      '</div>',
                type: 'inline'
              }
            ],
          mainClass: 'yas-variant-prodpop',
          callbacks: {
            open: function() {
              $('html').css('overflow', 'hidden');
               let swiper = new Swiper('.yas-popop_look-slider .swiper', {
                // Optional parameters
                loop: false,
           
                // Navigation arrows
                navigation: {
                  nextEl: '.yas-popop_look-slider .swiper-button-next',
                  prevEl: '.yas-popop_look-slider .swiper-button-prev',
                },
              });
              let left = '<svg xmlns="http://www.w3.org/2000/svg" width="17.196" height="54.662" viewBox="0 0 17.196 54.662"><path  d="M0,0,24,11.366,48,0" transform="translate(13.866 3.329) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/></svg>';
              let right = '<svg xmlns="http://www.w3.org/2000/svg" width="17.196" height="54.662" viewBox="0 0 17.196 54.662"><g  transform="translate(14.696 51.333) rotate(-180)"><path d="M0,0,24,11.366,48,0" transform="translate(11.366 0) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/></g></svg>';
              $('.yas-popop_look-slider .swiper-button-next').html(right);
              $('.yas-popop_look-slider .swiper-button-prev').html(left);
  
              
            },
            close: function() {
              $('html').css('overflow', '');
            }
          },
          type: 'inline'
        });
          
      });
    })
})

class YasColorChangeLookV1 extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', this.onVariantChange);
  }

  onVariantChange() {
    this.indexProd();
    this.updateImageVar();
    this.updateOptions();
    this.updateMasterId()
    
  }


  indexProd(){
    this.parent_wrapp = this.closest('.swiper-slide');
    //this.active_prod = this.parent_wrapp.querySelector('.yas-look-slider').swiper.activeIndex;
   // console.log(this.active_prod)
  }

  updateImageVar(){   
    this.parent_wrapp.querySelector('.yas-look-slider_image img').src = this.getAttribute('data-varimg');
    this.json_prod = this.parent_wrapp.querySelector('.swiper-slide [type="application/json"]');

    let wrappColor = this.closest('.yas-look-slider_color');
    let elColor = wrappColor.querySelectorAll('color-look');
    elColor.forEach(elColor => {       
          elColor.setAttribute('cheked', 'false');
    });

    this.setAttribute('cheked', 'true');
    
    this.color = this.getAttribute('data-varcolor');
    this.size_curent = document.querySelector(`custom-select[data-tag=${this.getAttribute('data-typetag')}] [cheked='true']`).getAttribute('data-val');
    
   // console.log(this.getAttribute('data-varimg'));
  }

  updateOptions() {
    this.options = [this.color, this.size_curent]; 
  }
  
  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {    
        return this.options[index] === option;
      }).includes(false);
    });

    this.parent_wrapp.querySelector(`.yas-look-slider_image`).setAttribute('data-variantid', this.currentVariant.id);
  }

  
  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.json_prod.textContent);
    return this.variantData;
  }
  
}

customElements.define('color-look', YasColorChangeLookV1);


class YasColorChangeLook extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', this.onVariantChange);
  }

  onVariantChange() {
      this.sliderid();
      this.changeSlider();
      this.popup();
  //  this.indexProd();
 //   this.updateImageVar();
      
 //   this.updateMasterId()
      
  }

  popup(){
      $('.yas_look_slider-main .yas-look-slider_image').click(function(){
      let produrl = $(this).attr('data-produrl');
      let prodVarId = $(this).attr('data-variantid');
      fetch(`${produrl}?variant=${prodVarId}`)
        .then((response) => response.text())
        .then((responseText) => {
          let html = new DOMParser().parseFromString(responseText, 'text/html').documentElement;
          let destination = html.querySelector(`.yas_product-main`);
          let title = destination.querySelector(`.product__title h1`).textContent ;
          let titleunder = destination.querySelector(`.product__title span`).textContent;
          let slider = destination.querySelector('.collection_all_images_info .active_slider').outerHTML;
         // console.log(title.innerText + ' ' + titleunder.innerText);
          let content = destination.querySelector('.autor_content-yas').outerHTML;
  
        $.magnificPopup.open({
          items: [
              {
                src: '<div class="mfp-figure">'+
                        '<div class="mfp-close" onclick="$.magnificPopup.close();"><svg xmlns="http://www.w3.org/2000/svg" width="45.274" height="45.274" viewBox="0 0 45.274 45.274"><g transform="translate(-6421.873 -245.873)"><line y2="62.028" transform="translate(6466.44 246.58) rotate(45)" fill="none" stroke="#f7b716" stroke-width="2"/><line y2="62.028" transform="translate(6466.44 290.44) rotate(135)" fill="none" stroke="#f7b716" stroke-width="2"/></g></svg></div>'+
                        '<div class="yas-popop_look-wrapp">'+
                          `<div class="yas-popop_look-slider">${slider}</div>`+
                          '<div class="yas-popop_look-info">'+
                            `<div class="mfp-title">${title}</div>`+
                            `<div class="mfp-undertitle">${titleunder}</div>`+
                            content +
                            `<a href="${produrl}?variant=${prodVarId}" class="prod_var_link_pop">EXPLORE PRODUCT</a>`+
                          '</div>'+
                        '</div>'+
                      '</div>',
                type: 'inline'
              }
            ],
          mainClass: 'yas-variant-prodpop',
          callbacks: {
            open: function() {
              $('html').css('overflow', 'hidden');
               let swiper = new Swiper('.yas-popop_look-slider .swiper', {
                // Optional parameters
                loop: false,
           
                // Navigation arrows
                navigation: {
                  nextEl: '.yas-popop_look-slider .swiper-button-next',
                  prevEl: '.yas-popop_look-slider .swiper-button-prev',
                },
              });
              let left = '<svg xmlns="http://www.w3.org/2000/svg" width="17.196" height="54.662" viewBox="0 0 17.196 54.662"><path  d="M0,0,24,11.366,48,0" transform="translate(13.866 3.329) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/></svg>';
              let right = '<svg xmlns="http://www.w3.org/2000/svg" width="17.196" height="54.662" viewBox="0 0 17.196 54.662"><g  transform="translate(14.696 51.333) rotate(-180)"><path d="M0,0,24,11.366,48,0" transform="translate(11.366 0) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/></g></svg>';
              $('.yas-popop_look-slider .swiper-button-next').html(right);
              $('.yas-popop_look-slider .swiper-button-prev').html(left);
  
              
            },
            close: function() {
              $('html').css('overflow', '');
            }
          },
          type: 'inline'
        });
          
      });
    })
  }
  
  sliderid(){
    this.prod_id = this.getAttribute('data-prodid');
    this.swiper_media = sliderMass[this.prod_id];
  //  this.  this.getAttribute('data-prodid'){{ product.id }}
  }

  changeSlider(){

    
    
    swiperMain.removeAllSlides();
    swiperMain.appendSlide(this.swiper_media);
    swiperMain.update();
    swiperMain.pagination.update();

    this.parent_wrapp = this.closest('.yas_look_wrapp');
    this.active_indexswiper = this.getAttribute('data-index');
    this.active_prod =  this.parent_wrapp.querySelector('.yas_look_slider-main .yas-look-slider').swiper.slides[this.active_indexswiper];
    

    swiperMain.slideTo(this.active_indexswiper)
   // console.log(this.active_prod.querySelector('img').src)
    //this.querySelector('img').src = this.active_prod.querySelector('img').src;

    
  }
  
  indexProd(){
    this.parent_wrapp = this.closest('.yas_look_wrapp');
    this.active_prod =  this.parent_wrapp.querySelector('.yas-look-slider').swiper.slides[this.parent_wrapp.querySelector('.yas-look-slider').swiper.activeIndex];
    this.active_prod
   
   // console.log(this.active_prod)
  }

  updateImageVar(){   
    this.parent_wrapp.querySelectorAll(`.yas-look-slider_second_image img`)[this.active_prod].src = this.getAttribute('data-varimg');
    this.json_prod = this.parent_wrapp.querySelectorAll(`.yas-look-slider_second_image [type="application/json"]`)[this.active_prod];

    let wrappColor = this.closest('.yas-look-slider_color');
    let elColor = wrappColor.querySelectorAll('color-look');
    elColor.forEach(elColor => {       
          elColor.setAttribute('cheked', 'false');
    });

    this.setAttribute('cheked', 'true');
    
    this.color = this.getAttribute('data-varcolor');
    this.size_curent = document.querySelector(`custom-select[data-tag=${this.getAttribute('data-typetag')}] [cheked='true']`).getAttribute('data-val');
    
   // console.log(this.getAttribute('data-varimg'));
  }

  updateOptions() {
    this.options = [this.color, this.size_curent]; 
  }
  
  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {    
        return this.options[index] === option;
      }).includes(false);
    });

  }

  
  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.json_prod.textContent);
    return this.variantData;
  }
  
}

customElements.define('varian-prod', YasColorChangeLook);


class YasCustomSelectLook extends HTMLElement {
  constructor() {
    super();
    this.select_data = this.getAttribute('data-tag');
    this.parent_wrapp = this.closest('.yas_look_wrapp');

    

    window.addEventListener("resize", this.size_window);
    this.addEventListener('click', this.onVariantChange);

    this.size_window();
    this.price_All();
  }

  onVariantChange() {
    

    if(this.select_data != 'look-pieces'){
      if(window.innerWidth < 1100){
        this.active_prod =  this.parent_wrapp.querySelector('.yas-look-slider-mobile[style="display: flex;"]').swiper.slides[this.parent_wrapp.querySelector('.yas-look-slider-mobile[style="display: flex;"]').swiper.activeIndex];
        this.onclick_variantMob();
        this.toogleSelect();
        this.updateIdItem2();
      }else{
        this.indexProd();
        this.onclick_variant()
        this.toogleSelect();
        this.updateIdItem();
      }
      
    }else{
      this.onclick_variant();
      this.toogleSelect();
      this.size_window();
    }

    this.price_All();
  }


  toogleSelect(){
    this.selectOpen = this.querySelector('.custom-select-form-wrapp').getAttribute('data-open');
    if(this.selectOpen != 'true'){
      this.querySelector('.custom-select-form-wrapp').setAttribute('data-open', 'true');
    }else{
      this.querySelector('.custom-select-form-wrapp').setAttribute('data-open', 'false');
    }

  }

onclick_variantMob(){
    
    
    let soption = this.querySelectorAll(".popcustom_select-var");
    let disable = this.querySelectorAll(".popcustom_select-var");
    if(this.select_data != 'look-pieces'){
     
      soption.forEach(soption => {       
        soption.addEventListener('click', () => {
          disable.forEach(disable => {disable.setAttribute('cheked', 'false')});
          soption.setAttribute('cheked', 'true');
          this.querySelector('.popcustom_select-title span').innerHTML = soption.getAttribute('data-val');
          this.option_value = soption.getAttribute('data-val');

          this.updateIdItem2();
        }) 
      });
   }else{
    
     
    soption.forEach((soption, index) => {       
        soption.addEventListener('click', () => { 
          disable.forEach(disable => {disable.setAttribute('cheked', 'false')});
          soption.setAttribute('cheked', 'true');
          this.querySelector('.popcustom_select-title span').innerHTML = soption.getAttribute('data-val');
          this.option_value = soption.getAttribute('data-val');
          let number_option_active = soption.getAttribute('data-number');
          let main_product =  this.parent_wrapp.querySelectorAll('.yas_look_pick8 > .yas_look_slider-chosen_product .yas-look-slider_second');
          
          main_product.forEach((main_product, index) => {
            main_product.setAttribute('data-hiden', 'true');
          })
          
          main_product[number_option_active].setAttribute('data-hiden', 'false');
          

          let secon_product =  this.parent_wrapp.querySelectorAll('.yas_look_pick8 > .yas-look-manypick .yas_look_slider-chosen_product .yas-look-slider_second');
      
          secon_product.forEach((secon_product, index) => {
            secon_product.setAttribute('data-hiden', 'true');
          })

          if(number_option_active > 0){
             secon_product[parseInt(number_option_active-1)].setAttribute('data-hiden', 'false');
          }

          
        });
        
    }); 
   }
 
  }
  
  onclick_variant(){
    
    
    let soption = this.querySelectorAll(".popcustom_select-var");
    let disable = this.querySelectorAll(".popcustom_select-var");
    if(this.select_data != 'look-pieces'){
     
      soption.forEach(soption => {       
        soption.addEventListener('click', () => {
          disable.forEach(disable => {disable.setAttribute('cheked', 'false')});
          soption.setAttribute('cheked', 'true');
          this.querySelector('.popcustom_select-title span').innerHTML = soption.getAttribute('data-val');
          this.option_value = soption.getAttribute('data-val');

          this.updateIdItem();
        }) 
      });
   }else{
    
     
    soption.forEach((soption, index) => {       
        soption.addEventListener('click', () => { 
          disable.forEach(disable => {disable.setAttribute('cheked', 'false')});
          soption.setAttribute('cheked', 'true');
          this.querySelector('.popcustom_select-title span').innerHTML = soption.getAttribute('data-val');
          this.option_value = soption.getAttribute('data-val');
          let number_option_active = soption.getAttribute('data-number');
          let main_product =  this.parent_wrapp.querySelectorAll('.yas_look_pick8 > .yas_look_slider-chosen_product .yas-look-slider_second');
          
          main_product.forEach((main_product, index) => {
            main_product.setAttribute('data-hiden', 'true');
          })
          
          main_product[number_option_active].setAttribute('data-hiden', 'false');
          

          let secon_product =  this.parent_wrapp.querySelectorAll('.yas_look_pick8 > .yas-look-manypick .yas_look_slider-chosen_product .yas-look-slider_second');
      
          secon_product.forEach((secon_product, index) => {
            secon_product.setAttribute('data-hiden', 'true');
          })

          if(number_option_active > 0){
             secon_product[parseInt(number_option_active-1)].setAttribute('data-hiden', 'false');
          }

          
        });
        
    }); 
   }
 
  }
  size_window(){
        let parent_wrapp = document.querySelector('.yas_look_wrapp');
        if(window.innerWidth < 1100){
          let mobslide_index = parent_wrapp.querySelector('.custom-select-form[data-tag="look-pieces"] .popcustom_select-var[cheked="true"]').getAttribute('data-number');
          let massMobSlide =  parent_wrapp.querySelectorAll('.yas_look_slider-main .yas-look-slider-mobile');
          massMobSlide.forEach((massMobSlide, index) => {
            if(index != mobslide_index){
              massMobSlide.style.display = "none";
            }                                   
          })
          massMobSlide[mobslide_index].style.display = "flex";
        }else{
          let massMobSlide =  parent_wrapp.querySelectorAll('.yas_look_slider-main .yas-look-slider-mobile');
          massMobSlide.forEach((massMobSlide, index) => {
              massMobSlide.style.display = "none";                               
          })
        }
  }
  price_All(){
    let massPrice = this.parent_wrapp.querySelectorAll('.yas_look_pick8 .yas-look-slider_second[data-hiden="false"] varian-prod');
    let preiceAll = 0;
    massPrice.forEach((massPrice, index) => {
          let price = parseFloat(massPrice.getAttribute('data-variantprice').replace('$',''));
          preiceAll += price;                                     
    })

    this.parent_wrapp.querySelector('.yas-lookv2_price span').innerHTML = preiceAll;
    
  }
  
  indexProd(){   
      this.active_prod =  this.parent_wrapp.querySelector('.yas-look-slider').swiper.slides[this.parent_wrapp.querySelector('.yas-look-slider').swiper.activeIndex]; 
  }
   updateOptions() {
    this.options = [this.color, this.size_curent]; 
    }
    
    updateMasterId() {
      this.currentVariant = this.getVariantData().find((variant) => {
        return !variant.options.map((option, index) => {    
          return this.options[index] === option;
        }).includes(false);
      });
  
    }
  getVariantData() {
    this.json_prod = this.parent_wrapp.querySelectorAll(`varian-prod [type="application/json"]`)[this.active_indexswiper];

    this.variantData = this.variantData || JSON.parse(this.json_prod.textContent);
    return this.variantData;
  }
  updateIdItem(){
    
    this.color =  this.active_prod.querySelector('.yas-look-slider_image').getAttribute('data-varcolor');
    this.prodid = this.active_prod.querySelector('.yas-look-slider_image').getAttribute('data-productid');
    this.size_curent = document.querySelector(`custom-select[data-tag=${this.getAttribute('data-tag')}] [cheked='true']`).getAttribute('data-val');

    this.active_indexswiper = this.parent_wrapp.querySelector('.yas-look-slider').swiper.activeIndex;
  
    this.updateOptions();

    this.updateMasterId();
    
    this.setAttribute('data-varcolor', this.color);
    this.setAttribute('data-variantid', this.currentVariant);
    
      
      
    let wrappSection = this.parent_wrapp;
      


    let color = wrappSection.querySelectorAll('.yas-look-slider_second varian-prod');
      
      color.forEach((color, index) => {
        let tagColor = color.getAttribute('data-typetag');
        console.log(tagColor);
        console.log(this.getAttribute('data-tag'));
        if(this.getAttribute('data-tag') == tagColor){
          let json_prod = wrappSection.querySelectorAll(`varian-prod [type="application/json"]`)[index];
          let val_color = color.getAttribute('data-varcolor');
          let options = [val_color, this.option_value];
          let variantData = JSON.parse(json_prod.textContent);
          
          let currentVariant = variantData.find((variant) => {
            return !variant.options.map((option, index) => {  
              console.log(options[index] + ' --- ' + option);
              return options[index] === option;
            }).includes(false);
          });
          console.log(currentVariant);
          wrappSection.querySelectorAll(`varian-prod`)[index].setAttribute('data-variantid', currentVariant.id);
        }         
      })
    /*
      let currentVariant = variantData.find((variant) => {
            return !variant.options.map((option, index) => {    
              return options[index] === option;
            }).includes(false);
          });
      
      wrappSection.setAttribute('data-variantid', currentVariant.id);
   */ 
  }

  updateIdItem2(){
    
    this.color =  this.active_prod.querySelector('.yas-look-slider_color [cheked="true"]').getAttribute('data-varcolor');
    this.prodid = this.active_prod.querySelector('.yas-look-slider_image').getAttribute('data-productid');
    this.size_curent = document.querySelector(`custom-select[data-tag=${this.getAttribute('data-tag')}] [cheked='true']`).getAttribute('data-val');

    this.active_indexswiper = this.parent_wrapp.querySelector('.yas_look_slider-main .yas-look-slider-mobile[style="display: flex;"]').swiper.activeIndex;
  
    this.updateOptions();

    this.updateMasterId();
    
    this.setAttribute('data-varcolor', this.color);
    this.setAttribute('data-variantid', this.currentVariant);
    
      
      
    let wrappSection = this.parent_wrapp;
    let color = wrappSection.querySelectorAll('.yas-look-slider_second varian-prod');
      
      color.forEach((color, index) => {
        let tagColor = color.getAttribute('data-typetag');

        if(this.getAttribute('data-tag') == tagColor){
          let json_prod = wrappSection.querySelectorAll(`varian-prod [type="application/json"]`)[index];
          let val_color = color.getAttribute('data-varcolor');
          let options = [val_color, this.option_value];
          let variantData = JSON.parse(json_prod.textContent);
          
          let currentVariant = variantData.find((variant) => {
            return !variant.options.map((option, index) => {  
              console.log(options[index] + ' --- ' + option);
              return options[index] === option;
            }).includes(false);
          });
          console.log(currentVariant);
          wrappSection.querySelectorAll(`varian-prod`)[index].setAttribute('data-variantid', currentVariant.id);
        }         
      })


    //mobile slide block
     wrappSection = this.parent_wrapp.querySelector('.yas_look_slider-main');
     color = wrappSection.querySelectorAll('.yas-look-slider-mobile color-look');
      
      color.forEach((color, index) => {
        let tagColor = color.getAttribute('data-typetag');
 
        if(this.getAttribute('data-tag') == tagColor){
          let json_prod = wrappSection.querySelectorAll(`.yas-look-slider-mobile [type="application/json"]`)[index];
          let val_color = color.getAttribute('data-varcolor');
          let options = [val_color, this.option_value];
          let variantData = JSON.parse(json_prod.textContent);
          
          let currentVariant = variantData.find((variant) => {
            return !variant.options.map((option, index) => {  
              console.log(options[index] + ' --- ' + option);
              return options[index] === option;
            }).includes(false);
          });
          console.log(currentVariant);
          wrappSection.querySelectorAll(`.yas-look-slider-mobile .yas-look-slider_image`)[index].setAttribute('data-variantid', currentVariant.id);
        }         
      })
    
      
  }
  
  
}

customElements.define('custom-select', YasCustomSelectLook);

/*

class VariantSelectsYas extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();
   
    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
    //  this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
    //  this.updateShareUrl();
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value); 
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;

    const mediaGallery = document.getElementById(`MediaGallery-${this.dataset.section}`);
    mediaGallery.setActiveMedia(`${this.dataset.section}-${this.currentVariant.featured_media.id}`, true);

    const modalContent = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`);
    if (!modalContent) return;
    const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
    modalContent.prepend(newMediaModal);
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}`);
    if (!shareButton || !shareButton.updateUrl) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;

    if (this.currentVariant && this.currentVariant.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }

  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;

    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }

  renderProductInfo() {
    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.getElementById(`price-${this.dataset.section}`);
        const source = html.getElementById(`price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);
        if (source && destination) destination.innerHTML = source.innerHTML;

        const price = document.getElementById(`price-${this.dataset.section}`);

        if (price) price.classList.remove('visibility-hidden');
        this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
      });
  }

  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }

  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}`);
    if (!addButton) return;
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('visibility-hidden');
  }

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}

customElements.define('custom-select', VariantSelectsYasLook);
*/
