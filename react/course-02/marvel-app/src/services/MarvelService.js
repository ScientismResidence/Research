class MarvelService {
    static Url = "https://gateway.marvel.com:443/v1/public";
    static Key = process.env.REACT_APP_MARVEL_API_KEY;

    getResource = async (url) => {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Couldn't fetch resource [${url}]. Status [${response.status}]`)
        }

        return await response.json();
    }

    getAllCharacters = async () => {
        const result = await this.getResource(`${MarvelService.Url}/characters?limit=9&offset=210&apikey=${MarvelService.Key}`);
        return result.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const result = await this.getResource(`${MarvelService.Url}/characters/${id}?apikey=${MarvelService.Key}`);
        return this._transformCharacter(result.data.results[0]);
    }

    _transformCharacter = (character) => {
        const result = {
            name: character.name,
            description: character.description,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url
        };

        return result;
    }
}

export default MarvelService;