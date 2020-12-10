var main = {
	gameSwiper: null,
	gameVideo: null,
	init: function () {
		this.initDownload();
		this.initPage();
		this.bind();
		this.initHero();
		this.initHeroSize();
		this.initFeature();
	},
	initDownload: function () {
		var self = this;
		var u = navigator.userAgent,
			isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		if(!isiOS){
			$('.app_download, .download').attr('href', './download.html');
		}else{
			$('.app_download, .download').attr('href', 'javascript:void(0)');
		}
		
	},
	initPage: function () {
		var self = this;
		self.pageSwiper = new Swiper ('.page_warp', {
		    direction: 'vertical',
		    spaceBetween: 0,
        	slidesPerView: 1,
        	mousewheel: true,
        	freeModeSticky : true,
	        on: {
	        	slideChangeTransitionStart: function () {
	        		if(this.activeIndex > 0){
	        			$('.arrow_wrap').hide();
	        		}else {
	        			$('.arrow_wrap').show();
	        		}
	        		$('.nav_item').removeClass('current');
	        		$('.nav_item').eq(this.activeIndex).addClass('current');
	            }
	        }
		}); 
	},
	playGameVideo: function (index) {
		var self = this;
		if(!self.gameVideo){
			self.gameVideo = videojs('game_video',{
				controls : true,
				controlBar: {
					pictureInPictureToggle: false
				}
			});
		}
		
		var data = {
		    src: 'https://imgs.it2048.cn/nsg/common/gamevideo/video'+index+'.mp4',
		    type: 'video/mp4'
		};
		self.gameVideo.pause();
		self.gameVideo.src(data);
		self.gameVideo.load(data);
		self.gameVideo.play();
		$('.video_modal').show();
	},
	initHeroSize: function () {
		var sh = document.body.clientHeight;
		var h = 736;
		if(sh < h){
			var scale = sh/h;
			var moveX = 50 / scale;
			var dom = document.querySelectorAll('.hero_box_item');
			for (i = 0; i < dom.length; i++) {
				dom[i].style.transform =  `scale(${scale})`;
			}
		}
		
	},
	initHero: function () {
		var heroSwiper = new Swiper ('.hero_list', {
		    autoplay: {
	            delay: 600000,
	            disableOnInteraction: false
	        },
	        loop: true,
	        centeredSlides: true,
	        spaceBetween: 0,
	        slidesPerView: "auto",
	        speed: 1000,
	        touchStartForcePreventDefault : false,
	        mousewheel: false,
	        mousewheel: {
	            forceToAxis: true,
	        },
	        loopedSlides: 5
		}); 
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
		heroSwiper.controller.control = heroHeadSwiper;
	    heroHeadSwiper.controller.control = heroSwiper;
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
		});
		$('.app_download, .download').on('click', function () {
			self.showDownloadModal();
		});
		$('.cancel_download').on('click', function () {
			self.hideDownloadModal();
		});
		$('.video_btn').on('click', function () {
			var id = $(this).data('id');
			self.playGameVideo(id);
		});
		$('.close_video').on('click', function () {
			self.gameVideo.pause();
			$('.video_modal').hide();
		})
	},
	isWeixin: function () {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_'){
		 	return true;
		} else{
		  	return false;
		}
	},
	showDownloadModal: function () {
		$('.download_modal').fadeIn();
		setTimeout(function () {
			$('.download_modal').fadeOut();
		},2000)
	},
	hideDownloadModal: function () {
		$('.download_modal').hide();
	}
}
main.init();



