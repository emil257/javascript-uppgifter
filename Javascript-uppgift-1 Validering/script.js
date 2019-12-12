
$(function () {

  let errors = []
  $("#accept").prop('checked', false);
  $("#gender1").prop('checked', false);
  $("#gender2").prop('checked', false);
  $("#gender3").prop('checked', false);

  // Validation av bootstrap forms för alla inputs

  class User {
    constructor(firstname, lastname, email, password, preference, gender, description) {
      this.id = new Date()
      this.firstname = firstname
      this.lastname = lastname
      this.email = email
      this.password = password
      this.preference = preference

      //Format gender
      switch (gender) {
        case 'option1':
          this.gender = 'man'
          break
        case 'option2':
          this.gender = 'women'
          break
        case 'option3':
          this.gender = 'unspecified'
          break
        default:
          break
      }

      this.description = description
    }
  }

  let validateInput = input => {
    let value = $(input).val()
    let errMsg_name = $(input).attr('name')

    //Radio
    let radioValue = $('input[name="Gender"]:checked').val()

    //KOLLA VAD DE ÄR FÖR TYP AV INPUT
    switch ($(input).attr('type')) {
      case 'text':
        if (value.length >= 3 && /^[A-Za-z]+$/.test(value)) {
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
      $(input).removeClass('is-invalid')
    } else {
      $(input).addClass('is-invalid')
      $(input).removeClass('is-valid')
    }
  }


  //LIVE VALIDATION
  $('input').blur(function () {
    if ($(this).attr('type') != 'password' && $(this).attr('type') != 'radio') {
      validateInput('#' + $(this).attr('id'))
    }
  });
  $(':password').blur(function () {
    validateInput('#' + $(this).attr('id'))
  })
  $('select').click(function () {
    if ($(this).children('option:selected').val() != 'none') {
      validateInput('#' + $(this).attr('id'))
    }
  });
  $('textarea').blur(function () {
    validateInput('#' + $(this).attr('id'))
  });
  $(':checkbox').click(function () {
    validateInput('#' + $(this).attr('id'))
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


  $('#regForm').on('submit', e => {
    e.preventDefault()

    for (target of e.currentTarget) {
      validateInput(target)
    }

    if (errors.length === 0) {
      console.clear()
      let jsonUser = JSON.stringify(new User(e.currentTarget[0].value,
        e.currentTarget[1].value,
        e.currentTarget[2].value,
        e.currentTarget[3].value,
        e.currentTarget[5].value,
        $('input[name="Gender"]:checked').val(),
        e.currentTarget[9].value))
      console.log(jsonUser)

      //Skicka user till nästa sida!
      window.location.assign('login.html')
    }

    else {
      console.clear()
      console.log(`Errors: ${errors.length}`)
      for (error of errors) {
        console.log(error)
      }
    }
  })
  $('#loginForm').on('submit', e => {
    e.preventDefault()
    validateInput($('#email'))
    if (errors.length === 0) {
      document.body.innerHTML = '<h1 class="text-center mt-5">Error 404, this site dosen´t exist yet!</h1>'
    }
  })
});