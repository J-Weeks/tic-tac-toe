'use strict';

window.myApp = {
  //I know why you dud this but lets talk about why and when to do this.
    baseUrl: 'http://tic-tac-toe.wdibos.com',
};

$(document).ready(() => {
  //again usually only once in the bottom. This also should only appear once
  //throughout all of the js files
//------------------------------------------------------------------------------
//---------------------------User Manager---------------------------------------
//----------------SIGN UP----------------
  $('#signup-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-up',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      $('#myModal2').modal('hide');
      $('.sign-up1').hide();
      $('.change-password1').hide();
      $('.sign-out1').hide();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

//----------------SIGN IN----------------
  $('#signin-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-in',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      console.log("Welcome " + data.user.email);
      $('#myModal1').modal('hide');
      $('.sign-in1').hide();
      $('.sign-up1').hide();
      // why hide and show all of these?
      //also next time a better way is to use the same classnames and call
      // .hide once
      $('.sign-out1').show();
      $('.change-password1').show();
      myApp.user = data.user;
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

//----------------CHANGE PASSWORD----------------
  $('#changepass-form').on('submit', function(e) {
    e.preventDefault();
    if(!myApp.user) {
      console.error("Wrong!!!");
      return;
    }
    var formData = new FormData(e.target);
    console.log(formData);
    $.ajax({
      url: myApp.baseUrl + '/change-password/' + myApp.user.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      console.log("Password changed");
      $('#myModal3').modal('hide');
      // lol, gotta work on semantic naming
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

//----------------SIGN OUT----------------
  $('.sign-out2').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: myApp.baseUrl + '/sign-out/' + myApp.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      }
    }).done(function() {
      $('#myModal4').modal('hide');
      $('.sign-in1').show();
      $('.sign-up1').show();
      $('.sign-out1').hide();
      $('.change-password1').hide();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
});

module.exports = true;
