#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { copyDirectory, createDirectory, createFileWithJson, execCommand, readDirectory, readFile, } from "./utils.js";
// variables
const argv = yargs(hideBin(process.argv)).argv;
const url = argv.url;
const folderName = argv["name"] || "output";
const outputDir = argv["output"] ? `${argv["output"]}/` : "";
let openApiTools = {};
const openApiToolsFileName = "openapitools.json";
const tempFolder = "tempFolder";
// crash with error
if (!url) {
    throw new Error("No URL provided");
}
//start code
openApiTools = {
    $schema: "./node_modules/@openapitools/openapi-generator-cli/config.schema.json",
    spaces: 2,
    "generator-cli": {
        version: "6.0.0",
        generators: {
            [folderName]: {
                inputSpec: url,
                templateDir: "#{cwd}/openapi-template/typescript-axios/",
                output: tempFolder,
                generatorName: "typescript-axios",
                skipValidateSpec: true,
                typeMappings: "DateTime=Date,object=any",
                globalProperty: {
                    skipFormModel: false,
                },
                additionalProperties: {
                    supportsES6: "true",
                    withInterfaces: true,
                    withSeparateModelsAndApi: true,
                    apiPackage: "api",
                    modelPackage: "models",
                    stringEnums: true,
                    enumPropertyNaming: "UPPERCASE",
                },
            },
        },
    },
};
// -------------------> Generate type file
createFileWithJson(openApiToolsFileName, JSON.stringify(openApiTools));
await execCommand(`openapi-generator-cli generate --generator-key ${folderName}`);
await execCommand(`rimraf --glob ${openApiToolsFileName}`);
// copy type files
await execCommand(`rimraf --glob ./${outputDir}axios/models/${folderName}`);
await createDirectory(`./${outputDir}axios/models/${folderName}`);
await copyDirectory(`${tempFolder}/models/`, `./${outputDir}axios/models/${folderName}`);
await execCommand(`rimraf --glob ${tempFolder}`);
console.log("[1/3]:Type files generated successfully.");
//--------------------> Create axios file
await execCommand(`npx swagger-typescript-api -p ${url} -o ./tempAxios --modular --axios --single-http-client -t openapi-template/swagger-typescript-api-template`);
console.log("[2/3]:axios generated successfully.");
// copy configAxios
const httpClientData = await readFile("tempAxios/http-client.ts");
createFileWithJson(`./${outputDir}axios/configAxios.ts`, httpClientData || "");
// copy mainAxios
const tempAxiosDirectoryArray = await readDirectory("tempAxios");
const mainAxiosFileName = tempAxiosDirectoryArray.find((item) => !["data-contracts.ts", "http-client.ts"].includes(item));
let mainAxiosData = (await readFile(`tempAxios/${mainAxiosFileName}`)) || "";
mainAxiosData = mainAxiosData?.replace("./data-contracts", `./models/${folderName}`);
mainAxiosData = mainAxiosData?.replace("./http-client", "./configAxios");
createFileWithJson(`./${outputDir}axios/${folderName}Axios.ts`, mainAxiosData || "");
// clean up
await execCommand(`rimraf --glob tempAxios`);
console.log(`[3/3]:Files created successfully in ./${outputDir}`);
