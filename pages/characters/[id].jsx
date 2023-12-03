import React, { useState } from 'react';
import axios from "axios";
import Image from "next/image";
import MainContainer from '../../components/MainContainer';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { dataAtom } from '../../store';
import { useSetAtom } from 'jotai';

const Character = ({ character }) => {
    const [location, setLocation] = useState('');
    console.log(location);
    const setData = useSetAtom(dataAtom);
    setData(character);
    const {isError, isLoading } = useQuery('location', () => axios.get(`${character.location.url}`),
    {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
        enabled: true,
        onSuccess: (data) => {
            setLocation(data.data)
        },
      });
    return (
        <MainContainer title={character.name}> 
        <div className='flex flex-col items-center'>
        <Image className='rounded-full' src={character.image} alt={character.name} width={200} height={200}/>
         <p className='text-2xl border-y-2 mt-1'>{character.name}</p>
         <p className='text-xl border-b-2 m-1'>{character.status}</p>
         <p className='text-xl border-b-2 m-1'>{character.species}</p>
         <p className='text-xl border-b-2 m-1'>{character.origin.name}</p>
         <Link className='text-xl border-b-2 m-1' href={`locations/${character.location.url[character.location.url.length - 1]}`}>
         {character.location.name}
         </Link>
         {isLoading ? <p>Loading...</p> : isError ? <p>Something wrong</p> : (
            <>
            <h3 className='text-4xl border-b-2 m-1'>Location Info</h3>
            <div className='text-xl border-b-2 m-1'>ID - {location.id}</div>
            <div className='text-xl border-b-2 m-1'>{location.name}</div>
            <div className='text-xl border-b-2 m-1'>{location.type}</div>
            </>
         )}
        </div>
        
        </MainContainer>
    )
};

export default Character;

export async function getServerSideProps({ params }) {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${params.id}`)
    return {
        props: {
            character: response.data
        }
    }
} 