import fs from "node:fs";
import { exec, spawn } from "node:child_process";
export const createFileWithJson = (fileName, text) => {
    fs.access(fileName, fs.constants.F_OK, (err) => {
        if (err) {
            // File does not exist, create it
            fs.writeFile(fileName, text, (err) => {
                if (err)
                    throw err;
                //console.log("File created successfully!");
            });
        }
        else {
            // File exists, edit it
            fs.writeFile(fileName, text, (err) => {
                if (err)
                    throw err;
                //console.log("File content updated successfully!");
            });
        }
    });
};
export const execCommand = (command) => new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            reject(new Error(`error: ${error.message}`));
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            reject(new Error(`error: ${stderr}`));
            console.log(`stderr: ${stderr}`);
            return;
        }
        resolve("");
        //console.log(`stdout: ${stdout}`);
    });
});
export const execCommand2 = (command) => new Promise((resolve, reject) => {
    const [first, ...others] = command.split(" ");
    const ls = spawn(first, others);
    ls.stdout.on("data", (data) => {
        reject(new Error(`stdout: ${data}`));
        console.log(`stdout: ${data}`);
    });
    ls.stderr.on("data", (data) => {
        reject(new Error(`stderr: ${data}`));
        console.log(`stderr: ${data}`);
    });
    ls.on("error", (error) => {
        reject(new Error(`error: ${error.message}`));
        console.log(`error: ${error.message}`);
    });
    ls.on("close", (code) => {
        resolve("");
        //console.log(`child process exited with code ${code}`);
    });
});
export const readFile = (fileName) => new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                reject(new Error(`"File not found: ${err.path}`));
                console.error("File not found:", err.path);
            }
            else {
                reject(new Error(`"Error reading file: ${err}`));
                console.error("Error reading file:", err);
            }
            return;
        }
        resolve(data);
    });
});
export const readDirectory = (directoryPathName) => new Promise((resolve, reject) => {
    //passsing directoryPath and callback function
    fs.readdir(directoryPathName, function (err, files) {
        //handling error
        if (err) {
            reject(new Error("Unable to scan directory: " + err));
            return console.log("Unable to scan directory: " + err);
        }
        resolve(files);
    });
});
export const createDirectory = (path) => new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) {
            reject(new Error(`mkdir failed: ${err}`));
            return console.error(err);
        }
        //console.log("Directory created successfully!");
        resolve("");
    });
});
export const copyDirectory = (source, destination) => new Promise((resolve, reject) => {
    fs.cp(source, destination, { recursive: true }, (err) => {
        if (err) {
            reject(new Error(`copyDirectory failed: ${err}`));
            return;
        }
        resolve("");
    });
});
