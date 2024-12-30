# swagger-extractor

Extract axios functions and DTOs from swagger json link

## Usage
`npx swagger-extractor [options]`
### Options
| Option                                  | Description                                               | example                                               | 
|-----------------------------------------|-----------------------------------------------------------|-------------------------------------------------------|
| `--url`<span style="color:red">*</span> | url path to swagger json                                  | `--url="https://petstore.swagger.io/v2/swagger.json"` |              
| `--name`                                | name use for axios file and folders (default is `output`) | `--name="pet"`                                        |
| `--output`                              | output directory (default is `/`)                         | `--output="src"`                                      |

## Output directory structure
##### after run: `npx swagger-extractor --url="https://petstore.swagger.io/v2/swagger.json" --name="pet"`
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

