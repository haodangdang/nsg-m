var main = {
	gameSwiper: null,
	init: function () {
		this.bind();
		// this.initHero();
		this.initFeature();
		// this.initHomePlayBtn();
	},
	initHomePlayBtn: function () {
		var player = new SVGA.Player('#homePlay');
		var parser = new SVGA.Parser('#homePlay'); 
		parser.load('./svga/playbtn.svga', function(videoItem) {
		    player.setVideoItem(videoItem);
		    player.startAnimation();
		})
	},
	initHero: function () {
		// var heroSwiper = new Swiper ('.hero_list', {
		//     autoplay: {
	 //            delay: 5000,
	 //            disableOnInteraction: false
	 //        },
	 //        loop: true,
	 //        centeredSlides: true,
	 //        spaceBetween: 0,
	 //        slidesPerView: "auto",
	 //        speed: 1000,
	 //        touchStartForcePreventDefault : false,
	 //        mousewheel: false,
	 //        mousewheel: {
	 //            forceToAxis: true,
	 //        },
	 //        loopedSlides: 5
		// }); 
		var heroHeadSwiper = new Swiper ('.hero_head', {
		    loop: true,
	        slideToClickedSlide: true,
	        spaceBetween: 45,
	        speed: 800,
	        slidesPerView: "auto",
	        centeredSlides: true,
	        effect : 'coverflow',
	        coverflowEffect: {
	            rotate: 0,
	            stretch: 10,
	            depth: 10,
	            modifier: 1,
	            slideShadows: false
	        },
	        loopedSlides: 5,
	        grabCursor: true,
		}); 
		// heroSwiper.controller.control = heroHeadSwiper;
	 //    heroHeadSwiper.controller.control = heroSwiper;
	},
	initFeature: function () {
		this.gameSwiper = new Swiper('.feature_list', {
		    autoplay: {
		        delay: 5000,
		        disableOnInteraction: false
		    },
		    loop: true,
		    on: {
	        	slideChange: function (swiper) {
	        		$('.feature_title_item').removeClass('active');
	        		$('.feature_title_item').eq(this.realIndex).addClass('active');
	            }
	        }
		});
	},
	bind: function () {
		var self = this;
		$('.feature_title_item').on('click', function () {
			self.gameSwiper.slideTo($(this).index() + 1, 500, true);
		})
	},
}
main.init();



