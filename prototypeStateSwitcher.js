// jkm@'s magical mystery prototype state switcher
// you should not be editing anything in here unless
// you are making it better.
// all the config lives in the config.json file

var contentStructure;

$.fn.removeClassRegex = function(regex) {
  return $(this).removeClass(function(index, classes) {
    return classes.split(/\s+/).filter(function(c) {
      return regex.test(c);
    }).join(' ');
  });
};

$.getJSON('prototypeStateSwitcher.config.json', function(json) {

  contentStructure = json;

  var stateSwitcher = $('<header class="prototypeStateSwitcher">');
  var stateSwitcherTemp = $('<form>');
  var sectionCounter = 1;
  $.each(contentStructure.sections, function(sectionKey, section) {    
    stateSwitcherTemp.append('<h3>'+section.title+'</h3>');
    if (section.options) {
      var stateSwitcherTempList = $('<ul>')
      var optionsCounter = 1;
      $.each(section.options, function(optionKey, option) {
        var ssTtempLI = $('<li>')
        var checked = '';
        var css_ident = '';
        if (option.checked) {
          checked = ' checked ';
          $('body').addClass(section.css_ident + '-' + option.css_ident);
        }
        
        if (option.css_ident) { 
          css_ident = 'data-css_ident=' + section.css_ident + '-' + option.css_ident;
        }
        ssTtempLI.append('<input '+css_ident+' type="'+section.type+'" name="'+section.title+'" value="'+optionKey+'" id="'+'pss-'+'s'+sectionCounter+'o'+optionsCounter+'"'+checked+'>').append('<label for="'+'pss-'+'s'+sectionCounter+'o'+optionsCounter+'">'+optionKey+'</label>');
        stateSwitcherTempList.append(ssTtempLI)
        optionsCounter++;
      }); 
      stateSwitcherTemp.append(stateSwitcherTempList);
    }
    if (section.type.indexOf("notes") > -1) {
      stateSwitcherTemp.append('<p>'+section.content+'</p>');
    }
    sectionCounter++;
  });
  stateSwitcher.append(stateSwitcherTemp);
  stateSwitcher.find('input').on('click',function(){
    var attr = $(this).attr('data-css_ident')
    var prefix = attr.split('-')[0]
    var pattern = new RegExp(prefix+'-\\S+','g')
    $('body').removeClassRegex(pattern);
    $('body').addClass(attr);
  })
  $('body').append(stateSwitcher);  
});
  

