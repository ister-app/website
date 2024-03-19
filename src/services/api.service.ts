import { Configuration, EpisodeControllerApi, ImageControllerApi, ScannerControllerApi, SeasonControllerApi, ShowControllerApi, TranscoderControllerApi } from "@/generated-sources/openapi";
import AuthService from "./auth.service";

export default class ApiService {
    authService: AuthService | undefined;

    constructor() {
        this.authService = new AuthService();
    }
    

    async getConfiguration(): Promise<Configuration> {
        return new Configuration({
            basePath: import.meta.env.VITE_BACKEND_URL,
            headers: { "Authorization": "Bearer " + await this.authService?.getToken() }
        });
    }


    async getShowControllerApi() {
        return new ShowControllerApi(await this.getConfiguration());
    }

    async getSeasonControllerApi() {
        return new SeasonControllerApi(await this.getConfiguration());
    }

    async getEpisodeControllerApi() {
        return new EpisodeControllerApi(await this.getConfiguration());
    }

    async getImageControllerApi() {
        return new ImageControllerApi(await this.getConfiguration());
    }

    async getScannerControllerApi() {
        return new ScannerControllerApi(await this.getConfiguration());
    }

    async getTranscoderControllerApi() {
        return new TranscoderControllerApi(await this.getConfiguration());
    }
}
