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


class YasColorChangeLook extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', this.onVariantChange);
  }

  onVariantChange() {
      this.sliderid();
      this.curentSlideArray();
      this.changeSlider();
      this.popup();
      
  }

  popup(){
      $('.yas_look_slider-main .yas-look-slider_image').click(function(){
      let produrl = $(this).attr('data-produrl');
      let prodVarId = $(this).attr('data-variantid');
      fetch(`${produrl}?variant=${prodVarId}`)
        .then((response) => response.text())
        .then((responseText) => {
          let html = new DOMParser().parseFromString(responseText, 'text/html').documentElement;
          let destination = html.querySelector('.yas_product-main');
          let title = destination.querySelector('.product__title h1').textContent ;
          let titleunder = destination.querySelector('.product__title span').textContent;
          let slider = destination.querySelector('.collection_all_images_info .active_slider .mySwiperPrev').outerHTML;
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
               let swiper = new Swiper('.yas-variant-prodpop .swiper', {
                // Optional parameters
                loop: false,
           
                // Navigation arrows
                navigation: {
                  nextEl: '.yas-variant-prodpop .swiper-button-next',
                  prevEl: '.yas-variant-prodpop .swiper-button-prev',
                },
              });
              let left = '<svg xmlns="http://www.w3.org/2000/svg" width="17.196" height="54.662" viewBox="0 0 17.196 54.662"><path  d="M0,0,24,11.366,48,0" transform="translate(13.866 3.329) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/></svg>';
              let right = '<svg xmlns="http://www.w3.org/2000/svg" width="17.196" height="54.662" viewBox="0 0 17.196 54.662"><g  transform="translate(14.696 51.333) rotate(-180)"><path d="M0,0,24,11.366,48,0" transform="translate(11.366 0) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/></g></svg>';
              $('.yas-variant-prodpop .swiper-button-next').html(right);
              $('.yas-variant-prodpop .swiper-button-prev').html(left);
  
              
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
    this.parent_wrapp = this.closest('.yas_look_wrapp');
    this.prod_id = this.getAttribute('data-prodid');
    this.variant_id = this.getAttribute('data-variantid');
    this.color = this.getAttribute('data-varcolor');
  }

  changeSlider(){

    swiperMain.removeAllSlides();

    swiperMain.appendSlide(this.currentSlide.items);
    swiperMain.update();
    swiperMain.pagination.update();

    
    this.active_indexswiper = this.getAttribute('data-index');
    this.active_prod =  this.parent_wrapp.querySelector('.yas_look_slider-main .yas-look-slider').swiper.slides[this.active_indexswiper];
    
    swiperMain.slideTo(this.active_indexswiper)

  }
  


  curentSlideArray() {
      let imageData = this.getVariantDataImage().filter(image => image.alt == this.color && image.media_type == "image");
      this.currentSlide = {
       'items': []
      };
      imageData.forEach(imageData => {
         this.currentSlide.items.push(`<div class="swiper-slide"><div class="yas-look-slider_image" data-varcolor="${this.color}" data-produrl="${this.json_url}"  data-productid="${this.prod_id}" data-variantid="${this.variant_id}"><img src="${imageData.src}" alt="${imageData.alt}"></div></div>`);
      });    
  }
  getVariantDataImage() {
    this.json_prod = this.parent_wrapp.querySelector(`varian-prod[data-variantid="${this.variant_id}"] [data-slide]`);
    this.json_url = this.parent_wrapp.querySelector(`varian-prod[data-variantid="${this.variant_id}"] [data-slide]`).getAttribute('data-urlp');
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

    
    this.addEventListener('click', this.toogleSelect);
    this.querySelectorAll('.popcustom_select-var').forEach( () => {
      this.addEventListener('click', this.onVariantChange);
    })
      
    
    this.size_window();
    this.price_All();
  }

  
  onVariantChange(){

    if(this.select_data != 'look-pieces'){ 
        this.onclickVariant();
        this.updateIdItem();
        
    }else{
      this.onclickVariant();
      this.updateMobileSlide();
      this.parent_wrapp.querySelector('.yas_look_slider-chosen_product > [data-hiden="false"] varian-prod').click();
      this.parent_wrapp.querySelector('varian-prod').popup();
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


  onclickVariant(){
 
    let soption = this.querySelectorAll(".popcustom_select-var");
    let disable = this.querySelectorAll(".popcustom_select-var");
    if(this.select_data != 'look-pieces'){
     
      soption.forEach(soption => {       
        soption.addEventListener('click', () => {
          disable.forEach(disable => {disable.setAttribute('cheked', 'false')});
          soption.setAttribute('cheked', 'true');
          this.querySelector('.popcustom_select-title span').innerHTML = soption.getAttribute('data-name');
          this.option_value = soption.getAttribute('data-val');

          this.updateIdItem();
        }) 
      });
   }else{
    
     
    soption.forEach((soption, index) => {       
        soption.addEventListener('click', () => { 
          disable.forEach(disable => {disable.setAttribute('cheked', 'false')});
          soption.setAttribute('cheked', 'true');
          this.querySelector('.popcustom_select-title span').innerHTML = soption.getAttribute('data-name');
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
          //let mobslide_index = parent_wrapp.querySelector('.custom-select-form[data-tag="look-pieces"] .popcustom_select-var[cheked="true"]').getAttribute('data-number');
          let massMobSlide =  parent_wrapp.querySelectorAll('.yas_look_slider-main .yas-look-slider-mobile');
        /*  
          massMobSlide.forEach((massMobSlide, index) => {
            if(index != mobslide_index){
              massMobSlide.style.display = "none";
            }                                   
          }) 
        */
          massMobSlide[0].style.display = "flex";


          
        }else{
          let massMobSlide =  parent_wrapp.querySelectorAll('.yas_look_slider-main .yas-look-slider-mobile');
          massMobSlide.forEach((massMobSlide, index) => {
              massMobSlide.style.display = "none";                               
          })
        }
  }

  updateMobileSlide(){
      let parent_wrapp = document.querySelector('.yas_look_wrapp');
      let mobileWrapp = parent_wrapp.querySelector('.yas-look-slider-mobile');
      let numPieces = parent_wrapp.querySelector('custom-select[data-tag="look-pieces"] [cheked="true"]').getAttribute('data-val').split(' ', 1)[0];


      let json_prod = mobileWrapp.querySelector(`[data-slide-${numPieces}]`);
      let variantData = JSON.parse(json_prod.textContent);

    
      let currentSlide = {
       'items': []
      };
      variantData.forEach(variantData => {
         currentSlide.items.push(`<div class="swiper-slide"><div class="yas-look-slider_image" data-varcolor="${variantData.option1}" data-produrl=""  data-productid="${variantData.featured_image.product_id}" data-variantid="${variantData.id}"><img src="${variantData.featured_image.src}" alt="${variantData.featured_image.alt}"></div></div>`);
      });  
    
    
      swiperMobile.removeAllSlides();

      swiperMobile.appendSlide(currentSlide.items);
      swiperMobile.update();
      swiperMobile.pagination.update();
  
      swiperMobile.slideTo(0);
    
    
  }

  
  price_All(){
    let massPrice = this.parent_wrapp.querySelectorAll('.yas_look_pick8 .yas-look-slider_second[data-hiden="false"] varian-prod');
    let preiceAll = 0;
   
  
    massPrice.forEach((massPrice, index) => {
   
          let price = parseFloat(massPrice.getAttribute('data-variantprice').slice(1));
   
  
          preiceAll += price;   
       
    })



  
    this.parent_wrapp.querySelector('.yas-lookv2_price span').innerHTML = preiceAll;
    
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
    this.json_prod = this.parent_wrapp.querySelector(`varian-prod[data-variantid="${this.variant_id}"] [type="application/json"]:not([data-slide])`)
    this.variantData = this.variantData || JSON.parse(this.json_prod.textContent);
    return this.variantData;
  }
  updateIdItem(){
   /* 
    this.color =  this.parent_wrapp.querySelector('.yas-look-slider .swiper-slide-active .yas-look-slider_image').getAttribute('data-varcolor');
    this.prodid = this.parent_wrapp.querySelector('.yas-look-slider .swiper-slide-active .yas-look-slider_image').getAttribute('data-productid');
    this.variant_id =  this.parent_wrapp.querySelector('.yas-look-slider .swiper-slide-active .yas-look-slider_image').getAttribute('data-variantid');
    */
    this.size_curent = document.querySelector(`custom-select[data-tag=${this.getAttribute('data-tag')}] [cheked='true']`).getAttribute('data-val');

  
   // this.updateOptions();

   // this.updateMasterId();
    
    //this.setAttribute('data-varcolor', this.color);
    //this.setAttribute('data-variantid', this.currentVariant);
    
      
      
    let wrappSection = this.parent_wrapp;

    let color = wrappSection.querySelectorAll('.yas-look-slider_second varian-prod');
      
      color.forEach((color, index) => {
        let tagColor = color.getAttribute('data-typetag');
        if(this.getAttribute('data-tag') == tagColor){
          let json_prod = wrappSection.querySelectorAll(`varian-prod [type="application/json"]:not([data-slide])`)[index];
          let val_color = color.getAttribute('data-varcolor');
          let options = [val_color, this.size_curent];
          let variantData = JSON.parse(json_prod.textContent);
          
          var currentVariant = variantData.find((variant) => {
            return !variant.options.map((option, index) => {  
              return options[index] === option;
            }).includes(false);
          });
          if(currentVariant == undefined || currentVariant == 'undefined'){
            console.log(currentVariant);
          }else{
            wrappSection.querySelectorAll(`varian-prod`)[index].setAttribute('data-variantid', currentVariant.id);
          }
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

  
  
}

customElements.define('custom-select', YasCustomSelectLook);