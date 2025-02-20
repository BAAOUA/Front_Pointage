import { Link, useParams } from "react-router"


export default function Error(){
  const {code} = useParams()
  const {msg} = useParams('msg')
  return (
    <div className="container">
      <h1>Erreur {code}</h1>
      <p>{msg}</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}