import { useHttp } from "../components/hooks/HttpHook";

const useMarvelService = () => {
    const { isLoading, error, request } = useHttp();

    const url = "https://gateway.marvel.com:443/v1/public";
    const key = process.env.REACT_APP_MARVEL_API_KEY;
    const charactersBaseOffset = 210;

    const getCharacters = async (offset = 0) => {
        const finalOffset = charactersBaseOffset + offset;
        const result = await request(`${url}/characters?limit=9&offset=${finalOffset}&apikey=${key}`);
        return result.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const result = await request(`${url}/characters/${id}?apikey=${key}`);
        return _transformCharacter(result.data.results[0]);
    }

    const getComics = async (offset = 0) => {
        const result = await request(`${url}/comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${key}`)
        return result.data.results.map(_transformComic);
    }

    const getComic = async (id) => {
        const result = await request(`${url}/comics/${id}?apikey=${key}`)
        return _transformComic(result.data.results[0]);
    }

    const _transformCharacter = (character) => {
        const result = {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        };

        return result;
    }

    const _transformComic = (comic) => {
        const result = {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            pages: comic.pageCount,
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            price: comic.prices[0].price
        }

        return result;
    }

    return { isLoading, error, getCharacters, getCharacter, getComics, getComic };
}

export default useMarvelService;