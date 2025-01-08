#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import {
  camelToStackCase,
  cleanUpFiles,
  copyDirectory,
  createDirectory,
  createFileWithJson,
  deepMerge,
  execCommand,
  execCommand2,
  fixJSONString,
  isExist,
  readDirectory,
  readFile,
} from "./utils.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

// variables
const argv = yargs(hideBin(process.argv)).argv as {
  url?: string;
  name?: string;
  output?: string;
  reactQuery?: boolean;
  rq?: boolean;
};
let totalStep = 3;
const url = argv.url;
const folderName = argv["name"] || "output";
const outputDir = argv["output"] ? `${argv["output"]}/` : "";
const withQueryClient = !!argv["reactQuery"] || !!argv["rq"];
totalStep = withQueryClient ? totalStep + 1 : totalStep;
let openApiTools: object = {};
const openApiToolsFileName = "openapitools.json";
const tempFolder = "tempFolder";

// crash with error
process.on("SIGINT", async () => {
  await cleanUpFiles();
});
if (!url) {
  throw new Error("No URL provided");
}

//start code
const __filename = fileURLToPath(import.meta.url);
const relativePath = path.relative(process.cwd(), path.dirname(__filename));

openApiTools = {
  $schema:
    "./node_modules/@openapitools/openapi-generator-cli/config.schema.json",
  spaces: 2,
  "generator-cli": {
    version: "6.0.0",
    generators: {
      [folderName]: {
        inputSpec: url,
        templateDir: `${relativePath}/../openapi-template/typescript-axios/`,
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

console.log(`[0/${totalStep}]: swagger-extractor started.`);

// -------------------> Generate type file
createFileWithJson(openApiToolsFileName, JSON.stringify(openApiTools));
await execCommand2(
  `openapi-generator-cli generate --generator-key ${folderName}`,
);
await execCommand(`rimraf --glob ${openApiToolsFileName}`);

// copy type files
await execCommand(`rimraf --glob ./${outputDir}axios/models/${folderName}`);
await createDirectory(`./${outputDir}axios/models/${folderName}`);
await copyDirectory(
  `${tempFolder}/models/`,
  `./${outputDir}axios/models/${folderName}`,
);
await execCommand(`rimraf --glob ${tempFolder}`);
console.log(`[1/${totalStep}]:Type files generated successfully.`);

//--------------------> Create axios file
await execCommand2(
  `swagger-typescript-api -p ${url} -o ./tempAxios --modular --axios --single-http-client -t ${relativePath}/../openapi-template/swagger-typescript-api-template`,
);
console.log(`[2/${totalStep}]:axios generated successfully.`);
// copy configAxios
const httpClientData = await readFile("tempAxios/http-client.ts");
createFileWithJson(`./${outputDir}axios/configAxios.ts`, httpClientData || "");

// copy mainAxios
const tempAxiosDirectoryArray = await readDirectory("tempAxios");
const mainAxiosFileName = tempAxiosDirectoryArray.find(
  (item) => !["data-contracts.ts", "http-client.ts"].includes(item),
);
let mainAxiosData = (await readFile(`tempAxios/${mainAxiosFileName}`)) || "";
mainAxiosData = mainAxiosData?.replace(
  "./data-contracts",
  `./models/${folderName}`,
);
mainAxiosData = mainAxiosData?.replace("./http-client", "./configAxios");
createFileWithJson(
  `./${outputDir}axios/${folderName}Axios.ts`,
  mainAxiosData || "",
);

//------------->clean up
await execCommand(`rimraf --glob tempAxios`);
console.log(`[3/${totalStep}]:Files created successfully in ./${outputDir}`);

if (withQueryClient) {
  await execCommand2(
    `swagger-typescript-api -p ${url} -o ./tempReactQuery --modular --axios --single-http-client -t ${relativePath}/../openapi-template/my-templates --api-class-name ${folderName}`,
  );
  let constants = (await readFile(`tempReactQuery/http-client.ts`)) || "";

  if (await isExist(`./${outputDir}axios/constants.ts`)) {
    constants = constants.replace(";", "");
    const newJson = JSON.parse(
      fixJSONString(constants.split("export const QUERY_KEYS = ")[1]) || "",
    );
    let oldJsonData =
      (await readFile(`./${outputDir}axios/constants.ts`)) || "";
    oldJsonData = oldJsonData.replace(";", "");
    const oldJson = JSON.parse(
      fixJSONString(oldJsonData.split("export const QUERY_KEYS = ")[1]) || "",
    );
    createFileWithJson(
      `./${outputDir}axios/constants.ts`,
      constants.split("export const QUERY_KEYS = ")[0] +
        "export const QUERY_KEYS = " +
        JSON.stringify(
          deepMerge({ [camelToStackCase(folderName)]: newJson }, oldJson),
        ),
    );
  } else {
    constants = constants.replace(";", "");
    const newJson = JSON.parse(
      fixJSONString(constants.split("export const QUERY_KEYS = ")[1]) || "",
    );
    createFileWithJson(
      `./${outputDir}axios/constants.ts`,
      constants.split("export const QUERY_KEYS = ")[0] +
        "export const QUERY_KEYS = " +
        JSON.stringify({ [camelToStackCase(folderName)]: newJson }),
    );
    //createFileWithJson(`./${outputDir}axios/constants.ts`, constants);
  }

  await createDirectory(`./${outputDir}axios/reactQuery/${folderName}`);
  const tempReactQueryDirectoryArray = await readDirectory("tempReactQuery");
  const fileNames = tempReactQueryDirectoryArray.filter(
    (item) => !["http-client.ts"].includes(item),
  );
  fileNames.forEach(async (item) => {
    let mainAxiosData = (await readFile(`tempReactQuery/${item}`)) || "";
    //replace
    mainAxiosData = mainAxiosData?.replace(
      "./data-contracts",
      `../../models/${folderName}`,
    );
    mainAxiosData = mainAxiosData?.replace(
      "./http-client",
      "../../configAxios",
    );
    mainAxiosData = mainAxiosData?.replace(
      "AXIOS_PATH",
      `../../${folderName}Axios`,
    );
    mainAxiosData = mainAxiosData?.replaceAll(
      "AXIOS_NAME",
      `${folderName}Axios`,
    );
    mainAxiosData = mainAxiosData?.replace("CONSTANCE_PATH", "../../constants");
    //create
    createFileWithJson(
      `./${outputDir}axios/reactQuery/${folderName}/${item}`,
      mainAxiosData || "",
    );
  });
  //clean
  await execCommand(`rimraf --glob tempReactQuery`);

  console.log(
    `[4/${totalStep}]:React query files created successfully in ./${outputDir}`,
  );
}
