<?php 

/**
* función para procesar los ficheros claves
* @param $type : nombre del tipo de clave aprocesar
*/
function setClaves($type){
    $url_module = DRUPAL_ROOT .'/'.drupal_get_path("module","elecciones");
    switch ($type) {
        case 'partido':

            $txt = explode("\n",file_get_contents( $url_module."/claves/txt/PARTIDOS.TXT" ));
			$dataPartidosID=array();
			foreach( $txt as $key=> $val){
				$codigo=substr($val, 0, 3);
				$nombre=utf8_encode(substr($val, 3, 86));
				if ($codigo!="") {
					$partido = array(
						'nombre' => $nombre
					);
					$dataPartidosID[$codigo] = $partido;
				}
            }
            
            $json_string=json_encode($dataPartidosID,JSON_UNESCAPED_UNICODE);
            $path = $url_module."/claves/json/";
            $nameFile="partidos.json";
            save_json($nameFile,$path,$json_string);
            break;
        
        case 'candidatoSenado':
            $txt = explode("\n",file_get_contents( $url_module."/claves/txt/CANDIDATOS.TXT" ));
            $dataCandidatos=array();
            $i=1;
            foreach( $txt as $key=> $value){
                $cod_corporacion=substr($value, 0, 3);
                if($cod_corporacion=='001'){
                    
                    $cod_corporacion=substr($value, 0, 3);
                    $cod_departamento=substr($value, 4, 2);
                    $cod_municipio=substr($value, 6, 3);
                    $cod_candidato=substr($value, 14, 3);
                    $cod_partido=substr($value, 11, 3);
                    $cod_candidato=substr($value, 14, 3);
                    $nombre=utf8_encode(substr($value, 18, 47));
                    $apellido=utf8_encode(substr($value, 68, 20));
                    $cedula=substr($value, 100,31);
                    $Candidato=array(
                        'nombre' => trim($nombre)." ".trim($apellido),
                        'cedula'=>trim($cedula)
                    );
                    $dataCandidatos[$cod_partido][$cod_candidato]=$Candidato;
                    $i++;
                }
                
            }
            $json_string=json_encode($dataCandidatos);
            $path = $url_module."/claves/json/";
            $nameFile="candidatoSenado.json";
            save_json($nameFile,$path,$json_string);
            break;

        case 'candidatoCamara':
            $txt = explode("\n",file_get_contents( $url_module."/claves/txt/CANDIDATOS.TXT" ));
            $dataCandidatos=array();
            $i=1;
            foreach( $txt as $key=> $value){
                $cod_corporacion=substr($value, 0, 3);
                $cod_departamento=substr($value, 4, 2);
                $nombre=utf8_encode(substr($value, 18, 47));
                $apellido=utf8_encode(substr($value, 68, 20));
                $cod_candidato=substr($value, 14, 3);
                if($cod_corporacion=='002'){                    
                    if($cod_departamento=="03"){
                        if($cod_candidato!="000"){                        
                            $cod_candidato=substr($value, 14, 3);
                            $cod_partido=substr($value, 11, 3);
                            
                            $nombre=utf8_encode(substr($value, 18, 47));
                            $apellido=utf8_encode(substr($value, 68, 20));
                            $cedula=substr($value, 100,31);
                            $Candidato=array(
                                'nombre' => trim($nombre)." ".trim($apellido),
                                'cedula'=>trim($cedula)
                            );
                            $dataCandidatos[$cod_partido][$cod_candidato]=$Candidato;
                        }
                    }          
                                            
                }                
            }

            $json_string=json_encode($dataCandidatos,JSON_UNESCAPED_UNICODE);
            $path = $url_module."/claves/json/";
            $nameFile="candidatoCamara.json";
            save_json($nameFile,$path,$json_string);
            break;
    }
}
?>