import { z } from "zod";

const ActivitySchema = z.object({
  rowid: z.number(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  date: z.string(),
  score: z.number(),
  price: z.number(),
  images: z.string(),
});

export default ActivitySchema;
