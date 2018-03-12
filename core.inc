<?php

/**
* función para extraer el listado de consolidados disponibles
* @param $auth : datos de acceso concatenados
* @param $list : tipo de datos a traer:
*        capitales (c), departamentos (d), nacional (n), atlantico (a)
*        senado departamentos (sd), senado capitales (sc), senado atlantico (sa)
*        camara departamentos (cd), camara capitales (cc), camara atlantico (ca)
*/
function getList($list){
    $auth=variable_get('username_regist', "").":".variable_get('pass_regist', "");
    
    $ch = curl_init ();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, $auth);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt ($ch, CURLOPT_HEADER, 0);     
    
    switch ($list) {
        case 'sn': //camara nacional
            $origen=$url=variable_get('url_regist', "")."/c99descargas/DESEINDEX.xml";
            curl_setopt ($ch, CURLOPT_URL, $origen);
            $output=curl_exec ($ch); 
            $oXML = new SimpleXMLElement($output);
            $fichero=$oXML->URL_Fichero_COLOMBIA;
            break;

        case 'cn': // camara nacional
            $origen=$url=variable_get('url_regist', "")."/c99descargas/DECAINDEX.xml";
            curl_setopt ($ch, CURLOPT_URL, $origen);
            $output=curl_exec ($ch); 
            $oXML = new SimpleXMLElement($output);
            $fichero=$oXML->URL_Fichero_COLOMBIA;
            break;
        
        case 'sd': // senado por departamentos
            $origen=$url=variable_get('url_regist', "")."/c99descargas/DESEINDEX.xml";
            curl_setopt ($ch, CURLOPT_URL, $origen);
            $output=curl_exec ($ch); 
            $oXML = new SimpleXMLElement($output);
            $fichero=$oXML->URL_Fichero_DEPARTAMENTOS;
            break;
        
        case 'sc': // senado por capitales
            $origen=$url=variable_get('url_regist', "")."/c99descargas/DESEINDEX.xml";
            curl_setopt ($ch, CURLOPT_URL, $origen);
            $output=curl_exec ($ch); 
            $oXML = new SimpleXMLElement($output);
            $fichero=$oXML->URL_Fichero_CAPITALES;
            break;

        case 'cd': // camara por departamentos
            $origen=$url=variable_get('url_regist', "")."/c99descargas/DECAINDEX.xml";
            curl_setopt ($ch, CURLOPT_URL, $origen);
            $output=curl_exec ($ch); 
            $oXML = new SimpleXMLElement($output);
            $fichero=$oXML->URL_Fichero_DEPARTAMENTOS;
            break;
        
        case 'cc': // camara por capitales
            $origen=$url=variable_get('url_regist', "")."/c99descargas/DECAINDEX.xml";
            curl_setopt ($ch, CURLOPT_URL, $origen);
            $output=curl_exec ($ch); 
            $oXML = new SimpleXMLElement($output);
            $fichero=$oXML->URL_Fichero_CAPITALES;
            break;

    }
    
    curl_close ($ch);
    $origen=$url=variable_get('url_regist', "").$fichero;
    get_zip($origen);

}


/**
* función para descargar archivos zip
* @param $origen : url donde se encuentra alojado el archivo comprimido 
*/
function get_zip($origen){
    $destino=explode("/",$origen);
    $destino=array_pop($destino);

    $auth=variable_get('username_regist', "").":".variable_get('pass_regist', "");
    $path=DRUPAL_ROOT . "/sites/default/files/elecciones/comprimido/";
    
    if(!is_dir($path)) {
        mkdir($path, 0777, true);
        print 'Creando carpetas de comprimido<br>';
    }else{
        print 'Fallo al crear carpetas de comprimido, ya existe<br>';
    }
    
    if (!file_exists($path.$destino)){
        $ch = curl_init ();
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERPWD, $auth);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		$fs_archivo = fopen ($path.$destino, "wb"); 
		curl_setopt ($ch, CURLOPT_FILE, $fs_archivo); 
        curl_setopt ($ch, CURLOPT_HEADER, 0); 
        curl_setopt ($ch, CURLOPT_URL, $origen);
		curl_exec ($ch); 
        curl_close ($ch); 
        
		fclose ($fs_archivo); 
		chmod($path.$destino, 0777); 
        print "zip de cosolidados descargado: ".$destino."<br>";
        descomprimir($path.$destino);
    }else{
        print "zip de cosolidados ".$destino." ya existe<br>";
    }
}

