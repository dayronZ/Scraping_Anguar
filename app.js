import puppeteer from "puppeteer";
import fs from 'fs';
import { Parser } from 'json2csv';
import XLSX from 'xlsx';

async function practica() {
    const navegador = await puppeteer.launch({
        headless: false,
        slowMo: 800
    });

    const pagina = await navegador.newPage();
    await pagina.goto('https://blog.angular.dev/');

    const datos = await pagina.evaluate(() => {
        const contenedorCards = document.querySelectorAll('article[data-testid="post-preview"]');

        const datosArreglo = Array.from(contenedorCards).map(card => {
            const titulo = card.querySelector('div>div>div>a>h2')?.innerText;
            const texto = card.querySelector('div>div>div>a>div>h3')?.innerText;
            const autornombre = card.querySelector('div>div>div>div>a>p')?.innerText;
            const autorAvatar = card.querySelector('article>div>div>div>div>div>div>div>div>div>div>div>div>a')?.getAttribute('href');
            const fechaIncom = card.querySelector('div>span>div>div')?.innerText;
            const fecha = fechaIncom?.split('\n')[0].trim();
            const likes = card.querySelector('a>div>div>div>div>span')?.innerText;
            const comentarios = card.querySelector('a>div:nth-child(2)>div>div>div>span')?.innerText;

            return {
                titulo,
                texto,
                autor: {
                    autornombre,
                    autorAvatar
                },
                fecha,
                reacciones: {
                    likes,
                    comentarios
                }
            };
        });

        const datosArregloXlsx = datosArreglo.map(({ titulo, texto, autor, fecha, reacciones }) => ({
            titulo,
            texto,
            autor: autor.autornombre,
            fecha,
            reacciones: `Likes: ${reacciones.likes}, Comentarios: ${reacciones.comentarios}`
        }));

        return { datosArreglo, datosArregloXlsx };
    });

    console.log("Resultado:", datos);

    // Guardar JSON
    let data = JSON.stringify(datos.datosArreglo, null, 2);
    fs.writeFileSync("Resultados.json", data);
    console.log("Archivo JSON creado");

    // Guardar CSV
    const fields = ['titulo', 'texto', 'autor', 'fecha', 'reacciones'];
    const json2csvParse = new Parser({
        fields: fields,
        defaultValue: 'SIN_INFO'
    });
    const csv = json2csvParse.parse(datos.datosArregloXlsx);
    fs.writeFileSync('./resultados.csv', csv, 'utf-8');
    console.log("Resultados CSV creado");

    // Guardar XLSX
    const ws = XLSX.utils.json_to_sheet(datos.datosArregloXlsx);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
    XLSX.writeFile(wb, './resultados.xlsx');
    console.log("Resultados XLSX creado");

    await navegador.close();
}

practica();
