
// $.cookie
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options);
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else { date = options.expires; }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

// update track status in page
var fav = '';
var tracked = '';

// check email
function chkMail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// check mobile 
function chkMobile(phone) {
    var pattern = /^09[0-9]{8}$/;
    return pattern.test(phone);
}

// get member
var member_ID = '';

function getMemberProfile(member) {
    if (member.email)
        $('#match_dialog input[name="email"]').val(member.email);
    if (member.member_ID)
        member_ID = member.member_ID;
}

// rema's map
var map_rema;

function initialize_map_rema() {
    var lat = $("#item_map_lat").val(),
        lng = $("#item_map_lng").val();
    map_rema = new google.maps.Map(document.getElementById('item_map'), {
        zoom: 15,
        center: new google.maps.LatLng(lat, lng),
        scaleControl: true
    });
    var marker_foreign = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map_rema
    });
}

// foreign's map
var map_foreign;

function initialize_map_foreign() {
    var lat = $("#item_map_lat").val(),
        lng = $("#item_map_lng").val();
    map_foreign = new google.maps.Map(document.getElementById('item_map'), {
        zoom: 15,
        center: new google.maps.LatLng(lat, lng),
        scaleControl: true
    });
    var marker_foreign = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map_foreign
    });
}
// document ready
$(function() {
    $(window).scroll(function() {

    });
	
	rwd();
		
    // search_type: home, list, mrt, rema, foreign, community, my
    if (search_type) {
        // placeholder
        var search_keyword_placeholder = $('#search_keyword .input_keyword').attr('placeholder');
        $('#search_keyword .input_keyword').val(search_keyword_placeholder).addClass('placeholder');
        $('#search_keyword .input_keyword').focus(function() {
            if ($(this).val() == search_keyword_placeholder) {
                $(this).val('').removeClass('placeholder');
            }
        });
        $('#search_keyword .input_keyword').focusout(function() {
            if ($(this).val() == '') {
                $(this).val(search_keyword_placeholder).addClass('placeholder');
            }
        });
        // autocomplete
        $('#search_keyword .input_keyword').on('keyup', function(e) {
            if ($(this).val()) {
                $(this).addClass('clear');
                $('#clear_kw').show();
            } else {
                $(this).removeClass('clear');
                $('#clear_kw').hide();
            }
        });
		
        // clear keyword
        $('#clear_kw').click(function() {
            $('#search_keyword .input_keyword').val('').removeClass('clear').focus();
            $('#clear_kw').hide();
            $('#search_keyword .button_keyword').click();
        });
		
		function input_clickRWD(callback){	
			if (window.console){ console.log("input_clickRWD"); }
			if ($('.rwdSearchprice .phone-down-content').hasClass('open')){			
				if($(".rwdDiylabel_price.checked").length==1){
					$('.rwdSearchprice input[type="button"][name="rwdprice"]').click();
					//$('.rwdSearchprice .unlimited-button').click();
					//$('.rwdSearchprice .unlimited-content').removeClass('open').attr("style","");
				}				
			}
			if ($('.rwdSearcharea .phone-down-content').hasClass('open')){
				if($(".rwdDiylabel_area.checked").length==1){
					$('.rwdSearcharea input[type="button"][name="rwdarea"]').click();
					//$('.rwdSearcharea .size-button').click();
					//				
				}
			}
            if (typeof callback == 'function'){
				if (window.console){ console.log("input_clickRWD callback"); }
                callback();		
			}
		}
		
        function input_click(callback) {
			if (window.console){ console.log("input_click"); }
            if ($('#search_price').hasClass('open')){
                if($('#search_price .min_price').siblings('.radio_btn.checked').length==1){
					$('#search_price input[type="button"][name="price"]').click();
				}				
			}		
            if ($('#search_area').hasClass('open')) {
                if ($('#search_area input[type="button"][name="area"]').parent().find('.radio_btn').hasClass('checked'))
                    $('#search_area input[type="button"][name="area"]').click();
                else if ($('#search_area input[type="button"][name="area"]').parent().find('.radio_btn').hasClass('checked'))
                    $('#search_area input[type="button"][name="area"]').click();
                else if ($('#search_area input[type="button"][name="landarea"]').parent().find('.radio_btn').hasClass('checked'))
                    $('#search_area input[type="button"][name="landarea"]').click();
            }
						
			/*
            if ($('#search_more').hasClass('open') && $('#search_more input[type="button"][name="room"]').parent().find('.radio_btn').hasClass('checked'))
                $('#search_more input[type="button"][name="room"]').click();
            if ($('#search_more').hasClass('open') && $('#search_more input[type="button"][name="roomtotal"]').parent().find('.radio_btn').hasClass('checked'))
                $('#search_more input[type="button"][name="roomtotal"]').click();
            if ($('#search_more').hasClass('open') && $('#search_more input[type="button"][name="floor"]').parent().find('.radio_btn').hasClass('checked'))
                $('#search_more input[type="button"][name="floor"]').click();
            if ($('#search_more').hasClass('open') && $('#search_more input[type="button"][name="year"]').parent().find('.radio_btn').hasClass('checked'))
                $('#search_more input[type="button"][name="year"]').click();
			*/
            if (typeof callback == 'function'){
				if (window.console){ console.log("input_click callback"); }
                callback();
			}
        }

        // search
        $('.search_item').click(function() {
            input_click();
            if ($(this).hasClass('open')) {
                $('.search_item').removeClass('open').siblings('.search_item_detail').removeClass('open');
            } else {
                $('.search_item').removeClass('open').siblings('.search_item_detail').removeClass('open');
                $(this).addClass('open').siblings('.search_item_detail').addClass('open');
            }
        });
		$('.phone-down-menu-2').click(function() {
			input_clickRWD();
            if ($(this).hasClass('open')) {
                $('.phone-down-menu-2').removeClass('open').siblings('.phone-down-content').removeClass('open');
            } else {
                $('.phone-down-menu-2').removeClass('open').siblings('.phone-down-content').removeClass('open');
                $(this).addClass('open').siblings('.phone-down-content').addClass('open');
            }
		});
        $('body').click(function(e) {
			//if (window.console){ console.log("body click"); }
            if (($('#search_bar ul').has(e.target).length > 0) === false ) {
				//if (window.console){ console.log("body has #search_bar ul"); }
                input_click(function() {
					if (window.console){ console.log("body call input_click"); }
                    $('.search_item').removeClass('open').siblings('.search_item_detail').removeClass('open');
                });
            }
			
			//console.log("price--"+($('.rwdSearchprice').has(e.target).length > 0));
            if (($('.phone-down-menu-box .rwdSearch').has(e.target).length > 0) === false){
				input_clickRWD(function (){
					if (window.console){ console.log("body call input_clickRWD"); }
					//M版全部條件收合
					$('.phone-down-menu-box-3').removeClass('open').attr("style","");
					$('.phone-down-menu-2').removeClass('open').siblings('.phone-down-content').removeClass('open');
				});		
            }
        });
		//麵包屑-展開縣市/捷運線站選單
        $('#breadcrumb .dropdown_head a').click(function(event) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
			if (window.console){ console.log("麵包屑-展開縣市/捷運線站選單"); }
			
            var breadcrumb_dropdown = $(this).parent().parent();
            if (breadcrumb_dropdown.hasClass('open'))
                breadcrumb_dropdown.removeClass('open');
            else
                breadcrumb_dropdown.addClass('open');
        });
        $('body').click(function(e) {
            if (($('#breadcrumb').has(e.target).length > 0 || $(e.target).attr('id') == 'breadcrumb') === false) {
                $('#breadcrumb .breadcrumb_dropdown').removeClass('open');
            }
        });
        $('.search_front_label').click(function() {
            $('.search_front_choice').hide();
            $('#search_' + $(this).attr('id')).show();
        });
		
		
        $('.search_option').click(function() {
            if (!$(this).hasClass('selected')) {
                var op_name = $(this).attr('id').replace('search_option_', '');
                if (op_name.match('_match'))
                    op_name = op_name.replace('_match', '');
				
				if (window.console){
					console.log('op_name:'+op_name);
				}
                $('#search_option_' + op_name).parent().find('.search_option').removeClass('selected');
                $('#search_option_' + op_name).addClass('selected');
               
				
				if(op_name=="area" || op_name=="area"){
					if (window.console){
						console.log('aabb:'+'#search_table_' + op_name);
						console.log($('#search_table_' + op_name).parent().attr("style"));
						//$('#search_table_' + op_name).parent().find('.search_table').remove();
					}
					//$('#search_table_' + op_name).parent().find('.search_table').removeClass('selected');
					//$('#search_table_' + op_name).addClass('selected');
				}
				else{
					
				}
				$('#search_table_' + op_name).parent().find('.search_table').removeClass('selected');
				$('#search_table_' + op_name).addClass('selected');
				
            }
        });

        // search - price
        var price = [5000 + '以下', 5000 + '-' + 10000, 10000 + '-' + 20000, 20000 + '-' + 30000, 30000 + '-' + 40000, 40000 + '-' + 50000];
        var price_any = '不限';
		$('#search_price').find('a').click(function(){
            // radio button
            $(this).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
            $(this).find('.radio_btn').addClass('checked');

            // set name
            var search_item_name = $('#search_price').siblings('.search_item').find('.search_item_name');
            var search_price = $('#search_price').find('.checked').eq(0).parent().text();
            if($('#search_price').find('.checked').length>1){
                search_price +='＋';
            }
            if(!search_price) search_price = '租金';
            search_item_name.html(search_price);
			
		});
        $('#search_price').find('.search_label').click(function(){
            // radio button
            $(this).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
            $(this).find('.radio_btn').addClass('checked');
            $('#search_area_match').find('.radio_btn').removeClass('checked');
            $('#search_area_match .search_label').find('.radio_btn').addClass('checked');
            // set name
            var search_item_name = $('#search_price').siblings('.search_item').find('.search_item_name');
            var price_name = '';
            var min_input = $(this).find('.min').val(),
                max_input = $(this).find('.max').val(),
                price_type = $(this).find('input[type="button"]').attr('name');
            if(min_input==0&&max_input==0){
                price_name = '';
            }else if(min_input==0){
                price_name = max_input+'以下';
                if(search_type=='home') window.location.href = 'list/'+max_input+'-down-'+price_type+'/index.html';
            }else if(max_input==0){
                price_name = min_input+'以上';
                if(search_type=='home') window.location.href = 'list/'+min_input+'-up-'+price_type+'/index.html';
            }else{
                price_name = min_input+'-'+max_input+'元';
            }
            search_item_name.html(price_name);
            //search_item_name_match.html(price_name);
        });
        $('#search_price').find('.search_option').click(function(){
            if(search_type!='home') $.set_url_item_no_callback('ALL-price');
            $('#search_price').find('.radio_btn').removeClass('checked');
            $('#search_price').siblings('.search_item').find('.search_item_name').html('租金');
        });
        $('#search_price .min_price, #search_price .max_price').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_price input[type="button"][name="price"]').click();
            }
        });

        // search - use
        $('#search_use').find('a').click(function() {
            // checkbox
            if ($(this).find('.checkbox_btn').hasClass('checked'))
                $(this).find('.checkbox_btn').removeClass('checked');
            else
                $(this).find('.checkbox_btn').addClass('checked');
            if ($('#search_use_match a[href="' + $(this).attr('href') + '"]').find('.checkbox_btn').hasClass('checked'))
                $('#search_use_match a[href="' + $(this).attr('href') + '"]').find('.checkbox_btn').removeClass('checked');
            else
                $('#search_use_match a[href="' + $(this).attr('href') + '"]').find('.checkbox_btn').addClass('checked');
            // set name
            var search_item_name = $('#search_use').siblings('.search_item').find('.search_item_name');
            var search_item_name_match = $('#search_use_match').siblings('.search_item').find('.search_item_name');
            var use_name = $('#search_use').find('.checked').eq(0).parent().text();
            if ($('#search_use').find('.checked').length > 1) {
                use_name += '＋';
            }
            if (!use_name) use_name = '類型';
            search_item_name.html(use_name);
            search_item_name_match.html(use_name);
        });

        // search - area
        $('#search_area').find('a').click(function(){
            // radio button
            $(this).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
            $(this).find('.radio_btn').addClass('checked');
            // set name
            var search_item_name = $('#search_area').siblings('.search_item').find('.search_item_name');
            var area_name = $('#search_area').find('.checked').eq(0).parent().text();
            if($('#search_area').find('.checked').length>1){
                area_name +='＋';
            }
            if(!area_name) area_name = '出租坪數';
            search_item_name.html(area_name);
        });
        $('#search_area').find('.search_label').click(function(){
            // radio button
            $(this).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
            $(this).find('.radio_btn').addClass('checked');
            $('#search_area_match').find('.radio_btn').removeClass('checked');
            $('#search_area_match .search_label').find('.radio_btn').addClass('checked');
            // set name
            var search_item_name = $('#search_area').siblings('.search_item').find('.search_item_name');
            var search_item_name_match = $('#search_area_match').siblings('.search_item').find('.search_item_name');
            var area_name = '';
            var min_input = $(this).find('.min').val(),
                max_input = $(this).find('.max').val(),
                area_type = $(this).find('input[type="button"]').attr('name');
            if(min_input==0&&max_input==0){
                area_name = '出租坪數';
            }else if(min_input==0){
                area_name = max_input+'坪以下';
                if(search_type=='home') window.location.href = 'list/'+max_input+'-down-'+area_type+'/index.html';
            }else if(max_input==0){
                area_name = min_input+'坪以上';
                if(search_type=='home') window.location.href = 'list/'+min_input+'-up-'+area_type+'/index.html';
            }else{
                area_name = min_input+'-'+max_input+'坪';
            }
            search_item_name.html(area_name);
            search_item_name_match.html(area_name);
        });
        $('#search_area').find('.search_option').click(function(){
            if(search_type!='home') $.set_url_item_no_callback('ALL-area/ALL-area/ALL-landarea');
            $('#search_area').find('.radio_btn').removeClass('checked');
            $('#search_area').siblings('.search_item').find('.search_item_name').html('出租坪數');
            $('#search_area_match').find('.radio_btn').removeClass('checked');
            $('#search_area_match').siblings('.search_item').find('.search_item_name').html('出租坪數');
        });
        $('#search_area .min_area, #search_area .max_area').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_area input[type="button"][name="area"]').click();
            }
        });
        $('#search_area .min_area, #search_area .max_area').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_area input[type="button"][name="area"]').click();
            }
        });
        $('#search_area .min_landarea, #search_area .max_landarea').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_area input[type="button"][name="landarea"]').click();
            }
        });

        // search - more
        $('#search_more').on('click', 'a, label, .search_label', function() {
            // radio button
            $(this).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
            $(this).find('.radio_btn').addClass('checked');
            if ($(this).attr('href')) {
                $('#search_more_match a[href="' + $(this).attr('href') + '"]').parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
                $('#search_more_match a[href="' + $(this).attr('href') + '"]').find('.radio_btn').addClass('checked');
            } else if ($(this).attr('id')) {
                $('#' + $(this).attr('id') + '_match').parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
                $('#' + $(this).attr('id') + '_match').find('.radio_btn').addClass('checked');
            }
			
			/*
            // checkradio
            if ($(this).find('.checkradio_btn').hasClass('checked'))
                $(this).find('.checkradio_btn').removeClass('checked');
            else
                $(this).find('.checkradio_btn').addClass('checked');
			*/
			
            // checkbox
            if ($(this).find('.checkbox_btn').hasClass('checked'))
                $(this).find('.checkbox_btn').removeClass('checked');
            else
                $(this).find('.checkbox_btn').addClass('checked');
			
        });
        $('#search_more .min_room, #search_more .max_room').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_more input[type="button"][name="room"]').click();
            }
        });
        $('#roomtotal_check').click(function() {
            var checkbox = $(this).find('.checkbox_btn');
            if (checkbox.hasClass('checked')) {
                // room
                $('#search_room_choice').show();
                $('#search_roomtotal_choice').hide();
                checkbox.removeClass('checked');
                $('#search_room_match_choice').show();
                $('#search_roomtotal_match_choice').hide();
                $('#roomtotal_check_match .checkbox_btn').removeClass('checked');
                var p;
                if ($('#search_roomtotal_choice').find('.min_roomtotal').siblings('.radio_btn').hasClass('checked')) {
                    p = $('#search_roomtotal_choice').find('.min_roomtotal').val() + '-' + $('#search_roomtotal_choice').find('.max_roomtotal').val();
                } else if ($('#search_roomtotal_choice').find('.radio_btn').hasClass('checked')) {
                    p = $('#search_roomtotal_choice').find('.radio_btn.checked').parent().attr('href').split('-roomtotal')[0].replace('/' + search_type + '/', '');
                }
                if (p) {
                    $('#search_roomtotal_choice').find('.radio_btn').removeClass('checked');
                    $('#search_roomtotal_match_choice').find('.radio_btn').removeClass('checked');
                    $.set_url_item_no_callback('ALL-roomtotal');
                    if (p != '0-up' && p != '1-up' && p != '2-up' && p != '3-up' && p != '4-up' && p != '5-up' && p != '6-up') {
                        if (p.split('-')[1] == 'up') {
                            $('#search_more .min_room').val(p.split('-')[0]);
                            $('#search_more_match .min_room').val(p.split('-')[0]);
                        } else if (p.split('-')[1] == 'down') {
                            $('#search_more .max_room').val(p.split('-')[0]);
                            $('#search_more_match .max_room').val(p.split('-')[0]);
                        } else {
                            $('#search_more .min_room').val(p.split('-')[0]);
                            $('#search_more .max_room').val(p.split('-')[1]);
                            $('#search_more_match .min_room').val(p.split('-')[0]);
                            $('#search_more_match .max_room').val(p.split('-')[1]);
                        }
                        $('#search_more .min_room').prev('.radio_btn').addClass('checked');
                        $('#search_more_match .min_room').prev('.radio_btn').addClass('checked');
                    } else {
                        $('#search_room_choice').find('a[href="/' + search_type + '/' + p + '-room/index.html"]').click();
                    }
                }
            } else {
                // roomtotal
                $('#search_room_choice').hide();
                $('#search_roomtotal_choice').show();
                checkbox.addClass('checked');
                $('#search_room_match_choice').hide();
                $('#search_roomtotal_match_choice').show();
                $('#roomtotal_check_match .checkbox_btn').addClass('checked');
                var p;
                if ($('#search_room_choice').find('.min_room').siblings('.radio_btn').hasClass('checked')) {
                    p = $('#search_room_choice').find('.min_room').val() + '-' + $('#search_room_choice').find('.max_room').val();
                } else if ($('#search_room_choice').find('.radio_btn').hasClass('checked')) {
                    p = $('#search_room_choice').find('.radio_btn.checked').parent().attr('href').split('-room')[0].replace('/' + search_type + '/', '');
                }
                if (p) {
                    $('#search_room_choice').find('.radio_btn').removeClass('checked');
                    $('#search_room_match_choice').find('.radio_btn').removeClass('checked');
                    $.set_url_item_no_callback('ALL-room');
                    if (p != '0-up' && p != '1-up' && p != '2-up' && p != '3-up' && p != '4-up' && p != '5-up' && p != '6-up') {
                        if (p.split('-')[1] == 'up') {
                            $('#search_more .min_roomtotal').val(p.split('-')[0]);
                            $('#search_more_match .min_roomtotal').val(p.split('-')[0]);
                        } else if (p.split('-')[1] == 'down') {
                            $('#search_more .max_roomtotal').val(p.split('-')[0]);
                            $('#search_more_match .min_roomtotal').val(p.split('-')[0]);
                        } else {
                            $('#search_more .min_roomtotal').val(p.split('-')[0]);
                            $('#search_more .max_roomtotal').val(p.split('-')[1]);
                            $('#search_more_match .min_roomtotal').val(p.split('-')[0]);
                            $('#search_more_match .max_roomtotal').val(p.split('-')[1]);
                        }
                        $('#search_more .min_roomtotal').prev('.radio_btn').addClass('checked');
                        $('#search_more_match .min_roomtotal').prev('.radio_btn').addClass('checked');
                    } else {
                        $('#search_roomtotal_choice').find('a[href="/' + search_type + '/' + p + '-roomtotal/index.html"]').click();
                    }
                }
            }
        });
        $('#search_more .min_roomtotal, #search_more .max_roomtotal').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_more input[type="button"][name="roomtotal"]').click();
            }
        });
        $('#search_more .min_floor, #search_more .max_floor').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_more input[type="button"][name="floor"]').click();
            }
        });
        $('#search_more .min_year, #search_more .max_year').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_more input[type="button"][name="year"]').click();
            }
        });
        $('#search_more_btn').click(function() {
            if ($('#search_more input[type="button"][name="room"]').parent().find('.radio_btn').hasClass('checked'))
                $('#search_more input[type="button"][name="room"]').click();
            if ($('#search_more input[type="button"][name="roomtotal"]').parent().find('.radio_btn').hasClass('checked'))
                $('#search_more input[type="button"][name="roomtotal"]').click();
            if ($('#search_more input[type="button"][name="floor"]').parent().find('.radio_btn').hasClass('checked'))
                $('#search_more input[type="button"][name="floor"]').click();
            if ($('#search_more input[type="button"][name="year"]').parent().find('.radio_btn').hasClass('checked'))
                $('#search_more input[type="button"][name="year"]').click();
            $('.search_item').removeClass('open').siblings('.search_item_detail').removeClass('open');
        });
        $('#search_reset_btn').click(function() {
            window.location.href = search_type + '/' + 'index.html';
        });
        var table_now = 0,
            left_now = 0;
        $('#search_more .arrow').click(function() {
            var arrow = $(this);
            if (!$(this).hasClass('disable')) {
                var more_content = $('#search_more_content');
                if (!more_content.hasClass('animate')) {
                    var table_moves = 0,
                        table_w = [],
                        table_cnt = 0,
                        search_more_w = parseInt($('#search_more').width());
                    more_content.children('table').each(function() {
                        table_w.push($(this).width() + 31);
                        table_cnt++;
                        search_more_w -= $(this).width() + 31;
                        if (search_more_w >= 0)
                            table_moves++;
                    });
                    if (arrow.hasClass('next')) {
                        table_now += table_moves;
                        for (var i = table_now - 1; i >= table_now - table_moves; i--) {
                            if (i >= 0)
                                left_now += table_w[i];
                        }
                    } else if (arrow.hasClass('prev')) {
                        table_now -= table_moves;
                        for (var i = table_now; i < table_now + table_moves; i++) {
                            if (i >= 0)
                                left_now -= table_w[i];
                        }
                    }
                    more_content.addClass('animate').animate({ 'margin-left': '-' + left_now + 'px' },
                        'slow',
                        function() { more_content.removeClass('animate'); }
                    );
                    show_hide_arrow(table_now, table_moves, table_cnt);
                }
            }
        });

        function show_hide_arrow(table_now, table_moves, table_cnt) {
            if (table_now <= 0 || table_now + table_moves >= table_cnt) {
                if (table_now <= 0)
                    $('#search_more .arrow.prev').addClass('disable');
                else
                    $('#search_more .arrow.prev').removeClass('disable');
                if (table_now + table_moves >= table_cnt)
                    $('#search_more .arrow.next').addClass('disable');
                else
                    $('#search_more .arrow.next').removeClass('disable');
            } else {
                $('#search_more .arrow.prev, #search_more .arrow.next').removeClass('disable');
            }
        }
        // search - more - match
        $('#search_more_match').on('click', 'a, label, .search_label', function() {
            // radio button
            $(this).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
            $(this).find('.radio_btn').addClass('checked');
            if ($(this).attr('href')) {
                $('#search_more a[href="' + $(this).attr('href') + '"]').parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
                $('#search_more a[href="' + $(this).attr('href') + '"]').find('.radio_btn').addClass('checked');
            } else if ($(this).attr('id')) {
                $('#' + $(this).attr('id').replace('_match', '')).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
                $('#' + $(this).attr('id').replace('_match', '')).find('.radio_btn').addClass('checked');
            }
            // checkbox
            if ($(this).find('.checkbox_btn').hasClass('checked'))
                $(this).find('.checkbox_btn').removeClass('checked');
            else
                $(this).find('.checkbox_btn').addClass('checked');
            if ($('#search_more a[href="' + $(this).attr('href') + '"]').find('.checkbox_btn').hasClass('checked'))
                $('#search_more a[href="' + $(this).attr('href') + '"]').find('.checkbox_btn').removeClass('checked');
            else
                $('#search_more a[href="' + $(this).attr('href') + '"]').find('.checkbox_btn').addClass('checked');
        });
        $('#search_more_match .min_room, #search_more_match .max_room').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_more_match input[type="button"][name="room"]').click();
            }
        });
        $('#roomtotal_check_match').click(function() {
            var checkbox = $(this).find('.checkbox_btn');
            if (checkbox.hasClass('checked')) {
                // room
                $('#search_room_match_choice').show();
                $('#search_roomtotal_match_choice').hide();
                checkbox.removeClass('checked');
                $('#search_room_choice').show();
                $('#search_roomtotal_choice').hide();
                $('#roomtotal_check .checkbox_btn').removeClass('checked');
                var p;
                if ($('#search_roomtotal_match_choice').find('.min_roomtotal').siblings('.radio_btn').hasClass('checked')) {
                    p = $('#search_roomtotal_match_choice').find('.min_roomtotal').val() + '-' + $('#search_roomtotal_match_choice').find('.max_roomtotal').val();
                } else if ($('#search_roomtotal_match_choice').find('.radio_btn').hasClass('checked')) {
                    p = $('#search_roomtotal_match_choice').find('.radio_btn.checked').parent().attr('href').split('-roomtotal')[0].replace('/' + search_type + '/', '');
                }
                if (p) {
                    $('#search_roomtotal_choice').find('.radio_btn').removeClass('checked');
                    $('#search_roomtotal_match_choice').find('.radio_btn').removeClass('checked');
                    $.set_url_item_no_callback('ALL-roomtotal');
                    if (p != '0-up' && p != '1-up' && p != '2-up' && p != '3-up' && p != '4-up' && p != '5-up' && p != '6-up') {
                        if (p.split('-')[1] == 'up') {
                            $('#search_more .min_room').val(p.split('-')[0]);
                            $('#search_more_match .min_room').val(p.split('-')[0]);
                        } else if (p.split('-')[1] == 'down') {
                            $('#search_more .max_room').val(p.split('-')[0]);
                            $('#search_more_match .max_room').val(p.split('-')[0]);
                        } else {
                            $('#search_more .min_room').val(p.split('-')[0]);
                            $('#search_more .max_room').val(p.split('-')[1]);
                            $('#search_more_match .min_room').val(p.split('-')[0]);
                            $('#search_more_match .max_room').val(p.split('-')[1]);
                        }
                        $('#search_more .min_room').prev('.radio_btn').addClass('checked');
                        $('#search_more_match .min_room').prev('.radio_btn').addClass('checked');
                    } else {
                        $('#search_room_match_choice').find('a[href="/' + search_type + '/' + p + '-room/index.html"]').click();
                    }
                }
            } else {
                // roomtotal
                $('#search_room_match_choice').hide();
                $('#search_roomtotal_match_choice').show();
                checkbox.addClass('checked');
                $('#search_room_choice').hide();
                $('#search_roomtotal_choice').show();
                $('#roomtotal_check .checkbox_btn').addClass('checked');
                var p;
                if ($('#search_room_match_choice').find('.min_room').siblings('.radio_btn').hasClass('checked')) {
                    p = $('#search_room_match_choice').find('.min_room').val() + '-' + $('#search_room_match_choice').find('.max_room').val();
                } else if ($('#search_room_match_choice').find('.radio_btn').hasClass('checked')) {
                    p = $('#search_room_match_choice').find('.radio_btn.checked').parent().attr('href').split('-room')[0].replace('/' + search_type + '/', '');
                }
                if (p) {
                    $('#search_room_choice').find('.radio_btn').removeClass('checked');
                    $('#search_room_match_choice').find('.radio_btn').removeClass('checked');
                    $.set_url_item_no_callback('ALL-room');
                    if (p != '0-up' && p != '1-up' && p != '2-up' && p != '3-up' && p != '4-up' && p != '5-up' && p != '6-up') {
                        if (p.split('-')[1] == 'up') {
                            $('#search_more .min_roomtotal').val(p.split('-')[0]);
                            $('#search_more_match .min_roomtotal').val(p.split('-')[0]);
                        } else if (p.split('-')[1] == 'down') {
                            $('#search_more .max_roomtotal').val(p.split('-')[0]);
                            $('#search_more_match .max_roomtotal').val(p.split('-')[0]);
                        } else {
                            $('#search_more .min_roomtotal').val(p.split('-')[0]);
                            $('#search_more .max_roomtotal').val(p.split('-')[1]);
                            $('#search_more_match .min_roomtotal').val(p.split('-')[0]);
                            $('#search_more_match .max_roomtotal').val(p.split('-')[1]);
                        }
                        $('#search_more .min_roomtotal').prev('.radio_btn').addClass('checked');
                        $('#search_more_match .min_roomtotal').prev('.radio_btn').addClass('checked');
                    } else {
                        $('#search_roomtotal_match_choice').find('a[href="/' + search_type + '/' + p + '-roomtotal/index.html"]').click();
                    }
                }
            }
        });
        $('#search_more_match .min_roomtotal, #search_more_match .max_roomtotal').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_more_match input[type="button"][name="roomtotal"]').click();
            }
        });
        $('#search_more_match .min_floor, #search_more_match .max_floor').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_more_match input[type="button"][name="floor"]').click();
            }
        });
        $('#search_more_match .min_year, #search_more_match .max_year').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_more_match input[type="button"][name="year"]').click();
            }
        });
        var table_match_now = 0,
            left_match_now = 0;
        $('#search_more_match .arrow').click(function() {
            var arrow = $(this);
            if (!$(this).hasClass('disable')) {
                var more_content = $('#search_more_match_content');
                if (!more_content.hasClass('animate')) {
                    var table_moves = 0,
                        table_w = [],
                        table_cnt = 0,
                        search_more_w = parseInt($('#search_more_match').width());
                    more_content.children('table').each(function() {
                        table_w.push($(this).width() + 31);
                        table_cnt++;
                        search_more_w -= $(this).width() + 31;
                        if (search_more_w >= 0)
                            table_moves++;
                    });
                    if (arrow.hasClass('next')) {
                        table_match_now += table_moves;
                        for (var i = table_match_now - 1; i >= table_match_now - table_moves; i--) {
                            if (i >= 0)
                                left_match_now += table_w[i];
                        }
                    } else if (arrow.hasClass('prev')) {
                        table_match_now -= table_moves;
                        for (var i = table_match_now; i < table_match_now + table_moves; i++) {
                            if (i >= 0)
                                left_match_now -= table_w[i];
                        }
                    }
                    more_content.addClass('animate').animate({ 'margin-left': '-' + left_match_now + 'px' },
                        'slow',
                        function() { more_content.removeClass('animate'); }
                    );
                    show_hide_match_arrow(table_match_now, table_moves, table_cnt);
                }
            }
        });

        function show_hide_match_arrow(table_match_now, table_moves, table_cnt) {
            if (table_match_now <= 0 || table_match_now + table_moves >= table_cnt) {
                if (table_match_now <= 0)
                    $('#search_more_match .arrow.prev').addClass('disable');
                else
                    $('#search_more_match .arrow.prev').removeClass('disable');
                if (table_match_now + table_moves >= table_cnt)
                    $('#search_more_match .arrow.next').addClass('disable');
                else
                    $('#search_more_match .arrow.next').removeClass('disable');
            } else {
                $('#search_more_match .arrow.prev, #search_more_match .arrow.next').removeClass('disable');
            }
        }
        $(window).resize(function() {
            if ($('#search_more').hasClass('open')) {
                var table_moves = 0,
                    table_w = [],
                    table_cnt = 0,
                    search_more_w = parseInt($('#search_more').width());
                $('#search_more_content').children('table').each(function() {
                    table_w.push($(this).width() + 31);
                    table_cnt++;
                    search_more_w -= $(this).width() + 31;
                    if (search_more_w >= 0)
                        table_moves++;
                });
                show_hide_arrow(table_now, table_moves, table_cnt);
            }
            if ($('#search_more_match').hasClass('open')) {
                var table_moves = 0,
                    table_w = [],
                    table_cnt = 0,
                    search_more_w = parseInt($('#search_more_match').width());
                $('#search_more_match_content').children('table').each(function() {
                    table_w.push($(this).width() + 31);
                    table_cnt++;
                    search_more_w -= $(this).width() + 31;
                    if (search_more_w >= 0)
                        table_moves++;
                });
                show_hide_match_arrow(table_match_now, table_moves, table_cnt);
            }
        }).trigger("resize");

        // keyword
        $('#search_keyword .input_keyword').on('keypress', function(e) {
            if (e.keyCode == 13) {
                $('#search_keyword .button_keyword').click();
            }
        });

        // search - areaplan
        $('#search_areaplan').find('a').click(function() {
            // radio button
            $(this).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
            $(this).find('.radio_btn').addClass('checked');
            // set name
            var search_item_name = $('#search_areaplan').siblings('.search_item').find('.search_item_name');
            var area_name = $('#search_areaplan').find('.checked').eq(0).parent().text();
            if ($('#search_areaplan').find('.checked').length > 1) {
                area_name += '＋';
            }
            if (!area_name) area_name = '規劃坪數';
            search_item_name.html(area_name);
        });

        // search - room
        $('#search_room').find('a').click(function() {
            // radio button
            $(this).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
            $(this).find('.radio_btn').addClass('checked');
            // set name
            var search_item_name = $('#search_room').siblings('.search_item').find('.search_item_name');
            var area_name = $('#search_room').find('.checked').eq(0).parent().text();
            if ($('#search_room').find('.checked').length > 1) {
                area_name += '＋';
            }
            if (!area_name) area_name = '房數';
            search_item_name.html(area_name);
        });

        // search - roomtotal
        $('#search_roomtotal').find('a').click(function() {
            // radio button
            $(this).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
            $(this).find('.radio_btn').addClass('checked');
            // set name
            var search_item_name = $('#search_roomtotal').siblings('.search_item').find('.search_item_name');
            var area_name = $('#search_roomtotal').find('.checked').eq(0).parent().text();
            if ($('#search_roomtotal').find('.checked').length > 1) {
                area_name += '＋';
            }
            if (!area_name) area_name = '房數';
            search_item_name.html(area_name);
        });

        // search - type
        $('#search_itemtype').find('a').click(function() {
            // checkbox
            if ($(this).find('.checkbox_btn').hasClass('checked'))
                $(this).find('.checkbox_btn').removeClass('checked');
            else
                $(this).find('.checkbox_btn').addClass('checked');
            // set name
            var search_item_name = $('#search_itemtype').siblings('.search_item').find('.search_item_name');
            var use_name = $('#search_itemtype').find('.checked').eq(0).parent().text();
            if ($('#search_itemtype').find('.checked').length > 1) {
                use_name += '＋';
            }
            if (!use_name) use_name = '類型';
            search_item_name.html(use_name);
        });

        // item_imagepop
        $('#search_result_list').on('mouseenter', '.item_imagebox', function() {
            $(this).siblings('.item_imagepop').show();
            $('#container').css('overflow', 'visible');
        }).on('mouseleave', '.item_imagebox', function() {
            $(this).siblings('.item_imagepop').hide();
        });

        if (search_type == 'home') {
            //
        } else {
            if (search_type == 'list' || search_type == 'mrt') {
                // default search
                //var search_limit = 30;
                var default_url_item = '';
                //if (search_type == 'mrt') default_url_item = 'yes-mrt';

                // plugin: parse_url
                $('#search_bar, #search_bar_match, #search_tags_match').parse_url({
                    start_point: '/' + search_type + '/',
                    default_url_item: default_url_item,
                    load_url_no_callback: true,
                    callback: function(path, page) {
						if (window.console){ console.log("callback pc版開始執行"); }
                            // GA
                            //var ga_page = page;
                            //if (ga_page == '' || ga_page == 1) ga_page = 'index';
                            //if (typeof dataLayer != 'undefined')
                            //    dataLayer.push({ 'eventCategory': 'searchFilter', 'eventAction': 'click', 'eventLabel': search_type + '/' + path + '/' + ga_page + '.html', 'event': 'ga-searchFilter' });
                            //ga('send', 'pageview', search_type + '/' + path + '/' + ga_page + '.html');

                            // set PC版 UI
                            $('#search_result_loading, #search_result_loading_bg').show();
                            $('#search_result_count .num').html(0);
                            // breadcrumb
                            $('#breadcrumb_params').html('');
                            if ($.get_search_criteria() != '') {
                                $.each($.get_search_criteria().split('、'), function(k, value) {
                                    //ui加入麵包屑(PC版)
									if ($.get_url_item()[k].match(/mrtline/)){	
										var v_value=$('#search_mrtline input[data-name="'+value+'"]').attr("data-name");
										$('#breadcrumb_params').append('<span><a href="/' + search_type + '/' + escapeHtml($.get_url_item()[k],true) + '/index.html"><div class="close_btn"></div></a>' + escapeHtml(v_value,true) + '</span>');
									}else if (!$.get_url_item()[k].match(/keyword/)){
                                        $('#breadcrumb_params').append('<span><a href="/' + search_type + '/' + $.get_url_item()[k] + '/index.html"><div class="close_btn"></div></a>' + value + '</span>');
									}
                                });
                            }
                            // match
                            //if ($.get_search_criteria())
                            //    $('#match_criteria').html($.get_search_criteria());
                            if (page == '' || page == 'index') page = 1;
							
							//search ga
							var ga_page = page;
							if(ga_page==''||ga_page==1) ga_page = 'index';
							
                            // get list
                            var returnParams = 'NO,name,description,address,areaLand,areaBuilding,areaBuildingMain,areaBalcony,price,priceFirst,discount,type,use,room,hall,bathroom,openroom,roomplus,hallplus,bathroomplus,openroomplus,age,floor,inc,imgCount,imgDefault,bigImg,staffpick,decoar,pingratesup,community,lift,parking,customize,keyword,zipcode,tags,tagsSpecial';
                            $.ajax({
                                url: 'ajaxSearchHouse.php',
                                type: 'POST',
                                data: { params: path, page: page, limit: search_limit, returnParams: returnParams },
                                dataType: 'json'
                            }).done(function(data) {
                                if (data.OPT.status == 'OK') {
                                    $('#search_result_loading, #search_result_loading_bg').hide();
                                    set_page(page, data.OPT.totalPage);
                                    $('#search_result_count .num').html(nwc(data.OPT.total));
                                    $('#search_criteria').html($.get_search_criteria());
									
                                    if (data.OPT.total == 0) {
                                        $('#search_order').addClass('hide');
										
										//$('#search_result_list').html('');
										removeHouse();
                                        //$('#search_result_list').html('');
										$('#search_result_list_end').before('<div id="search_result_list"  class="ddhouse">找不到符合的物件</div>');
                                    } else {
                                        $('#search_order').removeClass('hide');
										
                                        // list
										//$('#search_result_list').html('');
										removeHouse();
                                        $.each(data.OPT.List, function(index, value) {
											if (window.console){ console.log("add list"); }
                                            $('#search_result_list_end').before(
                                                '<div id="search_result_list" class="ddhouse">'+
                                                '<div id="search_result_'+value.NO+'" class="search_result_item">'+
                                                '<a href="'+value.url+'" target="_blank">'+
                                                '<div class="item_box item_box_left">'+
                                                '<div class="item_imagebox">'+
                                                '<div class="item_recommend_bg"></div>'+
                                                '<div class="item_recommend"><!-- 店長推薦 --></div>'+
                                                '<div class="item_img">'+
                                                '<img alt="'+value.alt+'" title="'+value.alt+'" src="'+value.img+'" onerror="loadImgFail(this)">'+
                                                '</div>'+
                                                '<div class="item_img_count">'+
                                                '<div class="icon i_img_cnt"></div>'+
                                                '<div class="img_count_txt">'+value.img_count+'</div>'+
                                                '</div>'+
                                                '</div>'+
                                                '<!-- .item_imagebox -->'+
                                                '<span class="phone-building-name">'+value.community+'</span>'+
                                                '<!-- .item_imagepop-77 -->'+
                                                '</div>'+
                                                '<!-- .item_box item_box_left-->'+
                                                '<div class="item_box item_box_right">'+
                                                '<div class="item_titlebox">'+
                                                '<span class="item_title" alt="'+value.alt+'" title="'+value.alt+' - 80429J">'+value.name+'</span>'+
                                                '<span class="item_subtitle"><!-- 信義房屋品牌、台灣松下營造 --></span>'+
                                                '</div>'+
                                                '<!-- .item_titlebox -->'+
                                                '<div class="item_detailbox">'+
                                                '<div class="detail_left left">'+
                                                '<div class="detail_line1">'+
                                                '<span><!-- 台北市士林區天母北路 --></span>'+
                                                '</div>'+
                                                '<div class="detail_line2">'+
                                                '<span><span class="num num-1">'+value.use+'</span></span>'+
                                                '<span>'+
                                                '<span class="num">'+value.ping+'</span>'+value.pingname+
                                                '</span>'+
                                                '<span>'+
                                                '<span class="num">'+value.room+'\n</span>房\n'+
                                                '<span class="num">'+value.hall+'\n</span>廳\n'+
                                                '<span class="num">'+value.bathroom+'\n</span>衛\n'+
                                                '<span class="num">'+value.openroom+'\n</span>室\n'+
                                                '</span>'+
                                                '<span><span class="num">'+value.floor+'</span>樓</span>'+
                                                '</div>'+
                                                '<div class="detail_line2">'+
                                                '<span class="num-ss">'+
                                                '<span class="num num-text">'+value.address+'</span>'+
                                                '</span>'+
                                                '</div>'+
                                                '<span class="gray-date">更新日期：</span>'+
                                                '<span class="gray-date-1">'+value.updatedate+'</span>'+
                                                '<div class="detail_tagGroup">'+
                                                '<div class="detail_tag" data-tagid="16">近公園</div>'+
                                                '<div class="detail_tag" data-tagid="18">近市場</div>'+
                                                '<div class="detail_tag" data-tagid="19">近學校</div>'+
                                                '<div class="clear"></div>'+
                                                '</div>'+
                                                '</div>'+
                                                '<!-- .detail_left .left -->'+
                                                '<div class="detail_right right">'+
                                                '<div class="detail_price">'+
                                                '<div class="price_new"><span class="num">'+value.price+'</span>元/月</div>'+
                                                '</div>'+
                                                '<!-- .detail_price -->'+
                                                '<div class="clear"></div>'+
                                                '</div>'+
                                                '<div class="detail_right-1 left">'+
                                                '<div class="detail_price">'+
                                                '<div class="price_new"><span class="num">'+value.price+'</span>元/月</div>'+
                                                '</div>'+
                                                '<div class="detail_line2">'+
                                                '<span style="border-left: 1px solid #ddd;">'+
                                                '<span class="big-chinese" >'+value.use+'</span>'+
                                                '</span>'+
                                                '<span><span class="num">'+value.ping+'</span>'+value.pingname+'</span>'+
                                                '</div>'+
                                                '<div class="detail_line2">'+
                                                '<span style="border-left: 1px solid #ddd;">'+
                                                '<span>'+
                                                '<span class="num">'+value.room+'</span>房\n'+
                                                '<span class="num">'+value.hall+'</span>廳\n'+
                                                '<span class="num">'+value.bathroom+'</span>衛\n'+
                                                '<span class="num">'+value.openroom+'</span>室\n'+
                                                '</span>'+
                                                '</span>'+
                                                '<span><span class="num">'+value.floor+'</span>樓</span>'+
                                                '</div>'+
                                                '<p class="phone-address">'+value.addressrwd+'</p>'+
                                                '<!-- .detail_price -->'+
                                                '<div class="clear"></div>'+
                                                '</div><!-- .detail_right .right -->'+
                                                '<div class="clear"></div>'+
                                                '</div><!-- .item_detailbox -->'+
                                                '</div><!-- .item_box item_box_right-->'+
                                                '<div class="clear"></div>'+
                                                '</a>'+
                                                '<div class="detail_btnGroup">'+
                                                '<div class="detail_btn appoint_btn" onclick="addFavoriteHouse(\''+value.NO+'\'\,\'add\');"><a href="#" onclick="return false;">快速收藏</a></div>'+
                                                '</div><!-- .detail_btnGroup -->' +
                                                '</div><!-- .search_result_item -->'+
                                                '</div>');


                                        });
										
										/*
                                        if (tracked.length > 0) {
                                            $.each(tracked, function(index, value) {
                                                if (typeof value == 'string')
                                                    $('#search_result_' + value).find('.track_btn').addClass('tracked').attr('alt', '取消追蹤').attr('title', '取消追蹤');
                                                else
                                                    $('#search_result_' + value['houseNO']).find('.track_btn').addClass('tracked').attr('alt', '取消追蹤').attr('title', '取消追蹤');
                                            });
                                        }
                                        get_cookie_track();
										*/
                                    }
                                } else if (data.OPT.status == 'ERROR') {
                                    $('#search_result_loading, #search_result_loading_bg').hide();
                                    $('#search_pagination').html('');
                                    removeHouse();
									//$('#search_result_list').html('資料錯誤');
									$('#search_result_list_end').before('<div id="search_result_list" class="ddhouse">資料錯誤</div>');
                                }
                            }).fail(function(jqXHR, textStatus) {
                                $('#search_result_loading, #search_result_loading_bg').hide();
                                $('#search_pagination').html('');
								removeHouse();
                                //$('#search_result_list').html('資料錯誤');
								$('#search_result_list_end').before('<div id="search_result_list" class="ddhouse">資料取得錯誤</div>');
                                if (window.console)
                                    console.log('"ajaxSearchHouse.php" Request failed: ' + textStatus);
                            });
					} // end of callback function
                });
            }

            // open item
            $('#search_result_list').on('click', '.search_result_item > a', function() {
                var item_NO = $(this).parent().attr('id').replace('search_result_', '');
                if (item_NO) {
                    var item_tracked = false;
                    if ($(this).siblings('.detail_btnGroup').find('.track_btn').hasClass('tracked')) item_tracked = true;
                    get_visited(item_NO, true, item_tracked);
                }
            });
            $('#search_result_list').on('click', '.saleinfo > a', function() {
                var item_NO = $(this).parent().attr('id').replace('saleinfo_', '');
                if (item_NO) {
                    var item_tracked = false;
                    if ($(this).siblings('.track_btn').hasClass('tracked')) item_tracked = true;
                    get_visited(item_NO, true, item_tracked);
                }
            });

            // remove breadcrumb移除麵包屑
            $('#breadcrumb_params').on('click', 'a', function(event) {
				if (window.console){ console.log("remove breadcrumb"); }
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
                var url_item = $(this).attr('href').replace('/index.html', '').split('/').slice(-1)[0];
                // set url
				if($('#search_bar').is(":visible")){
					$.remove_url_item(url_item);
				}else{
					$.remove_url_item2(url_item);
				}
				
                // set ui
                $(this).parent().remove();
                $('#search_bar').find('a[href="' + $(this).attr('href') + '"] .checked').removeClass('checked');
                $('#search_bar_match').find('a[href="' + $(this).attr('href') + '"] .checked').removeClass('checked');
                // set default UI
                if (url_item.match(/city/) || url_item.match(/county/)) {
                    // city
                    $('#search_city').siblings('.search_item').find('.search_item_name').html('縣市');
                    $('#search_zip').siblings('.search_item').find('.search_item_name').html('行政區');
                    $('#search_zip table').html('').append('<tr><td>請先選擇縣市，才可勾選行政區。</td></tr>');
                    $('#breadcrumb_city .dropdown_name').html('縣市');
                    $('#breadcrumb_city').find('li').removeClass('checked');
                    $('#breadcrumb_zip .dropdown_name').html('不分區');
                    $('#breadcrumb_zip ul').html('').append('<li class="dropdown_item">不分區</li>');
                    $('#search_city_match').siblings('.search_item').find('.search_item_name').html('縣市');
                    $('#search_zip_match').siblings('.search_item').find('.search_item_name').html('行政區');
                    $('#search_zip_match table').html('').append('<tr><td>請先選擇縣市，才可勾選行政區。</td></tr>');
					
					$(".rwdSearchcity .phone-down-menu-2").html("縣市");
					$(".rwdSearchcity label").removeClass("checked");
					get_zip_rwd("",0);
                } else if (url_item.match(/zip/)) {
                    // zip
                    var zip_code = [];
                    var has_zip = false;

                    $('#breadcrumb_zip').find('li').removeClass('checked');
					$(".rwdSearchzip label.checked").removeClass('checked');
					
                    $.each($.get_url_item(), function(k, value) {
                        if (value.match(/zip/)) {
                            has_zip = true;
                            var a_btn = $('#search_bar').find('a[href="/' + search_type + '/' + value + '/index.html"]');
                            if (a_btn.text()) {
                                a_btn.find('.checkbox_btn').addClass('checked');
                                var zip_name = $('#search_zip').find('.checked').eq(0).parent().text();
                                if ($('#search_zip').find('.checked').length > 1) zip_name += '＋';
                                zip_code.push(value.replace('-zip', ''));
                                $('#search_zip').siblings('.search_item').find('.search_item_name').text(zip_name);
                                $('#search_zip_match').siblings('.search_item').find('.search_item_name').text(zip_name);
                                var dropdown = $('.dropdown_itemGroup').find('a[href="/' + search_type + '/' + value + '/index.html"]');
                                dropdown.parent().parent().parent().find('.dropdown_head a').attr('href', '/' + search_type + '/' + zip_code.join('-') + '-zip/index.html');
                                dropdown.parent().parent().parent().find('.dropdown_name').text(zip_name);
                                dropdown.parent().addClass('checked');
                            }
							
							$(".rwdSearchzip input").each(function (){
								if($(this).val()==value){ $(this).parent().hasClass("checked"); }
							});
                        }
                    });
                    if (!has_zip) {
                        $('#search_zip').siblings('.search_item').find('.search_item_name').html('行政區');
                        $('#search_zip_match').siblings('.search_item').find('.search_item_name').html('行政區');
                        $('#breadcrumb_zip .dropdown_name').html('不分區');
                    }
					if($(".rwdSearchzip label.checked").length==0){
						$(".rwdSearchzip .phone-down-menu-2.administrative-button").html("行政區");
					}else{
						var tmp_v=$(".rwdSearchzip label.checked input").eq(0).data("name");	
						if($(".rwdSearchzip label.checked").length>1){
							tmp_v+="+";
						}
						$(".rwdSearchzip .phone-down-menu-2.administrative-button").html(tmp_v);
					}

                } else if (url_item.match(/mrtline/)) {
                    // mrtline
                    $('#search_mrtline').siblings('.search_item').find('.search_item_name').html('捷運站');
                    $('#search_mrt').siblings('.search_item').find('.search_item_name').html('捷運線');
                    $('#search_mrt table').show();
                    $('#search_mrt .phone-down-menu-3').html('');
					
                    $('#breadcrumb_mrtline .dropdown_name').html('捷運站');
                    $('#breadcrumb_mrtline').find('li').removeClass('checked');
                    $('#breadcrumb_mrt .dropdown_name').html('捷運線');
                    $('#breadcrumb_mrt ul').html('').append('<li class="dropdown_item">捷運線</li>');
                    //$('#search_city_match').siblings('.search_item').find('.search_item_name').html('縣市');
                    //$('#search_zip_match').siblings('.search_item').find('.search_item_name').html('行政區');
                    //$('#search_zip_match table').html('').append('<tr><td>請先選擇縣市，才可勾選行政區。</td></tr>');
					
					$(".rwdSearchmrtline .phone-down-menu-2").html("捷運線");
					$(".rwdSearchmrtline label").removeClass("checked");
					get_mrt("");
				} else if (url_item.match(/mrt$/)) {
                    // mrt
					
                    var mrt_code = [];
                    var has_mrt = false;
					
					$('#breadcrumb_mrt').find('li').removeClass('checked');
					
					$('#search_mrt label.checked').removeClass('checked');
					$(".rwdSearchmrt label.checked").removeClass('checked');
					
					$.each($.get_url_item(), function(k, value) {
						if (value.match(/-mrt$/)) {
							has_mrt = true;
							var item = value.split('-')[value.split('-').length - 1];
							var vv = value.split('-')[0];
							
							$('#search_mrt input[value="'+vv+'"]').parent().addClass('checked');
							$('#rwdSearchmrt input[value="'+vv+'"]').parent().addClass('checked');
							
							var mrt_name = $('#search_mrt input[value="'+vv+'"]').eq(0).attr("data-name");
							//if ($('#search_mrt input[value="'+vv+'"]').length > 1) mrt_name += '＋';
							if ($('#search_mrt').find('.checked').length > 1) mrt_name += '＋';
							
							$('#search_mrt').siblings('.search_item').find('.search_item_name').text(escapeHtml(mrt_name,true));
							$('.rwdSearchmrt .phone-down-menu-2').html(mrt_name);
							//value
							/*
                            
							var a_btn = $('#search_bar').find('a[href="/' + search_type + '/' + value + '-mrt/index.html"]');
                            if (a_btn.text()) {
	
							}
                            //var a_btn = $('#search_bar label.checked').length;
                            if ($('#search_bar label.checked').length>0) {
								
                                //a_btn.find('.checkbox_btn').addClass('checked');
								var tmp_v=$('#search_mrt label.checked input[type="checkbox"]').eq(0).val();
                                var mrt_name = $('#search_mrt label.checked input[type="checkbox"]').eq(0).val();
                                if ($('#search_bar label.checked').length > 1) mrt_name += '＋';
								
                                //zip_code.push(value.replace('-zip', ''));
                                $('#search_mrt').siblings('.search_item').find('.search_item_name').text(mrt_name);
                                //$('#search_zip_match').siblings('.search_item').find('.search_item_name').text(zip_name);
                                var dropdown = $('.dropdown_itemGroup').find('a[href="/' + search_type + '/' + tmp_v + '-mrt/index.html"]');
								
                                dropdown.parent().parent().parent().find('.dropdown_head a').attr('href', '/' + search_type + '/' + tmp_v + '-mrt/index.html');
								
                                dropdown.parent().parent().parent().find('.dropdown_name').text(mrt_name);
                                dropdown.parent().addClass('checked');
                            }
							*/
							
							$("#search_mrt input[type=checkbox]").each(function (){
								if($(this).val()+"-mrt"==value){ 
									has_mrt = true;
									
									$(this).parent().addClass("checked"); 
									
									var tmp_v=$('#search_mrt label.checked input[type="checkbox"]').eq(0).val();
									var mrt_name = $('#search_mrt label.checked input[type="checkbox"]').eq(0).attr("data-name");
									if ($('#search_mrt label.checked').length > 1) mrt_name += '＋';
								
									//zip_code.push(value.replace('-zip', ''));
									$('#search_mrt').siblings('.search_item').find('.search_item_name').text(mrt_name);
									//$('#search_zip_match').siblings('.search_item').find('.search_item_name').text(zip_name);
									var dropdown = $('.dropdown_itemGroup').find('a[href="/' + search_type + '/' + value + '/index.html"]');
																		
									dropdown.parent().parent().parent().find('.dropdown_head a').attr('href', '/' + search_type + '/' + value + '/index.html');
								
									dropdown.parent().parent().parent().find('.dropdown_name').text(mrt_name);
									dropdown.parent().addClass('checked');								
								}
							});
							
							$(".rwdSearchmrt input").each(function (){
								if($(this).val()+"-mrt"==value){ $(this).parent().addClass("checked"); }
							});
							
						}
					});
					if (window.console){ console.log("has_mrt:"+has_mrt); }					
                    if (!has_mrt) {
                        $('#search_mrt').siblings('.search_item').find('.search_item_name').html('捷運站');
                        $('#breadcrumb_mrt .dropdown_name').html('捷運站');
                    }
					if($(".rwdSearchmrt label.checked").length==0){
						$(".rwdSearchmrt .phone-down-menu-2.administrative-button").html("捷運站");
					}else{
						var tmp_v=$(".rwdSearchmrt label.checked input").eq(0).attr("data-name");	
						if($(".rwdSearchmrt label.checked").length>1){
							tmp_v+="+";
						}
						$(".rwdSearchmrt .phone-down-menu-2.administrative-button").html(escapeHtml(tmp_v,true));
						if (window.console){ console.log("rwd mrt fill:"+tmp_v); }	
					}
					
                } else if (url_item.match(/price/)) {
					if (window.console){ console.log("remove price"); }
					if (window.console){ console.log($('#search_price').siblings('.search_item').find('.search_item_name').length); }
                    // price
                    $('#search_price').siblings('.search_item').find('.search_item_name').html('租金');
                    $('#search_price .min_price').val('');
                    $('#search_price .max_price').val('');
                    $('#search_price .max_price_s').val('');
                    //$('#search_price_match').siblings('.search_item').find('.search_item_name').html('租金');
                    //$('#search_price_match .min_price').val('');
                    //$('#search_price_match .max_price').val('');
                    //$('#search_price_match .max_price_s').val('');
                    //$('.min_price').click();
					$(".rwdSearchprice .phone-down-menu-2").html("租金");
					
					$(".rwdSearchprice label.checked").removeClass('checked');
                } else if (url_item.match(/use/)) {
                    // use
                    var has_use = false;
					
					$(".rwdSearchuse label.checked").removeClass('checked');					
                    $.each($.get_url_item(), function(k, value) {
                        if (value.match(/use/)) {
                            has_use = true;
                            var a_btn = $('#search_bar').find('a[href="/' + search_type + '/' + value + '/index.html"]');
							
							var valueAry=value.split("-");
							if(valueAry.length>0){
								for(var i=0;i<valueAry.length-1;i++){
									$(".rwdSearchuse input").each(function (){				
										if($(this).val()==valueAry[i]){ 
											$(this).parent().addClass("checked"); 
											//console.log("ddd:"+$(this).val()+"--"+valueAry[i]);
										}
									});
								}
							}
							
                            if (a_btn.text()) {
                                a_btn.find('.checkbox_btn').addClass('checked');
                                var use_name = $('#search_use').find('.checked').eq(0).parent().text();
                                if ($('#search_use').find('.checked').length > 1) use_name += '＋';
                                $('#search_use').siblings('.search_item').find('.search_item_name').text(use_name);
                                $('#search_use_match').siblings('.search_item').find('.search_item_name').text(use_name);
                            }
                        }
                    });
                    if (!has_use) {
                        $('#search_use').siblings('.search_item').find('.search_item_name').html('類型');
                        $('#search_use_match').siblings('.search_item').find('.search_item_name').html('類型');
                    }
					if($(".rwdSearchuse label.checked").length==0){
						$(".rwdSearchuse .phone-down-menu-2").html("類型");
					}else{
						var tmp_v=$(".rwdSearchuse label.checked input").eq(0).data("name");	
						if($(".rwdSearchuse label.checked").length>1){
							tmp_v+="+";
						}
						$(".rwdSearchuse .phone-down-menu-2").html(tmp_v);
					}

                } else if (url_item.match(/area/)) {
                    // area
                    $('#search_area').find('.radio_btn').removeClass('checked');
                    $('#search_area').siblings('.search_item').find('.search_item_name').html('坪數');
                    $('#search_area_match').find('.radio_btn').removeClass('checked');
                    $('#search_area_match').siblings('.search_item').find('.search_item_name').html('坪數');
					
					$(".rwdSearcharea label.checked").removeClass('checked');
					$(".rwdSearcharea input[type=text]").val('');
					$(".rwdSearcharea .phone-down-menu-2").html("坪數");
                } else if (url_item.match(/roomtotal/)) {
                    console.log('roomtotal');
                    // roomtotal
                    $('#search_roomtotal_choice').find('.radio_btn').removeClass('checked');
                    $('#search_roomtotal_choice .min_roomtotal').val('');
                    $('#search_roomtotal_choice .max_roomtotal').val('');
                    $('#search_roomtotal_match_choice').find('.radio_btn').removeClass('checked');
                    $('#search_roomtotal_match_choice .min_roomtotal').val('');
                    $('#search_roomtotal_match_choice .max_roomtotal').val('');
					
					$(".rwdSearchroom label.checked").removeClass('checked');
                } else if (url_item.match(/room/)) {
                    console.log('room');
                    // room
                    $('#search_room_choice').find('.radio_btn').removeClass('checked');
                    $('#search_room_choice .min_room').val('');
                    $('#search_room_choice .max_room').val('');
                    $('#search_room_match_choice').find('.radio_btn').removeClass('checked');
                    $('#search_room_match_choice .min_room').val('');
                    $('#search_room_match_choice .max_room').val('');
					
					$(".rwdSearchroom label.checked").removeClass('checked');
                } else if (url_item.match(/-parking/)) {
                    console.log('parking');
                    // year
                    //$('#search_more_content .min_year').siblings('.radio_btn').removeClass('checked');
                    //$('#search_more_content .min_year').val('');
                    //$('#search_more_content .max_year').val('');
                    //$('#search_more_match_content .min_year').siblings('.radio_btn').removeClass('checked');
                    //$('#search_more_match_content .min_year').val('');
                    //$('#search_more_match_content .max_year').val('');
					$(".rwdSearchparking label.checked").removeClass('checked');
                } else if (url_item.match(/floor/)) {
                    console.log('floor');
                    // floor
                    $('#search_more_content .min_floor').siblings('.radio_btn').removeClass('checked');
                    $('#search_more_content .min_floor').val('');
                    $('#search_more_content .max_floor').val('');
                    $('#search_more_match_content .min_floor').siblings('.radio_btn').removeClass('checked');
                    $('#search_more_match_content .min_floor').val('');
                    $('#search_more_match_content .max_floor').val('');
                } else if (url_item.match(/type/)) {
                    console.log('type');
                    // type
					var has_type = false;
					
					$("#search_type_choice .checkbox_btn.checked").removeClass('checked');

					$(".rwdSearchtype label.checked").removeClass('checked');
                    $.each($.get_url_item(), function(k, value) {
                        if (value.match(/type/)) {
                            has_type = true;
							var a_btn = $('#search_type_choice').find('a[href="/' + search_type + '/' + value + '/index.html"]');
                            if (a_btn.text()) {
                                a_btn.find('.checkbox_btn').addClass('checked');
                            }

							var valueAry=value.split("-");
							if(valueAry.length>0){
								for(var i=0;i<valueAry.length-1;i++){
									$(".rwdSearchtype input").each(function (){				
										if($(this).val()==valueAry[i]){ 
											$(this).parent().addClass("checked"); 
											//console.log("ddd:"+$(this).val()+"--"+valueAry[i]);
										}
									});
								}
							}
                        }
                    });
                } else if (url_item.match(/tools/)) {
                    console.log('tools');
                    // tools
					var has_tools = false;
					
					$("#search_tools_choice .checkbox_btn.checked").removeClass('checked');

					$(".rwdSearchtools label.checked").removeClass('checked');
                    $.each($.get_url_item(), function(k, value) {
                        if (value.match(/tools/)) {
                            has_tools = true;
							var a_btn = $('#search_tools_choice').find('a[href="/' + search_type + '/' + value + '/index.html"]');
                            if (a_btn.text()) {
                                a_btn.find('.checkbox_btn').addClass('checked');
                            }

							var valueAry=value.split("-");
							if(valueAry.length>0){
								for(var i=0;i<valueAry.length-1;i++){
									$(".rwdSearchtools input").each(function (){				
										if($(this).val()==valueAry[i]){ 
											$(this).parent().addClass("checked"); 
											//console.log("ddd:"+$(this).val()+"--"+valueAry[i]);
										}
									});
								}
							}
                        }
                    });
                } else if (url_item.match(/tags/)) {
                    console.log('tags');
                    // tags
					var has_tags = false;
					$(".rwdSearchtags label.checked").removeClass('checked');
                    $.each($.get_url_item(), function(k, value) {
                        if (value.match(/tags/)) {
                            has_tags = true;
							var a_btn = $('#search_tags_choice').find('a[href="/' + search_type + '/' + value + '/index.html"]');
                            if (a_btn.text()) {
                                a_btn.find('.checkbox_btn').addClass('checked');
                            }
							
							var valueAry=value.split("-");
							if(valueAry.length>0){
								for(var i=0;i<valueAry.length-1;i++){
									$(".rwdSearchtags input").each(function (){				
										if($(this).val()==valueAry[i]){ 
											$(this).parent().addClass("checked"); 
											//console.log("ddd:"+$(this).val()+"--"+valueAry[i]);
										}
									});
								}
							}
                        }
                    });
                }
            });

            //處理核取效果
			if (search_type == 'list' || search_type == 'rema') {
                // search - city
                $('#search_city').find('a').click(function() {
					
                    // radio button
                    $(this).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
                    $(this).find('.radio_btn').addClass('checked');
                    $('#search_city_match').find('.radio_btn').removeClass('checked');
                    $('#search_city_match a[href="' + $(this).attr('href') + '"]').find('.radio_btn').addClass('checked');
                    // set ui
                    $('#search_city').siblings('.search_item.open').click(); // close
                    $('#search_city').siblings('.search_item').find('.search_item_name').html($(this).text());
                    $('#search_zip').siblings('.search_item').find('.search_item_name').html('行政區');
                    $('#breadcrumb_city').find('li').removeClass('checked');
                    $('#breadcrumb_city .dropdown_itemGroup').find('a[href="' + $(this).attr('href') + '"]').parent().addClass('checked');
                    $('#breadcrumb_city .dropdown_head a').attr('href', $(this).attr('href'));
                    $('#breadcrumb_city .dropdown_name').html($('#breadcrumb_city .dropdown_itemGroup').find('a[href="' + $(this).attr('href') + '"]').text());
                    $('#breadcrumb_zip .dropdown_name').html('不分區');
                    $('#search_city_match').siblings('.search_item').find('.search_item_name').html($(this).text());
                    $('#search_zip_match').siblings('.search_item').find('.search_item_name').html('行政區');
                    // get zip
                    get_zip($(this).data('cityid'),0);
                });
				//點擊縣市的麵包屑
                $('#breadcrumb_city .dropdown_itemGroup').find('a').click(function(event) {
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    if (window.console){ console.log("點擊縣市的麵包屑"); }
					
					// get zip
                    var cityid = $(this).data('cityid');
                    get_zip(cityid,0);
                    // set ui
					//模擬點擊縣市搜尋條件
					if($('#search_bar').is(":visible")){
						$('#search_city a[data-cityid="' + cityid + '"]').click();
					}else{
						$('.rwdSearchcity input[value="' + cityid + '"]').click();
					}
                    
					
                    $('#search_zip').siblings('.search_item').find('.search_item_name').html('行政區');
                    $('#breadcrumb_city').find('li').removeClass('checked');
                    $(this).parent().addClass('checked');
                    $('#breadcrumb_city .dropdown_head a').attr('href', $(this).attr('href'));
                    $('#breadcrumb_city .dropdown_name').html($(this).text());
                    $('#breadcrumb_city .dropdown_itemGroup').removeClass('open');
                    $('#search_city_match a[data-cityid="' + cityid + '"]').click();
                    $('#search_zip_match').siblings('.search_item').find('.search_item_name').html('行政區');
                });
                $('#search_city_match').find('a').click(function() {
                    // radio button
                    $(this).parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
                    $(this).find('.radio_btn').addClass('checked');
                    $('#search_city').find('.radio_btn').removeClass('checked');
                    $('#search_city a[href="' + $(this).attr('href') + '"]').find('.radio_btn').addClass('checked');
                    // set ui
                    $('#search_city').siblings('.search_item').find('.search_item_name').html($(this).text());
                    $('#search_zip').siblings('.search_item').find('.search_item_name').html('行政區');
                    $('#breadcrumb_city').find('li').removeClass('checked');
                    $('#breadcrumb_city .dropdown_itemGroup').find('a[href="' + $(this).attr('href') + '"]').parent().addClass('checked');
                    $('#breadcrumb_city .dropdown_head a').attr('href', $(this).attr('href'));
                    $('#breadcrumb_city .dropdown_name').html($('#breadcrumb_city .dropdown_itemGroup').find('a[href="' + $(this).attr('href') + '"]').text());
                    $('#breadcrumb_zip .dropdown_name').html('不分區');
                    $('#search_city_match').siblings('.search_item.open').click(); // close
                    $('#search_city_match').siblings('.search_item').find('.search_item_name').html($(this).text());
                    $('#search_zip_match').siblings('.search_item').find('.search_item_name').html('行政區');
                    // get zip
                    get_zip($(this).data('cityid'),0);
                });

                // search - zip
                $('#search_zip').on('click', 'a', function(event) {
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    // set url
                    //$.set_url_item($(this).attr('href').replace('/index.html','').split('/').slice(-1)[0]);
                    // set ui
                    if ($(this).find('.checkbox_btn').hasClass('checked')){
                        $(this).find('.checkbox_btn').removeClass('checked');
                    }else{
                        $(this).find('.checkbox_btn').addClass('checked');
					}
					
                    if ($('#breadcrumb_zip .dropdown_itemGroup a[href="' + $(this).attr('href') + '"]').parent().hasClass('checked')){
                        $('#breadcrumb_zip .dropdown_itemGroup a[href="' + $(this).attr('href') + '"]').parent().removeClass('checked');
                    }else{
                        $('#breadcrumb_zip .dropdown_itemGroup a[href="' + $(this).attr('href') + '"]').parent().addClass('checked');
					}
					
                    if ($('#search_zip_match a[href="' + $(this).attr('href') + '"] .checkbox_btn').hasClass('checked')){
                        $('#search_zip_match a[href="' + $(this).attr('href') + '"] .checkbox_btn').removeClass('checked');
                    }else{
                        $('#search_zip_match a[href="' + $(this).attr('href') + '"] .checkbox_btn').addClass('checked');
					}
                    set_zip_name();
                });
				//點擊行政區的麵包屑
                $('#breadcrumb_zip .dropdown_itemGroup').on('click', 'a', function(event) {
					if (window.console){ console.log("#breadcrumb_zip .dropdown_itemGroup a click"); }
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    if (window.console){ console.log("點擊行政區的麵包屑"); }
					
					// set url
					//模擬點擊行政區條件
					/*
					if($('#search_bar').is(":visible")){
						$('#search_zip input[value="'+$(this).attr('data-value')+'"]').click();
					}else{
						$('.rwdSearchzip input[value="'+$(this).attr('data-value')+'"]').click();
					}
					*/
                    $.set_url_item($(this).attr('href').replace('/index.html', '').split('/').slice(-1)[0]);
					
                    // set ui
                    if ($(this).parent().hasClass('checked')){
                        $(this).parent().removeClass('checked');
                    }else{
                        $(this).parent().addClass('checked');
					}
					
					if ($('#search_zip a[href="' + $(this).attr('href') + '"]').find('.checkbox_btn').hasClass('checked')){
                        $('#search_zip a[href="' + $(this).attr('href') + '"]').find('.checkbox_btn').removeClass('checked');
                    }else{
                        $('#search_zip a[href="' + $(this).attr('href') + '"]').find('.checkbox_btn').addClass('checked');
					}
                    
                    set_zip_name();
                    $('#breadcrumb_zip .dropdown_itemGroup').removeClass('open');
                });
				//設定行政區-麵包屑顯示的名稱
                function set_zip_name() {
                    // search_zip
                    var search_item_name = $('#search_zip').siblings('.search_item').find('.search_item_name');
                    var zip_name = $('#search_zip').find('.checked').eq(0).parent().text();
                    if ($('#search_zip').find('.checked').length > 1) {
                        zip_name += '＋';
                    }
                    if (!zip_name) zip_name = '行政區';
                    search_item_name.html(zip_name);
                    // breadcrumb_zip
                    var zip_code = [];
                    $('#breadcrumb_zip').find('.checked').each(function() {
                        zip_code.push($(this).find('a').attr('href').replace('-zip/index.html', '').split('/').slice(-1)[0]);
                    });
                    $('#breadcrumb_zip .dropdown_head a').attr('href', '/' + search_type + '/' + zip_code.join('-') + '-zip/index.html');
                    $('#breadcrumb_zip .dropdown_name').html(zip_name);
                    
                    search_item_name.html(zip_name);
                }
            } else if (search_type == 'mrt') {
				// search - mrtline
                $('#search_mrtline').on('click', 'input[type="checkbox"]', function() {
                    if (window.console){ console.log('#search_mrtline input[type="checkbox"] click'); }
					
					// radio button
                    $('#search_mrtline label.checked').removeClass('checked');			
					$(this).parent().addClass('checked');
					
					//$('#breadcrumb_mrtline .dropdown_itemGroup .dropdown_item.checked').removeClass('checked');
					//$('#breadcrumb_mrtline .dropdown_itemGroup').find('a[data-value="' + $(this).val() + '"]').parent().addClass('checked');
					
					
                    //set ui
					var tmp_href='/mrt/'+$(this).val()+'-mrtline/index.html';
					//console.log("#breadcrumb_mrtline .dropdown_itemGroup href:"+tmp_href);
                    $('#search_mrtline').siblings('.search_item.open').click(); //close
                    $('#search_mrtline').siblings('.search_item').find('.search_item_name').html($(this).attr("data-name"));
                    $('#search_mrt').siblings('.search_item').find('.search_item_name').html('捷運線');
                    $('#breadcrumb_mrtline').find('li').removeClass('checked');
                    $('#breadcrumb_mrtline .dropdown_itemGroup').find('a[href="' + tmp_href + '"]').parent().addClass('checked');
                    $('#breadcrumb_mrtline .dropdown_head a').attr('href', tmp_href);
                    $('#breadcrumb_mrtline .dropdown_name').html($('#breadcrumb_mrtline .dropdown_itemGroup').find('a[href="' + tmp_href + '"]').text());
                    
					$('#breadcrumb_mrt .dropdown_name').html('捷運線');
                    // get station
                    get_mrt($(this).val());
                });
				//點擊捷運線的麵包屑
                $('#breadcrumb_mrtline .dropdown_itemGroup').find('a').click(function(event) {
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    if (window.console){ console.log("點擊捷運線的麵包屑"); }
					
					// get mrt
                    var mrtlineid = $(this).attr('data-value');
                    get_mrt(mrtlineid);
                    // set ui
					//模擬點擊捷運線搜尋條件
					if($('#search_bar').is(":visible")){
						$('#search_mrtline input[value="' + mrtlineid + '"]').click();
					}else{
						$('.rwdSearchmrtline input[value="' + mrtlineid + '"]').click();
					}
                    
                    $('#breadcrumb_mrtline').find('li').removeClass('checked');
                    $(this).parent().addClass('checked');
                    $('#breadcrumb_mrtline .dropdown_head a').attr('href', $(this).attr('href'));
                    $('#breadcrumb_mrtline .dropdown_name').html($(this).text());
                    $('#breadcrumb_mrtline .dropdown_itemGroup').removeClass('open');
                });
				
                $('#search_mrt').on('click', 'input[type="checkbox"]', function() {
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
					if (window.console){ console.log("search_mrt click"); }
                    // set url
                    //$.set_url_item($(this).attr('href').replace('/index.html','').split('/').slice(-1)[0]);
                    // set ui
                    if ($(this).parent().hasClass('checked')){
                        $(this).parent().removeClass('checked');
						$('#breadcrumb_mrt .dropdown_itemGroup').find('a[data-value="' + $(this).val() + '"]').parent().removeClass('checked');
                    }else{
                        $(this).parent().addClass('checked');
						$('#breadcrumb_mrt .dropdown_itemGroup').find('a[data-value="' + $(this).val() + '"]').parent().addClass('checked');
					}
					
                    if ($('#breadcrumb_mrt .dropdown_itemGroup a[href="' + $(this).attr('href') + '"]').parent().hasClass('checked')){
                        $('#breadcrumb_mrt .dropdown_itemGroup a[href="' + $(this).attr('href') + '"]').parent().removeClass('checked');
                    }else{
                        $('#breadcrumb_mrt .dropdown_itemGroup a[href="' + $(this).attr('href') + '"]').parent().addClass('checked');
					}					
                    set_mrt_name();

				/*
					// radio button
                    //$('#search_mrt label.checked').removeClass('checked');
					//$(this).parent().parent().parent().parent().attr("data-debug","aaaa")
                    //console.log('#search_mrtline index'+$('#search_mrtline input[type="checkbox"]').index(this));
					$(this).parent().addClass('checked');
                    //set ui
					var tmp_href='/mrt/'+$(this).val()+'-mrt/index.html';
					//console.log("#breadcrumb_mrtline .dropdown_itemGroup href:"+tmp_href);

                    $('#search_mrt').siblings('.search_item.open').click(); //close
                    $('#search_mrt').siblings('.search_item').find('.search_item_name').html($(this).attr("data-name"));

                    $('#breadcrumb_mrt').find('li').removeClass('checked');
                    $('#breadcrumb_mrt .dropdown_itemGroup').find('a[href="' + tmp_href + '"]').parent().addClass('checked');
                    $('#breadcrumb_mrt .dropdown_head a').attr('href', tmp_href);
                    $('#breadcrumb_mrt .dropdown_name').html($('#breadcrumb_mrt .dropdown_itemGroup').find('a[href="' + tmp_href + '"]').text());
					*/
                });	
				//點擊捷運站的麵包屑
                $('#breadcrumb_mrt .dropdown_itemGroup').on('click', 'a', function(event) {
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    if (window.console){ console.log("點擊捷運站的麵包屑"); }
					
					// set url
					//模擬點擊捷運站條件
					/*
					if($('#search_bar').is(":visible")){
						$('#search_city input[value="'+$(this).attr('data-value')+'"]').click();
					}else{
						$('.rwdSearchmrt input[value="'+$(this).attr('data-value')+'"]').click();
					}
					*/
					var href = $(this).attr('href');
					
					if($('#search_bar').is(":visible")){
						$.set_url_item(href.replace('/index.html','').split('/').slice(-1)[0]);
					}else{
						$.set_url_item2(href.replace('/index.html','').split('/').slice(-1)[0]);
					}
					
					// set ui
					if ($(this).parent().hasClass('checked')){
						$(this).parent().removeClass('checked');
					}else{
						$(this).parent().addClass('checked');
					}
					
					if($('#search_mrt input[value="'+$(this).attr("data-value")+'"]').parent().hasClass('checked')){
						$('#search_mrt input[value="'+$(this).attr("data-value")+'"]').parent().removeClass('checked');
					}else{
						$('#search_mrt input[value="'+$(this).attr("data-value")+'"]').parent().addClass('checked');
					}

					if($('.rwdSearchmrt input[value="'+$(this).attr("data-value")+'"]').parent().hasClass('checked')){
						$('.rwdSearchmrt input[value="'+$(this).attr("data-value")+'"]').parent().removeClass('checked');
					}else{
						$('.rwdSearchmrt input[value="'+$(this).attr("data-value")+'"]').parent().addClass('checked');
					}

					
					set_mrt_name();
					$('#breadcrumb_mrt .dropdown_itemGroup').removeClass('open');
                });		
				//設定捷運站-麵包屑顯示的名稱
                function set_mrt_name() {
					var mrt_name = $('#breadcrumb_mrt .dropdown_itemGroup .dropdown_item.checked a').eq(0).attr("data-name");
					if($('#breadcrumb_mrt .dropdown_itemGroup .dropdown_item.checked').length>1){
						mrt_name+="＋";
					}
					if (!mrt_name){ mrt_name = '捷運站'; }
					
					// breadcrumb_mrt
					var mrt_code = [];
					$('#breadcrumb_mrt').find('.checked').each(function() {
						mrt_code.push($(this).find('a').attr('href').replace('-zip/index.html', '').split('/').slice(-1)[0]);
					});
					$('#breadcrumb_mrt .dropdown_head a').attr('href', '/' + search_type + '/' + mrt_code.join('-') + '-zip/index.html');
					$('#breadcrumb_mrt .dropdown_name').html(escapeHtml(mrt_name,true));
					
					
					$('#search_mrt').siblings().find('.search_item_name').html(escapeHtml(mrt_name,true));
					$('.rwdSearchmrt').find('.phone-down-menu-2.administrative-button').html(escapeHtml(mrt_name,true));
                }
           }

            // order
            $('#search_order_name, #search_order .icon').click(function() {
                if ($('#search_order_itemGroup').hasClass('open'))
                    $('#search_order_itemGroup').removeClass('open');
                else
                    $('#search_order_itemGroup').addClass('open');
            });
            $('body').click(function(e) {
                if (($('#search_order').has(e.target).length > 0 || $(e.target).attr('id') == 'search_order') === false) {
                    $('#search_order_itemGroup').removeClass('open');
                }
            });
			//點選排序選單
            $('#search_order_itemGroup').on('click', 'a', function(event) {
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
                $('#search_order_name').html($(this).text());
				if($('#search_bar').is(":visible")){
					$.set_url_item($(this).attr('href').replace('/index.html', '').split('/').slice(-1)[0]);
				}else{
					$.set_url_item2($(this).attr('href').replace('/index.html', '').split('/').slice(-1)[0]);
				}
                $('#search_order_itemGroup').removeClass('open');
            });
            $('#item_default_sort').click(function() {
                $.set_url_item('ALL-asc');
                $('#search_order_name').html($(this).text());
                $('#search_order_itemGroup').removeClass('open');
            });

			/*
            // set page
            function set_page(current_page, total_page) {
                var show_pages = 5;
                var page_html = '';
                $('#search_pagination').html('');
                if (total_page <= show_pages) {
                    for (var i = 1; i <= total_page; i++) {
                        if (i == current_page) {
                            page_html += '<li class="page current" data-url="' + i + '-page">' + i + '</li>';
                        } else {
                            page_html += '<li class="page" data-url="' + i + '-page">' + i + '</li>';
                        }
                    }
                } else {
                    if (current_page == 1 || current_page == 2) {
                        if (current_page != 1) page_html += '<li class="page" data-url="1-page">1</li>';
                        for (var i = current_page; i < (parseInt(current_page) + parseInt(show_pages)); i++) {
                            if (i == current_page) {
                                page_html += '<li class="page current" data-url="' + i + '-page">' + i + '</li>';
                            } else {
                                page_html += '<li class="page" data-url="' + i + '-page">' + i + '</li>';
                            }
                        }
                        page_html += '<li class="page" data-url="' + (parseInt(current_page) + 1) + '-page">»</li>';
                        page_html += '<li class="page_dot">…</li>';
                        page_html += '<li class="page" data-url="' + total_page + '-page">' + total_page + '</li>';
                    } else if (current_page == total_page || current_page == total_page - 1) {
                        page_html += '<li class="page" data-url="1-page">1</li>';
                        page_html += '<li class="page_dot">…</li>';
                        page_html += '<li class="page" data-url="' + (parseInt(current_page) - 1) + '-page">«</li>';
                        for (var i = (parseInt(current_page) - parseInt(show_pages) + 1); i <= current_page; i++) {
                            if (i == current_page) {
                                page_html += '<li class="page current" data-url="' + i + '-page">' + i + '</li>';
                            } else {
                                page_html += '<li class="page" data-url="' + i + '-page">' + i + '</li>';
                            }
                        }
                        if (current_page != total_page) page_html += '<li class="page" data-url="' + total_page + '-page">' + total_page + '</li>';
                    } else {
                        page_html += '<li class="page" data-url="1-page">1</li>';
                        if (current_page > 1 + (show_pages + 1) / 2) page_html += '<li class="page_dot">…</li>';
                        page_html += '<li class="page" data-url="' + (parseInt(current_page) - 1) + '-page">«</li>';
                        for (var i = current_page - ((show_pages - 1) / 2); i <= (parseInt(current_page) + ((show_pages - 1) / 2)); i++) {
                            if (i > 0 && i != 1 && i != total_page) {
                                if (i == current_page) {
                                    page_html += '<li class="page current" data-url="' + i + '-page">' + i + '</li>';
                                } else {
                                    page_html += '<li class="page" data-url="' + i + '-page">' + i + '</li>';
                                }
                            }
                        }
                        page_html += '<li class="page" data-url="' + (parseInt(current_page) + 1) + '-page">»</li>';
                        if (current_page < (parseInt(total_page) - (show_pages + 1) / 2)) page_html += '<li class="page_dot">…</li>';
                        page_html += '<li class="page" data-url="' + total_page + '-page">' + total_page + '</li>';
                    }
                }
                $('#search_pagination').append(page_html);
            }
			*/

            $('#search_pagination').on('click', 'li', function() {
                $.set_url_item($(this).data('url'));
                $('html, body').animate({
                    scrollTop: $('#buy_content').offset().top
                }, 500);
            });
            $('#search_keyword .button_keyword').click(function() {
                if ($('#search_price').hasClass('open'))
                    $('input[type="button"][name="price"]').click();
                if ($('#search_more').hasClass('open') && $('input[type="button"][name="room"]').parent().find('.radio_btn').hasClass('checked'))
                    $('input[type="button"][name="room"]').click();
                if ($('#search_more').hasClass('open') && $('input[type="button"][name="roomtotal"]').parent().find('.radio_btn').hasClass('checked'))
                    $('input[type="button"][name="roomtotal"]').click();
                if ($('#search_more').hasClass('open') && $('input[type="button"][name="floor"]').parent().find('.radio_btn').hasClass('checked'))
                    $('input[type="button"][name="floor"]').click();
                if ($('#search_more').hasClass('open') && $('input[type="button"][name="year"]').parent().find('.radio_btn').hasClass('checked'))
                    $('input[type="button"][name="year"]').click();

                if ($('#search_keyword .input_keyword').val()) {
                    if ($('#search_keyword .input_keyword').val() != search_keyword_placeholder) {
                        $.set_url_item($('#search_keyword .input_keyword').val() + '-keyword');
                    } else {
                        $.set_url_item('ALL-keyword');
                    }
                } else {
                    $.set_url_item('ALL-keyword');
                }
            });

            // search subscribe
			/*
            var subscribe_click_count = 0;
            $('#search_subscribe input[type="button"]').click(function() {
                if (!$.isEmptyObject(url_json['tags']['option'])) {
                    if ($.get_search_criteria())
                        $('#match_criteria').html($.get_search_criteria());
                    var tags_match_html = '';
                    $.each(url_json['tags']['option'], function(k, v) {
                        if (k % 9 == 1) tags_match_html += '<tr>';
                        tags_match_html += '<td><input type="checkbox" data-tagid="' + k + '"> <a href="/' + search_type + '/' + k + '-tags/index.html">' + v + '</a></td>';
                        if (k % 9 == 0) tags_match_html += '</tr>';
                    });
                    tags_match_html += '</tr>';
                    $('#search_tags_match').html(tags_match_html);

                    $.each($.get_url_item(), function(index, value) {
                        if (value.match(/tags/))
                            $('#search_bar_match  a[href="/' + search_type + '/' + value + '/index.html"] .checkbox_btn').addClass('checked');
                        $('#search_tags_match a[href="/' + search_type + '/' + value + '/index.html"]').siblings('input[type="checkbox"]').prop('checked', true);
                    });
                    $('#match_dialog').dialog('open');
                } else {
                    if (subscribe_click_count < 10) {
                        setTimeout(function() {
                            subscribe_click_count++;
                            $('#search_subscribe input[type="button"]').click();
                        }, 250);
                    }
                }
            });
            $('#match_dialog_submit').click(function() {
                var path = 'http://' + window.location.host + '/' + search_type + '/' + $.get_url_path() + '/index.html';
                var email = $('#match_dialog input[name="email"]').val();
                var mobile = $('#match_dialog input[name="mobile"]').val();
                var criteria = $.get_search_criteria();
                if (criteria == '') {
                    alert('您至少得選擇一組篩選條件如：縣市、行政區或總價‧‧‧等。');
                } else if (!chkMail(email)) {
                    alert('Email格式錯誤');
                } else if (!chkMobile(mobile)) {
                    alert('手機格式錯誤');
                } else {
                    if (!$(this).hasClass('processing')) {
                        $(this).addClass('processing');
                        $.ajax({
                            url: '/cgi/match/addMatch.json',
                            type: 'POST',
                            data: { email: email, mobile: mobile, params: path, criteria: criteria },
                            dataType: 'json'
                        }).done(function(data) {
                            $('#match_dialog_submit').removeClass('processing');
                            if (data.OPT.status == 'OK') {
                                emaillog($.get_url_path().split('/').join('_'));
                                alert('系統已主動寄出確認信，請務必點選確認，已完成您的訂閱作業。');
                                $('#match_dialog').dialog('close');
                            } else if (data.OPT.status == 'ERROR') {
                                alert(data.OPT.message);
                            } else {
                                alert('傳送訂閱資料時發生錯誤，請稍候再試。');
                            }
                        }).fail(function(jqXHR, textStatus) {
                            $('#match_dialog_submit').removeClass('processing');
                            if (window.console)
                                console.log('"/cgi/match/addMatch.json" Request failed: ' + textStatus);
                            alert('傳送訂閱資料時發生錯誤，請稍候再試。');
                        });
                    }
                }
            });
            $('#search_keyword_match .button_reset').click(function() {
                window.location.href = '//' + encodeURIComponent(window.location.host) + '/' + search_type + '/' + 'index.html#subscribe';
            });
			*/

            //設定搜尋條件預設值
			//input: v 1-cond
			//同一個條件的複數選項會呼叫多次執行
            function set_default_ui(v) {
				if (window.console){ console.log("set_default_ui"); }
                // for mansion-building-type
                if (v == 'mansion-type' || v == 'building-type') {
                    v = 'mansion-building-type'
                }

                var a_btn = $('#search_bar').find('a[href="/' + search_type + '/' + v + '/index.html"]');
				
				//設定.radio_btn, .checkbox_btn的預設核取效果
                // radio, checkbox
                a_btn.parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
                a_btn.find('.radio_btn, .checkbox_btn').addClass('checked');

                // match
                var a_btn_match = $('#search_bar_match').find('a[href="/' + search_type + '/' + v + '/index.html"]');
                a_btn_match.parent().parent().siblings().andSelf().find('.radio_btn').removeClass('checked');
                a_btn_match.find('.radio_btn, .checkbox_btn').addClass('checked');

                // city, county, price, use, type, area, area, landarea, areaplan, room, roomtotal, keyword, floor, year, sell, asc, desc, sort
                var item = v.split('-')[v.split('-').length - 1];
                if (item == 'city' || item == 'county') {
                    if (a_btn.text() || a_btn_match.text()) {
                        $('#search_city').siblings('.search_item').find('.search_item_name').html(a_btn.text());
                        $('#search_city_match').siblings('.search_item').find('.search_item_name').html(a_btn_match.text());
                        var dropdown = $('.dropdown_itemGroup').find('a[href="/' + search_type + '/' + v + '/index.html"]');
                        dropdown.parent().parent().parent().find('.dropdown_head a').attr('href', '/' + search_type + '/' + v + '/index.html');
                        dropdown.parent().parent().parent().find('.dropdown_name').text(dropdown.text());
                        dropdown.parent().addClass('checked');
                        get_zip(a_btn.data('cityid'),1);
                    }
                } else if (item == 'mrtline') {
					console.log("mrtline::"+ a_btn.text()+","+v);
                    if(typeof filter.mrtline != "undefined"){ 
                        var mrtline_name=$('#search_mrtline input[value="'+filter.mrtline+'"]').attr("data-name");
						$('#search_mrtline').siblings('.search_item').find('.search_item_name').text(mrtline_name);
						
						$('#search_mrtline input[type="checkbox"]').each(function (){
							if($(this).val()==filter.mrtline){
								$(this).parent().addClass("checked");
							}
						});;
						
                        var dropdown = $('.dropdown_itemGroup').find('a[href="/' + search_type + '/' + filter.mrtline + '-mrtline/index.html"]');
                        dropdown.parent().parent().parent().find('.dropdown_head a').attr('href', '/' + search_type + '/' + filter.mrtline + '-mrtline/index.html');
                        dropdown.parent().parent().parent().find('.dropdown_name').text(dropdown.text());
                        dropdown.parent().addClass('checked');
                        get_mrt(filter.mrtline);
                    }
                } else if (item == 'mrt') {
					/*
					if(typeof filter.mrt != "undefined"){ 
						$('#search_mrt').siblings('.search_item').find('.search_item_name').text(filter.mrt);
						for(var i=0;i<filter.mrt.length;i++){
							var mrtline_name=$('#search_mrtline input[value="'+filter.mrtline+'"]').attr("data-name");
							$('#search_mrtline input[type="checkbox"]').each(function (index){
								if($(this).val()==filter.mrt[i]){
									$(this).parent().addClass("checked");
								}
							});
						}
					}
					*/
                } else if (item == 'price') {
                    //v.split('-')[0]+"-"+v.split('-')[1]
					var a_btn = $('#search_price').find('a[href="/' + search_type + '/' + v.split('-')[0]+"-"+v.split('-')[1] + '-price/index.html"]');
					if (a_btn.text()) {
						//console.log("price ok");
						$('#search_price').siblings('.search_item').find('.search_item_name').html(v.split('-')[0] +"-"+ v.split('-')[1]);
						a_btn.find(".radio_btn").addClass('checked');
					}else{
						//console.log("price none");
var price_sign = '＋';
						var min_price, max_price, max_price_s;
						if (v.split('-')[1] == 'down') {
							price_sign = '－';
							min_price = 0;
							max_price = max_price_s = v.split('-')[0];
						} else if (v.split('-')[1] == 'up') {
							min_price = v.split('-')[0];
							max_price = 'up';
							max_price_s = price_any;
						} else {
							min_price = v.split('-')[0];
							max_price = max_price_s = v.split('-')[1];
						}
						$('#search_price').siblings('.search_item').find('.search_item_name').html(v.split('-')[0] + price_sign);
						$('.min_price').siblings(".radio_btn").addClass('checked');
						//$('#search_price_match').siblings('.search_item').find('.search_item_name').html(v.split('-')[0] + price_sign);
						$('#search_price .min_price').val(min_price);
						$('#search_price .max_price').val(max_price);
						$('#search_price .max_price_s').val(max_price_s);
						$('#search_price_match .min_price').val(min_price);
						$('#search_price_match .max_price').val(max_price);
						$('#search_price_match .max_price_s').val(max_price_s);						
						
					}
					//var a_btn = $('#search_bar').find('a[href="/' + search_type + '/' + value + '/index.html"]');v);
					//});
                } else if (item == 'use') {
                    var use_name = $('#search_use').siblings('.search_item').find('.search_item_name');
                    if (a_btn.text() && a_btn.text() != '套房' && a_btn.text() != '車位') {
                        if (use_name.html() == '類型')
                            use_name.html(a_btn.text());
                        else if (!use_name.text().match('＋'))
                            use_name.html(use_name.html() + '＋');
                    }
                    var use_name_match = $('#search_use_match').siblings('.search_item').find('.search_item_name');
                    if (a_btn_match.text() && a_btn_match.text() != '套房' && a_btn_match.text() != '車位') {
                        if (use_name_match.html() == '類型')
                            use_name_match.html(a_btn_match.text());
                        else if (!use_name_match.text().match('＋'))
                            use_name_match.html(use_name_match.html() + '＋');
                    }
                } else if (item == 'type') {
                    var use_name = $('#search_itemtype').siblings('.search_item').find('.search_item_name');
                    if (a_btn.text()) {
                        if (use_name.html() == '類型')
                            use_name.html(a_btn.text());
                        else if (!use_name.text().match('＋'))
                            use_name.html(use_name.html() + '＋');
                    }
                } else if (item == 'area' || item == 'area' || item == 'landarea') {
                    $('.search_option').removeClass('selected');
                    $('#search_option_' + item).addClass('selected');
                    $('#search_option_' + item + '_match').addClass('selected');
                    $('.search_table').removeClass('selected');
                    $('#search_table_' + item).addClass('selected');
                    $('#search_table_' + item + '_match').addClass('selected');
                    var area_name = $('#search_area').siblings('.search_item').find('.search_item_name');
                    if (a_btn.text()) {
                        if (area_name.html() == '出租坪數')
                            area_name.html(a_btn.text());
                        else if (!area_name.text().match('＋'))
                            area_name.html(area_name.html() + '＋');
                    } else {
                        var v_1 = v.split('-')[0],
                            v_2 = v.split('-')[1],
                            v_3 = v.split('-')[2];
                        if (v_2 == 'down') {
                            area_name.html(v_1 + '坪以下');
                            $('#search_area .max_' + v_3).val(v_1);
                        } else if (v_2 == 'up') {
                            area_name.html(v_1 + '坪以上');
                            $('#search_area .min_' + v_3).val(v_1);
                        } else {
                            area_name.html(v_1 + '-' + v_2 + '坪');
                            $('#search_area .min_' + v_3).val(v_1);
                            $('#search_area .max_' + v_3).val(v_2);
                        }
                        $('#search_area_match .min_' + v_3).prev('.radio_btn').addClass('checked');
                    }
                    var area_name_match = $('#search_area_match').siblings('.search_item').find('.search_item_name');
                    if (a_btn_match.text()) {
                        if (area_name_match.html() == '出租坪數')
                            area_name_match.html(a_btn_match.text());
                        else if (!area_name_match.text().match('＋'))
                            area_name_match.html(area_name_match.html() + '＋');
                    } else {
                        var v_1 = v.split('-')[0],
                            v_2 = v.split('-')[1],
                            v_3 = v.split('-')[2];
                        if (v_2 == 'down') {
                            area_name_match.html(v_1 + '坪以下');
                            $('#search_area_match .max_' + v_3).val(v_1);
                        } else if (v_2 == 'up') {
                            area_name_match.html(v_1 + '坪以上');
                            $('#search_area_match .min_' + v_3).val(v_1);
                        } else {
                            area_name_match.html(v_1 + '-' + v_2 + '坪');
                            $('#search_area_match .min_' + v_3).val(v_1);
                            $('#search_area_match .max_' + v_3).val(v_2);
                        }
                        $('#search_area_match .min_' + v_3).prev('.radio_btn').addClass('checked');
                    }
                } else if (item == 'areaplan') {
                    var areaplan_name = $('#search_areaplan').siblings('.search_item').find('.search_item_name');
                    if (a_btn.text()) {
                        if (areaplan_name.html() == '坪數規劃')
                            areaplan_name.html(a_btn.text());
                        else if (!areaplan_name.text().match('＋'))
                            areaplan_name.html(areaplan_name.html() + '＋');
                    }
                } else if (item == 'room') {
                    var room_name = $('#search_room').siblings('.search_item').find('.search_item_name');
                    if (room_name.length > 0) {
                        if (a_btn.text()) {
                            if (room_name.html() == '房數')
                                room_name.html(a_btn.text());
                            else if (!room_name.text().match('＋'))
                                room_name.html(room_name.html() + '＋');
                        }
                    } else {
                        if (v != '0-up-room' && v != '1-up-room' && v != '2-up-room' && v != '3-up-room' && v != '4-up-room' && v != '5-up-room' && v != '6-up-room') {
                            if (v.split('-')[1] == 'up') {
                                $('.min_room').val(v.split('-')[0]);
                            } else if (v.split('-')[1] == 'down') {
                                $('.max_room').val(v.split('-')[0]);
                            } else {
                                $('.min_room').val(v.split('-')[0]);
                                $('.max_room').val(v.split('-')[1]);
                            }
                            $('.min_room').prev('.radio_btn').addClass('checked');
                        }
                    }
                } else if (item == 'roomtotal') {
                    var roomtotal_name = $('#search_roomtotal').siblings('.search_item').find('.search_item_name');
                    if (roomtotal_name.length > 0) {
                        if (a_btn.text()) {
                            if (roomtotal_name.html() == '房數')
                                roomtotal_name.html(a_btn.text());
                            else if (!roomtotal_name.text().match('＋'))
                                roomtotal_name.html(room_name.html() + '＋');
                        }
                    } else {
                        if (v != '0-up-roomtotal' && v != '1-up-roomtotal' && v != '2-up-roomtotal' && v != '3-up-roomtotal' && v != '4-up-roomtotal' && v != '5-up-roomtotal' && v != '6-up-roomtotal') {
                            if (v.split('-')[1] == 'up') {
                                $('.min_roomtotal').val(v.split('-')[0]);
                            } else if (v.split('-')[1] == 'down') {
                                $('.max_roomtotal').val(v.split('-')[0]);
                            } else {
                                $('.min_roomtotal').val(v.split('-')[0]);
                                $('.max_roomtotal').val(v.split('-')[1]);
                            }
                            $('.min_roomtotal').prev('.radio_btn').addClass('checked');
                        }
                    }
                    $('#roomtotal_check').find('.checkbox_btn').addClass('checked');
                    $('#search_room_choice').hide();
                    $('#search_roomtotal_choice').show();
                } else if (item == 'keyword') {
                    $('#search_keyword .input_keyword').val(v.replace('-keyword', '')).removeClass('placeholder').addClass('clear');
                    $('#search_keyword_match .input_keyword').val(v.replace('-keyword', '')).removeClass('placeholder').addClass('clear');
                    $('#clear_kw').show();
                    $('#search_suggest_link span a').each(function() {
                        $(this).attr('href', $(this).attr('href') + '?ori=' + v.replace('-keyword', ''));
                    });
                } else if (item == 'floor' && v != '1-1-floor' && v != '2-7-floor' && v != '8-10-floor' && v != '11-up-floor') {
                    if (v.split('-')[1] == 'up') {
                        $('.min_floor').val(v.split('-')[0].toUpperCase());
                    } else if (v.split('-')[1] == 'down') {
                        $('.max_floor').val(v.split('-')[0].toUpperCase());
                    } else {
                        $('.min_floor').val(v.split('-')[0].toUpperCase());
                        $('.max_floor').val(v.split('-')[1].toUpperCase());
                    }
                    $('.min_floor').prev('.radio_btn').addClass('checked');
                } else if (item == 'year' && v != '0-5-year' && v != '6-10-year' && v != '11-20-year' && v != '21-30-year' && v != '31-40-year' && v != '41-up-year') {
                    if (v.split('-')[1] == 'up') {
                        $('.min_year').val(v.split('-')[0]);
                    } else if (v.split('-')[1] == 'down') {
                        $('.max_year').val(v.split('-')[0]);
                    } else {
                        $('.min_year').val(v.split('-')[0]);
                        $('.max_year').val(v.split('-')[1]);
                    }
                    $('.min_year').prev('.radio_btn').addClass('checked');
                } else if (item == 'sell') {
                    a_btn.find('.i_search_checkbox').addClass('checked');
                } else if (item == 'asc' || item == 'desc' || item == 'sort') {
                    var sort_name = $('#search_order').find('a[href="/' + search_type + '/' + v + '/index.html"]').text();
                    $('#search_order_name').html(sort_name);
                }

                // foreign's zip is dead
                if (search_type == 'foreign') {
                    if (item == 'zip') {
                        var zip_name = $('#search_zip').siblings('.search_item').find('.search_item_name');
                        if (a_btn.text()) {
                            if (zip_name.html() == '行政區')
                                zip_name.html(a_btn.text());
                            else if (!zip_name.text().match('＋'))
                                zip_name.html(zip_name.html() + '＋');
                        }
                    }
                }

                // open subscribe
                if (window.location.hash == '#subscribe') {
                    $('#search_subscribe input[type="button"]').click();
                }

                // search criteria
                $('#search_criteria').html($.get_search_criteria());

                // breadcrumb
                $('#breadcrumb_params').html('');
                if ($.get_search_criteria() != '') {	
                    $.each($.get_search_criteria().split('、'), function(k, value) {	
                        //ui加入麵包屑(keyword以外)
						if (!$.get_url_item()[k].match(/keyword/)){
                            $('#breadcrumb_params').append('<span><a href="/' + search_type + '/' + $.get_url_item()[k] + '/index.html"><div class="close_btn"></div></a>' + value + '</span>');
						}
                    });
                }

                // tag
                $.each($.get_url_item(), function(index, value) {
                    if (value.match(/tags/)) {
                        $('#search_bar .tag_itemGroup ul li a[href="/' + search_type + '/' + value + '/index.html"] .tag_item').addClass('selected');
                    }
                });
            }
			
			function set_default_ui_rwd(){
				if($(".rwdsearch").length==0){ return false; }
				if (window.console){ console.log("set_default_ui_rwd"); }
				if(typeof filter.city != "undefined"){ 
					$(".rwdSearchcity input").each(function (index){
						if($(this).data("id")==filter.city){
							$(this).parent().addClass("checked");
							get_zip_rwd($(this).val(),1);							
							$(".rwdSearchcity .phone-down-menu-2").html($(this).data("name"));
						}
					});
					//console.log("city:"+filter.city)
				}									
				if(typeof filter.zip != "undefined"){ 
					for(var i=0;i<filter.zip.length;i++){
						$(".rwdSearchzip input").each(function (index){
							if($(this).val()==filter.zip[i]){
								$(this).parent().addClass("checked");
							}
						});
					}
					
					if($(".rwdSearchzip label.checked").length==0){
						$(".rwdSearchzip .phone-down-menu-2").html("行政區");
					}else{
						var tmp_v=$(".rwdSearchzip label.checked input").eq(0).data("name");	
						if($(".rwdSearchzip label.checked").length>1){
							tmp_v+="+";
						}
						$(".rwdSearchzip .phone-down-menu-2").html(tmp_v);
					}

					//console.log("zip:"+filter.zip)
				}
				
				if(typeof filter.mrtline != "undefined"){ 
					$(".rwdSearchmrtline input").each(function (index){
						if($(this).val()==filter.mrtline){
							$(this).parent().addClass("checked");
							//getRwdMrt($(this).data("mrtsec"),1);
							get_mrt_rwd($(this).val(),1);							
							$(".rwdSearchmrtline .phone-down-menu-2").html($(this).attr("data-name"));
						}
					});
					//console.log("mrtline:"+filter.mrtline)
				}						
				if(typeof filter.mrt != "undefined"){ 
					for(var i=0;i<filter.mrt.length;i++){
						$(".rwdSearchmrt input").each(function (index){
							if($(this).val()==filter.mrt[i]){
								$(this).parent().addClass("checked");
							}
						});
					}
					
					if($(".rwdSearchmrt label.checked").length==0){
						$(".rwdSearchmrt .phone-down-menu-2").html("捷運站");
					}else{
						var tmp_v=$(".rwdSearchmrt label.checked input").eq(0).data("name");	
						if($(".rwdSearchmrt label.checked").length>1){
							tmp_v+="+";
						}
						$(".rwdSearchmrt .phone-down-menu-2").html(tmp_v);
					}

					//console.log("mrt:"+filter.mrt)
				}
				
				
				if(typeof filter.price != "undefined"){
					var price=filter.price[0]+"-"+filter.price[1]
					for(var i=0;i<filter.price.length;i++){
						var diyPrice=true; //是否使用自訂租金
						$(".rwdSearchprice input").each(function (index){
							if($(this).val()==price){
								$(this).parent().addClass("checked");
								diyPrice=false;
							}
						});
						if(diyPrice){
							$(".rwdSearchprice .rwdDiylabel_price").addClass("checked");
						}
					}
					if($(".rwdSearchprice .checked").length!=0){
						if(filter.price[0]!="" || filter.price[1]!=""){
							var tmp_v="";
							if(filter.price[1]=="up"){
								$(".rwdSearchprice .rwdmin_price").val(filter.price[0]);
								$(".rwdSearchprice .rwdmax_price").val("");
								tmp_v=filter.price[0]+"元以上";
							}else if(filter.price[1]=="down"){
								$(".rwdSearchprice .rwdmin_price").val("");
								$(".rwdSearchprice .rwdmax_price").val(filter.price[0]);
								tmp_v=filter.price[0]+"元以下";
							}else {
								$(".rwdSearchprice .rwdmin_price").val(filter.price[0]);
								$(".rwdSearchprice .rwdmax_price").val(filter.price[1]);
								tmp_v=filter.price[0]+"-"+filter.price[1]+"元";
							}
							$(".rwdSearchprice .phone-down-menu-2").html(tmp_v);
							$(".rwdSearchprice .rwdmin_price").parent().addClass("checked");
							console.log("def label price:"+tmp_v);
							console.log("def label pricennn:"+$(".rwdSearchprice .phone-down-menu-2").html());
						}				
					}else{
						//var tmp_v=$(".rwdSearchprice label.checked input").eq(0).data("name");	
						//$(".rwdSearchprice .phone-down-menu-2").html(tmp_v);
						//console.log("def label price2:"+tmp_v);
					}
					console.log("price:"+filter.price);
				}
				if(typeof filter.use != "undefined"){
					for(var i=0;i<filter.use.length;i++){
						$(".rwdSearchuse input").each(function (index){
							if($(this).val()==filter.use[i]){
								$(this).parent().addClass("checked");
							}
						});
					}
					
					if($(".rwdSearchuse label.checked").length==0){
						$(".rwdSearchuse .phone-down-menu-2").html("類型");
					}else{
						var tmp_v=$(".rwdSearchuse label.checked input").eq(0).data("name");	
						if($(".rwdSearchuse label.checked").length>1){
							tmp_v+="+";
						}
						$(".rwdSearchuse .phone-down-menu-2").html(tmp_v);
					}
					
					//console.log("use:"+filter.use)
				}
				if(typeof filter.area != "undefined"){
					var area=filter.area[0]+"-"+filter.area[1];
					for(var i=0;i<filter.area.length;i++){
						var diyArea=true; //是否使用自訂坪數
						$(".rwdSearcharea input").each(function (index){
							if($(this).val()==area){
								$(this).parent().addClass("checked");
								diyArea=false;
							}
						});
						if(diyArea){
							$(".rwdSearcharea .rwdDiylabel_area").addClass("checked");
						}
					}
					if($(".rwdSearcharea .checked").length!=0){
						if(filter.area[0]!="" || filter.area[1]!=""){
							var tmp_v="";
							if(filter.area[1]=="up"){
								$(".rwdSearcharea .rwdmin_area").val(filter.area[0]);
								$(".rwdSearcharea .rwdmax_area").val("");
								tmp_v=filter.area[0]+"坪以上";
							}else if(filter.area[1]=="down"){
								$(".rwdSearcharea .rwdmin_area").val("");
								$(".rwdSearcharea .rwdmax_area").val(filter.area[0]);
								tmp_v=filter.area[0]+"坪以下";
							}else {
								$(".rwdSearcharea .rwdmin_area").val(filter.area[0]);
								$(".rwdSearcharea .rwdmax_area").val(filter.area[1]);
								tmp_v=filter.area[0]+"-"+filter.area[1]+"坪";
							}
							$(".rwdSearcharea .phone-down-menu-2").html(tmp_v);
							$(".rwdSearcharea .rwdmin_area").parent().addClass("checked");
							console.log("def label area:"+tmp_v);
						}				
					}else{
						//var tmp_v=$(".rwdSearcharea label.checked input").eq(0).data("name");	
						//$(".rwdSearcharea .phone-down-menu-2").html(tmp_v);
						//console.log("def label area2:"+tmp_v);
					}
					console.log("area:"+filter.area);
				}
				if(typeof filter.roomtotal != "undefined"){ 
					$("[name='room_type']").val("roomtotal");
					$(".rwdSearchroom label.roomtotal").addClass("checked");
					var diyRoom=true; //是否使用自訂房數
					var roomtotal=filter.roomtotal[0]+"-"+filter.roomtotal[1];
					$(".rwdSearchroom input[type=checkbox].room").each(function (index){
						if($(this).val()==roomtotal){
							$(this).parent().addClass("checked");
						}
						diyRoom=false;						
					});						
					if(diyRoom){
						if(filter.roomtotal[1]=="up"){
							$(".rwdSearchroom .rwdmin_room").val(filter.roomtotal[0]);
							$(".rwdSearchroom .rwdmax_room").val("");
						}else if(filter.roomtotal[1]=="down"){
							$(".rwdSearchroom .rwdmin_room").val("");
							$(".rwdSearchroom .rwdmax_room").val(filter.roomtotal[0]);
						}else {
							$(".rwdSearchroom .rwdmin_room").val(filter.roomtotal[0]);
							$(".rwdSearchroom .rwdmax_room").val(filter.roomtotal[1]);
						}
						$(".rwdSearchroom .rwdDiylabel_room").addClass("checked");
					}
					//console.log("roomtotal:"+filter.roomtotal)
				}
				if(typeof filter.room != "undefined"){
					$("[name='room_type']").val("room");
					var room=filter.room[0]+"-"+filter.room[1];
					var diyRoom=true; //是否使用自訂房數
					$(".rwdSearchroom input[type=checkbox].room").each(function (index){
						if($(this).val()==room){
							$(this).parent().addClass("checked");
							diyRoom=false;
						}						
					});						
					if(diyRoom){
						if(filter.room[1]=="up"){
							$(".rwdSearchroom .rwdmin_room").val(filter.room[0]);
							$(".rwdSearchroom .rwdmax_room").val("");
						}else if(filter.room[1]=="down"){
							$(".rwdSearchroom .rwdmin_room").val("");
							$(".rwdSearchroom .rwdmax_room").val(filter.room[0]);
						}else {
							$(".rwdSearchroom .rwdmin_room").val(filter.room[0]);
							$(".rwdSearchroom .rwdmax_room").val(filter.room[1]);
						}
						$(".rwdSearchroom .rwdDiylabel_room").addClass("checked");
					}
					//console.log("room:"+filter.room);
				}
				if(typeof filter.type != "undefined"){
					for(var i=0;i<filter.type.length;i++){
						$(".rwdSearchtype input").each(function (index){
							if($(this).val()==filter.type[i]){
								$(this).parent().addClass("checked");
							}
						});
					}
					//console.log("type:"+filter.type)
				}
				if(typeof filter.parking != "undefined"){
					$(".rwdSearchparking input").each(function (index){
						if($(this).val()==filter.parking){
							$(this).parent().addClass("checked");
						}
					});

					//console.log("parking:"+filter.parking);
				}
				if(typeof filter.tools != "undefined"){
					for(var i=0;i<filter.tools.length;i++){
						$(".rwdSearchtools input").each(function (index){
							if($(this).val()==filter.tools[i]){
								$(this).parent().addClass("checked");
							}
						});
					}
					//console.log("tools:"+filter.tools)
				}
				if(typeof filter.tags != "undefined"){
					for(var i=0;i<filter.tags.length;i++){
						$(".rwdSearchtags input").each(function (index){
							if($(this).val()==filter.tags[i]){
								$(this).parent().addClass("checked");
							}
						});
					}
					//console.log("tags:"+filter.tags);
				}
				if(typeof filter.keyword != "undefined"){
					$("input.rwdSearchkeyword").val(filter.keyword);
				}
			}
			
			
            var TO_count = 0;

            function waitForUrlItem() {
                if ($.get_url_item().length > 0) {
                    var tag_is_not_ready = 0;
                    $.each($.get_search_criteria().split('、'), function(k, value) {
						console.log("get_search_criteria:"+k+"-"+value);
                        if ($.isNumeric(value)){
							console.log("get_search_criteria isNumeric");
							tag_is_not_ready = 1;
						}

                    });
					//console.log("tag_is_not_ready:"+tag_is_not_ready);
                    if (tag_is_not_ready == 0) {
                        $.each($.get_url_item(), function(k, value) {
                            set_default_ui(value);
                            
                        });
						set_default_ui_rwd();
                    } else {
                        // wait 10 times to get $.get_url_item()
                        if (TO_count < 10) {
                            setTimeout(waitForUrlItem, 250);
                            TO_count++;
                        } else {
                            if (window.console) {
                                console.log('Error: Cannot get $.get_url_item()');
                            }
                        }
                    }
                } else {
                    // wait 10 times to get $.get_url_item()
                    if (TO_count < 10) {
                        setTimeout(waitForUrlItem, 250);
                        TO_count++;
                    } else {
                        if (window.console) {
                            console.log('Error: Cannot get $.get_url_item() reach limit');
                        }
                    }
                }
            }
			
			//首頁-搜尋初始化
			if(search_type=="list" || search_type=="mrt" || search_type=="map" > 0){
				waitForUrlItem();
			}
            

        } // end of if home or list+mrt
    } // end of if search_type
}); // end of $(function (){
	
