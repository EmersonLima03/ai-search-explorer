const Tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");

const inputDir = "./inputs/";
const outputDir = "./output/";

// Certifique-se de que as pastas de entrada e saída existem
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Função para processar todas as imagens na pasta inputs
async function processImages() {
    const files = fs.readdirSync(inputDir).filter(file => /\.(png|jpe?g)$/i.test(file));

    if (files.length === 0) {
        console.log("Nenhuma imagem encontrada na pasta 'inputs'.");
        return;
    }

    for (const file of files) {
        const imagePath = path.join(inputDir, file);
        console.log(`Processando: ${file}`);

        try {
            const { data: { text } } = await Tesseract.recognize(imagePath, "eng");

            const outputPath = path.join(outputDir, file.replace(/\.\w+$/, ".txt"));
            fs.writeFileSync(outputPath, text, "utf8");

            console.log(`Texto extraído salvo em: ${outputPath}`);
        } catch (error) {
            console.error(`Erro ao processar ${file}:`, error);
        }
    }
}

// Executa o processamento
processImages();
