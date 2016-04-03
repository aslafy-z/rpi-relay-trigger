/* Adapted from https://github.com/Kylir/rgb-slider */


// Main start
$(function() {

    $('#red').click(function() {
      if($('#red').prop('checked')) {
          $.get( "/red/1" , function() {});
      } else {
          $.get( "/red/0" , function() {});
        }
    });

    $('#green').click(function() {
      if($('#green').prop('checked')) {
          $.get( "/green/1" , function() {});
      } else {
          $.get( "/green/0" , function() {});
        }
    });

    $('#blue').click(function() {
      if($('#blue').prop('checked')) {
          $.get( "/blue/1" , function() {});
      } else {
          $.get( "/blue/0" , function() {});
        }
    });

});
