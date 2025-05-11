
var SharedForms = {
  setBindings: function() {
    SharedForms.setBindingsForStartingPoint($('.shared-js'));
    SharedForms.setBindingsForAJAX();
    SharedForms.setBindingsInputChanges($('.shared-js'));
    SharedForms.setBindingsForQuill($('.shared-js'));
    SharedForms.setBindingsForDatePickers($('.shared-js'));
  },
  setBindingsForAJAX: function() {
    $(document).ajaxComplete(function() {
      $("button[type='submit']:disabled").each(function() {
        if ($(this).is('[data-progress-id]')) {
					$('#' + $(this).attr('data-progress-id')).addClass('hidden');
				}
        if ($(this).is('[data-button-progress-id]')) {
	        $('#' + $(this).attr('data-button-progress-id')).addClass('hidden');
	        $('#' + $(this).attr('data-button-progress-id') + '_start').removeClass('hidden');
				}
        $(this).prop('disabled', false);
      });
      $('a[data-progress-id]').each(function() {
        $(this).blur();
        $('#' + $(this).attr('data-progress-id')).addClass('hidden');
      });
    });
  },
  
  setBindingsInputChanges: function(start) {
    start.find('input:checkbox[data-submit-on-change]').each(function() {
      $(this).on('change', function() {
        $("#" + $(this).attr('data-submit-on-change')).find('form:first').submit();
      });
    });
  },

  setBindingsForQuill: function(start) {
    const quill_options = {
      debug: 'info',
      modules: {
        toolbar: [
          [{ 'header': 1 }, { 'header': 2 }],
          ['bold', 'italic', 'underline'],
          [{ 'script': 'super' }],
          [{ 'list': 'bullet' }, { 'list': 'ordered'}]
        ],
      },
      theme: 'snow'
    };
    if ($('#quill_editor').length) {
      var quill_textarea_delta = $('#' + $('#quill_editor').attr('data-textarea-delta'));
      var quill_textarea_html  = $('#' + $('#quill_editor').attr('data-textarea-html'));
      const quill = new Quill('#quill_editor', quill_options);
      if (quill_textarea_delta.val().length != 0) {
        quill.setContents(JSON.parse(quill_textarea_delta.val()));
      }
      quill.on('text-change', function() {
        quill_textarea_delta.val(JSON.stringify(quill.getContents()));
        quill_textarea_html.val(quill.root.innerHTML);
      });
    }
  },
  setBindingsForDatePickers: function(start) {
    start.find('.datepicker').each(function() {
      $(this).datepicker({ format: 'yyyy/mm/dd' });
    });
  },

  setBindingsForStartingPoint: function(start) {
    SharedForms.setBindingsForProgressIndication(start);
    SharedForms.setBindingsForButtons(start);
  },
  setBindingsForProgressIndication: function(start) {
    start.find('a[data-progress-id]').each(function() {
      $(this).on('click', function() {
        $('#' + $(this).attr('data-progress-id')).removeClass('hidden');
      });
    });
    start.find("button[type='button'][data-progress-id]").each(function() {
      $(this).on('click', function() {
        $('#' + $(this).attr('data-progress-id')).removeClass('hidden');
      });
    });
    start.find("button[type='button'][data-button-progress-id]").each(function() {
      $(this).on('click', function() {
        $('#' + $(this).attr('data-button-progress-id') + '_start').addClass('hidden');
        $('#' + $(this).attr('data-button-progress-id')).removeClass('hidden');
      });
    });
    start.find('form').each(function() {
      $(this).on('submit', function() {
        $(this).find("button[type='submit'][data-view]").each(function() {                              
          $('#' + $(this).attr('data-view')).empty();
        });
        $(this).find("button[type='submit'][data-progress-id]").each(function() {
          $('#' + $(this).attr('data-progress-id')).removeClass('hidden');
        });
        $(this).find("button[type='submit'][data-button-progress-id]").each(function() {
	        $('#' + $(this).attr('data-button-progress-id') + '_start').addClass('hidden');
	        $('#' + $(this).attr('data-button-progress-id')).removeClass('hidden');
        });
      });
    });
  },
  setBindingsForButtons: function(start) {
    start.find('a,button').each(function() {
      $(this).on('click', function() {
        $(this).blur();
        if ($(this).is('[data-view]') && $(this).is('[data-toggle]')) {
          $('#' + $(this).attr('data-view')).toggleClass('hidden');
        }
        else if ($(this).is('[data-view]')) {
          $('#' + $(this).attr('data-view')).removeClass('hidden');
        }
        if ($(this).is('[data-view-close]')) {                                                     // "data-view-close" => '',''
          $.each($(this).attr('data-view-close').split(','), function(index, value) {
            $('#' + value).addClass('hidden');
          });
        }
        if ($(this).is('[data-view-open]')) {                                                      // "data-view-open" => '',''
          $.each($(this).attr('data-view-open').split(','), function(index, value) {
            $('#' + value).removeClass('hidden');
          });
        }
        if ($(this).is('[data-empty]')) {                                                          // "data-empty" => "div(s) to empty of content"
          $.each($(this).attr('data-empty').split(','), function(index, value) {
            $('#' + value).empty();
          });
        }
        if ($(this).is('[data-focus]')) { $('#' + $(this).attr('data-focus')).focus(); }           // "data-focus" => "data item to focus on view"
      });
    });
    start.find('form').each(function() {
      $(this).on('submit', function() {
        $(this).find("button[type='submit']").each(function() {
          $(this).prop('disabled', true);
        });
      });
    });
    start.find('.close-view-button').each(function() {
      $(this).on('click', function() {
        if ($(this).is('[data-view]')) { $('#' + $(this).attr('data-view')).toggleClass('hidden'); }
      });
    });
    start.find('.close-cancel-button').each(function() {
      $(this).on('click', function() {
        if ($(this).is('[data-view]')) { $('#' + $(this).attr('data-view')).toggleClass('hidden'); }
      });
    });
  }
}

