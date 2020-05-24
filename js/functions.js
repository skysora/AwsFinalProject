$(function (){
	
});


// 換圖效果
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

// 客製決定上下左右位置，沒設定的話就置中
var popupAdminWin;
function openWin2(url, winName, w, h, t, l, s)
{
  var cTop  = screen.height/2 - (h/2);
  var cLeft = screen.width/2 - (w/2);
  var t = (t === (void 0)) ? cTop : t;
  var l = (l === (void 0)) ? cLeft : l;
  var s = (s === (void 0)) ? 'no' : 'yes';
  if (!popupAdminWin) {
    popupAdminWin = window.open(url, winName, 'width=' + w + ',height=' + h + ',scrollbars=' + s + ',top=' + t + ',left=' + l + ',resizable=1');
  } else if (!popupAdminWin.closed) {
    popupAdminWin.location.href = url;
  } else {
    popupAdminWin = window.open(url, winName, 'width=' + w + ',height=' + h + ',scrollbars=' + s + ',top=' + t + ',left=' + l + ',resizable=1');
  }
  popupAdminWin.focus();
}

// 螢幕置中視窗
function openCenterWin(url, nameW, w, h, scroll)
{
  var s = (scroll === (void 0)) ? 0 : 1;
  if (navigator.appVersion.indexOf('4') != -1) {
    var cTop  = screen.height/2 - (h/2);
    var cLeft = screen.width/2 - (w/2);
    popupAdminWin = window.open(url, nameW, 'height=' + h + ',width=' + w + ',scrollbars=' + s + ',resizable=1,menubar=0,toolbar=0,status=0,location=0,directories=0,left=' + cLeft + ',top=' + cTop);
  }
  else {
    popupAdminWin = window.open(url, nameW, 'height=' + h + ',width=' + w + ',scrollbars=' + s + ',resizable=1,menubar=0,toolbar=0,status=0,location=0,directories=0,left=150,top=200');
  }
  popupAdminWin.focus();
}

/**
* 表單輸入欄位 MouseFouse 時，清除預設提示文字
*
* Here is an inline example:
* <code>
* <input type="text" name="k" value="請輸入關鍵字" style="width:90px;"
*        onfocus="clearMe(this);" onblur="restore(this, '請輸入關鍵字');" />
* </code>
*
* 預設的提示文字 ('請輸入關鍵字')，可在 submit 查詢後，由程式動態變化
*
* @param object the form input element object
*/
function clearMe(control)
{
  control.value = '';
}

/**
* 表單輸入欄位 MouseBlur 時，回復預設提示文字
*
* @param object the form input element object
* @param string the string to prompt
*/
function restore(control, str)
{
  if (control.value == '') control.value = str;
}

/**
* 過濾欄位字串前後空白用方法(並去除不合法字元)
* 此函式將在稍後宣告為 String Object's prototype method
*/
function trim()
{
  if (!this) return this;

  // 濾掉字串前後的空白
  for (var begin = 0; begin < this.length; begin++) {
    if (this.charAt(begin) != " ") break;
  }
  for (var end = this.length; end > 0; end--) {
    if (this.charAt(end - 1) != " ") break;
  }

  return this.slice(begin, end);
}

/**
* 檢查欄位是否只包含空白字元
* 此函式將在稍後宣告為 String Object's prototype method
*/
function isEmpty()
{
  if (!this) return true;

  for (var len = 0; len < this.length; len++) {
    if (this.charAt(len) != " ") return false;
  }

  return true;
}

// 將以上 trim 及 isEmpty 兩函式宣告為 String 的屬性
String.prototype.trim = trim;
String.prototype.isEmpty = isEmpty;

/**
* Submit 防呆功能
*
* 在送出表單且 JS 驗證無誤後，
* 將送出及重置的按鈕 disable 起來，
* 以防止傳輸時間過久，使用者懷疑未送出，
* 再重覆送一次資料給程式。
*
* @param object the form object
*/
function submitOnce(fm)
{
    // if IE 4+ or NS 6+
    if (document.all || document.getElementById) {
        // hunt down "submit" and "reset"
        for (var i = 0; i < fm.length; i++) {
            var tempobj = fm.elements[i];
            if (tempobj.type.toLowerCase() == "submit"
                    || tempobj.type.toLowerCase() == "reset") {
                //disable it
                tempobj.value = '傳輸中…';
                tempobj.disabled = true;
            }
        }
    }
}

function getLayerObj(name)
{
    if (document.getElementById)
    {
        return document.getElementById(name);
    }
    else if (document.all)
    {
        return document.all(name);
    }
    else if (document.layers)
    {
        return document.layers[name];
    }
}

