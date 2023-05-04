 export type UserType = {
    name: string;
    email?: string;
    avatarUrl?: string;
    displayName?: string;
}




export type createUserProps = {

    name: string;
    emailLowerCase: string;
    avatarUrl: string;
}