var SharedContent = {
	set: function() {
		SharedContent.setFlashFades();
		SharedContent.setContentBoxes();
		window.onresize = function(event) {
		  SharedContent.setContentBoxes();
		};
	},
  setFlashFades: function() {
    if ($('.flash-fade').length > 0) { $('.flash-fade').delay(2500).fadeOut(); }
  },
  setContentBoxes: function() {
		$('.square-content-box').each(function() {
			$(this).height( $(this).width() );
		});
    $('.content-box-mirrored-height').each(function() {
      $(this).height( $('#' + $(this).attr('data-same-height-as')).height() );
    });
  },
}

var SharedPagination = {
  setBindings: function() {
    $('#table_infinite').each(function() { SharedPagination.setInfiniteScroll($(this)); });
  },
  setInfiniteScroll: function(po) {
    var page_url = po.attr('data-pagination-url');
    var pages = [];
    for (i = 0 ; i < parseInt(po.attr('data-max-pages')) ; i++) { pages[i] = 0; }
    pages[0] = 1;
    page_current = 0;

    $(window).on('scroll', function() {
      if ( ($(window).scrollTop() + $(window).height()) >= ($(document).height() - parseInt(po.attr('data-pagination-offset'))) ) {
        if (pages[page_current + 1] == 0) {
          pages[page_current + 1] = 1;
          $('#table_infinite_pagination_progress').removeClass('hidden');

          console.log('Loading Additional PAGE [' + (page_current + 1) + ']');
          $.ajax({
            type: 'POST', url: page_url, 
            data: { 'page': page_current + 1 },
            dataType: 'script',
            success: function() { page_current += 1; $('#table_infinite_pagination_progress').addClass('hidden'); }
          });
        }
      }
    });
  },
  paginationComplete: function() {
    $(window).off('scroll');
  }
}

var SharedNavigation = {
  set: function() {
  },
  setBindings: function() {
  },

  updateHiddenImages: function(section) {
    $('#' + section).find('img').each(function() {
      var new_src = $(this).attr('data-src');
      if (typeof new_src !== 'undefined' && new_src !== false) {
        $(this).attr('src', new_src);
      }
    });
  },
  showTab: function(target) {
    var href = $('.nav-pills').find('a[aria-controls=' + target + ']');
        href.tab('show');
    document.title = href.attr('data-title');
  },
  setTabTitle: function(title) {
    if (typeof title !== 'undefined' && title !== false) { document.title = title; }
  },

  setStatePushed: function() {
    $('body').addClass('stated');
  },
  hasPushedState: function() {
    if ($('body').hasClass("stated")) { return true; } else { return false; }
  }
}


$(document).ready(function() {
  SharedForms.setBindings();
  // SharedContent.set(); REMOVED 2024-08-19
  SharedPagination.setBindings();
  SharedNavigation.set();
  SharedNavigation.setBindings();
});