//addFavoriteHouse
function addFavoriteHouse(houseno,act) {
	if (typeof addFavoriteFlag != 'undefined' && addFavoriteFlag==1 ){
		//alert("資料處理中，請稍候再試。");
		return false;
	}
	addFavoriteFlag=1;
	
	console.log("addFavoriteHouse:"+houseno+","+act);
	
	if (houseno!=null){
		if($(".addFavoriteLoading").length==0){
			$("body").append("<div class='addFavoriteLoading hide' />");
			$(".addFavoriteLoading")
			.html("<table><tr><td><div class='msg'>更新收藏中，請稍候</div></td></tr></table>")
			.removeClass("hide");
		}
	}
    $.ajax({
        url: 'ajaxFavoriteHouse.php',
        type: 'GET',
        data: { 
			houseno: houseno,
			act:act
		},
        dataType: 'json'
    }).done(function(data) {
		if (houseno!=null && data.info!=""){
			$(".addFavoriteLoading .msg").html(data.info);
			if(data.rs=="ok" && act=="add"){
				sendLog(houseno,'house_rent_favorite_log',[houseno]);
			}			
		}
		
		$("#track_result_list").html("");
		$.each(data.OPT.List, function(index, value) {
			$("#track_result_list").append(
				'<div id="track_result_'+value.NO+'" class="track_result_item">'+
				'<a href="'+value.url+'" target="_blank">'+
				'<div class="item_box item_box_left">'+
				'<div class="item_titlebox"><span class="item_title" alt="'+value.alt+'" title="'+value.alt+'">'+value.name+'</span></div>'+
				'<!-- .item_titlebox -->'+
				'<div class="item_imagebox">'+
				'<div class="item_img"><img alt="'+value.alt+'" title="'+value.alt+'" src="'+value.img+'" onerror="loadImgFail(this)"></div>'+
				'<div class="item_img_count">'+
				'<div class="icon i_img_cnt"></div>'+
				'<div class="img_count_txt">'+value.img_count+'</div>'+
				'</div>'+
				'</div><!-- .item_imagebox -->'+
				'</div>'+
				'<!-- .item_box item_box_left-->'+
				'<div class="item_box item_box_right">'+
				'<div class="item_detailbox">'+
				'<div class="detail_left detail_left-text">'+
				'<div class="detail_price">'+
				'<div class="price_new"><span class="num">'+value.price+'</span>元/月</div>'+
				'</div>'+
				'<!-- .detail_price -->'+
				'<div class="detail_line1"><span>'+value.use+'</span></div>'+
				'<div class="detail_line2"><span><span class="num">'+value.ping+'</span>'+value.pingname+'</span>'+
				'</div>'+
				'<div class="detail_line2"><span><span class="num">'+value.room+'</span>房<span class="num">'+value.hall+'</span>廳<span class="num">'+value.bathroom+'</span>衛<span class="num">'+value.openroom+'</span>室</span>'+
				'</div>'+
				'<div class="detail_line2"><span><span class="num">'+value.floor+'</span>樓</span>'+
				'</div>'+
				'</div>'+
				'<!-- .detail_left -->'+
				'<div class="clear"></div>'+
				'</div>'+
				'<!-- .item_detailbox -->'+
				'</div>'+
				'<!-- .item_box item_box_right-->'+
				'<div class="clear"></div>'+
				'</a>'+
				'<div class="detail_btnGroup">'+
				'<div class="detail_btn track_btn" alt="" title="" data-houseno="'+value.NO+'" onclick="addFavoriteHouse(\''+value.NO+'\',\'minus\');">'+
				'<div class="heart_icon"></div>'+
				'</div>'+
				'</div>'+
				'</div>'
			);
		});
		
		addFavoriteFlag=0;
		removeFavoriteLoading(2000);
	}).fail(function (jqXHR, textStatus){
		addFavoriteFlag=0;
		removeFavoriteLoading(0);
	});
}

