
import { Mastra } from '@mastra/core';
import { rickMorty } from './agents';
import { NetlifyDeployer } from '@mastra/deployer-netlify';
export const mastra = new Mastra(
    {
        agents: {
            rickMorty
        },
        deployer: new NetlifyDeployer({
            scope: `${process.env.NETLIFY_SCOPE}`,
            projectName: `${process.env.NETLIFY_PROJECT_NAME}`,
            token: `${process.env.NETLIFY_TOKEN}`
        }),

    }
)
