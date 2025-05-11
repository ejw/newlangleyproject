
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

$(document).ready(function() {
  MachineSessions.setBindings();
});
