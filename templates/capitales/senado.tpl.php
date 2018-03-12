<?php 

//$origen="/var/www/html/desarrollos/drupaltest/sites/default/files/elecciones/xml/BOL_SEN_CA000_0021.xml";
$xml2= new SimpleXMLElement($origen, null, true);

$a=0;
$depto=array();

foreach ($xml2 as $key => $xml) {
    $n_boletin=(string)$xml->Numero["V"];
    $n_depto=(string)$xml->Desc_Departamento["V"]; 
    $n_boletin_depto=(string)$xml->Boletin_Departamental["V"]; 
    $n_capital=(string)$xml->Desc_Municipio["V"];
    $n_p_mesas=(string)$xml->Porc_Mesas_Informadas["V"];

    $temp=array();
    $temp[$a]=str_replace(" ","_",$n_depto);
    array_push($depto,$temp[$a]);

    $n_hora=(string)$xml->Hora["V"].":".$xml->Minuto["V"].":".$xml->Seg["V"]; 
    $n_fecha=(string)$xml->Dia["V"]."-".$xml->Mes["V"]."-".$xml->Anio["V"]; 
    $n_mesas=(string)$xml->Mesas_Informadas["V"]." de ".$xml->Mesas_Instaladas["V"];
    $n_votos=(string)$xml->Total_Sufragantes["V"]." de ".$xml->Potencial_Sufragantes["V"]; 
    $n_votonulos=(string)$xml->Votos_Nulos["V"]; 
    $n_nomarcados=(string)$xml->Votos_No_Marcados["V"]; 

    /*----------Partidos--------------*/
    $b=0;$Apartido=array();
    foreach ($xml->Detalle_Circunscripcion->lin->Detalle_Partido->lin as $partido) {      
        $tpartido[$b]=array(
            "Idpartido"=>(string)$partido->Partido["V"],
            "partido"=>readClavePartido((string)$partido->Partido["V"]),
            "votos"=>(string)$partido->Votos["V"],
            "porcentaje"=>(string)$partido->Porc["V"],
            "pref"=>(string)$partido->Pref["V"],
            "curules"=>(string)$partido->Curules["V"],
        );
        $b++;
    }
    array_push($Apartido,$tpartido);


    /*----------Candidatos--------------*/
    $c=0;$Acandidato=array();
    foreach ($xml->Detalle_Circunscripcion->lin->Detalle_Candidato->lin as $candidato) {      
        $tcandidato[$c]=array(
            "Idcandidato"=>(string)$candidato->Candidato["V"],
            "Amb_Presen"=>(string)$candidato->Amb_Presen["V"],
            "votos"=>(string)$candidato->Votos["V"],
            "porcentaje"=>(string)$candidato->Porc["V"],
            "Idpartido"=>(string)$candidato->Partido["V"], 
            "partido"=>readClavePartido((string)$candidato->Partido["V"]),       
            "sec"=>(string)$candidato->Sec["V"],
        );
        $c++;
    }
    array_push($Acandidato,$tcandidato);
    

    $data[$depto[$a]]=array();
    $data[$depto[$a]]['data']['lugar']=$n_capital;// nombre la capital
    $data[$depto[$a]]['data']['boletin']=$n_boletin;// numero de boletin
    $data[$depto[$a]]['data']['boletinDepto']=$n_boletin_depto;// numero de boletin
    $data[$depto[$a]]['data']['hora']=$n_hora;// Hora de actualizacion
    $data[$depto[$a]]['data']['fecha']=$n_fecha;// Fecha de actualizacion
    $data[$depto[$a]]['data']['mesas']=$n_mesas;// Mesas informadas de las Instalas
    $data[$depto[$a]]['data']['Pmesas']=$n_p_mesas;// Mesas informadas de las Instalas
    $data[$depto[$a]]['data']['votos']=$n_votos;// Votos contados del potencial de sufragantes
    $data[$depto[$a]]['data']['Vnulos']=$n_votonulos;// Votos nulos
    $data[$depto[$a]]['data']['Vblanco']=$n_nomarcados;// Votos no marcados*/
    $data[$depto[$a]]['data']['partido']=$Apartido;// array de datos por partido*/
    $data[$depto[$a]]['data']['candidato']=$Acandidato;// array de datos por partido*/
   
    print "Procesando Boletin N°".$n_boletin.",SENADO:".$n_depto.":".$n_capital."<hr><br>";
    $a++;
}


$json_string=json_encode($data);
$path = DRUPAL_ROOT . "/sites/default/files/elecciones/json/";
$nameFile="senado_capitales.json";
save_json($nameFile,$path,$json_string);

?>