/*
* Checks if a value exists in an array
*
* Input: strVal [string] -> the value wanna find
*        objArr [array]  -> search target array data
*
* Return: searches objArr for strVal and returns True
*         if it is found in the array, False otherwise
*/
function inArray(strVal, objArr)
{
    var hasVal = false;
    var size = objArr.length;
    
    if (size > 0)
    {
        for (var i = 0; i < size; i++)
        {
            if (strVal == objArr[i])
            {
                hasVal = true;
                break;
            }
        }
    }

    return hasVal;
}

/**
* 檢查是否為數字型態
*/
function isNumber(str)
{
    var chk_result = true;

    for (var i = 0; i < str.length; i++)
    {
        if (str.charAt(i) < "0" || str.charAt(i) > "9")
        {
            chk_result = false;
            break;
        }
    }

    return chk_result;
}

/**
* 檢查公司統一編號格式是否正確
*/
function isCompID(compID)
{
    var cx = new Array();
    var cy = new Array();
    var cm = 0;
    var cs = 0;

    if (!compID.match(/^[0-9]{8}$/)) { return false; }
    if (compID.match(/^0{8}$/)) { return false; }

    cx[0] = parseInt(compID.substr(0, 1), 10) * 1;
    cx[1] = parseInt(compID.substr(1, 1), 10) * 2;
    cx[2] = parseInt(compID.substr(2, 1), 10) * 1;
    cx[3] = parseInt(compID.substr(3, 1), 10) * 2;
    cx[4] = parseInt(compID.substr(4, 1), 10) * 1;
    cx[5] = parseInt(compID.substr(5, 1), 10) * 2;
    cx[6] = parseInt(compID.substr(6, 1), 10) * 4;
    cx[7] = parseInt(compID.substr(7, 1), 10) * 1;
    
    cy[0] = parseInt(cx[1] / 10, 10);
    cy[1] = cx[1] % 10;
    cy[2] = parseInt(cx[3] / 10, 10);
    cy[3] = cx[3] % 10;
    cy[4] = parseInt(cx[5] / 10, 10);
    cy[5] = cx[5] % 10;
    cy[6] = parseInt(cx[6] / 10, 10);
    cy[7] = cx[6] % 10;

    cs = cx[0] + cx[2] + cx[4] + cx[7] + cy[0] + cy[1] + cy[2] + cy[3] + cy[4] + cy[5] + cy[6] + cy[7];
    cm = cs % 10;

    if (7 == parseInt(compID.substr(6, 1), 10))
    {
        if (0 == cm)
        {
            return true;
        }
        else
        {
            cm = (++cs) % 10;

            return (0 == cm) ? true : false;
        }
    }
    else
    {
        return (0 == cm) ? true : false;
    }
}

function switchArticleBox(obj, id)
{
    var boxDtObj = getLayerObj('article-box-dt-' + id);
    var boxDdObj = getLayerObj('article-box-dd-' + id);

    if ('' == boxDdObj.style.display || 'block' == boxDdObj.style.display)
    {
        obj.innerHTML = '呈現';
        boxDtObj.style.borderStyle = 'none';
        boxDtObj.style.marginBottom = '0';
        boxDdObj.style.display = 'none';
    }
    else
    {
        obj.innerHTML = '隱藏';
        boxDtObj.style.borderBottom = '1px dashed #000';
        boxDtObj.style.marginBottom = '10px';
        boxDdObj.style.display = 'block';
    }

    document.body.focus();
}

function addLoadEvent(func)
{
    var oldonload = window.onload;

    if (typeof window.onload != 'function')
    {
        window.onload = func;
    }
    else
    {
        window.onload = function()
        {
            if (oldonload)
            {
                oldonload();
            }
            func();
        }
    }
}

function checkSID(value)
{
    var id  = value.toUpperCase();
    var tab = "ABCDEFGHJKLMNPQRSTUVWXYZIO";
    var A1  = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
    var A2  = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 0, 1, 3, 4, 5);
    var Mx  = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);
    var i, sum, v;

    if (!id.match(/^[a-z][12][\d]{8}$/i)) { return false; }
    i = tab.indexOf(id.charAt(0));
    if (i == -1) { return false; }
    sum = A1[i] + A2[i] * 9;
    for (i = 1; i < 10; i++) {
        v = parseInt(id.charAt(i), 10);
        if (isNaN(v)) { return false; }
        sum = sum + v * Mx[i];
    }
    if (sum % 10 != 0) { return false; }
    return true;
}

function checkEmail(value)
{
    return value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
}

function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}

function open_fancybox(url){	
	$.fancybox({
		type: 'iframe',
		href:url,
		overlayOpacity: 0.6,
		overlayColor: '#000',
		autoDimensions: false,
		width: 850,
		scrolling: 'no',
		autoScale: false,
		ajax: {
			cache: false
		}
	});
	$('html, body').scrollTop(0);
	return false;
}

