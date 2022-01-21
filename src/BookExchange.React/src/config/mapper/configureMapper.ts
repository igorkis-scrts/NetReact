import { Mapper } from "@utils/mapping/Mapper";
import { UserStatsMappingProfile } from "./profiles/UserStatsMappingProfile";

export function configureMapper() {
  Mapper.addProfiles([new UserStatsMappingProfile()]);
}
