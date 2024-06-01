window.awe = window.awe || {};
awe.init = function () {
	awe.showPopup();
	awe.hidePopup();	
};
$(document).ready(function ($) {

	"use strict";
	awe_owl();
	awe_backtotop();
	awe_category();
	awe_menumobile();
	awe_tab();
	awe_tab_2();
	awe_lazyloadImage();
	$('.header-main .time').each(function(e){
		awe_countDown2($(this));
	});

	$('[data-toggle="tooltip"]').tooltip();
	/*Time product_grid_office*/
	$('.wrapitem_deal').each(function(e){
		awe_countDown2($(this));
	});
	/*time details deal*/
	$('.times').each(function(e){
		awe_countDown($(this));
	});
	dm_click();
});

$(document).ready(function ($) {
	setTimeout(function(){
		$('.mm-menu').removeClass('');
		awe_owl();
	},500);

});

$(document).on('click','.overlay, .close-popup, .btn-continue, .fancybox-close', function() {   
	hidePopup('.awe-popup'); 	
	setTimeout(function(){
		$('.loading').removeClass('loaded-content');
	},500);
	return false;
})

/********************************************************
# LAZY LOAD
********************************************************/
function awe_lazyloadImage() {
	var ll = new LazyLoad({
		elements_selector: ".lazyload",
		load_delay: 100,
		threshold: 0
	});
} window.awe_lazyloadImage=awe_lazyloadImage;


/********************************************************
# SHOW NOITICE
********************************************************/
function awe_showNoitice(selector) {
	$(selector).animate({right: '0'}, 500);
	setTimeout(function() {
		$(selector).animate({right: '-300px'}, 500);
	}, 3500);
}  window.awe_showNoitice=awe_showNoitice;

/********************************************************
# SHOW LOADING
********************************************************/
function awe_showLoading(selector) {
	var loading = $('.loader').html();
	$(selector).addClass("loading").append(loading); 
}  window.awe_showLoading=awe_showLoading;

/********************************************************
# HIDE LOADING
********************************************************/
function awe_hideLoading(selector) {
	$(selector).removeClass("loading"); 
	$(selector + ' .loading-icon').remove();
}  window.awe_hideLoading=awe_hideLoading;

/********************************************************
# SHOW POPUP
********************************************************/
function awe_showPopup(selector) {
	$(selector).addClass('active');
}  window.awe_showPopup=awe_showPopup;

/********************************************************
# HIDE POPUP
********************************************************/

function awe_hidePopup(selector) {
	$(selector).removeClass('active');
}  window.awe_hidePopup=awe_hidePopup;
/********************************************************
# HIDE POPUP
********************************************************/
awe.hidePopup = function (selector) {
	$(selector).removeClass('active');
}


/************************************************/
$(document).on('click','.overlay, .close-popup, .btn-continue, .fancybox-close', function() {   
	awe.hidePopup('.awe-popup'); 
	setTimeout(function(){
		$('.loading').removeClass('loaded-content');
	},500);
	return false;
})

/*Double click go to link menu*/
var wDWs = $(window).width();
if (wDWs < 1199) {
	$('.ul_menu li:has(ul)' ).doubleTapToGo();
	$('.item_big li:has(ul)' ).doubleTapToGo();

	$('.searchion').click(function(e){
		if ($('.searchmini').hasClass('show')) {
			$('.searchmini').removeClass('show');
		}else {
			$('.searchmini').removeClass('show');
		}
	});
	$('.group_accout').click(function(e){
		if ($('.groupc').hasClass('show')) {
			$('.groupc').removeClass('show');
		}else {
			$('.groupc').removeClass('show');
		}
	});
}

/********************************************************
# CONVERT VIETNAMESE
********************************************************/
function awe_convertVietnamese(str) { 
	str= str.toLowerCase();
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
	str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
	str= str.replace(/đ/g,"d"); 
	str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
	str= str.replace(/-+-/g,"-");
	str= str.replace(/^\-+|\-+$/g,""); 
	return str; 
} window.awe_convertVietnamese=awe_convertVietnamese;


/********************************************************
# SIDEBAR CATEOGRY
********************************************************/
function awe_category(){

	$('.nav-category .fa-angle-right').click(function(e){
		$(this).parent().toggleClass('active');
	});
	$('.nav-category .fa-angle-down').click(function(e){
		$(this).parent().toggleClass('active');
	});
} window.awe_category=awe_category;

