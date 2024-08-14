const z = require("zod");

const movieSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Movie title must be a string",
      required_error: "Title is required",
    })
    .min(1),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: "Invalid url",
  }),
  rate: z.number().min(0).max(10).optional(),
  genre: z.array(z.string().min(1)).nonempty({
    invalid_type_error: "Movie genre must be an array",
    required_error: "Genre is required",
  }),
  // genre: z.array(z.enum(['Action', 'Terror']),{required_error:'Movie genre is required'})
});

function validateMovie(object) {
  return movieSchema.safeParse(object);
}

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object);
}

module.exports = { validateMovie, validatePartialMovie };