function removeFavoriteLoading(tms){
	//return false;
	setTimeout(function (){
		$(".addFavoriteLoading").remove();
	},tms);
}

function removeHouse(){
	//var aa=1;
	//$('.ddhouse').each(function(index) {
	//	$(this).remove();
	//	console.log("aa:"+$(this).find("div").attr("id"));
	//	aa++;
	//});
	
	$('.ddhouse').remove();
}

function updFontSize(font_size){
	$.ajax({
        url: 'ajaxFontSize.php',
        type: 'GET',
        data: { 
			"font_size": font_size,
			"end":""
		},
        dataType: 'json'
    }).done(function(data) {
		
	});
}

/*
// set page
function set_page2(current_page, total_page) {
	var show_pages = 5;
	var page_html = '';
	$('#search_pagination').html('');
	if (total_page <= show_pages) {
		for (var i = 1; i <= total_page; i++) {
			if (i == current_page) {
				page_html += '<li class="page current" data-url="' + i + '-page">' + i + '</li>';
			} else {
				page_html += '<li class="page" data-url="' + i + '-page">' + i + '</li>';
			}
		}
	} else {
		if (current_page == 1 || current_page == 2) {
			if (current_page != 1) page_html += '<li class="page" data-url="1-page">1</li>';
			for (var i = current_page; i < (parseInt(current_page) + parseInt(show_pages)); i++) {
				if (i == current_page) {
					page_html += '<li class="page current" data-url="' + i + '-page">' + i + '</li>';
				} else {
					page_html += '<li class="page" data-url="' + i + '-page">' + i + '</li>';
				}
			}
			page_html += '<li class="page" data-url="' + (parseInt(current_page) + 1) + '-page">»</li>';
			page_html += '<li class="page_dot">…</li>';
			page_html += '<li class="page" data-url="' + total_page + '-page">' + total_page + '</li>';
		} else if (current_page == total_page || current_page == total_page - 1) {
			page_html += '<li class="page" data-url="1-page">1</li>';
			page_html += '<li class="page_dot">…</li>';
			page_html += '<li class="page" data-url="' + (parseInt(current_page) - 1) + '-page">«</li>';
			for (var i = (parseInt(current_page) - parseInt(show_pages) + 1); i <= current_page; i++) {
				if (i == current_page) {
					page_html += '<li class="page current" data-url="' + i + '-page">' + i + '</li>';
				} else {
					page_html += '<li class="page" data-url="' + i + '-page">' + i + '</li>';
				}
			}
			if (current_page != total_page) page_html += '<li class="page" data-url="' + total_page + '-page">' + total_page + '</li>';
		} else {
			page_html += '<li class="page" data-url="1-page">1</li>';
			if (current_page > 1 + (show_pages + 1) / 2) page_html += '<li class="page_dot">…</li>';
			page_html += '<li class="page" data-url="' + (parseInt(current_page) - 1) + '-page">«</li>';
			for (var i = current_page - ((show_pages - 1) / 2); i <= (parseInt(current_page) + ((show_pages - 1) / 2)); i++) {
				if (i > 0 && i != 1 && i != total_page) {
					if (i == current_page) {
						page_html += '<li class="page current" data-url="' + i + '-page">' + i + '</li>';
					} else {
						page_html += '<li class="page" data-url="' + i + '-page">' + i + '</li>';
					}
				}
			}
			page_html += '<li class="page" data-url="' + (parseInt(current_page) + 1) + '-page">»</li>';
			if (current_page < (parseInt(total_page) - (show_pages + 1) / 2)) page_html += '<li class="page_dot">…</li>';
			page_html += '<li class="page" data-url="' + total_page + '-page">' + total_page + '</li>';
		}
	}
	$('#search_pagination').append(page_html);
}
*/

