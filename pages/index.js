import Link from "next/link";
import Image from "next/image";
import MainContainer from "../components/MainContainer";
import { useAtomValue } from 'jotai';
import { dataAtom } from '../store';
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Home() {
  const character = useAtomValue(dataAtom);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ mode: 'onChange' });
  const [data, setData] = useState('');

  return (
    <MainContainer title="Главная">
      <div className='flex flex-col items-center'>
        <div className='border-b border-purple-950 flex justify-center gap-10 p-5 w-full'>
          <Link className='text-3xl' href="/characters">Characters</Link>
          <Link className='text-3xl' href="/locations">Locations</Link>
        </div>
        {character !== null ? (
          <div className='flex flex-col items-center bg-slate-400 w-28 mt-2'>
            <Image className='w-full' src={character.image} alt={character.name} width={100} height={100} />
            <p className='text-white text-lg text-center'>{character.name}</p>
            <p className='text-white text-lg text-center'>{character.status}</p>
            <p className='text-white text-lg text-center'>{character.species}</p>
            <p className='text-white text-lg text-center'>{character.origin.name}</p>
            <Link className='text-white text-lg text-center' href={`locations/${character.location.url[character.location.url.length - 1]}`}>
              {character.location.name}
            </Link>
          </div>
        ) : <></>}
        <div className='flex justify-center'>
          <form className='border border-cyan-600 p-4 m-3' onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))} style={{ width: '400px', display: 'flex', flexDirection: 'column' }}>
            <label>Name</label>
            <input className='border' {...register('name', { required: 'Empty input' })} />
            {errors.name && <div style={{ color: 'red' }}>{errors.name.message}</div>}
            <label>Status</label>
            <input className='border' {...register('status', { required: 'Empty input' })} />
            {errors.status && <div style={{ color: 'red' }}>{errors.status.message}</div>}
            <label>Species</label>
            <input className='border' {...register('species', { required: 'Empty input' })} />
            {errors.species && <div style={{ color: 'red' }}>{errors.species.message}</div>}
            <label>Origin</label>
            <input className='border' {...register('origin', { required: 'Empty input' })} />
            {errors.origin && <div style={{ color: 'red' }}>{errors.origin.message}</div>}
            <label>Location</label>
            <input className='border' {...register('location', { required: 'Empty input', pattern: { value: /^[A-Za-z]+$/i, message: 'Enter letters!' } })} />
            {errors.location && <div style={{ color: 'red' }}>{errors.location.message}</div>}
            <button className='border bg-slate-500 text-white p-2 mt-2 rounded-md' type="submit">Submit</button>
            <button className='border bg-slate-600 text-white p-2 rounded-md' type="button" onClick={() => reset()}>Reset</button>
            <button className='border bg-slate-700 text-white p-2 rounded-md' type="button" onClick={() => {
              setValue('name', 'Morty Smith')
              setValue('status', 'Alive')
              setValue('species', 'Human')
              setValue('origin', 'Earth')
              setValue('location', 'Citadel')
            }}>Default</button>
            <p>{data}</p>
          </form>
        </div>
      </div>


    </MainContainer>
  )
}
