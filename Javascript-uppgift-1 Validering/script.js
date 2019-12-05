$(function () {

  $('#errMsg').hide();

  let validateInput = input => {
    let value = $(input).val();
    let errMsg_id = 'errMsg_' + $(input).attr('id');
    let errMsg_name = $(input).attr('name');


    //KOLLA VAD DE ÄR FÖR TYP AV INPUT
    switch ($(input).attr('type')) {
      case 'text':
        if (value.length >= 3) {
          $('#errMsg > li').filter('#' + errMsg_id).remove();
          formatValid(input, true)
        }
        else if ($('#' + errMsg_id).val() === undefined) {
          $('#errMsg').append(`<li id="${errMsg_id}">${errMsg_name} is less than 3 char!</li>`)
          formatValid(input, false)
        }
        break;
      case 'password':
        if (value.length >= 3 && $('#password').val() === $('#c_password').val()) {
          $('#errMsg > li').filter('#errMsg_password').remove();
          formatValid('#password', true)
          formatValid('#c_password', true)
        }
        else if ($('#errMsg_password').val() === undefined) {
          $('#errMsg').append(`<li id="errMsg_password">Password is less than 3 char! Or doesn't match!</li>`)
          formatValid('#password', false)
          formatValid('#c_password', false)
        }
        break;
      case 'email':
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          $('#errMsg > li').filter('#' + errMsg_id).remove();
          formatValid(input, true)
        }
        else if ($('#' + errMsg_id).val() === undefined) {
          $('#errMsg').append(`<li id="${errMsg_id}">${errMsg_name} is invalid!</li>`)
          formatValid(input, false)
        }
        break;
      case 'radio':
        //HUR
        break;
      case 'checkbox':
        if ($(input).prop('checked')) {
          $('#errMsg > li').filter('#' + errMsg_id).remove();
          formatValid(input, true)
        } else if ($('#' + errMsg_id).val() === undefined) {
          $('#errMsg').append(`<li id="${errMsg_id}">You must accept ${errMsg_name}!</li>`)
          formatValid(input, false)
        }
        break;
      default:
        if ($(input).attr('id') === 'select') {
          if ($(input).children('option:selected').val() != 'none') {
            $('#errMsg > li').filter('#' + errMsg_id).remove();
            formatValid(input, true)
          } else if ($('#' + errMsg_id).val() === undefined) {
            $('#errMsg').append(`<li id="${errMsg_id}">${errMsg_name} is invalid!</li>`)
            formatValid(input, false)
          }
        } else if ($(input).attr('id') === 'textarea') {
          if (value.length >= 5) {
            $('#errMsg > li').filter('#' + errMsg_id).remove();
            formatValid(input, true)
          } else if ($('#' + errMsg_id).val() === undefined) {
            $('#errMsg').append(`<li id="${errMsg_id}">${errMsg_name} is invalid!</li>`)
            formatValid(input, false)
          }
        }
        break;
    }
  }

  let formatValid = (input, valid) => {
    if (valid) {
      $(input).addClass('is-valid')
      $(input).removeClass('is-invalid');
    } else {
      $(input).addClass('is-invalid')
      $(input).removeClass('is-valid');
    }
  }


  //LIVE VALIDATION
  $('input').blur(function () {
    if ($(this).val() != '' && $(this).attr('type') != 'password') {
      validateInput('#' + $(this).attr('id'));
    }
  });
  $(':password').blur(function () {
    if ($(this).val() != '' && $('#c_password').val() != '' && $('#password').val() != '') {
      validateInput('#' + $(this).attr('id'));
    }
  })
  $('select').click(function () {
    if ($(this).children('option:selected').val() != 'none') {
      validateInput('#' + $(this).attr('id'));
    }
  });
  $('textarea').blur(function () {
    if ($(this).val() != '') {
      validateInput('#' + $(this).attr('id'));
    }
  });
  $(':checkbox').click(function () {
    validateInput('#' + $(this).attr('id'));
  })
  //END LIVE VALIDATION


  $('#oneForm').on('submit', e => {
    e.preventDefault()

    for (target of e.currentTarget) {
      validateInput(target)
    }

    if ($('#errMsg').children().length === 0)
      console.log('Data was sent')
    else
      console.log('Data was not sent!')
  })
});