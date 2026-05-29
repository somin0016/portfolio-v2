import React, { useEffect, useState } from "react";
import { LASTFM_API_KEY } from "../../constants";

const AlbumList = ({ }) => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Previous: const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchTopTracksWithCovers = async () => {
      setIsLoading(true);
      try {
        // top tracks for the period (no usable image data on this endpoint)
        const topRes = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=soeemthant&period=1month&limit=6&api_key=${LASTFM_API_KEY}&format=json`
        );
        const topData = await topRes.json();
        const topTracks = topData?.toptracks?.track || [];

        // parallel track.getInfo lookups to grab the parent album cover for each
        const enriched = await Promise.all(
          topTracks.map(async (track) => {
            try {
              const infoRes = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&artist=${encodeURIComponent(track.artist.name)}&track=${encodeURIComponent(track.name)}&api_key=${LASTFM_API_KEY}&format=json`
              );
              const infoData = await infoRes.json();
              const albumImage =
                infoData?.track?.album?.image?.find((img) => img.size === "large")?.["#text"] || "";
              return { ...track, albumImage };
            } catch {
              return { ...track, albumImage: "" };
            }
          })
        );

        setTracks(enriched);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchTopTracksWithCovers();

    /* Previous: fetch recent tracks (single request, image bundled per track) — kept for reference
    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=soeemthant&limit=15&api_key=${LASTFM_API_KEY}&format=json`
        );
        const data = await response.json();
        const allTracks = data?.recenttracks?.track || [];

        const seen = new Set();
        const unique = [];
        for (const track of allTracks) {
          const key = `${track.name}::${track.artist["#text"]}`;
          if (!seen.has(key)) {
            seen.add(key);
            unique.push(track);
          }
          if (unique.length >= 5) break;
        }

        setTracks(unique);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchTracks();
    */

    /* Previous: fetch top albums — kept for reference
    const fetchAlbums = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=soeemthant&period=7day&limit=6&api_key=${LASTFM_API_KEY}&format=json`
        );
        const data = await response.json();
        setAlbums(data.topalbums.album);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchAlbums();
    */
  }, []);

  return (
    <>
      {isLoading ? (
        <div role="status" className="mt-2">
          <svg aria-hidden="true" className="inline w-6 h-6 text-border animate-spin fill-fg" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {tracks.map((track, index) => (
            <li key={index}>
              <a
                href={track.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 py-3"
              >
                {/* Previous (recent-tracks): src={track.image?.find(img => img.size === 'large')?.["#text"] || ''} */}
                <img
                  src={track.albumImage || ''}
                  className="w-12 h-12 rounded-md object-cover flex-shrink-0 bg-surface"
                  alt={track.name}
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-fg group-hover:text-accent transition-colors truncate">
                    {track.name}
                  </h3>
                  {/* Previous (recent-tracks): {track.artist["#text"]} */}
                  <p className="text-xs text-muted truncate">
                    {track.artist.name}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Previous albums list version — kept for reference
      <ul className="divide-y divide-border">
        {albums.map((album, index) => (
          <li key={index}>
            <a
              href={album.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 py-3"
            >
              <img
                src={album.image.find(img => img.size === 'large')["#text"]}
                className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                alt={album.name}
              />
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-fg group-hover:text-accent transition-colors truncate">
                  {album.name}
                </h3>
                <p className="text-xs text-muted truncate">
                  {album.artist.name}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      */}

      {/* Previous grid version — kept for reference
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-evenly">
        {albums.map((album, index) => (
          <a
            key={index}
            href={album.url}
            target="_blank"
            className="col-span-1 block w-full rounded-lg hover:underline"
          >
            <img src={album.image.find(img => img.size === 'extralarge')["#text"]} className="rounded-md w-full" alt={album.name} />
            <div className="py-2">
              <h3 className="text-lg font-semibold">{album.name}</h3>
              <span className="text-sm inline-block">{album.artist.name}</span>
            </div>
          </a>
        ))}
      </div>
      */}
    </>
  );
};

export default AlbumList;