function rwd(){
	if($(".rwdsearch").length==0){ return false; }
		
                var default_url_item = '';
                //if (search_type == 'mrt') default_url_item = 'yes-mrt';

                // plugin: parse_url
                $('.rwdsearch').parse_urlRWD({
                    start_point: '/' + search_type + '/',
                    default_url_item: default_url_item,
                    load_url_no_callback: true,
                    callback: function(path, page) {
						if (window.console){ console.log("callback m版開始執行"); }
                            // GA
                            //var ga_page = page;
                            //if (ga_page == '' || ga_page == 1) ga_page = 'index';
                            //if (typeof dataLayer != 'undefined')
                            //    dataLayer.push({ 'eventCategory': 'searchFilter', 'eventAction': 'click', 'eventLabel': search_type + '/' + path + '/' + ga_page + '.html', 'event': 'ga-searchFilter' });
                            //ga('send', 'pageview', search_type + '/' + path + '/' + ga_page + '.html');

                            // set RWD版 UI
                            $('#search_result_loading, #search_result_loading_bg').show();
                            $('#search_result_count .num').html(0);
                            // breadcrumb
                            $('#breadcrumb_params').html('');
                            if ($.get_search_criteria2() != '') {
                                $.each($.get_search_criteria2().split('、'), function(k, value) {
									//console.log("--"+k+":"+value);
									//ui加入麵包屑(RWD版)
									if ($.get_url_item2()[k].match(/mrtline/)){	
										//var v_value=$('.rwdSearchmrtline input[value="'+value+'"]').attr("data-name");
										var v_value=value;
										$('#breadcrumb_params').append('<span><a href="/' + search_type + '/' + $.get_url_item2()[k] + '/index.html"><div class="close_btn"></div></a>' + v_value + '</span>');
									}else if ($.get_url_item2()[k].match(/mrt$/)){	
										//var v_value=$('.rwdSearchmrt input[value="'+value+'"]').attr("data-name");
										var v_value=value;
										$('#breadcrumb_params').append('<span><a href="/' + search_type + '/' + $.get_url_item2()[k] + '/index.html"><div class="close_btn"></div></a>' + v_value + '</span>');
										//console.log("--abc--:"+v_value);
                                    }else if (!$.get_url_item2()[k].match(/keyword/)){
                                        $('#breadcrumb_params').append('<span><a href="/' + search_type + '/' + $.get_url_item2()[k] + '/index.html"><div class="close_btn"></div></a>' + value + '</span>');
									}
                                });
                            }
                            // match
                            //if ($.get_search_criteria2())
                            //    $('#match_criteria').html($.get_search_criteria2());
                            if (page == '' || page == 'index') page = 1;
							
							//search ga
							var ga_page = page;
							if(ga_page==''||ga_page==1) ga_page = 'index';
							
                            // get list
                            var returnParams = 'NO,name,description,address,areaLand,areaBuilding,areaBuildingMain,areaBalcony,price,priceFirst,discount,type,use,room,hall,bathroom,openroom,roomplus,hallplus,bathroomplus,openroomplus,age,floor,inc,imgCount,imgDefault,bigImg,staffpick,decoar,pingratesup,community,lift,parking,customize,keyword,zipcode,tags,tagsSpecial';
                            $.ajax({
                                url: 'ajaxSearchHouse.php',
                                type: 'POST',
                                data: { params: path, page: page, limit: search_limit, returnParams: returnParams },
                                dataType: 'json'
                            }).done(function(data) {
                                if (data.OPT.status == 'OK') {
                                    $('#search_result_loading, #search_result_loading_bg').hide();
                                    set_page(page, data.OPT.totalPage);
                                    $('#search_result_count .num').html(nwc(data.OPT.total));
                                    $('#search_criteria').html($.get_search_criteria2());
									
                                    if (data.OPT.total == 0) {
                                        $('#search_order').addClass('hide');
										
										//$('#search_result_list').html('');
										removeHouse();
                                        //$('#search_result_list').html('');
										$('#search_result_list_end').before('<div id="search_result_list"  class="ddhouse">找不到符合的物件</div>');
                                    } else {
                                        $('#search_order').removeClass('hide');
										
                                        // list
										//$('#search_result_list').html('');
										removeHouse();
                                        $.each(data.OPT.List, function(index, value) {
											if (window.console){ console.log("add list"); }
                                            $('#search_result_list_end').before(
                                                '<div id="search_result_list" class="ddhouse">'+
                                                '<div id="search_result_'+value.NO+'" class="search_result_item">'+
                                                '<a href="'+value.url+'" target="_blank">'+
                                                '<div class="item_box item_box_left">'+
                                                '<div class="item_imagebox">'+
                                                '<div class="item_recommend_bg"></div>'+
                                                '<div class="item_recommend"><!-- 店長推薦 --></div>'+
                                                '<div class="item_img">'+
                                                '<img alt="'+value.alt+'" title="'+value.alt+'" src="'+value.img+'" onerror="loadImgFail(this)">'+
                                                '</div>'+
                                                '<div class="item_img_count">'+
                                                '<div class="icon i_img_cnt"></div>'+
                                                '<div class="img_count_txt">'+value.img_count+'</div>'+
                                                '</div>'+
                                                '</div>'+
                                                '<!-- .item_imagebox -->'+
                                                '<span class="phone-building-name">'+value.community+'</span>'+
                                                '<!-- .item_imagepop-77 -->'+
                                                '</div>'+
                                                '<!-- .item_box item_box_left-->'+
                                                '<div class="item_box item_box_right">'+
                                                '<div class="item_titlebox">'+
                                                '<span class="item_title" alt="'+value.alt+'" title="'+value.alt+' - 80429J">'+value.name+'</span>'+
                                                '<span class="item_subtitle"><!-- 信義房屋品牌、台灣松下營造 --></span>'+
                                                '</div>'+
                                                '<!-- .item_titlebox -->'+
                                                '<div class="item_detailbox">'+
                                                '<div class="detail_left left">'+
                                                '<div class="detail_line1">'+
                                                '<span><!-- 台北市士林區天母北路 --></span>'+
                                                '</div>'+
                                                '<div class="detail_line2">'+
                                                '<span><span class="num num-1">'+value.use+'</span></span>'+
                                                '<span>'+
                                                '<span class="num">'+value.ping+'</span>'+value.pingname+
                                                '</span>'+
                                                '<span>'+
                                                '<span class="num">'+value.room+'\n</span>房\n'+
                                                '<span class="num">'+value.hall+'\n</span>廳\n'+
                                                '<span class="num">'+value.bathroom+'\n</span>衛\n'+
                                                '<span class="num">'+value.openroom+'\n</span>室\n'+
                                                '</span>'+
                                                '<span><span class="num">'+value.floor+'</span>樓</span>'+
                                                '</div>'+
                                                '<div class="detail_line2">'+
                                                '<span class="num-ss">'+
                                                '<span class="num num-text">'+value.address+'</span>'+
                                                '</span>'+
                                                '</div>'+
                                                '<span class="gray-date">更新日期：</span>'+
                                                '<span class="gray-date-1">'+value.updatedate+'</span>'+
                                                '<div class="detail_tagGroup">'+
                                                '<div class="detail_tag" data-tagid="16">近公園</div>'+
                                                '<div class="detail_tag" data-tagid="18">近市場</div>'+
                                                '<div class="detail_tag" data-tagid="19">近學校</div>'+
                                                '<div class="clear"></div>'+
                                                '</div>'+
                                                '</div>'+
                                                '<!-- .detail_left .left -->'+
                                                '<div class="detail_right right">'+
                                                '<div class="detail_price">'+
                                                '<div class="price_new"><span class="num">'+value.price+'</span>元/月</div>'+
                                                '</div>'+
                                                '<!-- .detail_price -->'+
                                                '<div class="clear"></div>'+
                                                '</div>'+
                                                '<div class="detail_right-1 left">'+
                                                '<div class="detail_price">'+
                                                '<div class="price_new"><span class="num">'+value.price+'</span>元/月</div>'+
                                                '</div>'+
                                                '<div class="detail_line2">'+
                                                '<span style="border-left: 1px solid #ddd;">'+
                                                '<span class="big-chinese" >'+value.use+'</span>'+
                                                '</span>'+
                                                '<span><span class="num">'+value.ping+'</span>'+value.pingname+'</span>'+
                                                '</div>'+
                                                '<div class="detail_line2">'+
                                                '<span style="border-left: 1px solid #ddd;">'+
                                                '<span>'+
                                                '<span class="num">'+value.room+'</span>房\n'+
                                                '<span class="num">'+value.hall+'</span>廳\n'+
                                                '<span class="num">'+value.bathroom+'</span>衛\n'+
                                                '<span class="num">'+value.openroom+'</span>室\n'+
                                                '</span>'+
                                                '</span>'+
                                                '<span><span class="num">'+value.floor+'</span>樓</span>'+
                                                '</div>'+
                                                '<p class="phone-address">'+value.addressrwd+'</p>'+
                                                '<!-- .detail_price -->'+
                                                '<div class="clear"></div>'+
                                                '</div><!-- .detail_right .right -->'+
                                                '<div class="clear"></div>'+
                                                '</div><!-- .item_detailbox -->'+
                                                '</div><!-- .item_box item_box_right-->'+
                                                '<div class="clear"></div>'+
                                                '</a>'+
                                                '<div class="detail_btnGroup">'+
                                                '<div class="detail_btn appoint_btn" onclick="addFavoriteHouse(\''+value.NO+'\'\,\'add\');"><a href="#" onclick="return false;">快速收藏</a></div>'+
                                                '</div><!-- .detail_btnGroup -->' +
                                                '</div><!-- .search_result_item -->'+
                                                '</div>');


                                        });
										
										/*
                                        if (tracked.length > 0) {
                                            $.each(tracked, function(index, value) {
                                                if (typeof value == 'string')
                                                    $('#search_result_' + value).find('.track_btn').addClass('tracked').attr('alt', '取消追蹤').attr('title', '取消追蹤');
                                                else
                                                    $('#search_result_' + value['houseNO']).find('.track_btn').addClass('tracked').attr('alt', '取消追蹤').attr('title', '取消追蹤');
                                            });
                                        }
                                        get_cookie_track();
										*/
                                    }
                                } else if (data.OPT.status == 'ERROR') {
                                    $('#search_result_loading, #search_result_loading_bg').hide();
                                    $('#search_pagination').html('');
                                    removeHouse();
									//$('#search_result_list').html('資料錯誤');
									$('#search_result_list_end').before('<div id="search_result_list" class="ddhouse">資料錯誤</div>');
                                }
                            }).fail(function(jqXHR, textStatus) {
                                $('#search_result_loading, #search_result_loading_bg').hide();
                                $('#search_pagination').html('');
								removeHouse();
                                //$('#search_result_list').html('資料錯誤');
								$('#search_result_list_end').before('<div id="search_result_list" class="ddhouse">資料取得錯誤</div>');
                                if (window.console)
                                    console.log('"ajaxSearchHouse.php" Request failed: ' + textStatus);
                            });
					} // end of callback function
                });

}

