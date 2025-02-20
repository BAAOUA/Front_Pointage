import { Link, useParams } from "react-router"


export default function Error(){
  const cosde = use
  const {msg} = useParams('msg')
  return (
    <div className="container">
      <h1>Erreur 500 - Erreur de connxion au serveur</h1>
      <p>{msg}</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}