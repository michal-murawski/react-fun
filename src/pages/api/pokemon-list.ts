import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { parser } from 'stream-json';
import { chain } from 'stream-chain';
import { streamArray } from 'stream-json/streamers/StreamArray';

// Data and interfaces are copy-pasted some random source on the GitHub

async function pokemonList(request: NextApiRequest, response: NextApiResponse) {
    const query = request.query as PokemonListRequestParams;
    const result: PokemonListResponseDTO = [];

    if (Array.isArray(query.search)) {
        return response
            .status(400)
            .json({ error: 'Search query must be a string' });
    }

    // Just a quick and dirty search, we assume happy path and don't check for errors
    await new Promise((resolve) => {
        const dbDir = path.join(process.cwd(), 'src/db');
        const searchStream = chain([
            fs.createReadStream(dbDir + '/pokemonList.json'),
            parser(),
            streamArray(),
            (data: { value: PokemonDTO }) => {
                if (!query.search) return data.value;

                if (
                    data.value.name
                        .toLowerCase()
                        .includes(query.search.toLowerCase())
                ) {
                    return data.value;
                }

                return null;
            },
        ]);

        searchStream.on('data', (data: PokemonDTO) => {
            result.push(data);
        });

        searchStream.on('end', () => {
            resolve(result);
        });
    });

    return response.status(200).json(result);
}

export default pokemonList;
