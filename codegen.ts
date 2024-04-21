import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'schema.graphql',
    documents: ['src/**/*.vue'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './src/generated-sources/gql/': {
            preset: 'client',
            config: {
                useTypeImports: true,
            },
            plugins: [],
        },
    },
};

export default config;
