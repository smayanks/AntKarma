$(function() {

  $('.next').click(function(){
    var nextId = $(this).parents('.tab-pane').next().attr("id");
    $('[href=#'+nextId+']').tab('show');
    return false;
  });

  $('.prev').click(function(){
    var prevId = $(this).parents('.tab-pane').prev().attr("id");
    $('[href=#'+prevId+']').tab('show');
    return false;
  });
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          //update progress
          var step = $(e.target).data('step');
          var percent = (parseInt(step) / 11) * 100;
          $('.progress-bar').css({width: percent + '%'});
          $('.progress-bar').text("Step " + step + " of 10");
          //e.relatedTarget // previous tab
        });

  $('.first').click(function(){
    $('[href=#step1]').tab('show');
  });

});