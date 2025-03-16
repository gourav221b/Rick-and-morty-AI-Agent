import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const CharacterSchema = z.object({
    name: z.string(),
    status: z.string(),
    species: z.string(),
    type: z.string(),
    gender: z.string(),
});

export const EpisodeSchema = z.object({
    id: z.string(),
    name: z.string(),
    air_date: z.string(),
    episode: z.string(),
    characters: z.array(CharacterSchema),
});


export type Episode = z.infer<typeof EpisodeSchema>;



const getEpisodeFact = async (id: string): Promise<Episode> => {
    const query = `
        query getEpisode($id: ID!) {
            episode(id: $id) {
                id
                name
                air_date
                episode
                characters {
                    name
                    status
                    species
                    type
                    gender
                }
            }
        }
    `;

    const variables = { id };

    const response = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    return data.data.episode as Episode;
};

const searchEpisode = async (name: string): Promise<Episode[]> => {
    const query = `
        query episodeSearch($name: String!) {
            episodes(filter: { name: $name }) {
                results {
                    id
                    name
                    air_date
                }
            }
        }
    `;

    const variables = { name };

    const response = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    const episodes = data.data.episodes.results as Partial<Episode>[];

    // Use map + Promise.all instead of forEach to handle async correctly
    const episodeData = await Promise.all(
        episodes.map(async (episode) => {
            if (episode.id) {
                return getEpisodeFact(episode.id);
            }
            return null;
        })
    );

    // Filter out null entries
    return episodeData.filter((episode) => episode !== null) as Episode[];
};

export const rickFact = createTool({
    id: "Get rick and morty facts",
    inputSchema: z.object({
        name: z.string(),
    }),
    outputSchema: z.array(EpisodeSchema),
    description: "Fetches Rick and Morty facts",
    execute: async ({ context }) => {
        if (!context.name) throw new Error("Episode name is required");
        const data = await searchEpisode(context.name);

        return data;
    },
});
