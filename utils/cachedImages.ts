import cloudinary from "./cloudinary";

let cachedResults;

export default async function getResults() {
  if (!cachedResults) {
    const fetchedResults = await cloudinary.v2.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .sort_by("public_id", "desc")
      .with_field("tags")
      .with_field("context")
      .max_results(400)
      .execute();

    cachedResults = fetchedResults;
  }

  return cachedResults;
}
