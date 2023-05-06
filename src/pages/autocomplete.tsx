import { useState } from 'react';
import { Autocomplete, Option } from '@/components/Autocomplete/Autocomplete';

const searchPokemonOptions = async (
    search?: string,
): Promise<Option<PokemonDTO>[]> => {
    const response = await fetch(
        `api/pokemon-list?search=${search ? search : ''}`,
    );

    if (!response.ok) {
        console.error('Failed to fetch pokemon list');

        return [];
    }
    const data: PokemonListResponseDTO = await response.json();

    return data.map((pokemon) => ({
        value: pokemon,
        label: pokemon.name,
    }));
};

const defaultOptions = [
    {
        value: {
            id: 25,
            name: 'Pikachu',
            type: ['Electric'],
            base: {
                HP: 35,
                Attack: 55,
                Defense: 40,
                Speed: 90,
            },
        },
        label: 'Pikachu',
    },
];

function AutocompletePage() {
    const [value, setValue] = useState<Option<PokemonDTO>>();

    return (
        <div className="w-5/12">
            <div className="pt-6">
                <Autocomplete
                    name="pokemon"
                    getValueCompare={(value) => value.id}
                    getInputValue={(value) => value.name}
                    label="Pokemon"
                    placeholder="Search for a pokemon"
                    value={value}
                    onSelect={(value) => {
                        setValue(value);
                        console.log('SELECTED', value);
                    }}
                    onLoadOptionsAsync={searchPokemonOptions}
                    /**
                     * Uncomment the following props to see the different behaviours
                     */

                    // debounceTimeout={2000}
                    // defaultOptions={defaultOptions}
                    // searchEmpty={false}
                    // closeOnSelect={true}
                    // searchEmptyText="No pokemon found my friend"
                    // width={100}
                    highlight={false}
                />
            </div>
            <br />
            <br />
            <br />
            <div className="pt-6">
                <h3>Selected value:</h3>
                <pre>{JSON.stringify(value, null, 2)}</pre>
            </div>
        </div>
    );
}

export default AutocompletePage;
