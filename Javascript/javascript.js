$(document).ready(function(){    
    var status = true;    
    var statusCheckbox = true;      

    //NAVIGATION OPENING/CLOSING
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

    
    //STARTING INTRO ANIMATION
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


    //Email
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
    ** ** ==> LIGHTBOX <==
    ** **
    */
   var tools = {
       1 : 'Html5',
       2 : 'Css3',
       3 : 'Sass',
       4 : 'Bootstrap',
       5 : 'Javascript',
       6 : 'Jquery',
       7 : 'Php',
       8 : 'Mysql',
       9 : 'Wordpress',
       10: 'Java',
       11: 'MsSql'
   }
    var projects = {
        heading : ['JamesThew','Src Travel','Karnel Travel','Be Creative Ideads','Ryana Calendar','Natours','Trello'],
        skills : [
            [tools[1],tools[2],tools[4],tools[5],tools[6],tools[7],tools[8]],
            [tools[10],tools[11]],
            [tools[1],tools[2],tools[3],tools[5],tools[6],tools[7],tools[8]],
            [tools[1],tools[2]],
            [tools[1],tools[2],tools[5],tools[7],tools[8]],
            [tools[1],tools[2],tools[3],tools[5],tools[7],tools[8]],
            [tools[1],tools[2],tools[3],tools[5],tools[7],tools[8]]            
        ],
        imgs : [
            ['project-1-img-1.png','project-1-img-2.png','project-1-img-3.png','project-1-img-4.png','project-1-img-5.png','project-1-img-6.png','project-1-img-7.png'],
            ['project-2-img-1.png','project-2-img-2.png','project-2-img-3.png','project-2-img-4.png','project-2-img-5.png','project-2-img-6.png'],
            ['project-3-img-1.jpg','project-3-img-2.jpg','project-3-img-3.jpg','project-3-img-4.jpg','project-3-img-5.jpg','project-3-img-6.jpg'],
            ['project-4-img-1.png','project-4-img-2.png'],
            ['project-5-img-1.png','project-5-img-2.png'],
            ['project-6-img-1.png','project-6-img-2.png','project-6-img-3.png'],
            ['project-7-img-1.png','project-7-img-2.png']            
        ],        
        text : [
            'James Thew is one of the famous cook working in one of the five star hotels in the city. He is so famous that the publishers approach him to write recipes book, and provide some of the tips pertaining to the recipes, etc. Also some of the producers want him to work for their recipe shows where he needs to cook two or three recipes of different categories like juices, non-vegetarian and vegetarian recipes, Italian recipes, etc.',
            'Src Travel is a Bus Ticket Reservation System desktop application where company can book tickets and record it\'s customers details very easily and efficiently in this softwares which provides all sorts of task like booking / cancelling tickets, inserting,updating deleting its customer details and employee details, buses they have, routes and routines of buses and much more in it.',
            'Karnel Travels is a Tours and Travels Company which provides the various transportation facilities between the cities like tourist spots, transportation between different cities in the country, also provides accommodations in hotels, etc. Also they provide the online facility where the customers can visit online, view and order for the tours and as well the transportation. Now they want to provide a website, through which they wan to attract the customers. They want to reach out to the customers by providing various information services like the list of tourist spot, information about the various hotels and restaurants, etc. They want the website to be a URL Specific. So they approached us to build a website for them.',
            'An email template beautifully designed with love and passion to give it the best look.',
            'Ryana Calendar is serving its services since 2000. It has an up-dated library of latest calendar and diaries. The choice is exactly made upon the mood of customers.  It completely reflects the ideas, hobbies, and life style of customer. Its moto is encourage business firms to sell their products in a secured environment where they can meet the customer and fulfill their product diaries to make a strong relation',
            'Natours is a tours and travels company that works with top service providers worldwide. We provide our clients with premium travel services including; the latest model vehicles for transfers, expert & well-mannered tour guides throughout the trips, selection of hotels based on high reviews along with quality locations, room sizes, meals and amenities. We have contracted with premium International Restaurants worldwide. We have special discounts with worldwide outlet malls, attractions, theme parks, cruise companies and train organizations in order to provide the finest trips to our customers. In addition to global reach, we are consistently forging and building strategic relationships with some of the most reputable airlines and hotels in order to provide our clients the highest value and service.',
            'Trello is an all in one booking web app that lets you book five star hotels, get tickets of the best and cheapest flight, rent a car and go on tours with your friends and family. Trello is your travel companion, bring it with you wherever you\'re going and you\'ll never be alone again.'
            
        ]        
    };   
    //Open Lightbox
    var stateImg = 0;
    var btnLink = $('.showcase__show-all__grid__link');
    btnLink.on('click',function(e){        
        e.preventDefault();        
        $('.lightbox').slideDown('fast');
        $('.lightbox__content__details__wrap').addClass('fadeUp');
        $('.lightbox__content__details__wrap').on('webkitAnimationEnd',function(){
            $('.lightbox__content__details__wrap').css('opacity',1);
        });
        $('body').css('overflow','hidden');
        var index = this.getAttribute('href')-1;
        $('.lightbox__heading').text(projects.heading[index]);
        var el = '';        
        for(var i = 0; i < projects.skills[index].length; i++){
            el += '<li class="lightbox__list__item">'+ projects.skills[index][i] +'</li> ';                        
        }
        $('.lightbox__list').html(el);           
        var url = projects.imgs[index][0];                       
        $('.lightbox__content__img img.slider').on('load',function(){
            $('.lightbox__wrap').scrollTop(0);                                   
        }).attr('src','Images/'+url);        
        $('.lightbox__content__img img.slider').attr('data-img',index+1);
        stateImg = 0;
        $('.lightbox__text').text(projects.text[index]);    
        
        var pagers = '';
        for(var i = 0; i < projects.imgs[index].length; i++){
            var a = i + 1;
            pagers += ('<li class="lightbox__content__img-slider-pager__list__item">'+ a +'</li> ');
        }
        $('.lightbox__content__img-slider-pager__list').html(pagers);
        $('.lightbox__content__img-slider-pager__list__item:eq(0)').addClass('pager-active');    
        $('.lightbox__content__img-slider-pager__list li').on('click', function(e){
            var index = $(this).text() - 1;
            slideImageHandler(index);
        });                  
    });

    //Lightbox = NEXT / PREVIOUS BUTTON      
    $('.lightbox__content__img__prev-btn').on('click',function(e){                     
        slideImageHandler('prev')        
    });    
    $('.lightbox__content__img__next-btn').on('click',function(){
        slideImageHandler('next')        
    });    

    //Lightbox Slider Handler
    var slideImageHandler = function(action){        
        $('.lightbox__content__img img.slider').fadeOut('slow',function(){
            var data = $('.lightbox__content__img img').on('load',function(){
                $('.lightbox__content__img img').fadeIn('slow');                            
            }).attr('data-img') - 1;                            
            
            var url = '';
            //Next Clicked
            if(action == 'next'){
                if(stateImg == projects.imgs[data].length - 1){
                    stateImg = 0;
                    stateImg--;
                }
                url = projects.imgs[data][++stateImg];     
            }

            //Prev Clicked
            else if(action == 'prev'){
                if(stateImg == 0){
                    stateImg = projects.imgs[data].length - 1;
                    stateImg++;
                }
                url = projects.imgs[data][--stateImg];     
            }

            //Pager Clicked
            else{
                stateImg = action;                
                url = projects.imgs[data][stateImg];     
            }               

            //Change Image Now
            $('.lightbox__content__img img').attr('src','Images/'+url);                                                

            //Pager Active
            $('.pager-active').removeClass('pager-active');
            $('.lightbox__content__img-slider-pager__list__item:eq('+stateImg+')').addClass('pager-active');
        });        
    }
    

    //Close Lightbox    
    $('.lightbox__close, .lightbox__bg').on('click',function(e){
        e.preventDefault();
        $('.lightbox').fadeOut('slow');  
        $('.lightbox__content__details__wrap').css('opacity',0);
        $('body').css('overflow','visible'); 
    });    


    //Throttling Window Scroll
    var scrollTimeout;
    var throttle = 250;    
    $(window).on('scroll', function () {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function () {                

                //ACTIVE NAVIGATION LINK
                var arr = ['#INTRODUCTION','#SERVICES','#WORK','#ABOUT-ME','#CONTACT'];
                var ind = 0;
                for(var i = 0; i < arr.length; i++){                
                    if(isInView( $( arr[i] ) ) ){
                        ind = i;
                    }            
                }    
                $('.nav__list__item').each(function(index, el){
                    if(ind == index){
                        $(el).addClass('nav__list__item-active');
                    }else{
                        $(el).removeClass('nav__list__item-active');
                    }
                });

                scrollTimeout = null;
            }, throttle);
        }        
    });

    //WINDOWS SCROLL EVENT LISTENER
    $(window).on('resize scroll',function(){      

        if(!bpMedium.matches){

            /*
            ** **
            ** ** ==> INTRODUCTION SECTION ANIMATIONS <==
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
            ** ** ==> SKILL SECTION ANIMATIONS <==
            ** **
            */
        //Checks if skills is visible
            if(this.isInView('.skills')){
                // New Start for ScrollY for New Section
                var skillsStart = window.scrollY - $('.skills').offset().top;
                //Text Animation - Moves left and right on scroll
                $('.skills__top, .skills__bottom').css("margin-left", Math.min(0 + 0.2*skillsStart, 20*5) + "px");
                $('.skills__mid').css("margin-left", Math.max(0 - 0.2*skillsStart, -20*5) + "px");                        
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
            
            //LogoBoxex Animation
            var logoBoxex = $('.showcase__show-all__grid');
            if(this.isInView(logoBoxex)){                                
                if(status){
                    $('.anim-in').each(function(ind,el){                                                                                                                    
                        var elem = this;
                        setTimeout(function(){
                            $(elem).addClass('anim-in-animate');                                                          
                            $(elem).css('box-shadow', '0 2rem 4rem rgba(0,0,0,.5)');                        
                            $(elem).on('webkitAnimationEnd',function(){
                                $(elem).css('visiblity','visible');                 
                                $(elem).css('box-shadow', '');                                                      
                            });
                        }, ind * 300);                    
                    });
                    status = false;
                }                
            }

        } else{            
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
    var offsetTop = $(el).offset().top;        
    var offsetBot = offsetTop + $(el).outerHeight();        

    var viewportTop = $(window).scrollTop();
    var viewportBot = viewportTop + $(window).height();
    
    return offsetBot > viewportTop && offsetTop < viewportBot;
        
}
