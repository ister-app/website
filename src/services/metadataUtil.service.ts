import {EpisodeEntity, MetadataEntity, SeasonEntity, ShowEntity} from "@/generated-sources/openapi";

/**
 * This util helps with getting the correct value for the given language.
 * If the given language doesn't exist return english then the not set language.
 */
export default class MetadataUtilService {
    public static getMetadataFieldForLanguage(field: string, metadataEntities: MetadataEntity[] | undefined, preferredLanguage: String | undefined): string | undefined | Date | ShowEntity | SeasonEntity | EpisodeEntity {
        if (metadataEntities === undefined) {
            return "";
        } else {
            const preferred = metadataEntities.filter((stream) => stream.language === preferredLanguage);
            if (preferred && preferred.length != 0 && preferred[0][field as keyof MetadataEntity]) {
                return preferred[0][field as keyof MetadataEntity];
            } else if (preferredLanguage != "eng" && preferredLanguage != undefined) {
                return MetadataUtilService.getMetadataFieldForLanguage(field, metadataEntities, "eng");
            } else if (preferredLanguage == "eng") {
                return MetadataUtilService.getMetadataFieldForLanguage(field, metadataEntities, undefined);
            } else {
                return "";
            }
        }
    }
}
