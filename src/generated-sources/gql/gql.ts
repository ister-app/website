/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n        query seasonById($id: ID!) {\n          seasonById(id: $id) {\n            episodes {\n              id\n              number\n              metadata {\n                description\n                id\n                language\n                sourceUri\n                title\n              }\n              show {\n                id\n              }\n              images {\n                id\n                language\n                path\n                sourceUri\n                type\n              }\n              watchStatus {\n                id\n                playQueueItemId\n                progressInMilliseconds\n                watched\n              }\n              mediaFile {\n                durationInMilliseconds\n                id\n                path\n                size\n              }\n            }\n          }\n        }": types.SeasonByIdDocument,
    "\n        mutation createPlayQueue($id: ID!, $episodeId: ID!) {\n        createPlayQueue(showId: $id, episodeId: $episodeId) {\n            id\n            playQueueItems {\n              id\n              itemId\n            }\n            currentItem\n          }\n        }": types.CreatePlayQueueDocument,
    "\n        mutation updatePlayQueue($id: ID!, $playQueueItemId: ID!, $progressInMilliseconds: Int!) {\n          updatePlayQueue(id: $id, playQueueItemId: $playQueueItemId, progressInMilliseconds: $progressInMilliseconds)\n        }": types.UpdatePlayQueueDocument,
    "\n        mutation startTranscoding($playQueueId: ID!, $mediaFileId: ID!, $startTimeInSeconds: Int!, $audioId: ID, $subtitleId: ID) {\n            startTranscoding(playQueueId: $playQueueId, mediaFileId: $mediaFileId, startTimeInSeconds: $startTimeInSeconds, audioId: $audioId, subtitleId: $subtitleId)\n        }": types.StartTranscodingDocument,
    "\n        mutation readyTranscoding($id: ID!) {\n            readyTranscoding(id: $id)\n        }": types.ReadyTranscodingDocument,
    "\n        mutation stopTranscoding($id: ID!) {\n        stopTranscoding(id: $id)\n        }": types.StopTranscodingDocument,
    "\n        query episodesRecentWatched {\n          episodesRecentWatched {\n            id\n            show {\n              id\n              metadata {\n                language\n                title\n              }\n              images {\n                language\n                id\n                type\n              }\n            }\n            season {\n              number\n            }\n            number\n            metadata {\n              language\n              title\n              id\n              description\n            }\n            images {\n              language\n              id\n              type\n            }\n          }\n        }": types.EpisodesRecentWatchedDocument,
    "\n        query showByIdSeasons($id: ID!) {\n          showById(id: $id) {\n            seasons {\n              id\n              number\n            }\n          }\n        }": types.ShowByIdSeasonsDocument,
    "\n        query showsRecentAdded {\n          showsRecentAdded {\n            id\n            releaseYear\n            name\n            images {\n              type\n              id\n            }\n                episodes {\n              number\n            }\n            metadata {\n              description\n              title\n              language\n            }\n          }\n        }": types.ShowsRecentAddedDocument,
    "\n        query showById($id: ID!) {\n          showById(id: $id) {\n            id\n            images {\n              language\n              id\n              sourceUri\n              type\n              path\n            }\n            name\n            releaseYear\n            metadata {\n              description\n              id\n              language\n              sourceUri\n              title\n            }\n          }\n        }": types.ShowByIdDocument,
    "\n        query episodeById($id: ID!) {\n          episodeById(id: $id) {\n            id\n            number\n            show {\n              id\n            }\n            season {\n              id\n            }\n            metadata {\n              description\n              id\n              language\n              sourceUri\n              title\n            }\n            watchStatus {\n              id\n              playQueueItemId\n              progressInMilliseconds\n              watched\n            }\n            mediaFile {\n              durationInMilliseconds\n              id\n              path\n              size\n              mediaFileStreams {\n                codecName\n                codecType\n                height\n                id\n                language\n                path\n                streamIndex\n                title\n                width\n              }\n            }\n          }\n        }": types.EpisodeByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query seasonById($id: ID!) {\n          seasonById(id: $id) {\n            episodes {\n              id\n              number\n              metadata {\n                description\n                id\n                language\n                sourceUri\n                title\n              }\n              show {\n                id\n              }\n              images {\n                id\n                language\n                path\n                sourceUri\n                type\n              }\n              watchStatus {\n                id\n                playQueueItemId\n                progressInMilliseconds\n                watched\n              }\n              mediaFile {\n                durationInMilliseconds\n                id\n                path\n                size\n              }\n            }\n          }\n        }"): (typeof documents)["\n        query seasonById($id: ID!) {\n          seasonById(id: $id) {\n            episodes {\n              id\n              number\n              metadata {\n                description\n                id\n                language\n                sourceUri\n                title\n              }\n              show {\n                id\n              }\n              images {\n                id\n                language\n                path\n                sourceUri\n                type\n              }\n              watchStatus {\n                id\n                playQueueItemId\n                progressInMilliseconds\n                watched\n              }\n              mediaFile {\n                durationInMilliseconds\n                id\n                path\n                size\n              }\n            }\n          }\n        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation createPlayQueue($id: ID!, $episodeId: ID!) {\n        createPlayQueue(showId: $id, episodeId: $episodeId) {\n            id\n            playQueueItems {\n              id\n              itemId\n            }\n            currentItem\n          }\n        }"): (typeof documents)["\n        mutation createPlayQueue($id: ID!, $episodeId: ID!) {\n        createPlayQueue(showId: $id, episodeId: $episodeId) {\n            id\n            playQueueItems {\n              id\n              itemId\n            }\n            currentItem\n          }\n        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation updatePlayQueue($id: ID!, $playQueueItemId: ID!, $progressInMilliseconds: Int!) {\n          updatePlayQueue(id: $id, playQueueItemId: $playQueueItemId, progressInMilliseconds: $progressInMilliseconds)\n        }"): (typeof documents)["\n        mutation updatePlayQueue($id: ID!, $playQueueItemId: ID!, $progressInMilliseconds: Int!) {\n          updatePlayQueue(id: $id, playQueueItemId: $playQueueItemId, progressInMilliseconds: $progressInMilliseconds)\n        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation startTranscoding($playQueueId: ID!, $mediaFileId: ID!, $startTimeInSeconds: Int!, $audioId: ID, $subtitleId: ID) {\n            startTranscoding(playQueueId: $playQueueId, mediaFileId: $mediaFileId, startTimeInSeconds: $startTimeInSeconds, audioId: $audioId, subtitleId: $subtitleId)\n        }"): (typeof documents)["\n        mutation startTranscoding($playQueueId: ID!, $mediaFileId: ID!, $startTimeInSeconds: Int!, $audioId: ID, $subtitleId: ID) {\n            startTranscoding(playQueueId: $playQueueId, mediaFileId: $mediaFileId, startTimeInSeconds: $startTimeInSeconds, audioId: $audioId, subtitleId: $subtitleId)\n        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation readyTranscoding($id: ID!) {\n            readyTranscoding(id: $id)\n        }"): (typeof documents)["\n        mutation readyTranscoding($id: ID!) {\n            readyTranscoding(id: $id)\n        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation stopTranscoding($id: ID!) {\n        stopTranscoding(id: $id)\n        }"): (typeof documents)["\n        mutation stopTranscoding($id: ID!) {\n        stopTranscoding(id: $id)\n        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query episodesRecentWatched {\n          episodesRecentWatched {\n            id\n            show {\n              id\n              metadata {\n                language\n                title\n              }\n              images {\n                language\n                id\n                type\n              }\n            }\n            season {\n              number\n            }\n            number\n            metadata {\n              language\n              title\n              id\n              description\n            }\n            images {\n              language\n              id\n              type\n            }\n          }\n        }"): (typeof documents)["\n        query episodesRecentWatched {\n          episodesRecentWatched {\n            id\n            show {\n              id\n              metadata {\n                language\n                title\n              }\n              images {\n                language\n                id\n                type\n              }\n            }\n            season {\n              number\n            }\n            number\n            metadata {\n              language\n              title\n              id\n              description\n            }\n            images {\n              language\n              id\n              type\n            }\n          }\n        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query showByIdSeasons($id: ID!) {\n          showById(id: $id) {\n            seasons {\n              id\n              number\n            }\n          }\n        }"): (typeof documents)["\n        query showByIdSeasons($id: ID!) {\n          showById(id: $id) {\n            seasons {\n              id\n              number\n            }\n          }\n        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query showsRecentAdded {\n          showsRecentAdded {\n            id\n            releaseYear\n            name\n            images {\n              type\n              id\n            }\n                episodes {\n              number\n            }\n            metadata {\n              description\n              title\n              language\n            }\n          }\n        }"): (typeof documents)["\n        query showsRecentAdded {\n          showsRecentAdded {\n            id\n            releaseYear\n            name\n            images {\n              type\n              id\n            }\n                episodes {\n              number\n            }\n            metadata {\n              description\n              title\n              language\n            }\n          }\n        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query showById($id: ID!) {\n          showById(id: $id) {\n            id\n            images {\n              language\n              id\n              sourceUri\n              type\n              path\n            }\n            name\n            releaseYear\n            metadata {\n              description\n              id\n              language\n              sourceUri\n              title\n            }\n          }\n        }"): (typeof documents)["\n        query showById($id: ID!) {\n          showById(id: $id) {\n            id\n            images {\n              language\n              id\n              sourceUri\n              type\n              path\n            }\n            name\n            releaseYear\n            metadata {\n              description\n              id\n              language\n              sourceUri\n              title\n            }\n          }\n        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query episodeById($id: ID!) {\n          episodeById(id: $id) {\n            id\n            number\n            show {\n              id\n            }\n            season {\n              id\n            }\n            metadata {\n              description\n              id\n              language\n              sourceUri\n              title\n            }\n            watchStatus {\n              id\n              playQueueItemId\n              progressInMilliseconds\n              watched\n            }\n            mediaFile {\n              durationInMilliseconds\n              id\n              path\n              size\n              mediaFileStreams {\n                codecName\n                codecType\n                height\n                id\n                language\n                path\n                streamIndex\n                title\n                width\n              }\n            }\n          }\n        }"): (typeof documents)["\n        query episodeById($id: ID!) {\n          episodeById(id: $id) {\n            id\n            number\n            show {\n              id\n            }\n            season {\n              id\n            }\n            metadata {\n              description\n              id\n              language\n              sourceUri\n              title\n            }\n            watchStatus {\n              id\n              playQueueItemId\n              progressInMilliseconds\n              watched\n            }\n            mediaFile {\n              durationInMilliseconds\n              id\n              path\n              size\n              mediaFileStreams {\n                codecName\n                codecType\n                height\n                id\n                language\n                path\n                streamIndex\n                title\n                width\n              }\n            }\n          }\n        }"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;