if (screen.width > 480) {
    var depto = "ATLANTICO";
    var corporacion = 'camara';
    var clave = 'claveCamara';
    var consolidado;
    var Ejecucion = new Array();; // cantidad de ciclos ejecutados
    var Refresh = 300000; // tiempo para verificar si hay nuevos datos
    var limite = 50; // limite de resultados a mostrar
    var animateTime = 9000; // tiempo de la animación
    var DataCandidato;
    var refreshId = {}
    var porcentajeNew = 0;

    if (corporacion == 'senado') {
        setClavesDesktop('claveSenado');
        resultadoSenadoDesktop();
        setInterval(function() {
            resultadoSenadoDesktop();
        }, Refresh);
    } else if (corporacion == 'camara') {
        setClavesDesktop('claveCamara');
        setSelectCamaraDesktop();
        resultadoCamaraDesktop('ATLANTICO');
        setInterval(function() {
            resultadoCamaraDesktop('ATLANTICO');
        }, Refresh);
    }




    $.expr[':'].icontains = function(obj, index, meta, stack) {
        return (obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0;
    };

    $(document).ready(function() {

        $('#search-cand-desktop').keyup(function() {
            buscar = $(this).val();
            $('li.result-cand.resul-desktop').hide();
            if (jQuery.trim(buscar) != '') {
                search = $(".data-can h2:icontains('" + buscar + "')").parents("li").show();
                //search.length;
            } else {
                $(".result-cand.resul-desktop").show();
            }
        });


        $("#sec-nav #box-select.select-desktop").hide(); //ocultar select de departamentos 
        /*-------------------------SENADO-------------------------*/

        $('.opciones #opc-senado.desktop').click(function() {
            $(this).addClass("active");
            $('.opciones #opc-camara.desktop').removeClass("active");
            $("ul.resultado-desktop").html('');
            $("#sec-nav #box-select.select-desktop").hide();
            Ejecucion = 0;
            corporacion = 'senado';
            setClavesDesktop('claveSenado');
            resultadoSenadoDesktop();
        });

        /*-------------------------CAMARA-------------------------*/

        $('.opciones #opc-camara.desktop').click(function() {
            $(this).addClass("active");
            $('.opciones #opc-senado.desktop').removeClass("active");
            Ejecucion = 0;
            corporacion = 'camara';
            depto = "ATLANTICO";
            setSelectCamaraDesktop();
            $("ul.resultado-desktop").html('');
            $("#sec-nav #box-select.select-desktop").show();
            setClavesDesktop('claveCamara');
            resultadoCamaraDesktop(depto);
            $("h2.corporacion").html("<b>SENADO</b>DE LA REPÚBLICA");
        });

        $('.dpto-select-camara-desktop').on('change', function() {
            Ejecucion = 0;
            depto = this.value;
            setClavesDesktop('claveCamara');
            $(".resultado-desktop").html("<ul class='resultado-desktop'></ul>");
            resultadoCamaraDesktop(this.value);
            $("h2.corporacion").html("<b>CÁMARA</b> DE REPRESENTANTES");
        });



    });

    /*
     * define las claves para senado y camara 
     */
    function setClavesDesktop(clave) {
        $.getJSON('/resultados/elecciones/2018/json/' + clave, function(dataC) {
            DataCandidato = dataC;
        });
    }

    /*
     * función para crear el select con el listado de departamentos
     * aplica solo para los resultados de la camara
     */
    function setSelectCamaraDesktop() {
        $.getJSON('/resultados/elecciones/2018/json/camara', function(data) {
            for (index = 0; index < Object.keys(data).length; index++) {
                if (Object.keys(data)[index] != 'ATLANTICO' && Object.keys(data)[index] != 'BOLIVAR' && Object.keys(data)[index] != 'CESAR' &&
                    Object.keys(data)[index] != 'CORDOBA' && Object.keys(data)[index] != 'MAGDALENA' && Object.keys(data)[index] != 'SUCRE' &&
                    Object.keys(data)[index] != 'LA_GUAJIRA' && Object.keys(data)[index] != 'SAN_ANDRES') {
                    $(".dpto-select-camara-desktop").append($("<option>").attr('value', Object.keys(data)[index]).text(Object.keys(data)[index]));
                }
            }
        });
    }



    /*
     * Función para realizar el render de resultados por la camara
     */
    function resultadoCamaraDesktop(dpto) {
        $.getJSON('/resultados/elecciones/2018/json/camara', function(json) {

            $("#resultados_desktop #datos .box-boletin .boletin").text(json.ATLANTICO.data.boletin);
            $("#resultados_desktop #datos .porcentaje_boletin .numero").text(parseFloat(json.ATLANTICO.data.Pmesas).toFixed(0) + "%")
            $("#resultados_desktop #datos .box-hora .hora").text(json.ATLANTICO.data.hora);
            json.ATLANTICO.data.Vnulos, $("#resultados_desktop #datos .box-votosn .votosn").text(json.ATLANTICO.data.Vnulos);
            $("#resultados_desktop #datos .box-votosc .votosc").text(json.ATLANTICO.data.votos.split(" ")[0]);

            index = 0;
            candidato = json.ATLANTICO.data.candidato[0];
            candidato.forEach(function(candidato) {
                cc = DataCandidato[candidato.Idpartido][candidato.Idcandidato].cedula;
                if (Ejecucion[index] == undefined) {
                    html = `
                    <li class="result-cand resul-desktop candi_${candidato.Idcandidato}" data-partido="${candidato.Idpartido}" value="${parseFloat(candidato.porcentaje).toFixed(2)}" class="items-result">                               
                        <div class="data-can">
                            <h2>${UTF8.decode(DataCandidato[candidato.Idpartido][candidato.Idcandidato].nombre)}</h2>
                            <span class="partido">${candidato.partido}</span> 
                            <div class="barra barra_${cc}" data="${parseFloat(candidato.porcentaje).toFixed(2)}">
                                <div style="width:${parseFloat(candidato.porcentaje).toFixed(2)}%" class="porcet item_porc_${candidato.Idcandidato}"></div>
                            </div>  
                        </div>

                        <div class="votos">
                            <span class="porcentaje">${parseFloat(candidato.porcentaje).toFixed(2)}%</span>
                            <span class="cantidad"><b data="${candidato.votos}">${candidato.votos}</b> votos</span>
                        </div>                                                                  
                    </li>`;

                    $("#lista-resultados ul.resultado-desktop").append(html);
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
    function resultadoSenadoDesktop() {
        $.getJSON('/resultados/elecciones/2018/json/senado', function(json) {
            $("#resultados_desktop #datos .box-boletin .boletin").text(json.NACIONAL.data.boletin);
            $("#resultados_desktop #datos .porcentaje_boletin .numero").text(parseFloat(json.NACIONAL.data.Pmesas).toFixed(0) + '%');
            $("#resultados_desktop #datos .box-hora .hora").text(json.NACIONAL.data.hora);

            $("#resultados_desktop #datos .box-votosn .votosn").text(json.NACIONAL.data.Vnulos);
            $("#resultados_desktop #datos .box-votosc .votosc").text(json.NACIONAL.data.votos.split(" ")[0]);
            index = 0;
            candidato = json.NACIONAL.data.candidato[0];
            candidato.forEach(function(candidato) {
                cc = DataCandidato[candidato.Idpartido][candidato.Idcandidato].cedula;
                if (Ejecucion[index] == undefined) {

                    html = `
                    <li class="result-cand resul-desktop candi_${candidato.Idcandidato}" data-partido="${candidato.Idpartido}" value="${parseFloat(candidato.porcentaje).toFixed(2)}" class="items-result">                               
                        <div class="data-can">
                            <h2>${UTF8.decode(DataCandidato[candidato.Idpartido][candidato.Idcandidato].nombre)}</h2>
                            <span class="partido">${candidato.partido}</span> 
                            <div class="barra barra_${cc}" data="${parseFloat(candidato.porcentaje).toFixed(2)}">
                                <div style="width:${parseFloat(candidato.porcentaje).toFixed(2)}%" class="porcet item_porc_${candidato.Idcandidato}"></div>
                            </div>  
                        </div>

                        <div class="votos">
                            <span class="porcentaje">${parseFloat(candidato.porcentaje).toFixed(2)}%</span>
                            <span class="cantidad"><b data="${candidato.votos}">${candidato.votos}</b> votos</span>
                        </div>                                                                  
                    </li>`;

                    $("ul.resultado-desktop").append(html);
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

    $(function() {
        var map = $('#box-mapa').vectorMap({ map: 'co_merc' });
        sanandres();
    });

    function sanandres() {
        $("svg").find("[data-code='CO-SAP']").attr("d", "M146.1,105.7c2.1,0.1,3-0.9,4.1-2.3c1.4-1.7,3.7-2.4,5.4-3.7c1.4-1,2.7-2.3,4-3.6c1.3-1.2,2.6-2.4,4.1-3.5     c1.7-1,4,0.3,5.2,2.7c0.5,1.2,0.8,2.6,1.4,3.6c0.6,0.9,1.5,1.8,2.4,2.3c2.6,1.3,5.3,2.2,7.7,3.6c2.3,1.3,2.2,1.7,0.3,3.6     c-2.6-1.8-7.5-1.4-9.8,0.5c-1.2,0.9-2.6,1.5-4,2.1c-2.7,0.9-3.2,1.4-3,3.6c1.7,1.2,2.8,2.2,4.4,3.4c-0.5,0.5-1,0.9-1.3,1     c-1.7-1-3.1-1.8-4.6-2.8c-0.6,3.2,0.5,4.8,3.7,5.3c0.3,0,0.5,0,0.6,0.1c0.8,0.6,1.4,1.3,2.2,1.9c-0.9,0.5-1.8,1.4-2.8,1.5     c-1.3,0.1-2.6-0.3-3.9-0.5c-0.6,2.7,0.3,3.9,2.8,3.5c0.1,1.7,0.4,3.4,0.4,5c0,3.5,0.1,6.8-0.1,10.3c0,1.2-0.5,2.8-1.3,3.4     c-2.8,1.8-2.8,4.5-2.3,7.1c1,4.9-0.9,8.5-4,11.9c-1.2,1.3-2.2,2.6-1.3,4.5c0.1,0.3,0.1,0.8-0.1,1c-2.3,3.4-1.7,7.5-2.6,11.1     c-1.4,5.9-3.4,11.5-6.1,16.9c-1.8,3.7-3.6,7.5-5.4,11.2c-0.5,1-1,2.1-1.7,3.1c-1.3,2.2-4.6,2.1-6.2-0.4c-1.5-2.3-3.2-4.8-3.9-7.3     c-0.5-2.2,0-4.8,0.8-7.1c0.9-3.1,2.3-5.9,3.6-9c0.6-1.5,1.4-3.1,1.9-4.8c0.3-0.9,0.3-1.8,0.4-2.8c0.3-1.9-0.1-3.7,0.6-5.8     c0.9-2.4,0.1-5.5,0.1-8.2c0-0.1-0.3-0.3-0.3-0.3c1.9-4.4-2.1-3.7-4-4.5c-1.9-0.8-3.2-3.2-2.2-5.7c1.3-3.6,2.2-7.6,4.1-10.8     c2.1-3.4,1.9-5.5-0.1-8.9c-1.5-2.7-1.4-6.3,0.8-8.9c1.7-1.9,4.1-3.2,6.2-4.8c1.9-1.4,3.4-3,3.4-5.5     C146.1,114.8,146.1,110.4,146.1,105.7z M193.7,153.1c-0.1,0.4,0.3,0.8,0.4,1.2c0.6,1.8,0.6,3.6-0.6,5.2c-0.3,0.4-0.4,1-0.3,1.3     c1,1.8,2.1,3.6,3.4,5.3c0.4,0.5,1.7,0.5,2.3,0.3c1.9-0.8,3.7-2.4,5.7-2.4c4.1-0.1,6.8-2.6,9.1-5.3c2.4-2.8,5-4.6,8.8-5.3     c3.5-0.6,7.5-7.9,6.8-11.7c-0.4-1.8-0.4-3.7-0.8-5.5c-0.4-2.1,0.8-3.1,2.4-3.7c0.6-0.3,1.3-0.4,1.7-0.8c1.7-1.3,4-2.3,3.1-5.4     c-0.6,0.1-1.3,0-1.9,0.3c-2.4,0.8-2.7,0.6-3.6-1.8c-0.8-2.1-1.5-4-2.3-6.1c-0.3-0.6-0.3-1.4,0-2.1c0.5-1.2,1.5-2.1,2.1-3.1     c0.5-1,0.9-2.2,0.8-3.4c0-0.5-1.4-0.9-2.2-1.3c-0.5-0.1-1.2,0-1.7-0.1c-1.4-0.4-3.1-0.6-3.6-2.4c-0.5-1.7-1.2-3.4-2.1-5.7     c-0.8,1.2-1.2,1.7-1.7,2.2c-0.5,0.6-0.9,1.7-1.5,1.8c-2.4,0.6-2.6,2.3-2.4,4.3c0,1,0,2.1,0,3.2c0,3.1-1.2,4.6-4.1,5.2     c-1.3,0.3-2.7,0.5-3.9-0.8c-1-1-2.2-1.2-4-0.5c-1.9,0.8-2.6,2.4-3.9,3.7c-3.2,3-5,6.6-6.1,10.6c-0.6,2.4-0.3,5.2-0.5,7.7     c0,1,0,2.1-0.4,3c-0.9,1.8-2.2,3.5-3.2,5C191.4,148.4,194.5,149.7,193.7,153.1z M216.2,92.3c-1.2,1.2-2.4,0.4-3.7,0.5     c-0.5,0-1,0.4-1.5,0.6c-0.9,0.4-1.8,1-2.7,1.3c-2.2,0.6-3.5,3.2-2.3,5.2c0.6,1.2,1.5,2.1,2.3,3.1c0.8,1.3,1.4,2.6,3.4,1.9     c1.4-0.4,3-0.4,4.1-1.2c0.9-0.5,1.3-1.9,1.7-3.1c0.1-0.3-1.2-0.9-1.5-1.4c-0.5-0.5-1-1.3-1.2-1.9c-0.1-1.8,0.3-3.6,2.6-4.5     C216.7,92.7,216.3,92.3,216.2,92.3z");
    }

    /*
     * función para colocar el color del partido en el mapa
     */
    function resultadoSenado2() {
        deptos = ['CO-ANT', 'CO-ATL', 'CO-BOL', 'CO-BOY', 'CO-CAL', 'CO-CAU', 'CO-CES', 'CO-COR', 'CO-CUN', 'CO-DC', 'CO-CHO', 'CO-HUI', 'CO-MAG', 'CO-NAR', 'CO-RIS', 'CO-NSA', 'CO-QUI', 'CO-SAN', 'CO-SUC', 'CO-TOL', 'CO-VAC', 'CO-ARA', 'CO-CAQ', 'CO-CAS', 'CO-LAG', 'CO-GUA', 'CO-MET', 'CO-GUV', 'CO-SAP', 'CO-AMA', 'CO-PUT', 'CO-VAU', 'CO-VID'];
        $.getJSON('/resultados/elecciones/2018/json/senado2', function(data) {
            for (index = 0; index < Object.keys(data).length; index++) {
                partido = data[Object.keys(data)[index]].data.partido[0][0].Idpartido;
                $("svg").find("[data-code='" + deptos[index] + "']").addClass('partido_' + partido);
                $("svg").find("[data-code='" + deptos[index] + "']").attr('data-partido', 'partido_' + partido);
            }
        });
    }


    function utf8_decode(texto) {
        //console.log(texto);
        var resultado = $.Deferred();
        $.ajax({
            type: "post",
            url: '/resultados/elecciones/2018/utf8',
            data: { text: texto },
            success: function(res) {
                resultado.resolve(res)
            }

        });
        return resultado.promise();
    }

    UTF8 = {
        encode: function(s) {
            for (var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l; s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]);
            return s.join("");
        },
        decode: function(s) {
            for (var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
                ((a = s[i][c](0)) & 0x80) &&
                (s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
                    o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
            );
            return s.join("");
        }
    };

}