//default_set 是否載入預設值
function get_zip(cityId,default_set) {
	if (window.console) { console.log("get_zip:"+cityId+","+default_set); }
	$('#search_zip table').html('');
	$('#search_zip_match table').html('');
	$('#breadcrumb_zip .dropdown_itemGroup').html('');
	
	var search_zip_html = '';
	var breadcrumb_zip_html = '';
	var t_index=0;
	var per_line = 4;
	$.each(areaAry, function(index, value) {
		if(value.cityid!=cityId){ return; }//等同continue
		
		// search_zip
		if (t_index==0 || t_index % per_line == 0 ) {
			search_zip_html += '<tr>';
		}
		search_zip_html += '<td><a href="/' + search_type + '/' + value.zipcode + '-zip/index.html"><div class="checkbox_btn"></div>' + value.areaname + '</a></td>';
		if (t_index % per_line == per_line - 1){ 
			search_zip_html += '</tr>';
		}
		//if (areaAry.length - 1 == t_index && t_index % per_line < per_line - 1) search_zip_html += '</tr>';
		// breadcrumb_zip
		if (t_index == 0){
			//breadcrumb_zip_html += '<li class="dropdown_item">不分區</li>';
		}
		breadcrumb_zip_html += '<li class="dropdown_item"><a href="/' + search_type + '/' + value.zipcode + '-zip/index.html" data-value="'+value.zipcode+'" data-name="'+value.name+'">' + value.areaname + '</a></li>';
		
		t_index++;
	});
	if(t_index>0){
		if(t_index % per_line!=0){ search_zip_html += '</tr>'; }
	}
		
	$('#search_zip table').html(search_zip_html);
	//$('#search_zip_match table').html(search_zip_html);
	$('#breadcrumb_zip .dropdown_itemGroup').html(breadcrumb_zip_html);
	
	if(typeof default_set=="undefined" || default_set==0){ return false; }
	
	// set default UI
	var zip_code = [];
		
	$.each($.get_url_item(), function(k, value) {
		if (value.match(/zip/)) {
			var a_btn = $('#search_bar').find('a[href="/' + search_type + '/' + value + '/index.html"]');
			if (a_btn.text()) {
				a_btn.find('.checkbox_btn').addClass('checked');
				var zip_name = $('#search_zip').find('.checked').eq(0).parent().text();
				if ($('#search_zip').find('.checked').length > 1){ zip_name += '＋'; }
				if (!zip_name){ zip_name = '行政區'; }
				
				zip_code.push(value.replace('-zip', ''));
				$('#search_zip').siblings('.search_item').find('.search_item_name').text(zip_name);
				$('#search_zip_match').siblings('.search_item').find('.search_item_name').text(zip_name);
				
				var dropdown = $('.dropdown_itemGroup').find('a[href="/' + search_type + '/' + value + '/index.html"]');
				dropdown.parent().parent().parent().find('.dropdown_head a').attr('href', '/' + search_type + '/' + zip_code.join('-') + '-zip/index.html');
				dropdown.parent().parent().parent().find('.dropdown_name').text(zip_name);
				dropdown.parent().addClass('checked');
				
				//var tmp_v=value.replace('-zip', '');
				//$(".rwdSearchzip input[value='"+tmp_v+"']").parent().addClass("checked");
				//$(".rwdSearchzip .phone-down-menu-2").html(zip_name);
			}
		}
	});
}

