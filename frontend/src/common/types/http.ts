import { CalendarType } from "./calendar";

export type sendRequestType = (
  url: string,
  method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | undefined,
  body?: string | FormData | undefined,
  header?: {
    Authorization?: string | undefined;
    "Content-Type"?: string | undefined;
  }
) => Promise<any>;