$('.hs-submit').click(function(e){

	var a = $('.group_a input').val()+ '%20AND%20';
	if($('.group_a input').val() ==""){
		a = "";
	}
	var b = $('.ab select').val();
	var c = $('.abs select').val();
	window.location.href = '/search?query='+a+'product_type:('+b+')vendor:('+c+')';
});

/********************************************************
Search header
********************************************************/
$('body').click(function(event) {
	if (!$(event.target).closest('.collection-selector').length) {
		$('.list_search').css('display','none');
	};
});
/* top search */

$('.search_text').click(function(){
	$(this).next().slideToggle(200);
	$('.list_search').show();
})

/********************************************************
# MENU MOBILE
********************************************************/
function awe_menumobile(){
	$('.menu-bar').click(function(e){
		e.preventDefault();
		$('#nav').toggleClass('open');
	});
	$('#nav .fa').click(function(e){		
		e.preventDefault();
		$(this).parent().parent().toggleClass('open');
	});
} window.awe_menumobile=awe_menumobile;

/********************************************************
# ACCORDION
********************************************************/
function awe_accordion(){
	$('.accordion .nav-link').click(function(e){
		e.preventDefault;
		$(this).parent().toggleClass('active');
	})
} window.awe_accordion=awe_accordion;

/********************************************************
# OWL CAROUSEL
********************************************************/
function awe_owl() { 
	$('.owl-carousel:not(.not-aweowl)').each( function(){
		var xs_item = $(this).attr('data-xs-items');
		var md_item = $(this).attr('data-md-items');
		var lg_item = $(this).attr('data-lg-items');
		var sm_item = $(this).attr('data-sm-items');	
		var margin=$(this).attr('data-margin');
		var dot=$(this).attr('data-dot');
		var nav=$(this).attr('data-nav');
		var height=$(this).attr('data-height');
		var play=$(this).attr('data-play');
		var loop=$(this).attr('data-loop');
		if (typeof margin !== typeof undefined && margin !== false) {    
		} else{
			margin = 30;
		}
		if (typeof xs_item !== typeof undefined && xs_item !== false) {    
		} else{
			xs_item = 1;
		}
		if (typeof sm_item !== typeof undefined && sm_item !== false) {    

		} else{
			sm_item = 3;
		}	
		if (typeof md_item !== typeof undefined && md_item !== false) {    
		} else{
			md_item = 3;
		}
		if (typeof lg_item !== typeof undefined && lg_item !== false) {    
		} else{
			lg_item = 3;
		}
		if (typeof dot !== typeof undefined && dot !== true) {   
			dot= true;
		} else{
			dot = false;
		}
		$(this).owlCarousel({
			loop:false,
			margin:Number(margin),
			responsiveClass:true,
			dots:dot,
			nav:nav,
			autoplay:true,
			autoHeight: false,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			responsive:{
				0:{
					items:Number(xs_item)				
				},
				600:{
					items:Number(sm_item)				
				},
				1000:{
					items:Number(md_item)				
				},
				1200:{
					items:Number(lg_item)				
				}
			}
		})
	})
} window.awe_owl=awe_owl;