//default_set 是否載入預設值
function get_zip_rwd(cityId,default_set){
	if (window.console) { console.log("get_zip_rwd:"+cityId+","+default_set); }
	
	$(".phone-down-menu-3.square ul").html("");
	
	if(cityId==""){ return false; }
	
	$.each(areaAry, function(index,value) {
		//console.log(JSON.stringify(value));
		if(value.cityid==cityId){
			$(".phone-down-menu-3.square ul").append(
				'<li>'+
				'<form>'+
				'<label for="zip'+value.zipcode+'">'+
				'<input type="checkbox" name="zip'+value.zipcode+'" value="'+value.zipcode+'" data-name="'+value.areaname+'" id="love">'+value.areaname+
				'</label>'+
				'</form>'+
				'</li>'
			);
		}
	});
	
	if(typeof default_set=="undefined" || default_set==0){ return false; }
	
	/*
	// set default UI
	var zip_code = [];

	$.each($.get_url_item(), function(k, value) {
		if (value.match(/zip/)) {
			var a_btn = $('#search_bar').find('a[href="/' + search_type + '/' + value + '/index.html"]');
			if (a_btn.text()) {
				a_btn.find('.radio_btn').addClass('checked');
				var zip_name = $('#search_zip').find('.checked').eq(0).parent().text();
				if ($('#search_zip').find('.checked').length > 1) zip_name += '＋';
				if (!zip_name) zip_name = '行政區';
				zip_code.push(value.replace('-zip', ''));
				$('#search_zip').siblings('.search_item').find('.search_item_name').text(zip_name);
				$('#search_zip_match').siblings('.search_item').find('.search_item_name').text(zip_name);
				var dropdown = $('.dropdown_itemGroup').find('a[href="/' + search_type + '/' + value + '/index.html"]');
				dropdown.parent().parent().parent().find('.dropdown_head a').attr('href', '/' + search_type + '/' + zip_code.join('-') + '-zip/index.html');
				dropdown.parent().parent().parent().find('.dropdown_name').text(zip_name);
				dropdown.parent().addClass('checked');
				
				var tmp_v=value.replace('-zip', '');
				$(".rwdSearchzip input[value='"+tmp_v+"']").parent().addClass("checked");
				$(".rwdSearchzip .phone-down-menu-2").html(zip_name);
			}
		}
	});
	*/
}

