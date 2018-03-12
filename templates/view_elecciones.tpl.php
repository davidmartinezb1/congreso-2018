    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" media="all" href="/sites/all/modules/custom/elecciones/assets/css/jquery-jvectormap.css" />
    <script src="/sites/all/modules/custom/elecciones/assets/js-vector/jquery-jvectormap.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/lib/jquery-mousewheel.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/jvectormap.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/abstract-element.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/abstract-canvas-element.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/abstract-shape-element.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/svg-element.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/svg-group-element.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/svg-canvas-element.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/svg-shape-element.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/svg-path-element.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/vector-canvas.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/simple-scale.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/numeric-scale.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/ordinal-scale.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/color-scale.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/map.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/map-object.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/src/region.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/jquery-jvectormap-co-merc.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/js/elecciones-2018.js"></script>
    <script src="/sites/all/modules/custom/elecciones/assets/js/elecciones-2018-desktop.js"></script>

<main id="resultado-corporacion">
	<section id="inicio" class="ResultadosCandidatos2018 movil">
		<div class="title-header">
            <h2><span>RESULTADOS</span><b>ELECCIONES 2018</b>Congreso de la República</h2>
        </div>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula interdum libero eget elementum. Curabitur id tempor enim. Aliquam leo quam, consequat sed tincidunt non, vehicula in est. Morbi eu sodales elit.</p>
		<span>Consulte los resultados para:</span>
		<div id="opciones">
			<a id="opc-senado" href="#"><b>SENADO</b> DE LA REPÚBLICA</a>
			<a id="opc-camara" href="#"><b>CÁMARA</b> DE REPRESENTANTES</a>
		</div>
	</section>

    <section id="resultadosCamara" class="ResultadosCandidatos2018 movil">
        <div id="first-nav">
            <h2 class="corporacion"><b>SENADO</b> DE LA REPÚBLICA</h2>
            <div class="box-boletin">
                <label>Boletín</label>
                <span class="boletin"></span>
            </div>
            
            <div class="porcentaje_boletin">
                <label>Mesas informadas</label>
                <div clas="box-porcentaje">
					<div class="porcentaje"></div>
					<span class="vporcentaje"></span>
				</div>
            </div>
        </div>

        <div id="sec-nav">
            <div id="box-select">
                <span>CONSOLIDADO</span>
                <select name="corporacion" class="dpto-select-camara" id="selec-corporacion">
                    <option value="ATLANTICO">ATLANTICO</option>
                    <option value="BOLIVAR">BOLIVAR</option>
                    <option value="CESAR">CESAR</option>
                    <option value="CORDOBA">CORDOBA</option>
                    <option value="MAGDALENA">MAGDALENA</option>
                    <option value="SUCRE">SUCRE</option>
                    <option value="LA_GUAJIRA">LA GUAJIRA</option>
                    <option value="SAN_ANDRES">SAN ANDRÉS</option>
                </select>
            </div>
			<div id="box-search">
				<input id="search-cand" type="text" placeholder="Buscar candidato">
				<input id="search-part" type="text" placeholder="Buscar por partidos">
			</div>
        </div>

        <div class="result-corpor">
            <ul class="resultado"></ul>
			<button id="show-result">Ver más resultados</button>
        </div>   
    </section>

	<section id="resultados_desktop" class="ResultadosCandidatos2018">
		<div id="info-datos">
			<div class="title-header">
				<h2><span>RESULTADOS</span><b>ELECCIONES 2018</b>Congreso de la República</h2>
			</div>
			<span class="label">Seleccione los resultados que desea ver:</span>
			<div class="opciones">
				<a href="#" id="opc-senado" class="desktop active"><b>SENADO</b> DE LA REPÚBLICA</a>
				<a href="#" id="opc-camara" class="desktop"><b>CÁMARA</b> DE REPRESENTANTES</a>
			</div> 
			<div id="sec-nav">
				<div id="box-select" class="select-desktop">
					<span>CONSOLIDADO:</span>
					<select name="corporacion" id="selec-corporacion" class="dpto-select-camara-desktop">
						<option value="ATLANTICO">ATLANTICO</option>
						<option value="BOLIVAR">BOLIVAR</option>
						<option value="CESAR">CESAR</option>
						<option value="CORDOBA">CORDOBA</option>
						<option value="MAGDALENA">MAGDALENA</option>
						<option value="SUCRE">SUCRE</option>
						<option value="LA_GUAJIRA">LA GUAJIRA</option>
						<option value="SAN_ANDRES">SAN ANDRÉS</option>
					</select>
				</div>
				<!--<button id="icon-change">Cambiar a resultados por partidos</button>-->        
			</div>
			<div id="datos">
				<div>
					<div class="box-boletin">
						<label>Boletín</label>
						<span class="boletin"></span>
					</div>
					<hr>
					<div class="box-votosc">
						<label>Votos contados</label>
						<span class="votosc"></span>
					</div>
				</div>
				<hr>
				<div>
					<div class="box-hora">
						<label>Hora</label>
						<span class="hora"></span>
					</div>
					<hr>
					<div class="box-votosn">
						<label>Votos nulos</label>
						<span class="votosn"></span>
					</div>
				</div>
				<hr>
				<div class="porcentaje_boletin">
					<label>Mesas informadas</label>
					<span class="numero">0%</span>
					<div class="box-porcentaje">
						<div class="porcentaje"></div>
						<div class="vporcentaje"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="mapa-partidos">
			<div id="box-mapa" style="width: 320px;height: 400px;">
			</div>
			<div id="box-partidos">
				<h3>PARTIDOS POLÍTICOS</h3>
				<ul>
					<li class="opinion">
						<span class="porcentaje">12%</span>
						<h2>Partido Opción Ciudadana</h2>
					</li>
					<li class="centro">
						<span class="porcentaje">12%</span>
						<h2>Centro Democrático</h2>
					</li>
					<li class="verde">
						<span class="porcentaje">12%</span>
						<h2>Alianza Verde</h2>
					</li>
					<li class="polo">
						<span class="porcentaje">12%</span>
						<h2>Polo Democrático Alternativo </h2>
					</li>
					<li class="cambio">
						<span class="porcentaje">12%</span>
						<h2>Partido Cambio Radical</h2>
					</li>
					<li class="unidad">
						<span class="porcentaje">12%</span>
						<h2>Partido Social de Unidad Nacional</h2>
					</li>
					<li class="conservador">
						<span class="porcentaje">12%</span>
						<h2>Partido Conservador Colombiano</h2>
					</li>
					<li class="liberal">
						<span class="porcentaje">12%</span>
						<h2>Partido Liberal Colombiano</h2>
					</li>
					<li class="mira">
						<span class="porcentaje">12%</span>
						<h2>Movimiento Independiente de Renovación Absoluta (MIRA)</h2>
					</li>
				</ul>
			</div>
		</div>
		<div id="lista-resultados">
			<h3>RESULTADOS <b>CANDIDATOS</b></h3>
			<input id="search-cand-desktop" type="text" placeholder="Buscar candidato">
			<ul class="resultado-desktop"></ul>
			<span>- Realize scroll sobre los candidatos para ver más.</span>
		</div>
	</section>
</main>