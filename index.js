var mymap = L.map('map').setView([0, 0], 3);
L.tileLayer("https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=oM5aKScRFflW4y1le0kt", {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(mymap);


$.ajax({
  url: "https://api.ipify.org/",
  success: function(data) {
    var defaultIp = data;
    getIpData(defaultIp);
  },
  error: function() {
    console.log("Couldn't load user IP");
    var defaultIp = "8.8.8.8"
    getIpData(defaultIp);
  }
});

function getIpData(ip) {
  var api_key = "at_JsoeLKPhSveXuJeauMJCCDK7pZl9w";
  $(function() {
    $.ajax({
      url: "https://geo.ipify.org/api/v1",
      data: {
        apiKey: api_key,
        ipAddress: ip
      },
      success: function(data) {
        var country = data.location.country;
        var region = data.location.region;
        var city = data.location.city;
        var lat = data.location.lat;
        var lng = data.location.lng;
        var postalCode = data.location.postalCode;
        var timezone = data.location.timezone;
        var isp = data.isp;
        $(".ip-address").text(ip);
        $(".location").text(city + ", " + region + ", " + country);
        $(".postal-code").text(postalCode);
        $(".timezone").text("UTC " + timezone);
        $(".isp").text(isp);
        mymap.setView([lat, lng], 17);
        var marker = L.marker([lat, lng]).addTo(mymap);
      }
    });
  });
}

$("form").submit(function(e) {
  e.preventDefault();
  var ip = $(this).serializeArray()[0].value;
  getIpData(ip);
});
