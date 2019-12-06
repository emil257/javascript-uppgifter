$(function () {

  $('#errMsg').hide()

  let errors = []

  // Validation av bootstrap forms för alla inputs

  let validateInput = input => {
    let value = $(input).val();
    let errMsg_id = 'errMsg_' + $(input).attr('id');
    let errMsg_name = $(input).attr('name');

    //Radio
    let radioValue = $('input[name="Gender"]:checked').val()
    //KOLLA VAD DE ÄR FÖR TYP AV INPUT
    switch ($(input).attr('type')) {
      case 'text':
        if (value.length >= 3) {
          removeError(`${errMsg_name} is less than 3 char!`)
          formatValid(input, true)
        }
        else {
          formatValid(input, false)
          pushError(`${errMsg_name} is less than 3 char!`)
        }
        break;
      case 'password':
        if (value.length >= 3 && $('#password').val() === $('#c_password').val()) {
          removeError(`Password is less than 3 char! Or doesn't match!`)
          formatValid('#password', true)
          formatValid('#c_password', true)
        }
        else {
          pushError(`Password is less than 3 char! Or doesn't match!`)
          formatValid('#password', false)
          formatValid('#c_password', false)
        }
        break;
      case 'email':
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          removeError(`${errMsg_name} is invalid!`)
          formatValid(input, true)
        }
        else {
          pushError(`${errMsg_name} is invalid!`)
          formatValid(input, false)
        }
        break;
      case 'radio':
        if (radioValue !== undefined && $(input).prop('checked')) {
          removeError(`${errMsg_name} is invalid!`)
          formatValid(input, true)
        } else if (radioValue === undefined) {
          pushError(`${errMsg_name} is invalid!`)
          formatValid(input, false)
        }
        break;
      case 'checkbox':
        if ($(input).prop('checked')) {
          removeError(`You must accept ${errMsg_name}!`)
          formatValid(input, true)
        } else {
          pushError(`You must accept ${errMsg_name}!`)
          formatValid(input, false)
        }
        break;
      default:
        if ($(input).attr('id') === 'select') {
          if ($(input).children('option:selected').val() != 'none') {
            removeError(`${errMsg_name} is invalid!`)
            formatValid(input, true)
          } else {
            pushError(`${errMsg_name} is invalid!`)
            formatValid(input, false)
          }
        } else if ($(input).attr('id') === 'textarea') {
          if (value.length >= 5) {
            removeError(`${errMsg_name} is invalid!`)
            formatValid(input, true)
          } else {
            pushError(`${errMsg_name} is invalid!`)
            formatValid(input, false)
          }
        }
        break;
    }
  }

  let pushError = error => {
    if (!errors.includes(error)) {
      errors.push(error)
    }
  }
  let removeError = error => {
    for (var i = errors.length - 1; i >= 0; i--) {
      if (errors[i] === error) {
        errors.splice(i, 1);
      }
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
    if ($(this).val() != '' && $(this).attr('type') != 'password' && $(this).attr('type') != 'radio') {
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
  $(':radio').click(function () {
    let radios = $('input[name="Gender"]')
    for (radio of radios) {
      $(radio).removeClass('is-invalid')
      $(radio).removeClass('is-valid')
    }
    validateInput('#' + $(this).attr('id'))
  })
  //END LIVE VALIDATION


  $('#oneForm').on('submit', e => {
    e.preventDefault()

    for (target of e.currentTarget) {
      validateInput(target)
    }

    if (errors.length === 0) {
      console.clear()
      console.log('Data was sent')
    }

    else {
      console.clear()
      console.log(`Errors: ${errors.length}`)
      for (error of errors) {
        console.log(error)
      }
    }
  })
});