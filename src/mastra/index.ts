
import { Mastra } from '@mastra/core';
import { rickMorty } from './agents';

export const mastra = new Mastra(
    {
        agents: {
            rickMorty
        },

    }
)
