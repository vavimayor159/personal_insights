/**
 * Created by ivan on 22/07/16.
 */
const layoutBig = function (data) {
  var layout = '';
  for(var i=0; i < data.children.length; i++){
    layout +=
      '<div class="col-lg-4">' +
        '<h3>' + data.children[i].name + '</h3>' +
        '<div class="circular-chart percent" data-percent="'+ Math.floor(data.children[i].percentage * 100) +'">' +
          Math.floor(data.children[i].percentage * 100) + '%'+
        '</div>' +
      '</div>'
  }
  return layout;
};

const chartsLayout = function (data) {
  var big = layoutBig(data.children[0]);
  return '<div class="row general-chart">' +
            '<h1>'+data.name+'</h1>' +
            big +
         '</div>';
};

const showInfo = function (data) {
  $('#principal').append(chartsLayout(data));
};

const setInfo = function (data) {
  for(var i=0; i < data.length; i++){
    showInfo(data[i]);
  }
  $('.circular-chart').easyPieChart();
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var login = function () {
  FB.login(function(response) {
    if (response.authResponse) {
      FB.api('/' + response.authResponse.userID, function(response) {
        FB.api('/me/feed', function(response) {
          var text = '';
          for(var  i=0; i<response.data.length; i++)
            text += (response.data[i].message || response.data[i].story) + '\n';
          $.get('/readData', {data: text}, function (data) {
            setInfo(data.tree.children);
          });
        });
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {scope: 'public_profile, user_posts, user_about_me'});
};
