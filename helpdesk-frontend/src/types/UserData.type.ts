export type UserAuthData = {
  name: string;
  role: string;
  email: string;
  pfp?: Blob;
  menuFrames: { label: string; icon: string }[];
};
