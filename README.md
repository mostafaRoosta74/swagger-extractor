# swagger-extractor

Extract 

- axios functions 
- TypeScript types
- ReactQuery hooks

from Swagger json link

![NPM Downloads](https://img.shields.io/npm/dw/swagger-extractor)
![GitHub License](https://img.shields.io/github/license/mostafaRoosta74/swagger-extractor)
![GitHub last commit](https://img.shields.io/github/last-commit/mostafaRoosta74/swagger-extractor)
![NPM Version](https://img.shields.io/npm/v/swagger-extractor)


### [Example (files after run npx)](https://github.com/mostafaRoosta74/swagger-extractor/tree/main/result-example)

## Usage
`npx swagger-extractor [options]`
### Options

<table>
<thead>
<tr>
<th width="200px"> Option</th>
<th width="900px">Description</th>
</tr>
</thead>
<tbody>
<tr width="600px">
<td>

`--url`<span style="color:red">*</span>
</td>
<td>
url path to swagger json    
</td>
</tr>
<tr width="600px">
<td>

`--name`
</td>
<td>

name use for axios file and folders (default is `output`) 
</td>
</tr>
<tr width="600px">
<td>

`--output`
</td>
<td>

output directory (default is `/`)  
</td>
</tr>
<tr width="600px">
<td>

`--reactQuery`
</td>
<td>

Generate react-query hooks and keys for each route 
</td>
</tr>
<tr width="600px">
<td>

`--rq`
</td>
<td>

Same as `--reactQuery`
</td>
</tr>
</tbody>
</table>



## Output directory structure (without --reactQuery)
##### after run: 
`npx swagger-extractor --url="https://petstore.swagger.io/v2/swagger.json" --name="pet"`
##### create folder and file like this:
```
axios
│   configAxios.ts
|   petAxios.ts
│
└───models
│   └───pet
│       │   api-response.ts
│       │   category.ts
│       │   index.ts
│       │   order.ts
│       │   pet.ts
│       │   tag.ts
│       │   update-pet-with-form-request.ts
│       │   upload-file-request.ts
│       │   user.ts
```
# With react-query

#### after run command these library are needed (*beside Axios, Typescript*)

| Library                 | Usage                                                      |
|-------------------------|------------------------------------------------------------|
| @tanstack/react-query   | Main library of react-query                                |
| i18next , react-i18next | Library for translation (use for success message template) |
| notistack               | Library show message (use for success message template)    |

#### install

``` 
npm i @tanstack/react-query i18next  react-i18next notistack
```

#### config success message
change name variable and add "CREATED_SUCCESSFULLY" key to i18n

```ts
/* CODES */
  enqueueSnackbar(t("CREATED_SUCCESSFULLY", { name: t("") }));
/* CODES */
```
#### config error message
change function add your message based on response

 ```ts
/* CODES */
  export const onError = (t: TFunction<"translation", undefined>, enqueueSnackbar: EnqueueSnackbar) => (error: any) => {
    enqueueSnackbar(t("Error"), {
      variant: "error",
    });
  };
/* CODES */
```

## Output directory structure (with --reactQuery)
##### after run:
`npx swagger-extractor --url="https://petstore.swagger.io/v2/swagger.json" --name="pet" --reactQuery`
##### create folder and file like this:
```
axios
│   configAxios.ts
|   petAxios.ts
|   constants.ts
│
└───reactQuery
│   └───pet
|       |   Pet.ts
|       |   Store.ts
|       |   User.ts
|
└───models
│   └───pet
│       │   api-response.ts
│       │   category.ts
│       │   index.ts
│       │   order.ts
│       │   pet.ts
│       │   tag.ts
│       │   update-pet-with-form-request.ts
│       │   upload-file-request.ts
│       │   user.ts
```

