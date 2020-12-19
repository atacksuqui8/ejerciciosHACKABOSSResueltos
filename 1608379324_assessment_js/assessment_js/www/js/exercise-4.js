/**
 * #############################
 * ##  E J E R C I C I O   4  ##
 * #############################
 *
 * Obtener un array con los nombres de todos los municipios de la provincia de Lugo (Galicia)
 * ordenados por orden alfabético inverso (de la Z a la A). Deberás hacer uso de fetch y
 * async / await.
 *
 * Para facilitarte esta tarea dispones de la siguiente API: https://www.el-tiempo.net/api
 *
 * Debes entrar en la web y leer la documentación para encontrar la URL que necesitas. En
 * este caso es bastante simple e intuitivo. ¡A por todas! ;)
 *
 */

'use strict';

const urlProvincia = 'https://www.el-tiempo.net/api/json/v2/provincias';
const urlMunicipio = 'https://www.el-tiempo.net/api/json/v2/municipios';

async function obtenerProvincia(url, nombreProvincia) {
    const provinciaResponse = await fetch(url);
    const provincia = await provinciaResponse.json();

    const provinciaLugo = provincia.provincias.find((provincia) => {
        return provincia.NOMBRE_PROVINCIA === nombreProvincia;
    });

    return provinciaLugo;
}

async function obtenerMunicipios(url) {
    const municipioResponse = await fetch(url);
    const municipio = await municipioResponse.json();
    return municipio;
}

async function obtenerMunicipiosProvinciaOrdenados(nombreProvincia) {

    const provincia = await obtenerProvincia(urlProvincia, nombreProvincia);

    const municipio = await obtenerMunicipios(urlMunicipio);

    const municipiosDichaProvincia = municipio.filter((municipioAux) => {
        return municipioAux.CODPROV === provincia.CODPROV;
    }).reduce((nombresMunicipios, municipio) => {
        nombresMunicipios.push(municipio.NOMBRE);
        return nombresMunicipios;
    }, []);

    const nombreMunicipiosOrdenados = municipiosDichaProvincia.sort();

    console.log(municipiosDichaProvincia);
}

obtenerMunicipiosProvinciaOrdenados('Lugo');


