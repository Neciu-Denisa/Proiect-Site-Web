   var quiztitle = "Have you read I Am Number Four? Test your knowledge about the book now!";

    var quiz = [
        {
            "question"      :   "Q1: Where does Four go, and what does he decide to name himself?",
            "choices"       :   [
                                    "Indianapolis, Indiana; Perry Chase",
                                    "Austin, Texas; Jason Jackson",
                                    "Paradise, Ohio; John Smith",
                                ],
            "correct"       :   "Indianapolis, Indiana; Perry Chase",
            "explanation"   :   "He wanted to go somewhere with a beach.",
        },
        {
            "question"      :   "Q2: Who is Four's Cepan?",
            "choices"       :   [
                                    "Henri",
                                    "Jacob",
                                    "Larry",
                                ],
            "correct"       :   "Henri",
            "explanation"   :   "Henri was his parents friend.",
        },
        {
            "question"      :   "Q3: Who is Four's first friend?",
            "choices"       :   [
                                    "He has no friends.",
                                    "Burt Davis",
                                    "Sarah Hart",
                                ],
            "correct"       :   "Sarah Hart",
            "explanation"   :   "He saw her right before he enter in the school.",
        },
		{
            "question"      :   "Q4: What is Four's first Legacy?",
            "choices"       :   [
                                    "Anti-gravity",
                                    "Invisibility",
                                    "Lumen: fireproof and lights on your hands",
                                ],
            "correct"       :   "Lumen: fireproof and lights on your hands",
            "explanation"   :   "He first developed this Legacy at school.",
        },
		{
            "question"      :   "Q5: Who is the first person to figure out that Four is an alien?",
            "choices"       :   [
                                    "Sarah Hart",
                                    "Sam Goode",
                                    "No one.",
                                ],
            "correct"       :   "Sam Goode",
            "explanation"   :   "Jhon save Sam with his powers.",
        },
		{
            "question"      :   "Q6: What planet is Four from?",
            "choices"       :   [
                                    "Lorien",
                                    "Mogadore",
                                    "Earth",
                                ],
            "correct"       :   "Lorien",
            "explanation"   :   "Lorien is the first planet in this universe.",
        },
		{
            "question"      :   "Q7: Who are the enemies?",
            "choices"       :   [
                                    "Loric",
                                    "Government",
                                    "Mogadorians",
                                ],
            "correct"       :   "Mogadorians",
            "explanation"   :   "They dystroyed the loric's planet.",
        },
		{
            "question"      :   "Q8: Why does Four run into a burning building?",
            "choices"       :   [
                                    "Sarah Hart is trapped in there.",
                                    "He doesn't.",
                                    "He left his chest in there.",
                                ],
            "correct"       :   "Sarah Hart is trapped in there.",
            "explanation"   :   "It's just about love, you know?",
        },
		{
            "question"      :   "Q9: A large group of Mogadorians attacks...",
            "choices"       :   [
                                    "The school",
                                    "Four's home",
                                    "Sarah Hart's home",
                                ],
            "correct"       :   "The school",
            "explanation"   :   "The mogadorians where in front of the school.",
        },
		{
            "question"      :   "Q10: Who does Four meet in the middle of the Mogadorians's attack?",
            "choices"       :   [
                                    "9",
                                    "No one.",
                                    "6",
                                ],
            "correct"       :   "6",
            "explanation"   :   "Six appear from nowhere and helps them.",
        },
    ];

    var currentquestion = 0, score = 0, submt=true, picked;

    jQuery(document).ready(function($){


        function htmlEncode(value){
          return $(document.createElement('div')).text(value).html();
        }


        function addChoices(choices){
            if(typeof choices !== "undefined" && $.type(choices) == "array"){
                $('#choice-block').empty();
                for(var i=0;i<choices.length; i++){
                    $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');                    
                }
            }
        }
        
        function nextQuestion(){
            submt = true;
            $('#explanation').empty();
            $('#question').text(quiz[currentquestion]['question']);
            $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
            if(quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != ""){
                if($('#question-image').length == 0){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
                } else {
                    $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
                }
            } else {
                $('#question-image').remove();
            }
            addChoices(quiz[currentquestion]['choices']);
            setupButtons();
        }


        function processQuestion(choice){
            if(quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']){
                $('.choice').eq(choice).css({'background-color':'#50D943'});
                $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
                score++;
            } else {
                $('.choice').eq(choice).css({'background-color':'#D92623'});
                $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
            }
            currentquestion++;
            $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function(){
                if(currentquestion == quiz.length){
                    endQuiz();
                } else {
                    $(this).text('Check Answer').css({'color':'#222'}).off('click');
                    nextQuestion();
                }
            })
        }


        function setupButtons(){
            $('.choice').on('mouseover', function(){
                $(this).css({'background-color':'#e1e1e1'});
            });
            $('.choice').on('mouseout', function(){
                $(this).css({'background-color':'#fff'});
            })
            $('.choice').on('click', function(){
                picked = $(this).attr('data-index');
                $('.choice').removeAttr('style').off('mouseout mouseover');
                $(this).css({'border-color':'#222','font-weight':700,'background-color':'#c1c1c1'});
                if(submt){
                    submt=false;
                    $('#submitbutton').css({'color':'#000'}).on('click', function(){
                        $('.choice').off('click');
                        $(this).off('click');
                        processQuestion(picked);
                    });
                }
            })
        }
        

        function endQuiz(){
            $('#explanation').empty();
            $('#question').empty();
            $('#choice-block').empty();
            $('#submitbutton').remove();
            $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
            $(document.createElement('h2')).css({'text-align':'center', 'font-size':'4em'}).text(Math.round(score/quiz.length * 100) + '%').insertAfter('#question');
        }

        function init(){
 
            if(typeof quiztitle !== "undefined" && $.type(quiztitle) === "string"){
                $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
            } else {
                $(document.createElement('h1')).text("Quiz").appendTo('#frame');
            }

            //add pager and questions
            if(typeof quiz !== "undefined" && $.type(quiz) === "array"){
                //add pager
                $(document.createElement('p')).addClass('pager').attr('id','pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
                //add first question
                $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
                //add image if present
                if(quiz[0].hasOwnProperty('image') && quiz[0]['image'] != ""){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
                }
                $(document.createElement('p')).addClass('explanation').attr('id','explanation').html('&nbsp;').appendTo('#frame');
            
                //questions holder
                $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
            
                //add choices
                addChoices(quiz[0]['choices']);
            
                //add submit button
                $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({'font-weight':700,'color':'#222','padding':'30px 0'}).appendTo('#frame');
            
                setupButtons();
            }
        }
        
        init();
    });
	function myFunction() {
		document.getElementById("demo").style.fontSize='35px';
		document.getElementById("demo").style.color = "#ffcc00";
	}
	function Functie1(){
		document.getElementById("schimbastil").style.fontSize='25px';
		document.getElementById("schimbastil").style.color = "red";

	}
	
	function isKeyPressed(event) {
    var text = "Ctrl key NU a fost apasat!";
    if (event.ctrlKey == 1) {
        text = "Ctrl key a fost apasat cu succes!";
    }
    document.getElementById("demo11").innerHTML = text;
}
var myVar = setInterval(function(){ myTimer() }, 1000);

function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("data").innerHTML = t;
}

var variabila;

function Functie() {
   variabila = setTimeout(alertFunc, 3000);
}

function alertFunc() {
  alert("It works !");
}