/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { DiskEntity } from './DiskEntity';
import {
    DiskEntityFromJSON,
    DiskEntityFromJSONTyped,
    DiskEntityToJSON,
} from './DiskEntity';
import type { EpisodeEntity } from './EpisodeEntity';
import {
    EpisodeEntityFromJSON,
    EpisodeEntityFromJSONTyped,
    EpisodeEntityToJSON,
} from './EpisodeEntity';
import type { MediaFileStreamEntity } from './MediaFileStreamEntity';
import {
    MediaFileStreamEntityFromJSON,
    MediaFileStreamEntityFromJSONTyped,
    MediaFileStreamEntityToJSON,
} from './MediaFileStreamEntity';

/**
 * 
 * @export
 * @interface MediaFileEntity
 */
export interface MediaFileEntity {
    /**
     * 
     * @type {string}
     * @memberof MediaFileEntity
     */
    id?: string;
    /**
     * 
     * @type {DiskEntity}
     * @memberof MediaFileEntity
     */
    diskEntity: DiskEntity;
    /**
     * 
     * @type {EpisodeEntity}
     * @memberof MediaFileEntity
     */
    episodeEntity: EpisodeEntity;
    /**
     * 
     * @type {Array<MediaFileStreamEntity>}
     * @memberof MediaFileEntity
     */
    mediaFileStreamEntity?: Array<MediaFileStreamEntity>;
    /**
     * 
     * @type {string}
     * @memberof MediaFileEntity
     */
    path: string;
    /**
     * 
     * @type {number}
     * @memberof MediaFileEntity
     */
    size: number;
    /**
     * 
     * @type {number}
     * @memberof MediaFileEntity
     */
    durationInMilliseconds?: number;
}

/**
 * Check if a given object implements the MediaFileEntity interface.
 */
export function instanceOfMediaFileEntity(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "diskEntity" in value;
    isInstance = isInstance && "episodeEntity" in value;
    isInstance = isInstance && "path" in value;
    isInstance = isInstance && "size" in value;

    return isInstance;
}

export function MediaFileEntityFromJSON(json: any): MediaFileEntity {
    return MediaFileEntityFromJSONTyped(json, false);
}

export function MediaFileEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): MediaFileEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'diskEntity': DiskEntityFromJSON(json['diskEntity']),
        'episodeEntity': EpisodeEntityFromJSON(json['episodeEntity']),
        'mediaFileStreamEntity': !exists(json, 'mediaFileStreamEntity') ? undefined : ((json['mediaFileStreamEntity'] as Array<any>).map(MediaFileStreamEntityFromJSON)),
        'path': json['path'],
        'size': json['size'],
        'durationInMilliseconds': !exists(json, 'durationInMilliseconds') ? undefined : json['durationInMilliseconds'],
    };
}

export function MediaFileEntityToJSON(value?: MediaFileEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'diskEntity': DiskEntityToJSON(value.diskEntity),
        'episodeEntity': EpisodeEntityToJSON(value.episodeEntity),
        'mediaFileStreamEntity': value.mediaFileStreamEntity === undefined ? undefined : ((value.mediaFileStreamEntity as Array<any>).map(MediaFileStreamEntityToJSON)),
        'path': value.path,
        'size': value.size,
        'durationInMilliseconds': value.durationInMilliseconds,
    };
}

