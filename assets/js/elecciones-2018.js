if (screen.width < 384) {
    var depto = "ATLANTICO";
    var corporacion = 'senado';
    var clave = 'claveSenado';
    var consolidado;
    var Ejecucion = new Array();; // cantidad de ciclos ejecutados
    var Refresh = 10000; // tiempo para verificar si hay nuevos datos
    var limite = 50; // limite de resultados a mostrar
    var animateTime = 9000; // tiempo de la animación
    var DataCandidato;
    var refreshId = {}
    var porcentajeNew = 0;

    if (corporacion == 'senado') {
        $("h2.corporacion").html("<b>SENADO</b>DE LA REPÚBLICA");
        setClaves('claveSenado');
        resultadoSenado();
        setInterval(function() {
            resultadoSenado();
        }, Refresh);
    } else if (corporacion == 'camara') {
        $("h2.corporacion").html("<b>CÁMARA</b> DE REPRESENTANTES");
        setClaves('claveCamara');
        setSelectCamara();
        resultadoCamara(depto);
        setInterval(function() {
            resultadoCamara(depto);
        }, Refresh);
    }

}


$.expr[':'].icontains = function(obj, index, meta, stack) {
    return (obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0;
};

$(document).ready(function() {

    $('#search-cand').keyup(function() {
        buscar = $(this).val();
        $('li.result-cand').hide();
        if (jQuery.trim(buscar) != '') {
            search = $(".data-can h2:icontains('" + buscar + "')").parents("li").show();
            //search.length;
        } else {
            $("ul.resultado").find("li.result-cand").hide();
            $("li.result-cand").slice(0, 3).slideDown();
        }
    });

    $('#search-part').keyup(function() {
        buscar = $(this).val();
        $('li.result-cand').hide();
        if (jQuery.trim(buscar) != '') {
            search = $("span.partido:icontains('" + buscar + "')").parents("li").show();
            //search.length;
        } else {
            $("ul.resultado").find("li.result-cand").hide();
            $("li.result-cand").slice(0, 3).slideDown();
        }
    });



    $("#show-result").on('click', function(e) {
        e.preventDefault();
        $(".resultado li.result-cand:hidden").slice(0, 3).slideDown();
        if ($(".resultado li.result-cand:hidden").length == 0) {
            $("#show-result").fadeOut('slow');
        }

        if (screen.width < 1180) {
            $('html,body').animate({
                scrollTop: $(this).offset().top
            }, 1500);
        }

    });


    $("#sec-nav #box-select").hide(); //ocultar select de departamentos 
    /*-------------------------SENADO-------------------------*/

    $('#opciones #opc-senado').click(function() {
        console.log("senado");
        $("ul.resultado").html('');
        $("#sec-nav #box-select").hide();
        Ejecucion = 0;
        corporacion = 'senado';
        setClaves('claveSenado');
        resultadoSenado();
    });

    /*-------------------------CAMARA-------------------------*/

    $('#opciones #opc-camara').click(function() {
        Ejecucion = 0;
        corporacion = 'camara';
        depto = "ATLANTICO";
        setSelectCamara();
        $("ul.resultado").html('');
        $("#sec-nav #box-select").show();
        setClaves('claveCamara');
        resultadoCamara(depto);
        $("h2.corporacion").html("<b>SENADO</b>DE LA REPÚBLICA");
    });

    $('.dpto-select-camara').on('change', function() {
        Ejecucion = 0;
        depto = this.value;
        setClaves('claveCamara');
        $(".result-corpor").html("<ul class='resultado'></ul>");
        resultadoCamara(this.value);
        $("h2.corporacion").html("<b>CÁMARA</b> DE REPRESENTANTES");
    });



});

/*
 * define las claves para senado y camara 
 */
function setClaves(clave) {
    $.getJSON('/resultados/elecciones/2018/json/' + clave, function(dataC) {
        DataCandidato = dataC;
    });
}

/*
 * función para crear el select con el listado de departamentos
 * aplica solo para los resultados de la camara
 */
function setSelectCamara() {
    $.getJSON('/resultados/elecciones/2018/json/camara', function(data) {
        for (index = 0; index < Object.keys(data).length; index++) {
            if (Object.keys(data)[index] != 'ATLANTICO' && Object.keys(data)[index] != 'BOLIVAR' && Object.keys(data)[index] != 'CESAR' &&
                Object.keys(data)[index] != 'CORDOBA' && Object.keys(data)[index] != 'MAGDALENA' && Object.keys(data)[index] != 'SUCRE' &&
                Object.keys(data)[index] != 'LA_GUAJIRA' && Object.keys(data)[index] != 'SAN_ANDRES') {
                $(".dpto-select-camara").append($("<option>").attr('value', Object.keys(data)[index]).text(Object.keys(data)[index]));
            }
        }
    });
}

/*
 * functión para la barra de porcentaje
 */
function progressBarr(percent, element) {
    var old = element.attr('data');
    jQuery({
        Counter: old
    }).animate({
        Counter: percent
    }, {
        duration: animateTime,
        easing: 'swing',
        step: function() {
            element.attr('data', parseFloat(this.Counter).toFixed(2));
            element.find('div').css('width', parseFloat(this.Counter).toFixed(2) + '%');
        }
    });
}

/*
 * función para el efecto de contado incremental de votos, boletín, mesas informadas
 */
function progressNum(percent, element, simbol = "") {
    old = element.attr('data');

    jQuery({
        Counter: old
    }).animate({
        Counter: percent
    }, {
        duration: animateTime,
        easing: 'swing',
        step: function() {
            element.text(parseFloat(this.Counter).toFixed(0) + simbol);
            element.attr('data', parseFloat(this.Counter).toFixed(0));
        }
    });


}

/*
 * Función para realizar el render de resultados por la camara
 */
function resultadoCamara(dpto) {
    $.getJSON('/resultados/elecciones/2018/json/camara', function(json) {

        progressNum(json[dpto].data.boletin, $("#first-nav .box-boletin .boletin"));
        progressNum(json[dpto].data.Pmesas, $("#first-nav .porcentaje_boletin .vporcentaje"), "%");
        index = 0;
        candidato = json[dpto].data.candidato[0];
        candidato.forEach(function(candidato) {
            cc = DataCandidato[candidato.Idpartido][candidato.Idcandidato].cedula;
            if (Ejecucion[index] == undefined) {
                html = '';

                if (cc != undefined && cc != "") {
                    url_foto = `https://wsr.registraduria.gov.co/IMG/jpg/E2018_congreso/FOTOS/${cc}.jpg`;
                } else {
                    url_foto = `/sites/default/files/elecciones/logosPartidos/${candidato.Idpartido}.jpg`;
                }
                html = `
                        <li class="result-cand candi_${candidato.Idcandidato}" data-partido="${candidato.Idpartido}" value="${parseFloat(candidato.porcentaje).toFixed(2)}" class="items-result">                               
                            <figure>
                            <img src="${url_foto}" width="96" height="45" alt="">
                            </figure>
                            <div class="box-candidato">
                                <div class="data-can">
                                    <h2>${DataCandidato[candidato.Idpartido][candidato.Idcandidato].nombre}</h2>
                                    <span class="item_cant_votos_${cc}">Votos:<b data="${candidato.votos}">${candidato.votos}</b></span>
                                </div>
                                <span class="partido">${candidato.partido}</span> 
                                <div class="barra barra_${cc}" data="${parseFloat(candidato.porcentaje).toFixed(2)}">
                                    <div style="background:red; width:${parseFloat(candidato.porcentaje).toFixed(2)}%" class="porcet item_porc_${candidato.Idcandidato}"></div>
                                </div>
                            </div>                    
                        </li>`;

                $("ul.resultado").append(html);

                $("ul.resultado").find("li.result-cand").hide();
                $("li.result-cand").slice(0, 3).slideDown();
            } else {

                var bar = $("div.barra.barra_" + cc);
                progressvalue = $(bar).attr('data');
                porcentajeNew = parseFloat(candidato.porcentaje);
                var vot = $(".item_cant_votos_" + cc + " b");
                votoOld = vot.attr("data");
                votos = candidato.votos;
                if (porcentajeNew > progressvalue && votos > votoOld) {
                    progressBarr(porcentajeNew, bar);
                    progressNum(votos, vot);
                }
            }
            Ejecucion[index] = index++;
        });
        index = 0;
    });

}


/*
 * Función para realizar el render de resultados por el senado
 */
function resultadoSenado() {
    $.getJSON('/resultados/elecciones/2018/json/senado', function(json) {
        progressNum(json.NACIONAL.data.boletin, $("#first-nav .box-boletin .boletin"));
        progressNum(json.NACIONAL.data.Pmesas, $("#first-nav .porcentaje_boletin .vporcentaje"), "%");
        index = 0;
        candidato = json.NACIONAL.data.candidato[0];
        candidato.forEach(function(candidato) {
            cc = DataCandidato[candidato.Idpartido][candidato.Idcandidato].cedula;
            if (Ejecucion[index] == undefined) {
                html = '';

                if (cc != undefined && cc != "") {
                    url_foto = `https://wsr.registraduria.gov.co/IMG/jpg/E2018_congreso/FOTOS/${cc}.jpg`;
                } else {
                    url_foto = `/sites/default/files/elecciones/logosPartidos/${candidato.Idpartido}.jpg`;
                }
                html = `
                        <li class="result-cand candi_${candidato.Idcandidato}" data-partido="${candidato.Idpartido}" value="${parseFloat(candidato.porcentaje).toFixed(2)}" class="items-result">                               
                            <figure>
                            <img src="${url_foto}" width="96" height="45" alt="">
                            </figure>
                            <div class="box-candidato">
                                <div class="data-can">
                                    <h2>${DataCandidato[candidato.Idpartido][candidato.Idcandidato].nombre}</h2>
                                    <span class="item_cant_votos_${cc}">Votos:<b data="${candidato.votos}">${candidato.votos}</b></span>
                                </div>
                                <span class="partido">${candidato.partido}</span> 
                                <div class="barra barra_${cc}" data="${parseFloat(candidato.porcentaje).toFixed(2)}">
                                    <div style="background:red; width:${parseFloat(candidato.porcentaje).toFixed(2)}%" class="porcet item_porc_${candidato.Idcandidato}"></div>
                                </div>
                            </div>                    
                        </li>`;

                $("ul.resultado").append(html);

                $("ul.resultado").find("li.result-cand").hide();
                $("li.result-cand").slice(0, 3).slideDown();
            } else {

                var bar = $("div.barra.barra_" + cc);
                progressvalue = $(bar).attr('data');
                porcentajeNew = parseFloat(candidato.porcentaje);
                var vot = $(".item_cant_votos_" + cc + " b");
                votoOld = vot.attr("data");
                votos = candidato.votos;
                if (porcentajeNew > progressvalue && votos > votoOld) {
                    progressBarr(porcentajeNew, bar);
                    progressNum(votos, vot);
                }
            }
            Ejecucion[index] = index++;
        });
        index = 0;
    });

}