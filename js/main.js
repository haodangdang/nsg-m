var main = {
	gameSwiper: null,
	gameVideo: null,
	init: function () {
		var self = this;
		self.initDownload();
		self.initPage();
		self.bind();
		self.initHero();
		self.initHeroSize();
		self.initHeroFly();
		self.initFeature();
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
	        		if(this.activeIndex == 2){
	        			self.gameSwiper.slideTo(1);
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
	            delay: 6000,
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
	initHeroFly: function () {
		new particleCanvas(
        "hero_particle",
        [
            {
                // 閺夋劖鏋�
                "type": {
                    "typeName": "image",
					"url": "https://imgs.it2048.cn/nsg/pc/image/fire/2.png"
                },
                // 閺佷即鍣�
                "number": 8,
                // 鐏忓搫顕�
                "size": {
                    "min": 30,
                    "max": 80
                },
                // 闁喎瀹�
                "speed": {
                    "min": 2,
                    "max": 12
                },
                // 閸嬪繒些(鏉╂劕濮�)鐟欐帒瀹�
                "angle": {
                    "value": 160,
                    "float": 10
                },
                // 閺冨娴�
                "rota": {
                    "value": 15,
                    "speed": 0.1,
                    "floatValue": 1,
                    "floatSpeed": 0.2
                },
                "area": {
                    "leftTop": [1300, 100],
                    "rightBottom": [1900, 300]
                },
            },
            {
                // 閺夋劖鏋�
                "type": {
                    "typeName": "image",
					"url": "https://imgs.it2048.cn/nsg/pc/image/fire/1.png"
                },
                // 閺佷即鍣�
                "number": 4,
                // 鐏忓搫顕�
                "size": {
                    "min": 60,
                    "max": 80
                },
                // 闁喎瀹�
                "speed": {
                    "min": 2,
                    "max": 5
                },
                // 閸嬪繒些(鏉╂劕濮�)鐟欐帒瀹�
                "angle": {
                    "value": 160,
                    "float": 5
                },
                // 閺冨娴�
                "rota": {
                    "value": 10,
                    "speed": 0.1,
                    "floatValue": 10,
                    "floatSpeed": 0.3
                },
                "area": {
                    "leftTop": [200, 600],
                    "rightBottom": [500, 1000]
                },
            },
            {
                // 閺夋劖鏋�
                "type": {
                    "typeName": "image",
					"url": "https://imgs.it2048.cn/nsg/pc/image/fire/4.png"
                },
                // 閺佷即鍣�
                "number": 2,
                // 鐏忓搫顕�
                "size": {
                    "min": 360,
                    "max": 380
                },
                // 闁喎瀹�
                "speed": {
                    "min": 5,
                    "max": 7
                },
                // 閸嬪繒些(鏉╂劕濮�)鐟欐帒瀹�
                "angle": {
                    "value": 170,
                    "float": 5
                },
                // 閺冨娴�
                "rota": {
                    "value": 30,
                    "speed": 0.5,
                    "floatValue": 10,
                    "floatSpeed": 0.3
                },
                "area": {
                    "leftTop": [1000, 600],
                    "rightBottom": [1000, 800]
                },
            },
            {
                // 閺夋劖鏋�
                "type": {
                    "typeName": "image",
					"url": "https://imgs.it2048.cn/nsg/pc/image/fire/3.png"
                },
                // 閺佷即鍣�
                "number": 6,
                // 鐏忓搫顕�
                "size": {
                    "min": 10,
                    "max": 30
                },
                // 闁喎瀹�
                "speed": {
                    "min": 2,
                    "max": 4
                },
                // 閸嬪繒些(鏉╂劕濮�)鐟欐帒瀹�
                "angle": {
                    "value": 160,
                    "float": 10
                },
                // 閺冨娴�
                "rota": {
                    "value": 3,
                    "speed": 0.1,
                    "floatValue": 1,
                    "floatSpeed": 0.2
                },
                "area": {
                    "leftTop": [1000, 100],
                    "rightBottom": [1500, 300]
                },
            },
        ]);
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


