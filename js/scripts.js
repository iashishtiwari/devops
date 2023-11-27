/*  ---------- ON-SCROLL ANIMATION ------------  */
var $animation_elements = $('.animateThis');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height - 0);

  $.each($animation_elements, function () {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top + 0;
    var element_bottom_position = (element_top_position + element_height);

    if ((element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });

}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

// Header Fixed on Scroll

$(window).scroll(function () {

  if ($(window).scrollTop() > 100) {
    $('header').addClass('fixed');
  } else {
    $('header').removeClass('fixed')
  }

})


/*  ---------- Menu Btn ------------  */
if ($(window).width() < 1200) {


  $('.menuBtn').on('click', function () {
    $('.navigHolder').toggleClass('open');
    $(this).toggleClass('active');
    $('.pageHeader').toggleClass('open');
  });

}

// Capabilities Slider
const capabilitiesSwiper = new Swiper(".capabilitiesSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 1500,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    575: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    }
  },
});

if ($(window).width() > 992) {
  $('.capabilitiesBox').hover(function () {
    $(this).find('.capabilitiesTxt h4').toggleClass('active');
    $(this).find('.capabilitiesTxt p').slideToggle();
  });
}

//Supply Slider
const supplySwiper = new Swiper('.supplySwiper', {
  speed: 1500,
  loop: false,
  slidesPerView: 1.2,
  spaceBetween: 25,
  breakpoints: {
    768: { slidesPerView: 2.1 },
    // 992 : {slidesPerView:2.3},
    1200: { slidesPerView: 3.1 },
  }
});



var advantageData = new Swiper(".advantageData", {

  loop: true,
  watchSlidesProgress: true,
  breakpoints: {
    991: {
      direction: "vertical",
      slidesPerView: 3,
    }
  },
});

var advantagePic = new Swiper(".advantagePic", {
  spaceBetween: 0,
  speed: 1200,
  loop: true,

  grabCursor: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-120%", 0, -500],
    },
    next: {
      shadow: true,
      translate: ["120%", 0, -500],
    },
  },
  autoplay: true,
  thumbs: {
    swiper: advantageData,
  },
});

// sticky effect
var stickyElement = $("[data-sticky_column]");
if (stickyElement.length > 0) {
  stickyElement.stick_in_parent({ parent: "[data-sticky_parent]", offset_top: 150 });
}

// smooth parallax
$(window).scroll(function () {
  $(".parallaxImg").css("background-position", "50% " + ($(this).scrollTop() / 4) + "px");
});


// diable prevous date in date picker
$(function () {
  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10)
    month = '0' + month.toString();
  if (day < 10)
    day = '0' + day.toString();

  var maxDate = year + '-' + month + '-' + day;

  $('.datePicker').attr('min', maxDate);
});

// custom dropdown list
$(function () {
  $('.customDropdown').on('click', function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdownList').slideToggle(200);
  });
  $('.customDropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdownList').slideUp(200);
  });
  $('.customDropdown .dropdownList li').on('click', function () {
    $(this).parents('.customDropdown').find('span').text($(this).text());
    $(this).parents('.customDropdown').find('input').attr('value', $(this).attr('id'));
  });
})

// image accordion
$('.accordionSideImg').each(function () {
  $(this).find('img').hide()
  $(this).find('img').eq(0).show()
});
$('.accordion-item').click(function () {
  var accordian = $(this).index();
  $(this).parents('.row').find('.accordionSideImg img').eq(accordian).siblings('img').hide()
  $(this).parents('.row').find('.accordionSideImg img').eq(accordian).show()
})

// select dropdown custom styling
$('select').each(function () {

  // Cache the number of options
  var $this = $(this),
      numberOfOptions = $(this).children('option').length;

  // Hides the select element
  $this.addClass('s-hidden');

  // Wrap the select element in a div
  $this.wrap('<div class="select"></div>');

  // Insert a styled div to sit over the top of the hidden select element
  $this.after('<div class="styledSelect"></div>');

  // Cache the styled div
  var $styledSelect = $this.next('div.styledSelect');

  // Show the first select option in the styled div
  $styledSelect.text($this.children('option').eq(0).text());

  // Insert an unordered list after the styled div and also cache the list
  var $list = $('<ul />', {
      'class': 'options'
  }).insertAfter($styledSelect);

  // Insert a list item into the unordered list for each select option
  for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
          text: $this.children('option').eq(i).text(),
          rel: $this.children('option').eq(i).val()
      }).appendTo($list);
  }

  // Cache the list items
  var $listItems = $list.children('li');

  // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
  $styledSelect.click(function (e) {
      e.stopPropagation();
      // $('div.styledSelect.active').each(function () {
      //     $(this).removeClass('active').next('ul.options').slideUp(200);
      // });
      $(this).toggleClass('active').next('ul.options').slideToggle(200);
  });

  // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
  // Updates the select element to have the value of the equivalent option
  $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.slideUp(200);
      /* alert($this.val()); Uncomment this for demonstration! */
  });

  // Hides the unordered list when clicking outside of it
  $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.slideUp(200);
  });

});