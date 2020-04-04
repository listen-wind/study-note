$(function () {
  var last = '';
  var now = '';
  arrText = [];

  function getText() {
    var reg = /^\[([^\[\]]+)\]/;
    var text = $('.mejs-subtitles-content').text();
    now = text;

    if (now !== last) {
      var name = '';

      var textNew = text.replace(reg, function () {
        name = RegExp.$1;
        return '';
      });

      arrText.push({
        name: name,
        text: textNew.trim()
      });

      last = text;
    }
  }


  window.start = function () {
    arrText = [];
    $('.mejs-subtitles-content').text('');
    setInterval(function () {
      getText();
    }, 100)
  }

  window.end = function () {
    clearInterval(window.inter);
    console.log(arrText);
  }

  window.get = function () {
    consoleText();
  }

  function consoleText() {
    var lastText = '';
    var str = '';
    arrText.forEach(function (item) {
      if (lastText.name === item.name) {
        str += item.text + '<br/>';
      } else {
        str += `<u><b>${item.name}</b></u>: ${item.text}<br/>`;
      }

      lastText = item;
    })

    var div = document.createElement('div');
    div.id = 'myDiv';

    document.getElementsByClassName('ets-ui-acc-bd')[0].appendChild(div);
    document.getElementById('myDiv').innerHTML = str;

    console.log(str);
  }
})

start();