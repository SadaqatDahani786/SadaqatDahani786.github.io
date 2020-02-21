/*
** **
** ** * IMAGE SLIDER 
** **
*/
class Slider{
    constructor(nextButton,prevButton,sliderContainer,sliderIndicator,sliderSlides,lightbox){
        //Elements
        this.nextButton = nextButton;
        this.prevButton = prevButton;
        this.sliderContainer = sliderContainer;
        this.sliderIndicator = sliderIndicator;
        this.sliderSlides = sliderSlides;        
        this.lightbox = lightbox;
        this.spinner;

        //State
        this.boxPerSlide = 1;
        this.currSlide = 1;            
        this.totalSlides = this.sliderSlides.length;
        this.zoomToggle = true;
        this.isLoading = false;

        //Events
        this.events();
        this.createClones();
        this.createIndicators();
    }

    //Events
    events(){                
        this.nextButton.addEventListener('click', this.next.bind(this));
        this.prevButton.addEventListener('click', this.prev.bind(this));                                        
        this.sliderContainer.addEventListener('transitionend',this.transition.bind(this));                
        this.sliderSlides.forEach(curr=>{
            curr.addEventListener('click',this.zoom.bind(this));
        });
        this.resize();                        
    }

    //INIT - Load The First Image
    init(){        
        //Add Loading Spinner
        this.spinner = document.createElement("div");
        this.spinner.classList.add('lds-spinner-wrapper');
        this.spinner.insertAdjacentHTML('beforeend','<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
        this.sliderSlides[this.currSlide].insertAdjacentElement('beforeend',this.spinner);

        //Load Current Image
        const src1 = this.sliderSlides[this.currSlide].children[0].getAttribute('data-src');
        this.sliderSlides[this.currSlide].children[0].setAttribute('src',src1);        
        this.sliderSlides[this.currSlide].children[0].addEventListener('load',this.loaded.bind(this));        
        this.isLoading = true;
        this.sliderSlides[(this.totalSlides + 1)].children[0].setAttribute('src',src1);        

        //Load Previous Image
        const src2 = this.sliderSlides[this.totalSlides].children[0].getAttribute('data-src');        
        this.sliderSlides[0].children[0].setAttribute('src',src2);        
        this.sliderSlides[this.totalSlides].children[0].setAttribute('src',src2);                   
    }

    //Zoom Effect
    zoom(e){                
        
        //Check for image
        if(e.target == this.sliderSlides[this.currSlide]){
            return;
        }

        //ZoomToggle 
        if(this.zoomToggle){            
            e.target.classList.add('slides-zoom');
            this.sliderSlides[this.currSlide].classList.add('slide-overflow');
            this.sliderSlides[this.currSlide].children[0].classList.add('img-cusrsor-zoom-out');
            this.zoomToggle = false;        
        }else{
            e.target.classList.remove('slides-zoom');
            this.sliderSlides[this.currSlide].classList.remove('slide-overflow');
            this.sliderSlides[this.currSlide].children[0].classList.remove('img-cusrsor-zoom-out');
            this.zoomToggle = true;
        }
    }
    //Remove Zoom Effect
    zoom_default(){                
        const i = this.currSlide - 1;
        this.sliderSlides[i].classList.remove('slide-overflow');        
        this.sliderSlides[i].children[0].classList.remove('slides-zoom');
        this.zoomToggle = true;    
    }

    //Next Slide
    next(e){        
        e.preventDefault(); 
        
        //Check for slides
        if(this.currSlide >= (this.totalSlides + 1) || this.isLoading){
            return;
        }               

        //RemoveZoom
        this.zoom_default();        

        //Add Loading Spinner
        this.spinner = document.createElement("div");
        this.spinner.classList.add('lds-spinner-wrapper');
        this.spinner.insertAdjacentHTML('beforeend','<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
        this.sliderSlides[this.currSlide].insertAdjacentElement('beforeend',this.spinner);
        
        //Slide To Next
        this.sliderContainer.classList.add('smooth-container');
        this.currSlide++;   
        
        if(this.currSlide < (this.totalSlides + 1)){
            for(let  i = 0; i < this.sliderSlides[this.currSlide].children.length; i++){
                if(this.sliderSlides[this.currSlide].children[i].nodeName == "IMG"){
                    const src = this.sliderSlides[(this.currSlide)].children[i].getAttribute('data-src');            
                    this.sliderSlides[this.currSlide].children[i].addEventListener('load',this.loaded.bind(this,'next'));            
                    this.sliderSlides[this.currSlide].children[i].setAttribute('src',src);                                                   
                    this.isLoading = true;
                    break; 
                }                
            }               
        }else{
            this.isLoading = true;
            this.loaded();    
        }        
    }

    //Prev Slide
    prev(e){
        e.preventDefault();                      

        //Check for slides
        if(this.currSlide <= 0 || this.isLoading == true){
            return;
        }

        // Remove Zoom        
        this.zoom_default();        

        //Add Loading Spinner
        this.spinner = document.createElement("div");
        this.spinner.classList.add('lds-spinner-wrapper');
        this.spinner.insertAdjacentHTML('beforeend','<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
        this.sliderSlides[this.currSlide].insertAdjacentElement('beforeend',this.spinner);        
        
        //Slide To Previous
        this.sliderContainer.classList.add('smooth-container');
        this.currSlide--;

        if(this.currSlide > 0){             
            for(let  i = 0; i < this.sliderSlides[this.currSlide].children.length; i++){
                if(this.sliderSlides[this.currSlide].children[i].nodeName == "IMG"){
                    const src = this.sliderSlides[(this.currSlide)].children[i].getAttribute('data-src');            
                    this.sliderSlides[this.currSlide].children[i].addEventListener('load',this.loaded.bind(this));            
                    this.sliderSlides[this.currSlide].children[i].setAttribute('src',src);                                                   
                    this.isLoading = true
                    break; 
                }                
            }               
        }else{                     
            this.isLoading = true;
            this.loaded();
        }                     
    }

    //Loaded Image
    loaded(){                        
        if(this.spinner.parentNode != null){
            this.spinner.parentNode.removeChild(this.spinner);               
        }                                                              
        this.sliderContainer.style.transform = 'translateX( -'+this.currSlide * this.sliderSlides[0].clientWidth+'px)';                                                
        this.isLoading = false;             
    }

    //Transition
    transition(){        
        let i = this.currSlide - 1; 
        if(this.sliderSlides[this.currSlide].classList.contains('last-clone')){
            this.sliderContainer.classList.remove('smooth-container');
            this.currSlide = this.totalSlides;
            this.sliderContainer.style.transform = 'translateX( -'+this.currSlide * this.sliderSlides[0].clientWidth+'px)';                    
            i = this.currSlide - 1;
        }        
        if(this.sliderSlides[this.currSlide].classList.contains('first-clone')){            
            this.sliderContainer.classList.remove('smooth-container');
            this.currSlide = Math.abs(this.totalSlides - this.currSlide);                        
            this.sliderContainer.style.transform = 'translateX( -'+this.currSlide * this.sliderSlides[0].clientWidth+'px)';        
            i = this.currSlide - 1;                                    
        }
        //Active Indiactor
        for (let x = 0; x < this.sliderIndicator.children.length; x++) {
            if (this.sliderIndicator.children[x].classList.contains('active')) {
                this.sliderIndicator.children[x].classList.remove('active');                
              break;
            }        
        }        
        this.sliderIndicator.children[i].classList.add('active');                        
        
    }

    //Create Slides Clones{
    createClones(){

        //First Clone
        const slideElFirstClone = document.createElement("div");
        const slideElFirstCloneImg = document.createElement('img');
        const slideElFirstCloneImgSrc = this.sliderSlides[0].children[0].getAttribute('src');
        
        //Set Classess - First Clone
        slideElFirstClone.classList.add('lightbox__slider__slides');
        slideElFirstClone.classList.add('first-clone');

        //Append - First Clone
        // slideElFirstCloneImg.setAttribute('data-src',slideElFirstCloneImgSrc);
        slideElFirstClone.appendChild(slideElFirstCloneImg);
        this.sliderSlides.push(slideElFirstClone);
        
        //Last Clone
        const slideElLastClone = document.createElement("div");
        const slideElLastCloneImg = document.createElement('img');
        const slideElLastCloneImgSrc = this.sliderSlides[this.sliderSlides.length - 2].children[0].getAttribute('src');
        
        //Set Classess - Last Clone
        slideElLastClone.classList.add('lightbox__slider__slides');
        slideElLastClone.classList.add('last-clone');

        //Append - Last Clone
        // slideElLastCloneImg.setAttribute('data-src',slideElLastCloneImgSrc);
        slideElLastClone.appendChild(slideElLastCloneImg);
        this.sliderSlides.unshift(slideElLastClone);
    
        //Insert First And Last Clone
        this.sliderContainer.insertAdjacentElement('beforeEnd',slideElFirstClone);
        this.sliderContainer.insertAdjacentElement('afterbegin',slideElLastClone);                
    }

    createIndicators(){                
        for(let i = 0; i < this.totalSlides; i++){            
            //Create Element
            const li = document.createElement('li');  
            li.appendChild(document.createTextNode('-'));
            //Set Attributes            
            li.setAttribute('data-slide-to', i);            
            //Add Event
            li.addEventListener('click',this.indicate.bind(this));            
            //Add To Dom            
            this.sliderIndicator.insertAdjacentElement('beforeEnd',li);
        }
        //Active Indicator
        const i = this.currSlide - 1;        
        this.sliderIndicator.children[i].classList.add('active');
    }
    indicate(e){
        e.preventDefault();
        //Get SlideTo Attribute
        const slideTo = parseInt(e.target.getAttribute('data-slide-to'));
        this.currSlide = slideTo + 1;
        //Slide 
        this.sliderContainer.classList.add('smooth-container');
        this.sliderContainer.style.transform = 'translateX( -'+this.currSlide * this.sliderSlides[0].clientWidth+'px)';               
    }

    //Resize
    resize(){
        this.sliderContainer.style.transform = 'translateX( -'+this.currSlide * 100+'%)';
    }
}

/*
** **
** ** * LIGHTBOX
** **
*/
class Lightbox{
    constructor(lightbox,slider){
        //Elements
        this.lightbox = lightbox;                        
        this.openButton = document.querySelector(`.showcase__show-all__grid__link[data-target="#${this.lightbox.getAttribute('id')}"]`);                
        this.closeButton = $(lightbox).find('.lightbox__close')[0];
        this.closeBg = $(lightbox).find('.lightbox__bg')[0];        
        this.slider = slider;

        //State

        //events
        this.events();
    }

    //Events
    events(){
        this.openButton.addEventListener('click', this.show.bind(this));
        this.closeButton.addEventListener('click', this.hide.bind(this));
        this.closeBg.addEventListener('click', this.hide.bind(this));
    }


    //Show Lightbox
    show(e){
        e.preventDefault();
        $(this.lightbox).fadeIn('fast');
        $(document.body).css('overflow','hidden');        
        this.slider.init();
    }

    //Hide Lightbox
    hide(e){
        e.preventDefault();
        $(document.body).css('overflow','');
        $(this.lightbox).fadeOut('fast');
    }
}


/*
** **
** ** * DOCUMENT START
** **
*/
$(document).ready(function(){        
    var statusCheckbox = true;       

    /*
    ** **
    ** ** * INIT LIGHTBOX AND SLIDER LISTENERS
    ** **
    */
    const Sliders = [];    
    const Lightboxex = [];
    document.querySelectorAll('.lightbox').forEach(function(lightbox){        
        
        const nextBtn = $(lightbox).find('.lightbox__slider__controls__control--next')[0];
        const prevBtn = $(lightbox).find('.lightbox__slider__controls__control--prev')[0];        
        const sliderContainer = $(lightbox).find('.lightbox__slider__container')[0];
        const sliderIndicator = $(lightbox).find('.slider__indicators')[0];
        const sliderSlides = Array.from(lightbox.querySelectorAll('.lightbox__slider__slides'));        
        
        Sliders.push(new Slider(nextBtn,prevBtn,sliderContainer,sliderIndicator,sliderSlides));        
        Lightboxex.push(new Lightbox(lightbox,Sliders[Sliders.length - 1]));                 
    });    

    /*
    ** **
    ** ** * PRELOAD LOGO SECOND IMAGE
    ** **
    */
    $('<img/>').attr('src', 'http://127.0.0.1:8080/Images/logo-invert.png').on('load', function() {                        
        $('.logo__link').css('background-image', 'url(http://127.0.0.1:8080/Images/logo-invert.png)');                        
        this.remove();        
    });


    /*
    ** **
    ** ** * LOGOBOXEX ANIMATION
    ** **
    */
    let io = new IntersectionObserver(function(entries,observer){
        entries.forEach(function(entry){            
            if(entry.isIntersecting){                                      
                const targetChild = $(entry.target).find('.anim-in');                
                for(let i = 0; i < targetChild.length; i++){
                    setTimeout(function(){
                        $(targetChild[i]).addClass('anim-in-animate');                                                          
                        $(targetChild[i]).css('box-shadow', '0 2rem 4rem rgba(0,0,0,.5)');                        
                        $(targetChild[i]).on('webkitAnimationEnd',function(){                            
                            $(targetChild[i]).css('visiblity','visible');                 
                            $(targetChild[i]).css('box-shadow', 'none');                                                      
                        });
                   }, i * 100);     
                }                               
                observer.disconnect();
            }            
        });
    });
    const showAllGrid = document.querySelector('.showcase__show-all__grid');    
    io.observe(showAllGrid);
    

    /*
    ** **
    ** ** * NAVIGATION
    ** **
    */
    $('#nav-btn').prop('checked', false);
    $('.container').on('click',function(e){
        oe = e.originalEvent.target;
        if(oe.getAttribute('class') == 'navigation' || $(oe).parents().hasClass('navigation')){  
            if(oe.getAttribute('class') == 'nav-btn' || $(oe).parents().hasClass('nav-btn')){
                $('#nav-btn').prop('checked', statusCheckbox);
                statusCheckbox == true ? statusCheckbox = false : statusCheckbox = true;
            }
        }else{
            $('#nav-btn').prop('checked', false);
            statusCheckbox = true;
        }
    });

    
    /*
    ** **
    ** ** * INTRO SECTION ANIMATIONS
    ** **
    */
    var bpMedium = window.matchMedia("(max-width: 50rem)")
    if(!bpMedium.matches){
        //Book Starting Animation
        $('.intro__left').on('webkitAnimationEnd',function(){           
            $('.animateBox').addClass('animBox'); 
            $('.animateBox').on('webkitAnimationEnd',function(){
                $('span.animateText').css('visibility', 'visible');        
                $('span.animateText').addClass('animText'); 
            });
        });    
        $('.intro__left').on('webkitAnimationEnd',function(){              
        });
    }else{
        $('span.animateText').css('visibility', 'visible');    
    } 


    /*
    ** **
    ** ** * CONTACT FORM
    ** **
    */
    $('.contact__form').on('submit',function(e){
        e.preventDefault();
        var email = $('.contact__form__input-email').val();
        var subject = $('.contact__form__input-text').val();
        var emailBody = $('.contact__form__input-message').val();        
        window.location = 'mailto:' + 'sadaqat.dahani2013@gmail.com' + '?subject=' + subject + '&body=' +   emailBody;           
        $('.contact__form__input-email').val('')
        $('.contact__form__input-text').val('')
        $('.contact__form__input-message').val('');
    });        


    /*
    ** **
    ** ** * ACTIVE NAV LINK
    ** **
    */
    //Throttling Window Scroll
    var scrollTimeout;
    var throttle = 350;    

    // const ioNavActive = new IntersectionObserver((entries, obsrerver)=>{
    //     entries.forEach(entry=>{            
    //         if(isInView(entry.target)){            
    //             console.log(entry.target.getAttribute('id'));
    //             const navItemActive = document.querySelector('.nav__list__item-active');
    //             if(navItemActive != null) navItemActive.classList.remove('nav__list__item-active');

    //             const navItemUnactive = document.querySelector(`.nav__link[href="#${entry.target.getAttribute('id')}"]`).parentElement;
    //             navItemUnactive.classList.add('nav__list__item-active');                
    //         }
    //     });      
    // });
    const navLinks = document.querySelectorAll('#INTRODUCTION, #SERVICES, #WORK, #ABOUT-ME, #CONTACT');
    // navLinks.forEach(currLink=>{
    //     ioNavActive.observe(currLink);
    // });

    $(window).on('scroll', function () {        
        if (!scrollTimeout) {            
            scrollTimeout = setTimeout(function () {                
                
                //Add Active Link If Section Is In View
                navLinks.forEach(currLink=>{                    
                    if(isInView(currLink)){
                        const navItemActive = document.querySelector('.nav__list__item-active');
                        if(navItemActive != null) navItemActive.classList.remove('nav__list__item-active');

                        const navItemUnactive = document.querySelector(`.nav__link[href="#${currLink.getAttribute('id')}"]`).parentElement;
                        navItemUnactive.classList.add('nav__list__item-active');                                        
                    }
                });

                scrollTimeout = null;
            }, throttle);
        }        
    });

    /*
    ** **
    ** ** * LightboxResize
    ** **
    */   
    let lightboxResize;    
    $(window).on('resize',function(){
            clearTimeout(lightboxResize);
            lightboxResize = window.setTimeout(function(){
            //Resize Lightbox
            Sliders.forEach(curr=>{
                curr.resize();
                
            });            
        },300);
    });
    
    /*
    ** **
    ** ** * WINDOW RESIZE & SCROLL EVENT
    ** **
    */    
    $(window).on('resize scroll',function(){              

        //Remove animations for smaller devices
        if(!bpMedium.matches){                        

            /*
            ** **
            ** ** * INTRO SECTION ANIMATIONS
            ** **
            */
            //Book Animation - adds and removes book classes on scroll
            var bookLeft = $('.intro__left');
            var bookRight = $('.intro__right');
            if(window.scrollY <= 0){
                bookLeft.addClass('left-book');
                bookRight.addClass('right-book');
            }else{        
                bookLeft.removeClass('left-book');
                bookRight.removeClass('right-book');
            }            
            //Book Animation - Moves left and right book to up and down respectively        
            $('.intro__left').css("margin-top", Math.max(7 - 0.1*window.scrollY, -100) + "vh");            
            $('.intro__right').css("margin-top", Math.min(7 + 0.1*window.scrollY, 100)  + "vh"); 
            //Book Animation - Decreases/Increases opacity on scroll
            $('.intro__left,.intro__right').css("opacity", Math.max(1 - .002*window.scrollY, 0));
            //Book inner elements - Moves them up and down on scroll
            $('.intro__wrap').css("top", Math.min(50 + 0.03*window.scrollY, 100) + "%");                               
            // $('.intro__right__img').css("top", Math.max(50 - 0.03*window.scrollY, -100) + "%");


            /*
            ** **
            ** ** * SKILLS SECTION ANIMATIONS
            ** **
            */
            //Checks if skills is visible
            if(this.isInView('.skills')){
                // New Start for ScrollY for New Section
                // var skillsStart = window.scrollY - $('.skills').offset().top;
                // //Text Animation - Moves left and right on scroll
                // $('.skills__top, .skills__bottom').css("margin-left", Math.min(0 + 0.2*skillsStart, 20*5) + "px");
                // $('.skills__mid').css("margin-left", Math.max(0 - 0.2*skillsStart, -20*5) + "px");                        
            }
            

            /*
            ** **
            ** ** ==> SHOWCASE SECTION ANIMATIONS <==
            ** **
            */
            //Top showcase animations
            var topShowcase = $('.showcase__flexbox-top');
            if(this.isInView(topShowcase)){

                var topStart = window.scrollY - topShowcase.offset().top;        
                var scaleImg = Math.min(Math.max(0 - 0.002*topStart, 1),1.6);                
                $('.showcase__flexbox__left__imgbox__img').first().css("transform","scale3d("+scaleImg+","+ scaleImg +",1)");             

            }
            //Bottom showcase animations
            var botShowcase = $('.showcase__flexbox-bot');
            if(this.isInView(botShowcase)){

                var botStart = window.scrollY - botShowcase.offset().top;        
                var scaleImg = Math.min(Math.max(0 - 0.002*botStart, 1),1.6);                
                $('.showcase__flexbox__left__imgbox__img').last().css("transform","scale3d("+scaleImg+","+ scaleImg +",1)");             

            }
            //Top showcase textbox animation
            var showcaseTopText = $('.right-textbox-top');
            if(this.isInView(showcaseTopText)){               
                    $('.right-textbox-top .showcase__flexbox__right__textbox').addClass('animFadeInShowcase');                        
            }
            if(!this.isInView(showcaseTopText)){
                    $('.right-textbox-top .showcase__flexbox__right__textbox').removeClass('animFadeInShowcase');                        
            }
            //Bot showcase textbox animation
            var showcaseBotText = $('.right-textbox-bot');
            if(this.isInView(showcaseBotText)){                                                                 
                    $('.right-textbox-bot .showcase__flexbox__right__textbox').addClass('animFadeInShowcase');                        
            }
            if(!this.isInView(showcaseBotText)){                                                                 
                    $('.right-textbox-bot .showcase__flexbox__right__textbox').removeClass('animFadeInShowcase');                        
            }       

            //All Work Text Animation
            var showAll = $('.showcase__show-all');
            if(this.isInView(showAll)){
                // New Start for ScrollY for New Section
                var showAllStart = window.scrollY - showAll.offset().top;        
                //Opacity and Scale Animations        
                $('.showcase__show-all__heading').css("opacity", Math.min(1.4 + .002*showAllStart, 1));
                var scaleText = Math.min(Math.max(0 - 0.002*showAllStart, 1),1.6);      
                $('.showcase__show-all__heading').css("transform","scale3d("+scaleText+","+ scaleText +",1)");        
            }           

        } else{            

            /*
            ** **
            ** ** * REMOVE ALL ANIMATIONS ON SMALLER SCREENS
            ** **
            */
            //Introduction - Defaults       
            $('.intro__left').css("margin-top", '5vh');            
            $('.intro__right').css("margin-top",  '');             
            $('.intro__left, .intro__right').css("opacity", 1);            
            $('.intro__wrap, .intro__right__img').css("top", '');                                           

            //Skills - Defaults
            $('.skills__top, .skills__bottom').css("margin-left", '');
            $('.skills__mid').css("margin-left", '');   
            
            //Showcase - Defaults
            $('.showcase__flexbox__left__imgbox__img').css("transform","scale3d(1,1,1)"); 
            
            //MoreWork - Defaults
            $('.showcase__show-all__heading').css("opacity",'1');            
            $('.showcase__show-all__heading').css("transform","scale3d(1,1,1)");                                           
        }                                               
     });      
     var top = $(window).scrollTop();
     $("html, body").animate({scrollTop: top+1},'fast');        
     $("html, body").animate({scrollTop: top-1},'fast');
});




//Checks if an element is currently in viewport
var isInView = function(el){
    var offsetTop = $(el).offset().top + 100;        
    var offsetBot = offsetTop + $(el).outerHeight();        

    var viewportTop = $(window).scrollTop();
    var viewportBot = viewportTop + $(window).height();
    
    return offsetBot > viewportTop && offsetTop < viewportBot;
        
}