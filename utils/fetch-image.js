const fetchWikipediaImage = async (name) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(
    name
  )}&piprop=original&formatversion=2&origin=*`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract image
    const page = data.query.pages[0];
    const imageUrl = page.original ? page.original.source : null;

    return imageUrl;
  } catch (error) {
    console.error("Error fetching Wikipedia image:", error);
    return null;
  }
};

export default fetchWikipediaImage;
