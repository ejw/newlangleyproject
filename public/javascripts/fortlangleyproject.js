
var FoundationPhotos = {
  set: function() {
    $('.photos-container').find('img.ds:in-viewport').slice(0,20).each(function() {
      FoundationPhotos.showPhoto($(this));
    });
  },
  setBindings: function() {
    $(window).scroll(function() {
      $('.photos-container').find('img.ds:in-viewport').slice(0,25).each(function() {
        FoundationPhotos.showPhoto($(this));
      });
    });
    $(window).resize(function() {
      $('.photos-container').find('img.ds:in-viewport').slice(0,25).each(function() {
        FoundationPhotos.showPhoto($(this));
      });
    });
  },

  showPhoto: function(jqe) {
    jqe.attr('src', jqe.attr('data-src'));
    jqe.removeClass('ds');
    jqe.removeAttr('aata-src');
  }
}

var FoundationTimelines = {
  set: function() {
		if ($("#statewood_timeline").length) {
			$('#statewood_timeline').verticalTimeline({
			  startLeft: false,
			  alternate: true,
			  animate: "fade",
			  arrows: false
			});			
		}
  }
}


// THE OFFICIAL START OF THINGS, WITH ITS VERY BRITTLE ORDERING. UPDATE WITH EXTREME FORTCAUTION.

$(document).ready(function() {
  FoundationPhotos.set();
  FoundationPhotos.setBindings();
  FoundationTimelines.set();
});
