# swagger-extractor

Extract axios functions and DTOs from swagger json link

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
</tbody>
</table>



## Output directory structure
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

