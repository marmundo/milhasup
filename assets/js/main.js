/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $wrapper = $("#page-wrapper"),
    $banner = $("#banner"),
    $header = $("#header");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Mobile?
  if (browser.mobile) $body.addClass("is-mobile");
  else {
    breakpoints.on(">medium", function () {
      $body.removeClass("is-mobile");
    });

    breakpoints.on("<=medium", function () {
      $body.addClass("is-mobile");
    });
  }

  // Scrolly.
  $(".scrolly").scrolly({
    speed: 1500,
    offset: $header.outerHeight(),
  });

  let telefone = document.querySelector("#telefone");

  telefone.addEventListener("keyup", (event) => {
    let input = event.target;
    input.value = phoneMask(input.value);
  });

  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  // we use javascript sort function to compare to value
  function sortDataByCity(data) {
    return data.sort(function (a, b) {
      // here a , b is whole object, you can access its property
      //convert both to lowercase
      let x = a.city.toLowerCase();
      let y = b.city.toLowerCase();

      //compare the word which is comes first
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    });
  }

  let aeroportos = document.querySelector("#aeroportos");

  console.log(aeroportos);
  const url =
    "https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json";
  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.warn(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then((data) => {
        let option;
        data = sortDataByCity(data);
        // aeroportos.forEach((aeroporto) => {
        // let defaultOption = document.createElement("option");
        // defaultOption.textContent = "Busque por Aeroporto";
        // aeroportos.appendChild(defaultOption);
        for (let i = 0; i < data.length; i++) {
          option = document.createElement("option");
          option.textContent = `${data[i].city} (${data[i].iata_code})`;
          option.value = data[i].city;

          aeroportos.appendChild(option);
        }
        aeroportos.selectedIndex = 0;
        // });
      });
    })
    .catch(function (err) {
      console.error("Fetch Error -", err);
    });

  // Menu.
  // $('#menu')
  // 	.append('<a href="#menu" class="close"></a>')
  // 	.appendTo($body)
  // 	.panel({
  // 		delay: 500,
  // 		hideOnClick: true,
  // 		hideOnSwipe: true,
  // 		resetScroll: true,
  // 		resetForms: true,
  // 		side: 'right',
  // 		target: $body,
  // 		visibleClass: 'is-menu-visible'
  // 	});

  // Header.
  if ($banner.length > 0 && $header.hasClass("alt")) {
    $window.on("resize", function () {
      $window.trigger("scroll");
    });

    $banner.scrollex({
      bottom: $header.outerHeight() + 1,
      terminate: function () {
        $header.removeClass("alt");
      },
      enter: function () {
        $header.addClass("alt");
      },
      leave: function () {
        $header.removeClass("alt");
      },
    });
  }
})(jQuery);
