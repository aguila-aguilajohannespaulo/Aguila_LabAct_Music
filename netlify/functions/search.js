exports.handler = async function (event) {

  try {
    const query = event.queryStringParameters?.q?.trim();

    if (!query) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Please enter a search query."
        })
      };
    }

    const token = process.env.GENIUS_ACCESS_TOKEN;

    if (!token) {

      console.error("GENIUS_ACCESS_TOKEN is missing.");

      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Genius API token is not configured."
        })
      };

    }

    const response = await fetch(
      `https://api.genius.com/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {

      console.error("Genius API error:", data);

      return {
        statusCode: response.status,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Genius API request failed."
        })
      };

    }

    const results =
      data.response?.hits?.map((hit) => {

        const song = hit.result;

        return {
          id: song.id,
          title: song.title,
          artist: song.primary_artist?.name || "Unknown Artist",
          album: song.album?.name || null,
          thumbnail:
            song.song_art_image_thumbnail_url ||
            song.header_image_thumbnail_url ||
            "",
          url: song.url
        };

      }) || [];

    return {
      statusCode: 200,

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        query: query,
        results: results
      })
    };


  } catch (error) {

    console.error("Function error:", error);

    return {
      statusCode: 500,

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        error: "Something went wrong while searching."
      })
    };

  }

};
