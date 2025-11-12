import { TweeterResponse } from "./TweeterResponse";

export interface NumberResponse extends TweeterResponse {
  readonly count: number;
}
