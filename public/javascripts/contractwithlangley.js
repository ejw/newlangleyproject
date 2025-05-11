
var CWLNavigation = {
	setBindings: function() {
    var stages = ['all','done','underway'];
    var types = ['capital','operating'];
    var categories = ['roads','recreation','safety','planning','housing','business','reform','finances'];
    $('#select_tracker_categories_stages').on('change', function() {
      stages.forEach(function(item) { $('#content_' + item).hide(); });
      categories.forEach(function(item) { $('#content_' + item).hide(); });
      $(this).blur();
      $('#content_' + this.value).fadeIn();
    });
	}
}

$(document).ready(function() {
	CWLNavigation.setBindings();
});
