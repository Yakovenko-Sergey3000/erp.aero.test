import type { UUIDTypes } from "uuid";

export type FindUserQueryType = {
  id?: UUIDTypes | undefined;
  email?: string | undefined;
  phone?: string | undefined;
};
