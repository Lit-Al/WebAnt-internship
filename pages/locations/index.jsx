import Link from "next/link";
import axios from "axios";
import MainContainer from "../../components/MainContainer";

export default function Locations({locations}) {

  return (
  <MainContainer title="Локации">
    <h1 className="text-4xl text-center">LOCATIONS</h1>
    <ul className="flex flex-col items-center gap-1 mt-1">
    {locations.map(location => <li className="text-xl" key={location.id}><Link href={`locations/${location.id}`}>
      {location.name}
    </Link></li>)}
    </ul>
  </MainContainer>
)
}

export async function getStaticProps() {
  const response = await axios.get("https://rickandmortyapi.com/api/location")

  return {
    props: {
      locations: response.data.results
    }
  }
}