/*OWL KHUYẾN MÃI GIÁ SỐC*/
$(document).ready(function (){
	$('.owl_sale_shock').owlCarousel({
		loop:false,
		margin:30,
		responsiveClass:true,
		items: 6,
		dots:false,
		nav:true,
		responsive:{
			0:{
				items:2,
				autoHeight: true,
				nav:false
			},
			600:{
				items:2,
				autoHeight: true,
				nav:false
			},
			768:{
				items:3,
				nav:false,
				autoHeight: true,
				loop: false
			},
			992: {
				items:3,
				loop: false
			},
			1024: {
				items:4,
				loop: false
			},
			1200:{
				items:4,
				nav:true,
				loop:false
			}
		}
	});
});
/*OWL SERVICE*/
$(document).ready(function (){
	$(".service_content_h").owlCarousel({
		navigation : false,
		nav: false,
		items: 3,
		navigationPage: false,
		navigationText : false,
		slideSpeed : 1000,
		pagination : true,
		dots: false,
		margin: 15,
		loop: false,
		responsive: {
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1200: {
				items: 3
			}
		}
	});
});
/*OWL MODULE CATEGORY*/
$(document).ready(function (){
	var wDW = $(window).width();
	if (wDW > 767) {
		$(".owl-cate").owlCarousel({
			navigation : false,
			nav: false,
			items: 8,
			navigationPage: false,
			navigationText : false,
			slideSpeed : 1000,
			pagination : true,
			dots: false,
			margin: 25,
			loop: false,
			responsive: {
				768: {
					items: 2
				},
				992: {
					items: 3
				},
				1200: {
					items: 4
				}
			}
		});
	}
});
/* OWL SLIDER */
$(document).ready(function (){
	$('.home-slider').owlCarousel({
		loop:true,
		margin:0,
		responsiveClass:true,
		items: 1,
		slideSpeed : 1000,
		dots:false,
		autoHeight:false,
		autoplay:false,
		autoplayTimeout:false,
		autoplayHoverPause:true,
		nav:false,
		responsive:{
			0:{
				items:1,
				nav:false
			},
			600:{
				items:1,
				nav:false
			},
			992: {
				items:1,
				nav: false
			},
			1200:{
				items:1,
				nav:false,
				loop:true
			}
		}
	});
});
/*OWL TAB SP MỚI*/
$(document).ready(function (){
	var wDW = $(window).width();
	if (wDW < 767) {
		$(".product_sale").owlCarousel({
			navigation : true,
			nav: true,
			items:1,
			navigationPage: false,
			navigationText : false,
			slideSpeed : 1000,
			pagination : true,
			dots: false,
			margin: 10,
			autoHeight:false,
			autoplay:false,
			autoplayTimeout:false,
			autoplayHoverPause:true,
			loop: false,
			responsive: {
				0: {
					items: 1
				},
				320: {
					items: 1
				},
				543: {
					items: 1
				}
			}
		});
	}
});
/* OWL SP NỔI BẬT */
$(document).ready(function (){
	$(".brand_content").owlCarousel({
		navigation : true,
		nav: true,
		items:5,
		navigationPage: false,
		navigationText : false,
		slideSpeed : 1000,
		pagination : true,
		dots: false,
		margin: 30,
		loop: false,
		responsive: {
			0:{
				items:2,
				nav:false,
				loop: false
			},
			600:{
				items:2,
				nav:false,
				loop: false
			},
			768:{
				items:4,
				nav:false,
				loop: false
			},
			992: {
				items:3,
				loop: false
			},
			1024: {
				items:4,
				loop: false
			},
			1200:{
				items:6,
				nav:false,
			}
		}
	});
});

/*OWL single item index**/


/********************************************************
BANNER FIXED TOP
********************************************************/
/*sticke*/

$(window).on("load resize",function(){
	if(jQuery(window).width() >= 1367){
		if(jQuery(window).width() < 1600){
			var a = (($(window).width() - $('.container').width())/2);
			var b = ((a*90)/100);
			$('.banner_').css('width', b);
		}	
		if ($('.banner_fixed_index_1, .banner_fixed_index_2').length) {
			backToTop = function () {
				var min_height = $('.header').height(),
					awe_section_1 = $('.awe-section-1').height(),
					height_banner = $('.banner_').height(),
					footer_height = $('.footer').height(),
					toal_height_1 = $('.footer').offset().top;
				if ( $('.footer').offset().top <= ($('.banner_').offset().top +$('.banner_').height())){
					$('.banner_fixed_index_1, .banner_fixed_index_2').removeClass('show');
				} else {
					if ($(this).scrollTop() >= min_height + awe_section_1){
						$('.banner_fixed_index_1, .banner_fixed_index_2').addClass('show');
					}
					else {
						$('.banner_fixed_index_1, .banner_fixed_index_2').removeClass('show');
					}
				}
			};
			backToTop();
			$(window).on('scroll', function () {
				backToTop();
			});
		}
		if ($('.banner_fixed_1, .banner_fixed_2').length) {

			backToTop = function () {
				var min_height = $('.header').height(),
					height_banner = $('.banner_').height(),
					footer_height = $('.footer').height(),
					wrap_main_height = $('.wrap_main').height(),
					bread_crumb_height = $('.bread-crumb').height(),
					toal_height_1 = $('.footer').offset().top;

				if ( $('.footer').offset().top <= ($('.banner_').offset().top +$('.banner_').height())){
					$('.banner_fixed_1, .banner_fixed_2').removeClass('show');
				} else {
					if ($(this).scrollTop() >= min_height + wrap_main_height + bread_crumb_height){
						$('.banner_fixed_1, .banner_fixed_2').addClass('show');
					}
					else {
						$('.banner_fixed_1, .banner_fixed_2').removeClass('show');
					}
				}
			};
			backToTop();
			$(window).on('scroll', function () {
				backToTop();
			});
		}
	}
});


