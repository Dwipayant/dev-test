import { Restaurant } from "../interfaces/restaurant";

export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch("/api/restaurants");
  return await res.json();
}

export async function CreateNewRestaurant(restaurant:any):Promise<string> {
  const res = await fetch("/api/restaurants",{method:"POST",body:JSON.stringify(restaurant)});
  return await res.json();
}