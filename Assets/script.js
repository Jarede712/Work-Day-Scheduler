$(function () {
    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
  
    $('.saveBtn').click(function () {
      var hourId = $(this).closest('.time-block').attr('id');
      var text = $(this).siblings('.description').val();
      localStorage.setItem(hourId, text);
    });
  
    $('.time-block').each(function () {
      var hourId = $(this).attr('id');
      $(this).find('.description').val(localStorage.getItem(hourId));
    });
  
    function updateColors() {
      var currentHour = dayjs().hour();
  
      $('.time-block').each(function () {
        var blockHour = parseInt($(this).attr('id').replace('hour-', ''), 10);
        if (blockHour < currentHour) {
          $(this).addClass('past').removeClass('future present');
        } else if (blockHour === currentHour) {
          $(this).addClass('present').removeClass('past future');
        } else {
          $(this).addClass('future').removeClass('past present');
        }
      });
    }
  
    updateColors();
  
    setInterval(updateColors, 60000); 
  
    window.addEventListener('focus', function () {
      $('.time-block .description').each(function () {
        var hourId = $(this).closest('.time-block').attr('id');
        $(this).val(localStorage.getItem(hourId) || "");
      });
  
      updateColors();
    });
  });
  