import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router"

export default function MainContainer({ children, title }) {

    return <>
        <Head>
            <title>{title}</title>
        </Head>
        {title === 'Главная'? null : <Link className='text-2xl' href='/'>Главная</Link>}
       
        {children}
    </>
}

