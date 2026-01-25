import { Show } from "./show";

export class Movie {
  constructor(
    public readonly id: string,
    public title: string,
    public shows: Show[]
  ) {}
}
