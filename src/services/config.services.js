import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5005/api"
})

// interceptar la llamada y agregar el token
service.interceptors.request.use((config) => {

  const authToken = localStorage.getItem("authToken")

  if (authToken) {
    config.headers = {
      authorization: `Bearer ${authToken}`
    }
  }

  return config
})

export default service