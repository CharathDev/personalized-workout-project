import axios from "axios";

export default async function generateWorkout(data: any) {
  const response = await axios.post("http://127.0.0.1:5000/", data);
  return response.data;
}
