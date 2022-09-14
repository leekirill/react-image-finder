function fetchPics(request) {
  const BASE_URL = "https://pixabay.com/api/";
  const API_KEY = "19115231-b63e497fa397eaff465691d91";

  return fetch(
    `${BASE_URL}?q=${request}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}

export default { fetchPics };
