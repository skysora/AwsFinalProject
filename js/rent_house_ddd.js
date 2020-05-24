
function openDDD(){
	$(".ddd-box").addClass("open");
}

function setDDD(data){
	$(".ddd-content").html(JSON.stringify(data))
}

function closeDDD(){
	$(".ddd-box").removeClass("open");
}