function get_mrt(mrtlineid){
	if (window.console){ console.log("get_mrt:"+mrtlineid); }
	
	$("#search_mrt td").html("請先選捷運線，才可勾選捷運站");
	
	if(mrtlineid==""){ return false; }
	
	$("#search_mrt td").html("可複選捷運站");
	
	$("#search_mrt .phone-down-menu-3").html('');
	
	$("#breadcrumb_mrt .dropdown_name").html("捷運站");
	$('#breadcrumb_mrt .dropdown_itemGroup').html('');
	var breadcrumb_mrt_html = '';
	breadcrumb_mrt_html += '<li class="dropdown_item">捷運站</li>';
	//for(var i=0;i<mrtsecAry[mrtlineid].length;i++){
		var mrt_html='';
		mrt_html+='<div class="mrt-next-distance">'
		//mrt_html+='<span class="mrt-title">'+mrtsecAry[mrtlineid][i].name+'</span>';
		
		var t_mrtHtml=['','',''];
		var t_index=0;
		for(var j=0;j<mrtAry.length;j++){
			if(mrtlineid!=mrtAry[j].mrtlineid){ continue; }
			var eleid='mrt_pc'+j;
			t_mrtHtml[t_index]+='<li>';
			t_mrtHtml[t_index]+='<form>';
			t_mrtHtml[t_index]+='<label for="'+eleid+'">';
			t_mrtHtml[t_index]+='<input type="checkbox" name="'+eleid+'" value="'+mrtAry[j].mrtid+'" data-item="mrt" data-name="'+mrtAry[j].mrtName+'" id="'+eleid+'"> '+mrtAry[j].mrtName;
			t_mrtHtml[t_index]+='</label>';
			t_mrtHtml[t_index]+='</form>';
			t_mrtHtml[t_index]+='</li>';
			
			//捷運站麵包屑選單內容
			breadcrumb_mrt_html += '<li class="dropdown_item"><a href="/' + search_type + '/' + mrtAry[j].mrtid + '-mrt/index.html" data-value="'+mrtAry[j].mrtid+'" data-name="'+mrtAry[j].mrtName+'">' + mrtAry[j].mrtName + '</a></li>';
			
			
			t_index++;
			if(t_index>2){ t_index=0; }
		}
		for(var j=0;j<t_mrtHtml.length;j++){
			if(t_mrtHtml[j]!=""){
				mrt_html+='<ul>';
				mrt_html+=t_mrtHtml[j];
				mrt_html+='</ul>';
			}
		}
		
		
		mrt_html+='</div>'
		$("#search_mrt .phone-down-menu-3").append(mrt_html);
		
	//}		
	$('#breadcrumb_mrt .dropdown_itemGroup').html(breadcrumb_mrt_html);
	var mrt_name="捷運站";
	var mrt_cnt=0;
	//var mrt_code = [];
	$.each($.get_url_item(), function(k, value) {
		if (value.match(/-mrt$/)) {
			//console.log("vv:"+value);
			//var item = value.split('-')[value.split('-').length - 1];
			var vv = value.split('-')[0];
			var mrt_obj=$('#search_mrt input[value="'+vv+'"]');
			if(mrt_cnt==0){
				mrt_name=mrt_obj.attr("data-name");
				
				var dropdown = $('.dropdown_itemGroup').find('a[href="/' + search_type + '/' + vv + '-mrt/index.html"]');
				dropdown.parent().parent().parent().find('.dropdown_head a').attr('href', '/' + search_type + '/' + vv + '-mrt/index.html');
				dropdown.parent().parent().parent().find('.dropdown_name').text(mrt_name);
				dropdown.parent().addClass('checked');
			
			}
			if(mrt_cnt==1) mrt_name += '＋';
			$('#search_mrt').siblings('.search_item').find('.search_item_name').text(mrt_name);
			
			$('#search_mrt input[value="'+vv+'"]').parent().addClass("checked");
			
			//var tmp_v=value.replace('-zip', '');
			//$(".rwdSearchzip input[value='"+tmp_v+"']").parent().addClass("checked");
			//$(".rwdSearchzip .phone-down-menu-2").html(mrt_name);
			mrt_cnt++;
		}else{
			
		}
	});
	if(mrt_name==""){ mrt_name="捷運站"; }
	$('#search_mrt').siblings('.search_item').find('.search_item_name').text(mrt_name);
}

