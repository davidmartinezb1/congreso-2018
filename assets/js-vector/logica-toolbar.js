var indi="ATLANTICO";
var datos_capital;
var key="";
var key_temp="";
$(function(){
	cargarValoresNacional();
	setInterval(function(){
		cargarValoresNacional();
	}, 59000);
});

function count($element, orientacion, simasno){
	var valActual = parseInt($element.html(), 10);
	var valData=$element.attr('data-count');
	if (valActual!=0) {
		if(valActual < valData){
			valActual = valActual + 1; 
			$element.html(valActual);
			setTimeout(function(){
				count($element, orientacion, simasno);
			}, 10);
		}
	} else{
		$element.html($element.attr('data-count'));
	}
	porc=Math.round(((valData*100)/simasno));
	if (orientacion=="h") {
		$element.css("height", porc+"%");
	} else if(orientacion=="w") {
		$element.css("width", porc+"%");
	}
}

function cargarValoresNacional(){
	var ts = new Date().getTime();
	var time = {_: ts};
	//$.getJSON("js-vector/data-nac.json?", time, function(data_nac){ // consolidado nacional
	$.ajax({
		async:false,
		cache:false,
		url:"js-vector/data-nac.json?"+time,
		dataType: "json",
		success: function(data_nac) {
			var items_nac = [];
	     	$.each(data_nac, function( key_nac, val_nac ){
	     		clave_nac=items_nac.push(key_nac);
			    valor_nac=items_nac.push(val_nac);
				$(".nac-bol").html("Boletin Numero: <span class='resul-nac'>"+val_nac.data[1][0]+"</span>");
				$(".nac-hora").html("Hora de Actualizacion: <span class='resul-nac'>"+val_nac.data[2]+"</span>");
				$(".nac-fecha").html("Fecha de Actualizacion: <span class='resul-nac'>"+val_nac.data[3]+"</span>");
				$(".nac-mesas").html("Mesas informadas de las Instalas: <span class='resul-nac'>"+val_nac.data[4]+"</span>");
				$(".nac-votos").html("Votos contados del potencial de sufragantes: <span class='resul-nac'>"+val_nac.data[5]+"</span>");
				$(".nac-nulos").html("Votos nulos: <span class='resul-nac'>"+val_nac.data[6][0]+"</span>");
				$(".nac-marcados").html("Votos no marcados: <span class='resul-nac'>"+val_nac.data[7][0]+"</span>");
		    	$(".nac-votos-si").attr("data-count", val_nac.si[0]);
		    	$(".nac-votos-no").attr("data-count", val_nac.no[0]);
		    	$("#consol-nac-general .si").attr("data-count", val_nac.si[0]);
		    	$("#consol-nac-general .no").attr("data-count", val_nac.no[0]);
		    	simasno=parseInt(val_nac.si[0])+parseInt(val_nac.no[0]);
		    	if (simasno>=4378118) {
		    		// TODO
		    	}
		    	total_sufragantes=val_nac.data[5].split("de");
				total_sufragantes=total_sufragantes[1];
				// Si
		    	element=$(".nac-votos-si");
		    	count(element, "h", simasno);
		    	// Arriba
		    	element=$("#consol-nac-general .si");
		    	count(element, "w", simasno);
				// No
				element=$(".nac-votos-no");
		    	count(element, "h", simasno);
		    	// Arriba
		    	element=$("#consol-nac-general .no");
		    	count(element, "w", simasno);
			});
		}
	});
}