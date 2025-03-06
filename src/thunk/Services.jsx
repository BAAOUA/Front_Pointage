import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const navigateTo = (url) => {
  history.push(url)
  window.location.reload()
  //window.location.href = url
};

export { history, navigateTo }


const NavigateMiddleware = store=> next=>action =>{
  if(action.type === "navigate"){
    navigateTo(action.payload)
  }
  return next(action)
}
export default NavigateMiddleware