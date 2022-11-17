var answers = [];

// Data response
async function getJsonAnswers (answersRes) {
    answers = await answersRes;
    initChat();
}

function initChat() {
    $('#message').keydown(function(e) {
        if($('#botStatus').hasClass('botTyping')) {
            $('#message').val('');
            $('#message').attr('disabled', 'disabled');
            return;
        }
        if(e.key === 'Enter') {
            getUserMessage();
        }
    });
    $('#sendMessage').click(() => {
        getUserMessage();
    });
    
    const getUserMessage = () => {
        const userInput = $('#message').val();
        if(userInput.trim() != '') {
            renderUserMessage(userInput);
        }
    };
    
    const renderUserMessage = (message) => {
        // Rendering user message
        const userMessageElem = document.createElement('div');
        const userNode = document.createTextNode(message);
        userMessageElem.classList.add('user_message');
        userMessageElem.append(userNode);
        $('.chat_field').append(userMessageElem);
    
        // Get answer from db
        const answer = answers.find(ans => ans.message == message);
        if(answer != null) {
            renderBotAnswer(answer.answer);
        }
        else {
            renderBotAnswer(null);
        }
    };
    
    // Rendering bot answer
    function renderBotAnswer(botAnswer) {  
        $('#botStatus').removeClass('whistBot');
        $('#botStatus').addClass('botTyping');
        $('#message').val('');
        setTimeout(() => {
            renderAnswer();
        }, 1000);
        function renderAnswer() {
            $('#botStatus').removeClass('botTyping');
            $('#botStatus').addClass('whistBot');
            $('#message').removeAttr('disabled');
            $('#message').focus();
    
            let botNode = '';
            const botMessageElem = document.createElement('div');
            if(botAnswer != null && botAnswer != '') {
                botNode = document.createTextNode(botAnswer);
            } 
            else {
                botNode = document.createTextNode("I'm just robot, genius...");
            }
            botMessageElem.classList.add('bot_message');
            botMessageElem.style = 'white-space: pre';
            botMessageElem.append(botNode);
            $('.chat_field').append(botMessageElem);
            setTimeout(() => {
                if(botAnswer == 'bye ty'){
                    $('.assistant_chat').fadeOut();
                }
            }, 300);
            document.querySelector('.chat_field').scrollTop = document.querySelector('.chat_field').scrollHeight;
        }
        document.querySelector('.chat_field').scrollTop = document.querySelector('.chat_field').scrollHeight;
    }
}