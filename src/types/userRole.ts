import type { RoleType } from "./role";
import type { UserType } from "./user";

export interface UserRoleType {
    userRoleId?: number;
    user?: UserType;
    role?: RoleType;
}