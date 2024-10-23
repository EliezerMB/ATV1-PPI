import express from "express";
const app = express();

function pgInicial(Requisisao, Resposta ) {
    Resposta.send(`<h1> Tabuada </h1>  
                     <br/>
                     <h2>Essa Pagina Vai Calcular a tabuada Do um ao 10 </h2>
                    <h3>Exemplo 'localhost:3000'/Numero desejado''</h3>
                    <h5>Obrigado por Usar meu Site ass: Eliezer ;-)</h5>
        `);
    };
    app.get("/",pgInicial);

function gerarTabuada(tabuada, sequencia) {
    let resultado = `<h1>Tabuada do ${tabuada}</h1>`;
    resultado += '<ul>';
    for (let i = 0; i <= sequencia; i++) {
        resultado += `<li>${tabuada} x ${i} = ${tabuada * i}</li>`;
    }
    resultado += '</ul>';
    return resultado;
}

app.get('/:tabuada', (req, res) => {
    const tabuada = parseInt(req.params.tabuada);
    const sequencia = parseInt(req.query.sequencia) || 10;

    if (isNaN(tabuada) || tabuada <= 0) {
        res.send(`
            <!DOCTYPE html>
            <html lang="pt">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Erro</title>
            </head>
            <body>
            background: linear-gradient(to bottom, #f0f8ff, #ffffff); /* Gradiente de azul claro para branco */
            font-family: Arial, sans-serif;
                <h1>Por favor, forneça um número positivo válido para a tabuada.</h1>
            </body>
            </html>
        `);
    } else {
        const conteudo = `
            <!DOCTYPE html>
            <html lang="pt">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tabuada de ${tabuada}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        margin: 50px;
                    }
                    h1 {
                        color: #333;
                    }
                    ul {
                        list-style: none;
                        padding: 0;
                    }
                    li {
                        font-size: 1.5em;
                        margin: 5px 0;
                    }
                </style>
            </head>
            <body>
                ${gerarTabuada(tabuada, sequencia)}
            </body>
            </html>
        `;
        res.send(conteudo);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});