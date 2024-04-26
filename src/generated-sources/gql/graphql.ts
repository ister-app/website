/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Episode = {
  __typename?: 'Episode';
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Image>>;
  mediaFile?: Maybe<Array<MediaFile>>;
  metadata?: Maybe<Array<Metadata>>;
  number?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Season>;
  show?: Maybe<Show>;
  watchStatus?: Maybe<Array<WatchStatus>>;
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  show?: Maybe<Show>;
  sourceUri?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type MediaFile = {
  __typename?: 'MediaFile';
  durationInMilliseconds?: Maybe<Scalars['Int']['output']>;
  episodes?: Maybe<Array<Episode>>;
  id: Scalars['ID']['output'];
  mediaFileStreams?: Maybe<Array<Maybe<MediaFileStream>>>;
  path: Scalars['String']['output'];
  size: Scalars['Float']['output'];
};

export type MediaFileStream = {
  __typename?: 'MediaFileStream';
  codecName: Scalars['String']['output'];
  codecType: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  streamIndex?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  width: Scalars['Int']['output'];
};

export type Metadata = {
  __typename?: 'Metadata';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  sourceUri?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlayQueue?: Maybe<PlayQueue>;
  readyTranscoding: Scalars['Boolean']['output'];
  startTranscoding: Scalars['ID']['output'];
  stopTranscoding: Scalars['Boolean']['output'];
  updatePlayQueue?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreatePlayQueueArgs = {
  showId: Scalars['ID']['input'];
};


export type MutationReadyTranscodingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationStartTranscodingArgs = {
  audioId?: InputMaybe<Scalars['ID']['input']>;
  mediaFileId: Scalars['ID']['input'];
  startTimeInSeconds: Scalars['Int']['input'];
  subtitleId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationStopTranscodingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdatePlayQueueArgs = {
  id: Scalars['ID']['input'];
  playQueueItemId: Scalars['ID']['input'];
  progressInMilliseconds: Scalars['Int']['input'];
};

export type PlayQueue = {
  __typename?: 'PlayQueue';
  currentItem?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  playQueueItems?: Maybe<Array<PlayQueueItem>>;
};

export type PlayQueueItem = {
  __typename?: 'PlayQueueItem';
  id: Scalars['ID']['output'];
  itemId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  episodeById?: Maybe<Episode>;
  episodesRecentWatched?: Maybe<Array<Episode>>;
  seasonById?: Maybe<Season>;
  showById?: Maybe<Show>;
  showsRecentAdded?: Maybe<Array<Show>>;
};


export type QueryEpisodeByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySeasonByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryShowByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Season = {
  __typename?: 'Season';
  episodes?: Maybe<Array<Episode>>;
  id: Scalars['ID']['output'];
  number: Scalars['Int']['output'];
  show: Show;
};

export type Show = {
  __typename?: 'Show';
  episodes?: Maybe<Array<Episode>>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Image>>;
  metadata?: Maybe<Array<Metadata>>;
  name: Scalars['String']['output'];
  releaseYear: Scalars['Int']['output'];
  seasons?: Maybe<Array<Season>>;
};

export type WatchStatus = {
  __typename?: 'WatchStatus';
  episodes?: Maybe<Array<Episode>>;
  id: Scalars['ID']['output'];
  playQueueItemId: Scalars['String']['output'];
  progressInMilliseconds: Scalars['Int']['output'];
  watched: Scalars['Boolean']['output'];
};

export type SeasonByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SeasonByIdQuery = { __typename?: 'Query', seasonById?: { __typename?: 'Season', episodes?: Array<{ __typename?: 'Episode', id: string, number?: number | null, metadata?: Array<{ __typename?: 'Metadata', description?: string | null, id: string, language?: string | null, sourceUri?: string | null, title?: string | null }> | null, show?: { __typename?: 'Show', id: string } | null, images?: Array<{ __typename?: 'Image', id: string, language?: string | null, path: string, sourceUri?: string | null, type: string }> | null, watchStatus?: Array<{ __typename?: 'WatchStatus', id: string, playQueueItemId: string, progressInMilliseconds: number, watched: boolean }> | null, mediaFile?: Array<{ __typename?: 'MediaFile', durationInMilliseconds?: number | null, id: string, path: string, size: number }> | null }> | null } | null };

export type CreatePlayQueueMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CreatePlayQueueMutation = { __typename?: 'Mutation', createPlayQueue?: { __typename?: 'PlayQueue', id: string, currentItem?: string | null, playQueueItems?: Array<{ __typename?: 'PlayQueueItem', id: string, itemId: string }> | null } | null };

export type UpdatePlayQueueMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  playQueueItemId: Scalars['ID']['input'];
  progressInMilliseconds: Scalars['Int']['input'];
}>;


export type UpdatePlayQueueMutation = { __typename?: 'Mutation', updatePlayQueue?: boolean | null };

export type StartTranscodingMutationVariables = Exact<{
  mediaFileId: Scalars['ID']['input'];
  startTimeInSeconds: Scalars['Int']['input'];
  audioId?: InputMaybe<Scalars['ID']['input']>;
  subtitleId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type StartTranscodingMutation = { __typename?: 'Mutation', startTranscoding: string };

export type ReadyTranscodingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ReadyTranscodingMutation = { __typename?: 'Mutation', readyTranscoding: boolean };

export type StopTranscodingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StopTranscodingMutation = { __typename?: 'Mutation', stopTranscoding: boolean };

export type EpisodesRecentWatchedQueryVariables = Exact<{ [key: string]: never; }>;


export type EpisodesRecentWatchedQuery = { __typename?: 'Query', episodesRecentWatched?: Array<{ __typename?: 'Episode', id: string, number?: number | null, show?: { __typename?: 'Show', id: string, metadata?: Array<{ __typename?: 'Metadata', language?: string | null, title?: string | null }> | null, images?: Array<{ __typename?: 'Image', language?: string | null, id: string, type: string }> | null } | null, season?: { __typename?: 'Season', number: number } | null, metadata?: Array<{ __typename?: 'Metadata', language?: string | null, title?: string | null, id: string, description?: string | null }> | null, images?: Array<{ __typename?: 'Image', language?: string | null, id: string, type: string }> | null }> | null };

export type ShowByIdSeasonsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ShowByIdSeasonsQuery = { __typename?: 'Query', showById?: { __typename?: 'Show', seasons?: Array<{ __typename?: 'Season', id: string, number: number }> | null } | null };

export type ShowsRecentAddedQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowsRecentAddedQuery = { __typename?: 'Query', showsRecentAdded?: Array<{ __typename?: 'Show', id: string, releaseYear: number, name: string, images?: Array<{ __typename?: 'Image', type: string, id: string }> | null, episodes?: Array<{ __typename?: 'Episode', number?: number | null }> | null, metadata?: Array<{ __typename?: 'Metadata', description?: string | null, title?: string | null, language?: string | null }> | null }> | null };

export type ShowByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ShowByIdQuery = { __typename?: 'Query', showById?: { __typename?: 'Show', id: string, name: string, releaseYear: number, images?: Array<{ __typename?: 'Image', language?: string | null, id: string, sourceUri?: string | null, type: string, path: string }> | null, metadata?: Array<{ __typename?: 'Metadata', description?: string | null, id: string, language?: string | null, sourceUri?: string | null, title?: string | null }> | null } | null };

export type EpisodeByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EpisodeByIdQuery = { __typename?: 'Query', episodeById?: { __typename?: 'Episode', id: string, number?: number | null, show?: { __typename?: 'Show', id: string } | null, season?: { __typename?: 'Season', id: string } | null, metadata?: Array<{ __typename?: 'Metadata', description?: string | null, id: string, language?: string | null, sourceUri?: string | null, title?: string | null }> | null, watchStatus?: Array<{ __typename?: 'WatchStatus', id: string, playQueueItemId: string, progressInMilliseconds: number, watched: boolean }> | null, mediaFile?: Array<{ __typename?: 'MediaFile', durationInMilliseconds?: number | null, id: string, path: string, size: number, mediaFileStreams?: Array<{ __typename?: 'MediaFileStream', codecName: string, codecType: string, height: number, id: string, language?: string | null, path: string, streamIndex?: number | null, title?: string | null, width: number } | null> | null }> | null } | null };


export const SeasonByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasonById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUri"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUri"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"watchStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playQueueItemId"}},{"kind":"Field","name":{"kind":"Name","value":"progressInMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"durationInMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonByIdQuery, SeasonByIdQueryVariables>;
export const CreatePlayQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPlayQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlayQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"showId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playQueueItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentItem"}}]}}]}}]} as unknown as DocumentNode<CreatePlayQueueMutation, CreatePlayQueueMutationVariables>;
export const UpdatePlayQueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePlayQueue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playQueueItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"progressInMilliseconds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlayQueue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"playQueueItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playQueueItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"progressInMilliseconds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"progressInMilliseconds"}}}]}]}}]} as unknown as DocumentNode<UpdatePlayQueueMutation, UpdatePlayQueueMutationVariables>;
export const StartTranscodingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startTranscoding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mediaFileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTimeInSeconds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"audioId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subtitleId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTranscoding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mediaFileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mediaFileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"startTimeInSeconds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTimeInSeconds"}}},{"kind":"Argument","name":{"kind":"Name","value":"audioId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"audioId"}}},{"kind":"Argument","name":{"kind":"Name","value":"subtitleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subtitleId"}}}]}]}}]} as unknown as DocumentNode<StartTranscodingMutation, StartTranscodingMutationVariables>;
export const ReadyTranscodingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"readyTranscoding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readyTranscoding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<ReadyTranscodingMutation, ReadyTranscodingMutationVariables>;
export const StopTranscodingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopTranscoding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopTranscoding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<StopTranscodingMutation, StopTranscodingMutationVariables>;
export const EpisodesRecentWatchedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"episodesRecentWatched"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodesRecentWatched"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"season"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<EpisodesRecentWatchedQuery, EpisodesRecentWatchedQueryVariables>;
export const ShowByIdSeasonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"showByIdSeasons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]} as unknown as DocumentNode<ShowByIdSeasonsQuery, ShowByIdSeasonsQueryVariables>;
export const ShowsRecentAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"showsRecentAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showsRecentAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"releaseYear"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}}]}}]}}]} as unknown as DocumentNode<ShowsRecentAddedQuery, ShowsRecentAddedQueryVariables>;
export const ShowByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"showById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUri"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"releaseYear"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUri"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<ShowByIdQuery, ShowByIdQueryVariables>;
export const EpisodeByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"episodeById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodeById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"season"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUri"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"watchStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"playQueueItemId"}},{"kind":"Field","name":{"kind":"Name","value":"progressInMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"durationInMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mediaFileStreams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"codecName"}},{"kind":"Field","name":{"kind":"Name","value":"codecType"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"streamIndex"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EpisodeByIdQuery, EpisodeByIdQueryVariables>;