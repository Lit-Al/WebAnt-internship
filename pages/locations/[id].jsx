import React from 'react';
import axios from "axios";
import MainContainer from '../../components/MainContainer';

export const getStaticPaths = async () => {
    const response = await axios.get(`https://rickandmortyapi.com/api/location`)
    const paths = response.data.results.map(({ id }) => ({
        params: {id: id.toString()},
}))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const response = await axios.get(`https://rickandmortyapi.com/api/location/${params.id}`)
    return {
      props: {
        location: response.data
      }
    }
  }
  
const Location = ({ location }) => {

    return (
        <MainContainer title={location.name}> 
         {location.name}
        </MainContainer>
    )
};

export default Location;

