const url = "https://api.musixmatch.com/ws/1.1/track.lyrics.get";
const apiKey = "fdea5bee071e427e186b5e0f95019f17"; // Replace with your actual Musixmatch API key
const trackId = "15953433";

// const params = {
//   track_id: trackId,
//   apikey: apiKey
// };

// axios
//   .get(url, {
//     params,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//   .then((response) => {
//     const data = response.data;
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error making the request:", error);
//   });

  
  $.ajax({
    type: "GET",
    url: url,
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    data: {
      apikey: apiKey,
      track_id: trackId,
      format:"jsonp",
      callback:"jsonp_callback"
    },
    success: function (response) {
      console.log(response);
    },
    error: function (request, textStatus, errorThrown) {
      console.error("Error making the request:", textStatus, errorThrown);
    }
  });
  