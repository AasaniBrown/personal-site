var DATA = [
  {
    "name": "Computer Science",
    "description": "Study Of Computers And Computer Systems
Including How Computers Work & How Computers Are Made

Computer Science Is A Combination Of
Problem Solving Skills
Creative Thinking Skills
Logical Thinking Skills
Critical Thinking Skills
Computational Thinking Skills.",
    "related": ["Mod 1"],

  },
  {
    "name": "Technology",
    "description": "Human knowledge, that involves tools, materials, and systems to solve problems
Including products and processes used to make our daily lives easier
Tech is used to accomplish various tasks in our daily lives
Tech extends our abilities, making (us) the most crucial part of any technological system (Tech Is NOTHING without us)
Trends that happen in Tech are inspired by youth (make your own ideas and $$$)
Use Tech to make changes and advance your own community
.",
    "related": ["Mod 1."],

  },
  {
    "name": "Computers",
    "description": "Computers are everywhere in our daily lives [phones, game systems etc.]
Computers are tools that make our lives easier
Computers help us solve problems, help us stay organized, etc.
Computers help us accomplish things (freelance, school work, network, etc.)
Abundance of computers but they are not being utilized to the full potential
Computer can be used as a toy or it can be utilized to make money
Computers are great tools for making money (businessmen, freelancer, etc.)
Computers help us do research to stay on top of our fame
Very important to take care of our computers [limited in our communities]
.",
    "related": ["Mod 1"],

  },
  {
    "name": "Digital Divide",
    "description": "The Digital Divide is the separation between those who have ready access to computers and the Internet, and those who do not.
The "digital divide" refers to the fact that certain parts of the population have substantially better opportunities to benefit from the new economy than other parts of the population
Digital Divide  prevents certain categories of people— those from low-income households, senior citizens, single-parent children, the undereducated, minorities, and residents of rural areas — from receiving adequate access to the wide variety of resources offered by computer technology.
There are 3 types of “digital divide”:
Economic Divide
Usability Divide
Empowerment Divide
.",
    "related": ["Mod 1"],

  },
  {
    "name": "Problem Solving",
    "description": "The process of approaching a problem in a systematic manner and creating and expressing a solution such that it can be carried out by a computer. But you don't need to be a computer scientist to think like a computer scientist!.",
    "related": ["Mod 1"],

  },
  {
    "name": "",
    "description": ".",
    "related": ["CCA"],

  },
  {
    "name": "",
    "description": ".",
    "related": ["CCA"],

  },
  {
    "acronym": "CCAA",
    "name": "Candidate conservation agreement with assurances",
    "description": ".",
    "related": [""],

  },
  {
    "name": "Best available science",
    "description": "",
    "related": [],

  }];

$(function() {
  var loadedData = false,
      $goGlossary = $('.go-glossary'),
  		$wrapper = $('.wrapper'),
      source = $('#glossary-template').html(),
      template = Handlebars.compile(source),
      $termsList = $('.glossary-terms'),
      $search = $('input[type=search]'),
      terms;

  // After each key stroke compare the search box query against the name and description of each term
  $search.on('keyup input propertychange paste', function() {
    var filtered = filterTerms(terms);
    // Recompile the template with the filtered,alphebetized terms list
    compileTemplate(filtered);
  });

  function loadData(filter) {
    $termsList.empty().append('<li>Loading terms...</li>');
  	// jQuery.getJSON('js/data.js', function(data) {
      terms = DATA;
      if (filter) DATA = filterTerms(terms);
      compileTemplate(DATA);
      loadedData = true;
    // });
  }

  function filterTerms(data) {
    var query = $search.val().toLowerCase();
    return $.grep(data, function(obj) {
      return (obj.name.toLowerCase().indexOf(query) >= 0 ||obj.related.toString().toLowerCase().indexOf(query) >= 0|| obj.description.toLowerCase().indexOf(query) >= 0);
    });
  }

  function compileTemplate(data) {
    data.sort(compare);
    $termsList.empty().append( template({ 'terms': data }) );
    registerTagHandler();
  }

  // change search term when user clicks a tag
  function registerTagHandler() {
    var $tag = $('.tag');
    $tag.on('click', function() {
      $search.val($(this).text());

      var filtered = filterTerms(terms);
      compileTemplate(filtered);
    });
  }

  //filter function for ordering glossary terms
  function compare(a,b) {
    if (a.name < b.name)
       return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  $( document ).ready(function() {
    if (!loadedData) loadData();
    $wrapper.addClass('show-glossary');
  });

  // $('.toggle-glossary').click(function() {
  //   if (!loadedData) loadData();
  //   $wrapper.addClass('show-glossary');
  // });
  // $('.toggle-home').click(function() {
  //   $('.wrapper').removeClass('show-glossary');
  // });

  $goGlossary.on('click', function() {
    $search.val($(this).text());
    if (!loadedData) {
      loadData($(this).text());
    } else {
      var filtered = filterTerms(terms);
      compileTemplate(filtered);
    }
    $wrapper.toggleClass('show-glossary');
  });

  // Shake the button to grab attention for the demo
  setTimeout(function () {
    var $glossary = $('.toggle-glossary');

    $glossary.addClass('shake');
    $glossary.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
      $glossary.removeClass('shake');
    });
  }, 3000);
});
