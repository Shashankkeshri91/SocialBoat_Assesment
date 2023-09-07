const API_ENDPOINT =
  "https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=fitness&numResults=10";

export const fetchVideos = async (q, numResults) => {
  const params = new URLSearchParams({
    q,
    numResults
  });

  const response = await fetch(`${API_ENDPOINT}?${params}`);
  return response.json();
};
