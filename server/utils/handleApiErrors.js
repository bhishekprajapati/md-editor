import { ZodError } from "zod";
import { apiErrors } from "../lib/apiErrors";

const { ValidationError } = apiErrors;

export default async function handleApiErrors(api) {
  try {
    return await api();
  } catch (err) {
    if (err instanceof ZodError) {
      return ValidationError(err.flatten().fieldErrors);
    }

    return createError({
      statusCode: 500,
    });
  }
}
