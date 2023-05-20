import Head from "next/head"

// @ts-ignore
const layout = ({children}) => {
  return (
    <>
        <Head>
            <title> PokeApi </title>
        </Head>

        {children}
    </>
  )
}

export default layout