import fs from "node:fs";
import { exec, spawn } from "node:child_process";

export const createFileWithJson = (fileName: string, text: string) => {
  fs.access(fileName, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist, create it
      fs.writeFile(fileName, text, (err) => {
        if (err) {
          cleanUpFiles();
          throw err;
        }
        //console.log("File created successfully!");
      });
    } else {
      // File exists, edit it
      fs.writeFile(fileName, text, (err) => {
        if (err) {
          cleanUpFiles();
          throw err;
        }
        //console.log("File content updated successfully!");
      });
    }
  });
};

export const execCommand = (command: string) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        cleanUpFiles();
        reject(new Error(`error: ${error.message}`));
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        cleanUpFiles();
        reject(new Error(`error: ${stderr}`));
        console.log(`stderr: ${stderr}`);
        return;
      }
      resolve("");
      //console.log(`stdout: ${stdout}`);
    });
  });

export const execCommand2 = (command: string) =>
  new Promise((resolve, reject) => {
    const ls = spawn(command, { stdio: "inherit", shell: true });

    ls.stdout?.on("data", (data) => {
      cleanUpFiles();
      reject(new Error(`stdout: ${data}`));
      console.log(`stdout: ${data}`);
    });

    ls.stderr?.on("data", (data) => {
      cleanUpFiles();
      reject(new Error(`stderr: ${data}`));
      console.log(`stderr: ${data}`);
    });

    ls.on("error", (error) => {
      cleanUpFiles();
      reject(new Error(`error: ${error.message}`));
      console.log(`error: ${error.message}`);
    });

    ls.on("close", (code) => {
      resolve("");
      //console.log(`child process exited with code ${code}`);
    });
  });

export const readFile = (fileName: string) =>
  new Promise<string | null>((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          cleanUpFiles();
          reject(new Error(`"File not found: ${err.path}`));
          console.error("File not found:", err.path);
        } else {
          cleanUpFiles();
          reject(new Error(`"Error reading file: ${err}`));
          console.error("Error reading file:", err);
        }
        return;
      }
      resolve(data);
    });
  });

export const readDirectory = (directoryPathName: string) =>
  new Promise<string[]>((resolve, reject) => {
    //passsing directoryPath and callback function
    fs.readdir(directoryPathName, function (err, files) {
      //handling error
      if (err) {
        cleanUpFiles();
        reject(new Error("Unable to scan directory: " + err));
        return console.log("Unable to scan directory: " + err);
      }
      resolve(files);
    });
  });

export const createDirectory = (path: string) =>
  new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        cleanUpFiles();
        reject(new Error(`mkdir failed: ${err}`));
        return console.error(err);
      }
      //console.log("Directory created successfully!");
      resolve("");
    });
  });

export const copyDirectory = (source: string, destination: string) =>
  new Promise((resolve, reject) => {
    fs.cp(source, destination, { recursive: true }, (err) => {
      if (err) {
        cleanUpFiles();
        reject(new Error(`copyDirectory failed: ${err}`));
        return;
      }
      resolve("");
    });
  });

export const cleanUpFiles = async () => {
  await execCommand(`rimraf --glob openapitools.json`);
  await execCommand(`rimraf --glob tempFolder`);
  await execCommand(`rimraf --glob tempAxios`);
  await execCommand(`rimraf --glob tempReactQuery`);
  process.exit();
};

function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function deepMerge(
  target: Record<string, any>,
  ...sources: Record<string, any>[]
) {
  if (!sources.length) return target;

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return deepMerge(target, ...sources);
}

export function fixJSONString(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return jsonString;
  } catch (e) {
    // 0. Remove trailing commas within objects and arrays (including nested)
    function removeTrailingCommas(str: string) {
      let inString = false;
      let result = "";
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '"') {
          inString = !inString;
        }
        if (char === "," && !inString) {
          let nextNonWhitespace = i + 1;
          while (
            nextNonWhitespace < str.length &&
            /\s/.test(str[nextNonWhitespace])
          ) {
            nextNonWhitespace++;
          }
          if (
            str[nextNonWhitespace] === "]" ||
            str[nextNonWhitespace] === "}"
          ) {
            continue; // Skip the comma
          }
        }
        result += char;
      }
      return result;
    }
    jsonString = removeTrailingCommas(jsonString);

    // 1. Handle simple key-value pairs
    jsonString = jsonString.replace(/({|,)\s*([a-zA-Z0-9_]+)\s*:/g, '$1 "$2":');

    // 2. Handle string values without quotes
    jsonString = jsonString.replace(/:(\s*)([^",{}]+?)([,}])/g, ': "$2"$3');

    // 3. Handle string values that start with a quote but don't end with one
    jsonString = jsonString.replace(/:(\s*)(".*[^"])([,}])/g, ': $2"$3');

    // 4. Handle keys that might have spaces or special characters
    jsonString = jsonString.replace(
      /({|,)\s*([^"{}:,\s]+)\s*:/g,
      function (match, p1, p2) {
        if (!p2.startsWith('"') && !p2.endsWith('"')) {
          return p1 + ' "' + p2.trim() + '":';
        }
        return match;
      },
    );

    try {
      JSON.parse(jsonString);
      return jsonString;
    } catch (finalError) {
      console.error(
        "Could not fix JSON string:",
        finalError,
        "Original string:",
        jsonString,
      );
      return null;
    }
  }
}

export const isExist = (path: string) =>
  new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
        return;
      }
      resolve(true);
    });
  });

export function camelToStackCase(str: string) {
  let data = str.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  data = data
    .split(" ")
    .map((i) => i.toUpperCase())
    .join("_");
  return data;
}
