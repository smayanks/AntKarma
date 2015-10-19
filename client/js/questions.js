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
          var percent = (parseInt(step) / 7) * 100;
          $('.progress-bar').css({width: percent + '%'});
          $('.progress-bar').text("Step " + step + " of 7");
          //e.relatedTarget // previous tab
        });

  $('.first').click(function(){
    $('#questionTabs a:first').tab('show')
  });

  $('#yesToExistingTax').hide();

  $('#alreadyTaxInvestment1').click(function() {

    $('#yesToExistingTax').fadeIn(1200);

  });

  $('#alreadyTaxInvestment2').click(function() {

    $('#yesToExistingTax').fadeOut(1200);

  });
});