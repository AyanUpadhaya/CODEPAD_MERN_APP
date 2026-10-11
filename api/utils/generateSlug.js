const generateSlug = (title) => {
  const slug = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 255)
    .replace(/-+$/g, "");

  if (!slug) {
    return "post";
  }

  return /^\d+$/.test(slug) ? `post-${slug.slice(0, 250)}` : slug;
};

module.exports = generateSlug;
