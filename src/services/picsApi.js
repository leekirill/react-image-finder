function fetchPics(request, page) {
  const BASE_URL = "https://pixabay.com/api/";
  const API_KEY = "19115231-b63e497fa397eaff465691d91";

  return fetch(
    `${BASE_URL}?q=${request}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=24`
  );
}

export default { fetchPics };
