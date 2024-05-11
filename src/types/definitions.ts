export type FoodTypes = {
  img: string;
  title: string;
  description?: string;
};

export type CategoryTypes = {
  id: number;
  title: string;
};

export type PlaceReturnType = {
  name:string,
  rating:number,
  price_level? : number,
  coord? : google.maps.LatLng | null,
  types? : Array<string>,
  reviews? : Array<google.maps.places.PlaceReview>,
  photo? : google.maps.places.PlacePhoto[] | undefined,
  isopen? : boolean,
  phone? : string,
  address? : string,
};
