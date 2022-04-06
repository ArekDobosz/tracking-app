interface Environment {
  googleMapsApiKey: string;
}

export const environment: Environment = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
};