function sendLog(houseno,trackno,ddr,rs,addInfo){
	var addInfo = addInfo || "";
	
	if(typeof debugLog=== "undefined"){
		debugLog="";
	}

	if(!sid_check){
		setTimeout(function (){
			sendLog(houseno,trackno,ddr,rs,addInfo);
		},3000);
		return ;
	}
	
	var memberid=$("#profile_member_id").val();
	var timestamp = new Date().getTime();
	
	var para={};
	for(var i=0;i<ddr.length;i++){
		//para[i]=ddr[i];
	}
	
	$.ajax({
		type: 'POST',
		url: 'ajaxSendLog.php?time='+timestamp,
		xhrFields: { withCredentials:true },
		cache:false,
		data: {
			"memberid": memberid,
			"houseno": houseno,
			"logname":trackno,
			//"col":{"1":col1,"2":col2},
			"addInfo":addInfo,
			"col":ddr,
			"rs":rs,
			"debug":debugLog,
			"end":""				
		},
		dataType: 'json'
	}).done(function(data) {
		//
	}).fail(function(jqXHR, textStatus) {
		//
	});
}

function chkLogin(error_obj){
	
	$.ajax({
		type: 'POST',
		url: ssobase+'/cgi/member/isLoginM.json',
		xhrFields: { withCredentials:true },
		data: {
			"end":""				
		},
		dataType: 'json'
	}).done(function(obj) {
		/*
		if(data.OPT.status=="OK" && data.OPT.isLogin){
			$(".header_item,.isnlogin").hide();
			$("#user_name").html(data.OPT.data.nick).attr("style","");
			$("#profile_account").val();
			$("#fav_cnt").html(data.OPT.data.Fav.length)
			$(".header_item.islogin").show();		
		}
		*/
            if(obj.OPT.status=='OK' && obj.OPT.isLogin){
                $(".isnlogin").hide();
                $(".islogin").show();
                if(obj.OPT.data.email)
                    $('#match_dialog input[name="email"]').val(obj.OPT.data.email);
				
				var account = '';
                if(obj.OPT.data.mobile)
                    account = obj.OPT.data.mobile;
				
                var nickname = '';
                if(obj.OPT.data.nick)
                    nickname = obj.OPT.data.nick;
                $("#user_name").text(nickname);
                $("#user_name_m").text(nickname);
                $("#profile_box .member_name").text(nickname);
                $("#profile_account").val(account);
                $("#profile_member_id").val(obj.OPT.data.member_id);
                document.cookie = "account=" + account;
                // fav
                if(obj.OPT.data.Fav.length>0){
                    $('#fav_cnt').text(obj.OPT.data.Fav.length);
                    /*
					$.each(obj.OPT.data.Fav, function(index, value){
                        if(typeof value == 'string'){
                            $('#search_result_'+value).find('.track_btn').addClass('tracked').attr('alt', '取消追蹤').attr('title', '取消追蹤');
                            $('#weekly_top_viewed_'+value).find('.track_btn').addClass('tracked').attr('alt', '取消追蹤').attr('title', '取消追蹤');
                        }else{
                            $('#search_result_'+value['houseNO']).find('.track_btn').addClass('tracked').attr('alt', '取消追蹤').attr('title', '取消追蹤');
                            $('#weekly_top_viewed_'+value['houseNO']).find('.track_btn').addClass('tracked').attr('alt', '取消追蹤').attr('title', '取消追蹤');
                        }
                    });
					*/
                }

                //進度查詢
                if(obj.OPT.data.customer_ID!=''){
                    $(".iscustomer").show();
                }else{
                    $(".iscustomer").hide();
                }

                //會員驗證
                if(obj.OPT.data.mobile_verify!=1||obj.OPT.data.email_verify!=1){
                    $(".isverify").show();
                }else{
                    $(".isverify").hide();
                }



            }else{
                error_obj.text(obj.OPT.message);
            }		
		//
	}).fail(function(jqXHR, textStatus) {
		//
	});	
}

function loadImgFail(obj){
	var cnt=0;
	if($(obj).attr("src")=="rrrr"){ return false; }
	if (typeof $(obj).attr("data-errcnt") != 'undefined') {
		cnt=parseInt($(obj).attr("data-errcnt"),10);
	}
	if(cnt>2){ return false; }
	
	cnt++;
	$(obj).attr("src","rrrr").attr("src",no_img).attr("data-errcnt",cnt);
}

// set page
function set_page(current_page, total_page) {
	if (window.console){ console.log("set_page:"+current_page+","+total_page); }
	
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

// number with commas
function nwc(x) {
    var p = x.toString().split('.');
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return p.join('.');
}

//for javascript xss
function escapeHtml(text,is_decode) {
	/*	
	return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
	*/
	if(is_decode){
		text=decodeURIComponent(text);
	}

	var map = {
		'&': '',
		'<': '',
		'>': '',
		'"': '',
		"'": '',
		':': ''
	};

	return text.replace(/[&<>"':]/g, function(m) { return map[m]; });	  
}