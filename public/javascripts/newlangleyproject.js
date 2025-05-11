
var MachineSessions = {
  setBindings: function() {
    if ($('.session-code').length) {
      $('.session-code').bind('keyup', function() {
        var next_id = $(this).attr('data-next-input');
        if (next_id == 'submit') {
          $("#session_code_1").submit();
        }
        else {
          $('#' + next_id).focus();
        }
      });
    }
  }
}

var MachineLists = {
  setBindings: function() {
    $('#static_list_issue_checked').on('change', function() {
      $('#static_list_issue_checked_selects').find('select').each(function() {
				$(this).prop('disabled', !$(this).prop('disabled'));
			});
    });
  }
}

var MachineFilePondUploaders = {
  setBindings: function() {
    $.fn.filepond.registerPlugin(FilePondPluginFileEncode);
    $.fn.filepond.registerPlugin(FilePondPluginFileValidateType);
    $.fn.filepond.registerPlugin(FilePondPluginFileValidateSize);

    const options_image = {
        instantUpload: false,
        allowBrowse: false,
        allowMultiple: false,
        allowFileEncode: true,
        allowFileSizeValidation: true,
        maxFileSize: '5MB',
        acceptedFileTypes: ['image/png','image/jpg','image/jpeg'],
        labelIdle: 'Drag & Drop'
    }
    if (document.getElementById('person_image_image')) {
      $('#person_image_image').filepond(options_image);
      $('#person_image_image').closest('form').on('submit', function() {
        // SOMEHOW CLEAR THE INPUT -- NOTHING WORKING
      });
    }
    if (document.getElementById('case_image_image')) {
      $('#case_image_image').filepond(options_image);
      $('#case_image_image').closest('form').on('submit', function() {
        // SOMEHOW CLEAR THE INPUT -- NOTHING WORKING
      });
    }
    
    options_pdf = {
      instantUpload: false,
      allowBrowse: false,
      allowMultiple: false,
      allowFileEncode: true,
      allowFileSizeValidation: true,
      maxFileSize: '5MB',
      acceptedFileTypes: ['application/pdf'],
      labelIdle: 'Drag & Drop'
    }
    if (document.getElementById('person_pdf_pdf')) {
      $('#person_pdf_pdf').filepond(options_pdf);
      $('#person_pdf_pdf').closest('form').on('submit', function() {
        // SOMEHOW CLEAR THE INPUT -- NOTHING WORKING
      });
    }
    $('#case_pdf_pdf').filepond(options_pdf);
    $('#case_pdf_pdf').closest('form').on('submit', function() {
      // SOMEHOW CLEAR THE INPUT -- NOTHING WORKING
    });
  }
}

var MachineAutoCompletes = {
  setBindings: function() {
  }
}


$(document).ready(function() {
  MachineSessions.setBindings();
  MachineLists.setBindings();
  MachineFilePondUploaders.setBindings();
  MachineAutoCompletes.setBindings();
});


/*
var NavigationReveal = {
  setInitial: function() {
    if ($(window).scrollTop() > 75) {
      $('header').find('img.img-reveal').show();
      $('.navigation-bars').show();
    }
  },
  setBindings: function() {
    $('.navigation-bars').find('a').on('click', function() {
      $('.nav-collapsed').slideToggle(150);
    });

    $(window).on('scroll', function() {
      var logo = $('header').find('img.img-reveal');
      var menu = $('.navigation-bars');
      if ($(window).scrollTop() > 75) {
        if (logo.is(":hidden")) {
          logo.fadeIn(400);
          menu.fadeIn(400);
        }
      }
      else {
        if (logo.is(":visible")) {
          logo.fadeOut(200);
        }
      }
    });
  }
}
*/
