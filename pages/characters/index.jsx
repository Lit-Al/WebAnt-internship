import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import MainContainer from "../../components/MainContainer";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";

export default function Characters({ characters }) {
  const { register, control, handleSubmit } = useForm({
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "test"
  });
  const [selectedGroup, setSelectedGroup] = useState('Проект');



  const renderInputs = (group, index) => {
    return group.text.map((object, objectIndex) => (
      <div className="flex gap-1" key={group.id + objectIndex}>
        <Controller
          group={group}
          control={control}
          index={index}
          name={`test[${index}].text.${objectIndex}.value`}
          render={({ field }) => (
            <>
              <input className="border-2 border-slate-400 rounded-md h-8" type="text" {...field} />
              <button className="border bg-slate-500 text-white rounded-md h-8 flex justify-center items-center p-2" type="button" onClick={() => {
                if (group.text.length === 1) {
                  remove(index)
                }
                else {
                  update(index, {
                    ...group,
                    text: group.text.filter((_, textIndex) => textIndex !== objectIndex)
                  })
                }
                
              }}
              >Удалить</button>
            </>
          )}
        />

       </div>
    ));
  };


  return (
    <MainContainer title="Персонажи">
      <h1 className='text-center text-5xl'>CHARACTERS</h1>
<form className="flex w-fit gap-6" onSubmit={handleSubmit(data => console.log(data))}>
      <div className="flex flex-col gap-1 mt-14">
        <select className="p-2 text-md w-34" onChange={(e) => setSelectedGroup(e.target.value)}>
          <option value="Проект">Проект</option>
          <option value="Документация">Документация</option>
          <option value="Дизайн">Дизайн</option>
        </select>

        <button
          className="animate-pulse border p-1 px-8 text-white bg-cyan-600 w-36"
          type="button"
          onClick={() => {
            const existing = {
              group: {},
              index: 0,
            };
            existing.group = fields.find((item) => item.group === selectedGroup);
            existing.index = fields.findIndex((item) => item.group === selectedGroup);

            if (existing.group) {
              update(existing.index, {
                ...existing.group,
                text: [
                  ...existing.group.text,
                  { value: '' }
                ]
              })
            }
            else {
              append({ group: selectedGroup, text: [{ value: '' }] })
            }
          }
          }
        >
          Добавить
        </button>
        <button className="border p-1 px-7 text-white bg-emerald-600 w-36" type="submit">Сохранить</button>
      </div>
      <ul style={{ listStyle: 'none' }}>
        {fields.map((item, index) => (
          <li className="flex flex-col gap-1" key={item.id}>
            <h3 className="text-3xl text-center m-2">{item.group}</h3>
            {renderInputs(item, index)}
          </li>
        ))}
      </ul>
    </form>
       <ul className='flex flex-wrap justify-center gap-4'>
         {characters.map(character => <li className='bg-slate-400 w-28' key={character.id}>
           <Link className='flex flex-col items-center h-56' href={`characters/${character.id}`}>
             <Image src={character.image} alt={character.name} width={1000} height={1000} />
             <p className='text-white text-lg text-center'>{character.name}</p>
             <p className='text-white text-sm'>{character.species}</p>
           </Link></li>)}
       </ul> 
     </MainContainer>
   )
 }

export async function getServerSideProps() {
  const response = await axios.get("https://rickandmortyapi.com/api/character")

  return {
    props: {
      characters: response.data.results
    }
  }
}






// import React, { useState } from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";

// function App() {
//   const { register, control, handleSubmit } = useForm({
//   });
//   const { fields, append, remove, update } = useFieldArray({
//     control,
//     name: "test"
//   });
//   const [selectedGroup, setSelectedGroup] = useState('Проект');

//   const renderInputs = (group, index) => {
//     return group.text.map((object, objectIndex) => (
//       <div className="flex gap-1" key={group.id + objectIndex}>
//         <Controller
//           group={group}
//           control={control}
//           index={index}
//           name={`test[${index}].text.${objectIndex}.value`}
//           render={({ field }) => (
//             <>
//               <input className="border-2 border-slate-400 rounded-md h-8" type="text" {...field} />
//               <button className="border bg-slate-500 text-white rounded-md h-8 flex justify-center items-center p-2" type="button" onClick={() => {
//                 if (group.text.length === 1) {
//                   remove(index)
//                 }
//                 else {
//                   update(index, {
//                     ...group,
//                     text: group.text.filter((_, textIndex) => textIndex !== objectIndex)
//                   })
//                 }
                
//               }}
//               >Удалить</button>
//             </>
//           )}
//         />

//       </div>
//     ));
//   };

//   return (
//     <form className="flex w-fit gap-6" onSubmit={handleSubmit(data => console.log(data))}>
//       <div className="flex flex-col gap-1 mt-14">
//         <select className="p-2 text-md w-34" onChange={(e) => setSelectedGroup(e.target.value)}>
//           <option value="Проект">Проект</option>
//           <option value="Документация">Документация</option>
//           <option value="Дизайн">Дизайн</option>
//         </select>

//         <button
//           className="animate-pulse border p-1 px-8 text-white bg-cyan-600 w-36"
//           type="button"
//           onClick={() => {
//             const existing = {
//               group: {},
//               index: 0,
//             };
//             existing.group = fields.find((item) => item.group === selectedGroup);
//             existing.index = fields.findIndex((item) => item.group === selectedGroup);

//             if (existing.group) {
//               update(existing.index, {
//                 ...existing.group,
//                 text: [
//                   ...existing.group.text,
//                   { value: '' }
//                 ]
//               })
//             }
//             else {
//               append({ group: selectedGroup, text: [{ value: '' }] })
//             }
//           }
//           }
//         >
//           Добавить
//         </button>
//         <button className="border p-1 px-7 text-white bg-emerald-600 w-36" type="submit">Сохранить</button>
//       </div>
//       <ul style={{ listStyle: 'none' }}>
//         {fields.map((item, index) => (
//           <li className="flex flex-col gap-1" key={item.id}>
//             <h3 className="text-3xl text-center m-2">{item.group}</h3>
//             {renderInputs(item, index)}
//           </li>
//         ))}
//       </ul>
//     </form>
//   );
// }

// export default App;

