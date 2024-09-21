export interface PatchUserType {
  nickname?: string;
  image?: string | File | null | ImageURL;
}

export interface PostSendResetPasswordEmail {
  email: string;
  redirectUrl: string;
}

export interface PatchPassword {
  password: string;
  passwordConfirmation: string;
}

export interface PostResetPassword extends PatchPassword {
  token: string;
}
