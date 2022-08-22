import service from "./config.services";


const uploadService =(image) => {
    return service.post("/upload", image)
}

export{
    uploadService
}