function get_mrt_rwd(mrtlineid,is_default){
	if (window.console){ console.log("get_mrt_rwd:"+mrtlineid+",is_default:"+is_default); }
	
	//$(".rwdSearchmrt .phone-down-menu-3").html('');
	//$("#search_mrt td").html("請先選捷運線，才可勾選捷運站");
	$(".rwdSearchmrt .phone-down-menu-3")
	.html('')
	.append('<span class="green-title">請先選擇捷運縣，才可勾選捷運站。</span>');
	
	if(mrtlineid==""){ return false; }
	
	//$("#search_mrt td").html("可複選捷運站");
	$(".rwdSearchmrt .phone-down-menu-3")
	.html('')
	.append('<span class="green-title">可複選捷運站</span>');
	
	
	//if(typeof is_default!="undefined" && is_default==1){}
	
	$("#breadcrumb_mrt .dropdown_name").html("捷運站");
	$('#breadcrumb_mrt .dropdown_itemGroup').html('');
	var breadcrumb_mrt_html = '';
	breadcrumb_mrt_html += '<li class="dropdown_item">捷運站</li>';
	//for(var i=0;i<mrtsecAry[mrtlineid].length;i++){
		var mrt_html='';
		//mrt_html+='<div class="phone-down-menu-3 square">'
		//mrt_html+='<span class="green-title">'+mrtsecAry[mrtlineid][i].name+'</span>';
		
		var t_mrtHtml=[''];
		var t_index=0;
		for(var j=0;j<mrtAry.length;j++){
			if(mrtlineid!=mrtAry[j].mrtlineid){ continue; }
			var eleid='mrt_rwd'+j;
			t_mrtHtml[t_index]+='<li>';
			t_mrtHtml[t_index]+='<form>';
			t_mrtHtml[t_index]+='<label for="'+eleid+'">';
			t_mrtHtml[t_index]+='<input type="checkbox" name="'+eleid+'" value="'+mrtAry[j].mrtid+'" data-item="mrt" data-name="'+mrtAry[j].mrtName+'" id="'+eleid+'"> '+mrtAry[j].mrtName;
			t_mrtHtml[t_index]+='</label>';
			t_mrtHtml[t_index]+='</form>';
			t_mrtHtml[t_index]+='</li>';
			
			//捷運站麵包屑選單內容
			breadcrumb_mrt_html += '<li class="dropdown_item"><a href="/' + search_type + '/' + mrtAry[j].mrtid + '-mrt/index.html" data-value="'+mrtAry[j].mrtid+'" data-name="'+mrtAry[j].mrtName+'">' + mrtAry[j].mrtName + '</a></li>';
			
			//t_index++;
			//if(t_index>1){ t_index=0; }
		}
		for(var j=0;j<t_mrtHtml.length;j++){
			if(t_mrtHtml[j]!=""){
				mrt_html+='<ul class="control-distance">';
				mrt_html+=t_mrtHtml[j];
				mrt_html+='</ul>';
			}
		}
		
		//mrt_html+='</div>'
		$(".rwdSearchmrt .phone-down-menu-3").append(mrt_html);
	//}	
	
	$('#breadcrumb_mrt .dropdown_itemGroup').html(breadcrumb_mrt_html);
	var mrt_name="捷運站";
	var mrt_cnt=0;
	var mrt_code = [];
	$.each($.get_url_item(), function(k, value) {
		if (value.match(/-mrt$/)) {
			//console.log("vv:"+value);
			//var item = value.split('-')[value.split('-').length - 1];
			var vv = value.split('-')[0];
			var mrt_obj=$('.rwdSearchmrt input[value="'+vv+'"]');
			if(mrt_cnt==0){
				mrt_name=mrt_obj.attr("data-name");					
			}
			if(mrt_cnt==1) mrt_name += '＋';
			//$('#search_mrt').siblings('.search_item').find('.search_item_name').text(mrt_name);
			
			var dropdown = $('.dropdown_itemGroup').find('a[href="/' + search_type + '/' + vv + '-mrt/index.html"]');
			dropdown.parent().addClass('checked');
			
			//$('#search_mrt input[value="'+vv+'"]').parent().addClass("checked");
			mrt_code.push(vv);
			mrt_cnt++;
		}else{
			
		}
	});
	if(mrt_name==""){ mrt_name="捷運站"; }
	
	$("#breadcrumb_mrt")
	.find('.dropdown_head a').attr('href', '/' + search_type + '/' + mrt_code.join('-') + '-mrt/index.html')
	.find('.dropdown_name').text(mrt_name);
	$(".rwdSearchmrt .phone-down-menu-2").html(mrt_name);
}

function checkTel(dateStr) {
	var rs = /^([0-9\-#]){9,20}$/ ;
	if (!rs.test(dateStr)) {
		//格式有誤
		return false;
	}
	else {
		return true;
	}
}