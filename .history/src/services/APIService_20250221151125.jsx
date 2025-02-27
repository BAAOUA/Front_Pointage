import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8080",
  headers:{
    "Content-Type": "application/json"
  }
})

const configure = (isMultipartFile = false, config={})=>{
  if(isMultipartFile){
    config.headers = {
      ...config.headers, "Content-Type":"multipart/form-data"
    }
  }
  return config
}

const GET = async (url)=> {
  try {
    const config = configure()
    const response = await API.get(url, config)
    return response
  } catch (error) {
    return error
  }
}

const POST = async (url, data, isMultipartFile = false) => {
  try {
    const config = configure(isMultipartFile)
    const response = await API.post(url, data, config)
    return response
  } catch (error) {
    return error
  }
}

API.interceptors.response.use(
  (response) => {
    return {
      success: true, 
      data: response.data
    }
  },
  async (error) => {
    const dispatch = useDispatch()
    if (error.response?.status === 500) {
      window.location = '/Erruer/500/Erreur de connxion au serveur'
    }
    if(error.response?.status ===403) {
      //window.location = "/login"
      window.history.back()
      alert('Accès refusé - Vous n\'avez pas les droits nécessaires')
    }

    const originalRequest = error.config
  
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
  
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken == null) {
          dispatch()
          window.location.href = "/login"
        }
        const response = await API.post('/auth/refresh-token', refreshToken)
        const data = response.data
        console.log("repondse refresh token===========   ", data)
  
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return API(originalRequest)
  
      } catch (refreshError) {
        
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = "/login"
      }
    }
    return Promise.reject(handleError(error))
  }
  )

API.interceptors.request.use(
  (request)=>{
    const token = localStorage.getItem("accessToken")
    if(token != null){
      request.headers = {
        ...request.headers, 
        Authorization : `Bearer ${token}`
      }
    }
    return request
  },
  async (error)=>{
    return Promise.reject(handleError(error))
  }
)

const handleError = (error) => {
  if (error.response) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data || 'Une erreur est survenue',
    }
  } else if (error.request) {
    return {
      success: false,
      message: 'Problème de connexion au serveur.',
    }
    
  } else {
    return {
      success: false,
      message: 'Une erreur inconnue est survenue.',
    }
  }
}

//export default API
export {GET, POST}