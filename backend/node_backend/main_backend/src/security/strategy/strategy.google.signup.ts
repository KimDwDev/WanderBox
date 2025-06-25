import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";


@Injectable()
export class GoogleSignUpPassportStrategy extends PassportStrategy(Strategy, "google_signup") {

  constructor (config : ConfigService) {
    super({
      clientID : config.get<string>("NEST_APP_GOOGLE_CLOUD_ID"),
      clientSecret : config.get<string>("NEST_APP_GOOGLE_CLOUD_PASSWORD"),
      callbackURL : `${config.get<string>("NEST_APP_GOOGLE_CLOUD_CALLBACK_URL")}/auth/signup/google/redirect`,
      scope : config.get<string>("NEST_APP_GOOGLE_CLOUD_SIGNUP_SCOPE").split(","),
    })
  }

  async validate(profile : Profile): Promise<Profile> {
    return profile;
  }
}