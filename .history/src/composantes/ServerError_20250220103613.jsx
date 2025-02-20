import { Link, useParams } from "react-router"


export default function Error500(){
  const {msg} = useParams('msg')
  return (
    <div className="">
      <h1>Erreur 500 - Page non trouvée</h1>
      <p>{msg}</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}