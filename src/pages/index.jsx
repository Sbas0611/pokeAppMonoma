import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import Layout from "~/components/layout";
import NavBar from "~/components/navbar";
import PokemonCard from "~/components/PokemonCard";

export default function Home({ pokemonList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(pokemonList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemon = pokemonList.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Layout>
        <NavBar />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {currentPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <Link
              key={index + 1}
              href={`/?page=${index + 1}`}
              className={`mx-2 rounded p-2 ${
                currentPage === index + 1 ? "bg-gray-300" : "bg-gray-100"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      </Layout>
    </>
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_POKEAPI_URL;

export async function getServerSideProps({ query }) {
  const page = parseInt(query.page) || 1;

  try {
    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: { limit: 100 },
    });

    const pokemonList = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const pokemonResponse = await axios.get(pokemon.url);
        return pokemonResponse.data;
      })
    );

    return {
      props: {
        pokemonList,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        pokemonList: [],
        currentPage: page,
      },
    };
  }
}
