import service from "./config.services"

const signupService = (newUser) => {
  return service.post("/auth/signup", newUser)
}

const loginService = (user) => {
  return service.post("/auth/login", user)
}

const verifyService = () => {
  // enviar el token
  return service.get("/auth/verify")
}

export {
  signupService,
  loginService,
  verifyService
}