/**
* función para descomprimir archivos zip
* @param $origen : ruta interna donde se encuentran almacenados los archivos comprimido
* @param $destino : ruta interna donde se almacenarán los archivos xml una vez se descompriman
*/
function descomprimir($origen){
    
    $path=DRUPAL_ROOT . "/sites/default/files/elecciones/xml/";
    
    if(!is_dir($path)) {
        mkdir($path, 0777, true); 
        print 'Creando carpetas de XML<br>';
    }else{
        print 'Carpetas de XML, ya existe<br>';
    }

    $phar = new PharData($origen); 

    //print "<pre>".print_r($phar,1).print"</pre>";exit();

    if (!file_exists($path.$phar->getFilename())){
        $phar->extractTo($path);
        print "XML ".$phar->getFilename().", fue creado<br>";
        convert_json($phar->getFilename(),$path.$phar->getFilename());        
    }else{
        print "El Xml ".$phar->getFilename().", ya existe<br>";
    }
}

/**
* función para extraer los datos necesarios del xml de consolidados
* @param $type : nombre del xml procesado
* @param $origen : ruta interna donde se encuentra almacenado el archivo xml a procesar
*/
function convert_json($type,$origen){
    global $base_path;
    $url_module = drupal_get_path("module","elecciones");
    $nameType=explode("_",$type);

    if($nameType[1]=="SEN" && substr($nameType[2],0,2)=="DE"){ 
        // senado  por departamentos
        require_once DRUPAL_ROOT .'/'.$url_module.'/templates/departamentales/senado.tpl.php'; 
    }elseif($nameType[1]=="CAM" && substr($nameType[2],0,2)=="DE"){ 
        // camara por departamentos
        require_once DRUPAL_ROOT .'/'.$url_module.'/templates/departamentales/camara.tpl.php'; 
    }elseif($nameType[1]=="SEN" && substr($nameType[2],0,2)=="CA"){ 
        // senado por capitales
        require_once DRUPAL_ROOT .'/'.$url_module.'/templates/capitales/senado.tpl.php'; 
    }elseif($nameType[1]=="CAM" && substr($nameType[2],0,2)=="CA"){ 
        // camara por capitales
        require_once DRUPAL_ROOT .'/'.$url_module.'/templates/capitales/camara.tpl.php'; 
    }elseif($nameType[1]=="SEN" && substr($nameType[2],0,3)=="000"){ 
        // senado nacional
        require_once DRUPAL_ROOT .'/'.$url_module.'/templates/nacionales/senado.tpl.php'; 
    }elseif($nameType[1]=="CAM" && substr($nameType[2],0,3)=="000"){ 
        // camara nacional
        require_once DRUPAL_ROOT .'/'.$url_module.'/templates/nacionales/camara.tpl.php'; 
    }
}

/**
* función para extraer los datos necesarios del xml de consolidados
* @param $nameFile : nombre del json a crear o actualizar
* @param $path : ruta interna donde se almacenará el json generado
* @param $data : datos del consolidado en formato json 
*/
function save_json($nameFile,$path,$data){
    if(!is_dir($path)) {
        mkdir($path, 0777, true);                
    }
    $fp = fopen($path.$nameFile, 'w+');    
    fwrite($fp, $data);
    fclose($fp);
    print "Datos almacenados";
}

/**
* función para extraer los datos de la claves , por candidato de senado o camara
* @param $cod_partido : código del partido
* @param $cod_corporacion :código de la corporación (001 => SENADO, 002 => CAMARA, 003 => GRAN CONSULTA POR COLOMBIA, 004 => CONSULTA INCLUSION SOCIAL PARA LA PAZ   
* @param $cod_candidato : código del candidato
*/
function readClaveCandidato($cod_corporacion,$cod_partido,$cod_candidato){
    $url_module = DRUPAL_ROOT .'/'.drupal_get_path("module","elecciones");
    switch ($cod_corporacion) {
        case '001': // Senado
            $txt = file_get_contents($url_module."/claves/json/candidatoSenado.json" );
            break;
        case '002'://Camara
            $txt = file_get_contents($url_module."/claves/json/candidatoCamara.json" );
            break;
    }
    
    $data=json_decode($txt);
    $name=utf8_decode($data->{$cod_partido}->{$cod_candidato}->nombre);
    return utf8_decode($data->{$cod_partido}->{$cod_candidato}->nombre);
}


/**
* función para extraer los datos de la claves , por candidato de senado o camara
* @param $cod_partido : código del partido
*/
function readClavePartido($cod_partido){
    $url_module = DRUPAL_ROOT .'/'.drupal_get_path("module","elecciones");
    $txt = file_get_contents($url_module."/claves/json/partidos.json" );
    $data=json_decode($txt);
    return utf8_decode($data->{$cod_partido}->nombre);
}