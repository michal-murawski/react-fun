interface Base {
    HP: number;
    Attack: number;
    Defense: number;
    Speed: number;
}

interface PokemonDTO {
    id: number;
    name: string;
    type: string[];
    base: Base;
}

interface PokemonListResponseDTO extends Array<PokemonDTO> {}

interface PokemonListRequestParams {
    search?: string;
}
