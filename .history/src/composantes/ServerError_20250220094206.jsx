import { useParams } from "react-router"


export default function Error500(){
  const msg = useParams('msg')
  return (
    <>
      <h1></h1>
    </>
  )
}