import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { parser } from 'stream-json';
import { chain } from 'stream-chain';
import { streamArray } from 'stream-json/streamers/StreamArray';

export interface Pokemon {
    id: number;
    name: string;
    type: string[];
    base: Base;
}

export interface Base {
    HP: number;
    Attack: number;
    Defense: number;
    'Sp. Attack': number;
    'Sp. Defense': number;
    Speed: number;
}

async function pokemonList(request: NextApiRequest, response: NextApiResponse) {
    const {
        query: { search },
    } = request;
    const result: Pokemon[] = [];

    if (Array.isArray(search)) {
        return response
            .status(400)
            .json({ error: 'Search query must be a string' });
    }

    // Just a quick and dirty search, we assume happy path and don't check for errors
    await new Promise((resolve, reject) => {
        const dbDir = path.join(process.cwd(), 'src/db');
        const searchStream = chain([
            fs.createReadStream(dbDir + '/pokemonList.json'),
            parser(),
            streamArray(),
            (data: { value: Pokemon }) => {
                if (!search) return data.value;

                if (
                    data.value.name.toLowerCase().includes(search.toLowerCase())
                ) {
                    return data.value;
                }

                return null;
            },
        ]);

        searchStream.on('data', (data: Pokemon) => {
            result.push(data);
        });

        searchStream.on('end', () => {
            resolve(result);
        });
    });

    return response.status(200).json(result);
}

export default pokemonList;
