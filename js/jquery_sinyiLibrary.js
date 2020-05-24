/*! sinyiLibrary.js  */

var js_file_name = 'jquery_sinyiLibrary';
var js_file_domain = $('script[src*='+js_file_name+']').attr('src').split('/')[2];
//if(typeof(myVariable) != "undefined"){ $.getScript('//'+js_file_domain+'/j/url_json.js', function(){}); }
//else{ $.getScript('js/url_json.js', function(){}); }
//$.getScript('js/url_json.js', function(){});

$.fn.parse_url = function(options) {
    var version = 1.6;
    var defaults = {
        class_name: "parse_url",
        start_point: "/",
        default_url_item: "",
        load_url_no_callback: false,
        set_history: true,
        callback: null
    };
    var settings = $.extend({}, defaults, options);
    var class_name = settings['class_name'];
    var default_url_item = settings['default_url_item'];
    var load_url_no_callback = settings['load_url_no_callback'];
    var set_history = settings['set_history'];
    var callback = settings['callback'];
    var url_path = '';//xxx-xx/index.html
    var call_tags = 0;

    // add class
    this.addClass(class_name);

    // loadUrl
	//取得網址列內容
    function loadUrl(url_json){
        var items = window.location.href.split('/');
		if (window.console){ console.log("loadUrl:"+items); }
        if(default_url_item){
            var d_items = default_url_item.split('/');
            items = $.unique(d_items.concat(items));
        }
		//解析分頁
        if(items[items.length-1].split(".")[0]&&items[items.length-1].split(".")[0].match(/.html/)){
            url_json["page"]['choice'] = items[items.length-1].split(".")[0];
        }
		//解析其他條件
        for(var i=0; i<items.length-1; i++){
            if(items[i].match('-')!=null){
                var items_s = items[i].split('-');
                if((items_s[items_s.length-1]=='city'||items_s[items_s.length-1]=='mrtline')&&items_s.length>2){
                    // EX: Taipei-city-NewTaipei-city-Taoyuan-county
                    for(var i=0; i<items_s.length-1; i+=2){
                        itemToJson(items_s[i]+'-'+items_s[i+1], is_reset='no');
                    }
                }else{
                    itemToJson(items[i], is_reset='no');
                }
            }
        }
        if(!load_url_no_callback){
            if(typeof callback == 'function'){
                callback.call(this, path=$.get_url_path(), page=$.get_url_page(), criteria=$.get_search_criteria());
            }
        }
        setChoice(url_json);
    };

    // itemToJson
    function itemToJson(item, is_reset, is_remove){
        is_reset = is_reset || 'yes';
        item = decodeURI(item).split('-'); // EX: "Taipei-city" is choice and item
        var is_item = url_json.hasOwnProperty(item[item.length-1]);
        if(is_item||item[1]=='ALL'){
            if(is_item){
                // set front
                if(item[item.length-1]=='front'&&(item[item.length-2]=='house'||item[item.length-2]=='window'||item[item.length-2]=='community')){
                    var other_front_type = item[item.length-2];
                    item.pop(); // pop front
                    item.pop(); // pop other front type
                    item.push(other_front_type+'-front');
                    // ["east", "south", "house-front"]
                }
				
                // set 樓層
                if(item[item.length-1]=='floor'&&item[0]!='ALL'){
                    item = $.map(item, function(n,i){return n.toLowerCase();});
                }
                // city, county -> clean zip
                if(item[item.length-1]=='city'||item[item.length-1]=='county'){
                    url_json['zip']['choice'] = null;
                }
                // mrtline -> clean mrtsec, mrt
                if(item[item.length-1]=='mrtline'){
                    url_json['mrtsec']['choice'] = null;
                    url_json['mrt']['choice'] = null;
                }
                // mrtsec -> clean mrt
                if(item[item.length-1]=='mrtsec'){
                    url_json['mrt']['choice'] = null;
                }
                // item to json
                if(item.length-1==1&&!url_json[item[item.length-1]]['choice']){
                    // only one new choice and no old choice
                    // put new choice into json
                    url_json[item[1]]['choice'] = item[0];
                }else{
					var old_choice = url_json[item[item.length-1]]['choice'];
                    url_json[item[item.length-1]]['choice'] = [];
                    if(old_choice&&!url_json[item[item.length-1]]['single_choice']){
                        // if it's have old choice and can multi select
                        // put old choice back to json
                        if($.type(old_choice)=='string'){
                            url_json[item[item.length-1]]['choice'].push(old_choice);
                        }else{
                            for(var i=0; i<old_choice.length; i++){
                                url_json[item[item.length-1]]['choice'].push(old_choice[i]);
                            }
                        }
                    }
                    // put new choice into json
                    for(var i=0; i<item.length-1; i++){
                        var is_duplicate = $.inArray(item[i], url_json[item[item.length-1]]['choice']);
                        if(is_remove){
                            // remove choice
                            url_json[item[item.length-1]]['choice'].splice(is_duplicate, 1);
                        }else{
                            if(!url_json[item[item.length-1]]['single_choice']){
                                // can multi select then remove duplicate
                                if(is_duplicate<0){
                                    // no duplicate
                                    url_json[item[item.length-1]]['choice'].push(item[i]);
                                }else{
                                    // remove choice
                                    url_json[item[item.length-1]]['choice'].splice(is_duplicate, 1);
                                }
                            }else{
                                // single choice item no need to remove duplicate
                                url_json[item[item.length-1]]['choice'].push(item[i]);
                            }
                        }
                    }
					
					
                    // set security
                    if(item[0]=='no'&&item[1]=='security'){
                        url_json[item[1]]['choice'] = item[0];
                    }else if($.inArray('no', url_json['security']['choice'])>-1){
                        url_json[item[1]]['choice'].splice($.inArray('no', url_json[item[1]]['choice']), 1);
                    }else if(item[0]!='no'&&item[0]!='yes'&&$.inArray('yes', url_json['security']['choice'])>-1){
                        url_json[item[1]]['choice'].splice($.inArray('yes', url_json[item[1]]['choice']), 1);
                    }
					
					/*
                    // yes-mrt
                    if(url_json['mrt']['choice']!=null){
                        if(typeof url_json['mrt']['choice']=='object'){
                            if(url_json['mrt']['choice'].length>1&&$.inArray('yes', url_json['mrt']['choice'])>-1){
                                url_json['mrt']['choice'].splice($.inArray('yes', url_json['mrt']['choice']), 1);
                            }
                        }
                    }
					*/
                }

                // set order
                if(item[1]=='asc'||item[1]=='desc'||item[1]=='sort'){
                    url_json['asc']['choice'] = url_json['desc']['choice'] = url_json['sort']['choice'] = null;
                    url_json[item[1]]['choice'] = item[0];
                }
                // remove item's choice
                if(url_json[item[item.length-1]]['choice'].length==0||item[0]=='ALL'||(item[0]==0&&item[1]=='up')||(item[0]==0&&item[1]=='down')||(item[0]=='up'&&item[1]=='down')){
                    url_json[item[item.length-1]]['choice'] = null;
                    //if(item[item.length-1]=='city') url_json['county']['choice'] = null;
                    if(item[item.length-1]=='county') url_json['city']['choice'] = null;
                    if(item[item.length-1]=='asc') url_json['desc']['choice'] = null;
                    if(item[item.length-1]=='desc') url_json['asc']['choice'] = null;
                    if(item[item.length-1]=='sort') url_json['sort']['choice'] = null;
                }
                if(is_reset=='yes'){
                    // set default page
                    if(item[item.length-1]!='page'){
                        url_json["page"]['choice'] = 'index';
                    }
                }

            }else if(item[0]=='ALL'&&item[1]=='ALL'){
                // remove all choice (reset)
                $.each(url_json, function(item, value){
                    if(item=='page'){
                        url_json[item]['choice'] = 'index';
                    }else if(value['choice']!=null){
                        url_json[item]['choice'] = null;
                    }
                });
            }

            // add item in url_path
            url_path = '';
			//if (window.console) { console.log("add item before:"+url_path); }
            $.each(url_json, function(item, value){
				//if (window.console) { console.log("url_path add:"+item+":"+JSON.stringify(value)); }
				
                if(value['choice']!=null&&item!='page'){
                    if(typeof value['choice']=='string'){
                        url_path += value['choice']+'-'+item;
                    }else{
                        if(item=='city'||item=='county'){
                            // EX: Taipei-city-NewTaipei-city-Taoyuan-county
                            for(var i=0; i<value['choice'].length; i++){
                                url_path += value['choice'][i]+'-'+item;
                                if(i<value['choice'].length-1){
                                    url_path += '-';
                                }
                            }
                        }else{
                            // EX: pool-spa-facility
                            for(var i=0; i<value['choice'].length; i++){
                                url_path += value['choice'][i]+'-';
                            }
                            url_path += item;
                        }
                    }
                    if(item=='city'&&url_json['city']['choice']!=null){
                        url_path += '/';
                    }else{
                        url_path += '/';
                    }
                }
            });
			if (window.console) { console.log("add item after:"+url_path); }
			
            // add page number in url_path
            if(url_json['page'])
                url_path += url_json['page']['choice']+'.html';

            return url_json;
        }else{
            // not item
            return false;
        }
    };
	
    // jsonToCriteria
	//desc:從url_json找出符合搜尋條件的文字,for麵包屑文字,使用、連接
	//return:例：台北市、中正區、大同區、整層住家
    function jsonToCriteria(url_json){
		//if (window.console){ console.log("jsonToCriteria"); }
		
        var search_criteria = [];
        var except_item = ['page', 'desc', 'asc', 'sort'];//例外清單，不做檢查
		
        var title_behind_item = [ 'county', 'parking', 'lift', 'security']; // EX: 台北市、桃園縣
        var no_title_item = ['city','use', 'type', 'zip', 'community', 'mrtsec', 'nearschool', 'neargarden', 'nearmarket', 'pingrate', 'pingratesup', 'sell', 'barrierfree', 'other', 'tags']; // EX: 中山區
        var range_item = {
            'price': '元',
            'area': '坪',
            'landarea': '坪',
            'balconyarea': '坪',
            'area': '坪',
            'areaplan': '坪',
            'year': '年',
            'room': '房',
            'roomplus': '房',
            'roomtotal': '房',
            'bathroom': '間',
            'floor': '樓',
            'family': '戶',
            'allprice': '％'
        };
        var other_item = ['mrtline', 'mrt', 'mrt2'];
				
		//設定搜尋標籤(for麵包屑)-default-ui
		console.log("jsonToCriteria-pc");
        $.each(url_json, function(k, v){
			//if (window.console){ console.log("jsonToCriteria key:"+k); }
			//if (window.console){ console.log("search_criteria.length:"+search_criteria.length); }
			
            if(v['choice']&&$.inArray(k,except_item)<0){
				//console.log("choice type:"+k+"-"+typeof v['choice']+","+v['choice']);
				//typeof v['choice']=='string' 為單一值，例：1-abc
				//typeof v['choice']=='object' 為多個值，例：1-2-3-abc
                if(typeof v['choice']=='string'){
					console.log("jsonToCriteria-string");
					//處理單一值
					if($.inArray(k,title_behind_item)>-1){
                        if(v['option'][v['choice']]) search_criteria.push(v['option'][v['choice']]+v['name']);
                        else search_criteria.push(v['choice']+v['name']);
                    }else if($.inArray(k,no_title_item)>-1){
                        if(v['option'][v['choice']]) search_criteria.push(v['option'][v['choice']]);
                        else search_criteria.push(v['choice']);
                    }else if($.inArray(k,other_item)>-1){
						if(k=="mrtline"){
							//console.log("mrtline v:"+v['choice']);
							var v_value=$('#search_mrtline input[value="'+v['choice']+'"]').attr("data-name");
							search_criteria.push(v_value);
						}else if(k=="mrt"){
							$.each(mrtAry, function(index, value) {
								if(value.mrtid==v['choice']){									
									search_criteria.push(value.mrtName);
									return false; // 等於break					
								}
							});
							console.log
						}else if(k=="mrt2"){
							//console.log("mrtline v:"+v['choice']);
							var v_value=$('#search_mrt input[value="'+v['choice']+'"]').attr("data-name");
							search_criteria.push(v_value);
						}				
                    }else{
                        if(v['option'][v['choice']]) search_criteria.push(v['name']+' '+v['option'][v['choice']]);
                        else search_criteria.push(v['name']+' '+v['choice']);
                    }
                }else{
                    if($.inArray(k,title_behind_item)>-1){
						console.log("jsonToCriteria-object-inArry");
                        for(var i=0; i<v['choice'].length; i++){
                            if(v['option'][v['choice'][i]]) search_criteria.push(v['option'][v['choice'][i]]+v['name']);
                            else search_criteria.push(v['choice'][i]+v['name']);
                        }
                    }else if($.inArray(k,other_item)>-1){
						console.log("jsonToCriteria-object-inArray-mrt");
						if(k=="mrtline"){
							//console.log("mrtline v:"+v['choice']);
							var v_value=$('#search_mrtline input[value="'+v['choice']+'"]').attr("data-name");
							search_criteria.push(v_value);
						}else if(k=="mrt"){
							console.log("mrt v:"+v['choice']);
							for(var i=0; i<v['choice'].length; i++){
								var v_value=$('#search_mrt input[value="'+v['choice'][i]+'"]').attr("data-name");
								search_criteria.push(v_value);
								//if(v['option'][v['choice'][i]]) search_criteria.push(v['option'][v['choice'][i]]+v['name']);
								//else search_criteria.push(v['choice'][i]+v['name']);			
							}
						}else if(k=="mrt2"){
							var v_value=$('#search_mrt input[value="'+v['choice']+'"]').attr("data-name");
							search_criteria.push(v_value);							
						}			
                    }else if(range_item[k]){
                        console.log("jsonToCriteria-object-range_item[k]");
						// EX: 總價 800-6000萬
                        if(v['choice'][1]=='up') search_criteria.push(v['name']+' '+v['choice'][0]+range_item[k]+'以上');
                        else if(v['choice'][1]=='down') search_criteria.push(v['name']+' '+v['choice'][0]+range_item[k]+'以下');
                        else if(v['choice'][0]==v['choice'][1]) search_criteria.push(v['name']+' '+v['choice'][0]+range_item[k]);
                        else search_criteria.push(v['name']+' '+v['choice'][0]+'-'+v['choice'][1]+range_item[k]);
					}else{
						console.log("jsonToCriteria-object-else");
                        var c = '';
                        if($.inArray(k,no_title_item)<0) c += v['name']+' ';
                        for(var i=0; i<v['choice'].length; i++){
                            if(v['option'][v['choice'][i]]) c += v['option'][v['choice'][i]];
                            else c += v['choice'][i];
                            if(i!=v['choice'].length-1) c += '、';
                        }
                        search_criteria.push(c);
                    }
                }
            }
        });
		//if (window.console){ console.log("jsonToCriteria output:"+search_criteria); }
        return search_criteria.join('、');
    }

    // setHistory
    function setHistory(url_path){
		if (window.console){
			console.log('setHistory:'+url_path);
		}
        // fix window.location.origin in IE
        if(!window.location.origin){
            //window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
			//window.location.origin = www_web_rootns;
		}
		
        if(history.pushState){
            history.pushState({}, document.title, www_web_rootns+settings['start_point']+url_path);
		}
    };

    // when history back and go
    if(window.addEventListener){
        window.addEventListener('popstate', function(event){
            if(event.state){
                location.reload();
            }
        }, false);
    }

	/*
	setChoice
	return:[Taipei-city,100-zip,103-zip,104-zip,index-page]
	*/
    function setChoice(url_json){
        var url_item_by_dash = [];
		//if (window.console){ console.log("setChoice"); }
        $.each(url_json, function(item, value){
			//if (window.console){ console.log(value['choice']); }		
            if(value['choice']!=null){
                $('.'+class_name).find('option, input[type="checkbox"], input[type="radio"], a').each(function(){
                    if(typeof value['choice']=='string'){
                        if(this.value==[value['choice']].join('-')+'-'+item){
                            // select option
                            $(this).prop("selected", true);
                        }else if(this.value==decodeURI(value['choice'])&&$(this).attr('name')==item){
                            // check, radio
                            $(this).prop("checked", true);
                        }
                    }else if(typeof value['choice']=='object'&& $(this).attr('name')==item){
                        for(var i=0; i<value['choice'].length; i++){
                            if(this.value==decodeURI(value['choice'][i])){
                                // check, radio
                                $(this).prop("checked", true);
                            }
                        }
                    }
					/*else if(typeof value['choice']=='object' && $(this).attr("data-item")==item){
						for(var i=0; i<value['choice'].length; i++){
							if(this.value==decodeURI(value['choice'][i])){
								$(this).parent().addClass("checked");
							}
						}
					}*/
                });
                // get_url_item
                if(typeof value['choice']=='string'){
                    url_item_by_dash.push(decodeURI([value['choice']].join('-'))+'-'+item);
                }else{
                    if(value['choice'][1]=='up'||value['choice'][1]=='down'||(!isNaN(value['choice'][0])&&!isNaN(value['choice'][1])&&value['single_choice'])||item=='floor'){
                        url_item_by_dash.push(value['choice'][0]+'-'+value['choice'][1]+'-'+item);
                    }else{
                        // EX: ['100-zip', '110-zip']
                        for(var i=0; i<value['choice'].length; i++){
                            url_item_by_dash.push(decodeURI(value['choice'][i])+'-'+item);
                        }
                    }
                }
            }
        });
		
		//例：[Taoyuan-city,324-zip,328-zip,335-zip,index-page]
		//if (window.console){ console.log("setChoice result:"+url_item_by_dash); }
        return url_item_by_dash;
    }

    // runItem
    function runItem(item, no_call, is_remove){
		if (window.console){ console.log("runItem:"+item+","+no_call+","+is_remove); }

        if(typeof item!="undefined"){
            var items = item.split('/');
            var rtn = true;
            $.each(items, function(k, item){
                if(item.match('-')){
                    if(!itemToJson(item, is_reset='yes', is_remove)) rtn = false;
                }
            });
			if (window.console) { console.log("runItem history:"+rtn+","+no_call+","+url_path); }
            if(rtn){
                if(set_history){					
                    setHistory(url_path);
				}
                if(!no_call){
                    if(typeof callback == 'function'){
                        callback.call(this, path=$.get_url_path(), page=$.get_url_page(), criteria=$.get_search_criteria());
                    }
                }
                return true;
            }else{
                return false;
            }
        }
    }
	
    // select
    $('.'+class_name).find('select').change(function(){
        var item = $(this).val();
        var name = item.split('-')[item.split('-').length-1];
        if(name=='city'||name=='county'){
            itemToJson('ALL-city');
            itemToJson('ALL-county');
        }else{
            itemToJson('ALL-'+name);
        }
        runItem(item);
    });

    // a
    $('.'+class_name).on('click', 'a', function(){
        var item = $(this).attr('href');
		console.log("class_name:"+class_name+" a :click");

        // for buy list/mrt
        if(item.match('/index.html')){
            item = item.replace('/index.html','').split('/').slice(-1)[0];
        }
		
		//box
		if (window.console){
			var bb=item.split('/');
			console.log("item:"+JSON.stringify(bb));		
		}
		
        var result = false;
        if(item.match('/')){
 			if (window.console){
				console.log("item match");		
			}
			
           var hrefs = item.split('/');
            $.each(hrefs, function(k, v){
                result = runItem(v);
            });
        }else{
 			if (window.console){
				console.log("item not match");		
			}
			
            var name = item.split('-')[item.split('-').length-1];
            if(name=='city'||name=='county'){
                itemToJson('ALL-city');
                itemToJson('ALL-county');
                itemToJson('ALL-zip');
            }else if(name=='mrtline'){
                itemToJson('ALL-mrtline');
                itemToJson('ALL-mrtsec');
                itemToJson('ALL-mrt');
            }else if(name=='mrtsec'){
                itemToJson('ALL-mrtsec');
                itemToJson('ALL-mrt');
            }
            result = runItem(item);
        }
        if(result){
            // for <a> function
            return false;
        }
    });

    // input
    $('.'+class_name).find('input[type="button"]').click(function(){
		var name = $(this).attr('name');
		console.log("class_name:"+class_name+" input[type=button] :click");
        if(typeof name!="undefined"){
            if(name.match('-')){
                runItem(name);
            }else{
                // input
                if($('.'+class_name).find('.input_'+name).length>0){
                    var input = $('.'+class_name).find('.input_'+name).val();
                    if(url_json[name]['single_choice']) itemToJson('ALL-'+name);
                    runItem(input+'-'+name);
                }
                // min & max
                if($('.'+class_name).find('.min_'+name).length>0&&$('.'+class_name).find('.max_'+name).length>0){
                    var min_input = $('.'+class_name).find('.min_'+name).val();
                    var max_input = $('.'+class_name).find('.max_'+name).val();
                    if(min_input==0&&max_input==0){
                        runItem('ALL-'+name);
                    }else if(min_input==0){
                        runItem(max_input+'-down-'+name);
                    }else if(max_input==0){
                        runItem(min_input+'-up-'+name);
                    }else{
                        runItem(min_input+'-'+max_input+'-'+name);
                    }
                }
            }
        }
    });
	
	// checkbox, radio
	$('.'+class_name).on('click', 'input[type="checkbox"], input[type="radio"]', function(){
		console.log("class_name:"+class_name+" input[type=checkbox], input[type=radio] click");
        var item = $(this).val()+'-'+$(this).attr('data-item');
        runItem(item);
	});
	/*
    // checkbox, radio
    $('.'+class_name).find('input[type="checkbox"], input[type="radio"]').click(function(){
		console.log("class_name:"+class_name+" input[type=checkbox], input[type=radio] :click");
        var item = $(this).val()+'-'+$(this).attr('data-item');
        runItem(item);
    });
	*/

	/*
    // ul li
    $('.'+class_name).find('li').click(function(){
        runItem($(this).data('url'));
    });

    // ping_type
    $('.'+class_name).find('input[type="radio"][name="ping_type"]').click(function(){
        var ping_type = $(this).val();
        $('.ping_type a').each(function(){
            if($(this).attr('href').match(/area/)){
                $(this).attr('href', $(this).attr('href').split('-').splice(0,2).join('-')+'-'+ping_type);
            }
        });
        $('.ping_type input[type="text"]').each(function(){
            var old_class = $(this).attr('class').match(/\S+area/)[0];
            if($(this).attr('class').match(/\S+area/)){
                $(this).removeClass(old_class);
                $(this).addClass(old_class.split('_')[0]+'_'+ping_type);
            }
        });
        $('.ping_type input[type="button"]').attr('name', ping_type);
    });

    // room_type
    $('.'+class_name).find('input[type="radio"][name="room_type"]').click(function(){
        var room_type = $(this).val();
        $('.room_type a').each(function(){
            if($(this).attr('href').match(/room/)){
                $(this).attr('href', $(this).attr('href').split('-').splice(0,2).join('-')+'-'+room_type);
            }
        });
        $('.room_type input[type="text"]').each(function(){
            var old_class = $(this).attr('class').match(/room/)['input'];
            if($(this).attr('class').match(/room/)){
                $(this).removeClass(old_class);
                $(this).addClass(old_class.split('_')[0]+'_'+room_type);
            }
        });
        $('.room_type input[type="button"]').attr('name', room_type);
    });

    // front_type
    $('.'+class_name).find('input[type="radio"][name="front_type"]').click(function(){
        var front_type = $(this).val();
        $('.front_type a').each(function(){
            if($(this).attr('href').match(/front/)){
                $(this).attr('href', $(this).attr('href').split('-').splice(0,1).join('-')+'-'+front_type);
            }
        });
    });
	*/

    // get_url_path
    $.get_url_path = function(){
		if (window.console){ console.log("get_url_path:"+url_path); }
        var url_path_s = url_path.split('/');
        url_path_s.pop(); // pop page
        return decodeURI(url_path_s.join('/'));
    };

    // get_url_page
    $.get_url_page = function(){
		if (window.console){ console.log("get_url_page:"); }
        var url_path_s = url_path.split('/');
        var url_page = url_path_s[url_path_s.length-1].replace('.html', '');
        if(url_page=='index') url_page = 1;
        return url_page;
    };

    // get_parse_url_version
    $.get_parse_url_version = function(){
        return version;
    };

    // get_search_criteria-ok
    $.get_search_criteria = function(){
		//if (window.console){ console.log("get_search_criteria"); }
		//if (window.console){ console.log("get_search_criteria:"+decodeURI(jsonToCriteria(url_json))); }
        return decodeURI(jsonToCriteria(url_json));
    };

    // set_url_item EX: 100-zip
    $.set_url_item = function(item){
		if (window.console){ console.log("set_url_item:"); }
        return runItem(item);
    };

    // set_url_item_no_callback EX: 100-zip
    $.set_url_item_no_callback = function(item){
		if (window.console){ console.log("set_url_item_no_callback:"); }
        return runItem(item, no_call=true);
    };

    // remove_url_item EX: 100-zip
    $.remove_url_item = function(item){
		if (window.console){ console.log("remove_url_item:"); }
        return runItem(item, no_call=false, is_remove=true);
    };

    // get_url_item  EX: ['100-zip', '110-zip']
    $.get_url_item = function(item){
		//if (window.console){ console.log("get_url_item:"); }
        return setChoice(url_json);
    };
	
    $.stlib = function(){
        console.log("stlib url_json:"+JSON.stringify(url_json) );
        console.log("stlib url_path:"+url_path );
    };

    var TO_count = 0;
    function waitForUrlJson(){
        if(typeof url_json != 'undefined' && !$.isEmptyObject(url_json)){
            // start!
            loadUrl(url_json);
        }else{
            // wait 10 times to get url_json
            if(TO_count<10){
                setTimeout(waitForUrlJson,250);
                TO_count++;
            }else{
                console.log('Error: Cannot get url_json.js');
            }
        }
    }
    waitForUrlJson();
}