/********************************************************
# BACKTOTOP
********************************************************/
function awe_backtotop() { 
	/* Back to top */
	if ($('.backtop').length) {
		var scrollTrigger = 100, // px
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('.backtop').addClass('show');
				} else {
					$('.backtop').removeClass('show');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('.backtop').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
} window.awe_backtotop=awe_backtotop;

/********************************************************
# Tab
********************************************************/
function awe_tab() {
	$(".e-tabs:not(.not-dqtab)").each( function(){
		$(this).find('.tabs-title li:first-child').addClass('current');
		$(this).find('.tab-content').first().addClass('current');

		$(this).find('.tabs-title li').click(function(){
			var tab_id = $(this).attr('data-tab');
			var url = $(this).attr('data-url');
			$(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);
			$(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
			$(this).closest('.e-tabs').find('.tab-content').removeClass('current');
			$(this).addClass('current');
			$(this).closest('.e-tabs').find("#"+tab_id).addClass('current');
		});    
	});
} window.awe_tab=awe_tab;

function awe_tab_2() {
	$(".service-tabs:not(.not-dqtab)").each( function(){
		$(this).find('.tabs-title li:first-child').addClass('current');
		$(this).find('.tab-content').first().addClass('current');
		$(this).find('.tabs-title li').click(function(){
			var tab_id = $(this).attr('data-tab');
			var url = $(this).attr('data-url');
			$(this).closest('.e-tabs').find('.tab-viewall').attr('href',url);
			$(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
			$(this).closest('.e-tabs').find('.tab-content').removeClass('current');
			$(this).addClass('current');
			$(this).closest('.e-tabs').find("#"+tab_id).addClass('current');
		});    
	});
} window.awe_tab_2=awe_tab_2;


/*Open filter*/
$('.open-filters').click(function(e){
	e.stopPropagation();
	$(this).toggleClass('openf');
	$('.dqdt-sidebar').toggleClass('openf');
});
/********************************************************
# DROPDOWN
********************************************************/
$('.dropdown-toggle').click(function() {
	$(this).parent().toggleClass('open'); 	
}); 
$('.btn-close').click(function() {
	$(this).parents('.dropdown').toggleClass('open');
}); 
$('body').click(function(event) {
	if (!$(event.target).closest('.dropdown').length) {
		$('.dropdown').removeClass('open');
	};
});

/*Bắt lỗi điền giá trị âm pop cart*/
$(document).on('keydown','#qty, .number-sidebar',function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
/* Cong tru product detaile*/

$(document).on('click','.qtyplus',function(e){
	e.preventDefault();   
	fieldName = $(this).attr('data-field'); 
	var currentVal = parseInt($('input[data-field='+fieldName+']').val());
	if (!isNaN(currentVal)) { 
		$('input[data-field='+fieldName+']').val(currentVal + 1);
	} else {
		$('input[data-field='+fieldName+']').val(0);
	}
});

$(document).on('click','.qtyminus',function(e){
	e.preventDefault(); 
	fieldName = $(this).attr('data-field');
	var currentVal = parseInt($('input[data-field='+fieldName+']').val());
	if (!isNaN(currentVal) && currentVal > 1) {          
		$('input[data-field='+fieldName+']').val(currentVal - 1);
	} else {
		$('input[data-field='+fieldName+']').val(1);
	}
});

$(document).ready(function() {
	$('.btn-wrap').click(function(e){
		$(this).parent().slideToggle('fast');
	});



	/*fix menu sub*/
	jQuery("#nav li.level0 li").mouseover(function(){
		if(jQuery(window).width() >= 740){
			jQuery(this).children('ul').css({top:0,left:"158px"});
			var offset = jQuery(this).offset();
			if(offset && (jQuery(window).width() < offset.left+300)){
				jQuery(this).children('ul').removeClass("right-sub");
				jQuery(this).children('ul').addClass("left-sub");
				jQuery(this).children('ul').css({top:0,left:"-158px"});
			} else {
				jQuery(this).children('ul').removeClass("left-sub");
				jQuery(this).children('ul').addClass("right-sub");
			}
			jQuery(this).children('ul').fadeIn(100);
		}
	}).mouseleave(function(){
		if(jQuery(window).width() >= 740){
			jQuery(this).children('ul').fadeOut(100);
		}
	});
});

/*FIx brand*/
$(window).on("load resize",function(){
	$(".content_category .item").each(function() {
		var num = $(this).find('.title_cate a >span').text();
		if ($.isNumeric(num)) {
			$(this).find('.title_cate a >span').addClass('numb').html('('+num+')');
		} else {
			$(this).find('.title_cate a >span').addClass('noNumb');
		}
	});
});

/**************************************************
Silick Slider
**************************************************/

$(document).ready(function(){
	var wDW = $(window).width();
	if (wDW > 1200) {

		$('#gallery_01').addClass('show');
		$('#gallery_01_qv').addClass('show');
	}

	$('.gallery_prdloop .item a.img-body').click(function(){		
		var link = $(this).attr('data-image');
		$('.large-image-1 a>img').attr('src', link);
	});


});


jQuery(document).ready(function(){
	if( $('.cd-stretchy-nav').length > 0 ) {
		var stretchyNavs = $('.cd-stretchy-nav');

		stretchyNavs.each(function(){
			var stretchyNav = $(this),
				stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');

			stretchyNavTrigger.on('click', function(event){
				event.preventDefault();
				stretchyNav.toggleClass('nav-is-visible');
			});
		});

		$(document).on('click', function(event){
			( !$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span') ) && stretchyNavs.removeClass('nav-is-visible');
		});
	}
});

/* Js Hover icon service*/
$(function() {
	$(".service-item")
		.mouseover(function() { 
		var src = $(this).find('.media a img').attr("data-src");
		var imgurl = $(this).find('.media a img');
		$(imgurl).attr("src", src);
	})
		.mouseout(function() {
		var src = $(this).find('.media a img').attr("longdesc");
		var imgurl = $(this).find('.media a img');
		$(imgurl).attr("src", src);
	});
});

/*MENU MOBILE*/

$('.menu-bar-h').click(function(e){
	e.stopPropagation();
	$('.menu_mobile').toggleClass('open_sidebar_menu');
	$('.opacity_menu').toggleClass('open_opacity');
});
$('.opacity_menu').click(function(e){
	$('.menu_mobile').removeClass('open_sidebar_menu');
	$('.opacity_menu').removeClass('open_opacity');
});
$('.ct-mobile li .ti-plus').click(function() {
	$(this).closest('li').find('> .sub-menu').slideToggle("fast");
	$(this).closest('i').toggleClass('show_open hide_close');
	return false;              
});
$('.ct-mobile li .ti-plus-2').click(function() {
	$(this).closest('li').find('> .sub-menu').slideToggle("fast");
	$(this).closest('i').toggleClass('show_open_2 hide_close_2');
	return false; 
});

$(document).ready(function(){



	$("body header .topbar .login_content").hover(
		function () {
			$("body #menu-overlay").addClass('reveal');
		}, 
		function () {
			$("body #menu-overlay").removeClass("reveal");
		}
	);
});






/*JS CLICK NUT SLIDER HOMEPAGE*/
$(document).ready(function(){
	$('.nav_h').on('click',function(){
			$('.nav_h').removeClass('active');
			$(this).addClass("active");
		
	})
});




/*** FIX POPUP LOGIN / REGISTER ***/
$(document).mouseup(function(e) {
	var container = $("#login_register");
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.fadeOut();
		$('#login_register').modal('hide');
	}
});


/*hover get image thumb product item grid*/
function owl_thumb_image() { 
	$('.product_image_list').owlCarousel({
		loop:false,
		margin:5,
		responsiveClass:true,
		items: 3,
		dots:false,
		nav:true,
		responsive:{
			0:{
				items:1,
				nav:true
			},
			600:{
				items:2,
				nav:false
			},
			992: {
				items:2,
			},
			1200:{
				items:3,
				nav:true,
				loop:false
			}
		}
	})
} window.owl_thumb_image=owl_thumb_image;



$(function() {
	$(".owl_product_item_content .saler_item").each(function() {
		var _this = $(this).find('.owl_item_product .product-box');
		var this_thumb = $(_this).find('.product-thumbnail .image_link img');
		var default_this_thumb = $(_this).find('.product-thumbnail .image_link').attr('data-images');
		var this_mini_thumb = $(_this).find('.action_image .owl_image_thumb_item .product_image_list .item_image');
		$(this_mini_thumb)
			.mouseover(function() { 
			var this_s = $(this).attr('data-image');
			this_thumb.attr('src', this_s);
		})
			.mouseout(function() {
			this_thumb.attr('src', default_this_thumb);
		});
	});
});

function hover_thumb_image() {
	$(function() {
		$(".product-col").each(function() {
			var _this = $(this).find('.product-box');
			var this_thumb = $(_this).find('.product-thumbnail .image_link img');
			var default_this_thumb = $(_this).find('.product-thumbnail .image_link').attr('data-images');
			var this_mini_thumb = $(_this).find('.action_image .owl_image_thumb_item .product_image_list .item_image');
			$(this_mini_thumb)
				.mouseover(function() { 
				var this_s = $(this).attr('data-image');
				this_thumb.attr('src', this_s);
			})
				.mouseout(function() {
				this_thumb.attr('src', default_this_thumb);
			});
		});
	});
} window.hover_thumb_image=hover_thumb_image;
/*End*/


/*JS XEM THÊM PRODUCT*/
$(document).ready(function(e){
	$('.btn--view-more').on('click', function(e){
		e.preventDefault();
		var $this = $(this);
		$this.parents('#tab-1').find('.product-well').toggleClass('expanded');
		$(this).toggleClass('active');
		return false;
	});
});


/* JS MODULE SECTION RESPONSIVE */
$('.section_base .btn_menu').on('click', function(e){
	e.preventDefault();
	var $this = $(this);
	$this.parents('.section_base .title_top_menu').find('ul').stop().slideToggle();
	$(this).toggleClass('active')
	return false;
});

/*JS CLICK TÀI KHOẢN RESPONSIVE */
var wDH = $(window).height();
if (wDH < 1199) {
	$('.click_account').click(function(){
		e.preventDefault();
		$this.parents('.login_content').find('.ul_account').stop().slideToggle();

	});
}


/*JS XEM THÊM MENU DANH MỤC SP*/

$('.xemthem').click(function(e){
	e.preventDefault();
	$('ul.ul_menu>li').css('display','block');
	$(this).hide();
	$('.thugon').show();
})
$('.thugon').click(function(e){
	e.preventDefault();
	$('ul.ul_menu>li').css('display','none');
	$(this).hide();
	$('.xemthem').show();

})
$('.ul_menu .lev-1').click(function(e){
	var lil = $('.ul_menu .lev-1').length;
	var divHeight = $('.list_menu_header').height();
	if(lil = 2){
		$('.ul_menu .ul_content_right_1').css('min-height', divHeight);
	}
});



/*HOVER SP HOMEPAGE */
$(document).ready(function(){
	$("body .content_white .button_hover").hover(

		function () {
			$("body .content_item_hover").addClass('content_on');
		}, 
		function () {
			$("body .content_item_hover").removeClass("content_on");
		}
	);
});
$(document).ready(function(){
	$("body .button_hover").hover(
		function () {
			$("body .details-pro").addClass('hidden');
		},
		function () {
			$("body .details-pro").removeClass('hidden');
		}
	);
});
/*Show searchbar*/
$('.header_search').on('hover, mouseover', function() {
	$('.st-default-search-input').focus();
});
$('.showsearchfromtop').click(function(event){
	$('.searchfromtop').slideToggle("fast");
	$('.login_and_register').hide();
});
$('.hidesearchfromtop').click(function(event){
	$('.searchfromtop').slideToggle("up");
});

var wDH = $(window).height();
if (wDH < 1199) {
	$('.use_ico_register').click(function(){
		$('.login_and_register').slideToggle("fast");
		$('.searchfromtop').hide();
	});
}

$(document).ready(function(e){
	$(".section_base").each(function() {
		var a = $(this).find('.dmsp');
		$(this).find('.click_base').click(function (e) {
			$(a).slideToggle("fast");
			e.preventDefault();
		});
	});



});


/*ajax module sidebar*/
var wrap = $('.wrap_item');
function dm_click() {
	var wrap = $('.wrap_item');
	$(".item_click").each(function() {
		var this_wrap = $(this);
		$(this).find('.wrap_content_click').click(function(){
			$(this_wrap).find('.proClose').addClass('active');
			var this_html = $(this_wrap).html();
			var data_html = $('.wrap_item').html();
			var col_item = $(this_wrap).html('<div class="item_click col-lg-3 col-md-6 col-sm-6 col-xs-6">'+this_html+'</div>');

			localStorage.setItem("this_item_html", '<div class="item_click col-lg-3 col-md-6 col-sm-6 col-xs-6">'+this_html+'</div>');
			localStorage.setItem("data_html", data_html);

			$(wrap).html('');
			/*
			$(wrap).append(localStorage.getItem("this_item_html"));
			*/

			var $this2 = $(this),
				tab_id = $this2.attr('data-number'),
				url = $this2.attr('data-url');
			//Nếu đã load rồi thì không load nữa
			$(wrap).html('');
			getContentTab(url);
			localStorage.setItem("count", tab_id);


		});
	});

}window.dm_click=dm_click;

$(document).on('click','.proClose',function(e){

	$(wrap).html('');
	$(wrap).html(localStorage.getItem("data_html"));
	$('.proClose').removeClass('active');
	dm_click();
});


// Get content cho tab
function getContentTab(url,selector){
	url = url+"?view=ajaxload";

	var loadding = '<div class="a-center a-center-loading"><img src="//bizweb.dktcdn.net/100/350/980/themes/939145/assets/rolling.svg?1706000752249"</div>'
	$.ajax({
		type: 'GET',
		url: url,
		beforeSend: function() {
			$(wrap).html(loadding);

		},
		success: function(data) {
			setTimeout(function(){
				var content = $(data);
				var count_position = localStorage.getItem("count");
				$(wrap).html(content.html());
				var index = $(".item_click").eq(count_position - 1 );

				awe_lazyloadImage();
				var data_append = localStorage.getItem("this_item_html");
				if ($(".item_click" ).length > 0) {
					$(wrap).find(".item_click").eq(count_position - 1).before(data_append);
				}else {
					$(wrap).html(data_append);
				}
			},500);

		},
		dataType: "html"
	});
}


/*************get product image***************/

$(document).ready(function(){

	var img_array = $(".tab_content_info .rte pre img").map(function() {
		return $(this).attr("src");
	});
	
	if (img_array.length == 1) {
		for (var i=0; i<img_array.length; i++) {
			$('.img_bg_product .bg1').attr('style', 'background-image:url('+img_array[0]+')');
		}
		for (var i=0; i<img_array.length; i++) {
			console.log(1);
			$('.img_bg_product .bg2').attr('style', 'background-image:url('+img_array[0]+')');
		}
		
	} else if(img_array.length == 2) {
		for (var i=0; i<img_array.length; i++) {
		$('.img_bg_product .bg1').attr('style', 'background-image:url('+img_array[0]+')');
		}
		for (var i=0; i<img_array.length; i++) {
		$('.img_bg_product .bg2').attr('style', 'background-image:url('+img_array[1]+')');
		}
	}else if(img_array.length == 0){
		$('.img_bg_product .bg1').attr("style" , "background-image:url(//bizweb.dktcdn.net/100/350/980/themes/939145/assets/bg_default_pro_1.jpg?1706000752249)");
		$('.img_bg_product .bg2').attr("style" , "background-image:url(//bizweb.dktcdn.net/100/350/980/themes/939145/assets/bg_default_pro_2.jpg?1706000752249)");
	}

});

$(document).ready(function(){
	var wDW = $(window).width();

	/*Click tab danh muc 1*/
	var $this = $('.tab_link_module');
	$this.find('.head-tabs').first().addClass('active');
	$this.find('.content-tab').first().show();
	var title_first = $('.link_tab_check_click li:first-child >a').text();
	$('.title_check_tabs').text(title_first)
	$this.find('.head-tabs').on('click',function(){
		if(!$(this).hasClass('active')){
			$this.find('.head-tabs').removeClass('active');
			var $src_tab = $(this).attr("data-src");
			$this.find($src_tab).addClass("active");
			$this.find(".content-tab").hide();
			var $selected_tab = $(this).attr("href");
			$this.find($selected_tab).show();
		}
		return false;
	})
	$(".button_click_1").click(function(){ 
		$('.ul_link').slideToggle('down');
	});
	if (wDW < 768) {
		var title_first = $('.ul_link li:first-child >a').text();
		$('.title_check_tabs').text(title_first);
		$this.find('.head-tabs').on('click',function(){
			$('.ul_link').slideToggle('up');
			var title_tabs = $(this).text();
			$('.title_check_tabs').text(title_tabs);
		})
	}

});