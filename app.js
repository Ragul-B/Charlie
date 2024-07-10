const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

let voices = [];

/**
 * Speak out the given text using the selected voice.
 * @param {string} text - The text to be spoken.
 */
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.voice = voices.find(voice => voice.name === 'Google UK English Male') || voices[0];
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

/**
 * Wish the user based on the current time.
 */
function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

/**
 * Load available voices and set a default voice.
 */
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        const selectedVoice = voices.find(voice => voice.name === 'Google UK English Male') || voices[0];
    }
}

window.speechSynthesis.onvoiceschanged = loadVoices;

window.addEventListener('load', () => {
    console.log("Window loaded. Initializing Charlie...");
    speak("Initializing Charlie...");
    wishMe();
    loadVoices();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

/**
 * Handles the command given by the user.
 * @param {string} message - The command message.
 */
function takeCommand(message) {
    if (message.includes('hello') || message.includes('hi')) {
        speak("Hello! How can I assist you today?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("what is") || message.includes("who is") || message.includes("what are")) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('thank you')) {
        speak("You're welcome!");
    } else if (message.includes('bye')) {
        speak("Goodbye! Have a great day!");
    } else if (message.includes('weather')) {
        window.open("https://weather.com", "_blank");
        speak("Checking the weather...");
    } else if (message.includes('news')) {
        window.open("https://www.polimernews.com/", "_blank");
        speak("Fetching the latest news...");
    } else if (message.includes('joke')) {
        tellJoke();
    } else if (message.includes('calendar')) {
        window.open("https://calendar.google.com", "_blank");
        speak("Opening your calendar...");
    } else if (message.includes('email')) {
        window.open("https://mail.google.com", "_blank");
        speak("Opening Gmail...");
    } else if (message.includes('music')) {
        window.open("https://music.youtube.com", "_blank");
        speak("Playing some music...");
    } else if (message.includes('map')) {
        window.open("https://maps.google.com", "_blank");
        speak("Opening Google Maps...");
    } else if (message.includes('reminder')) {
        speak("What would you like me to remind you about?");
    } else if (message.includes('alarm')) {
        speak("Setting an alarm...");
    } else if (message.includes('call')) {
        speak("Who would you like to call?");
    } else if (message.includes('message')) {
        speak("What message would you like to send?");
    } else if (message.includes('translate')) {
        window.open("https://translate.google.com", "_blank");
        speak("Opening Google Translate...");
    } else if (message.includes('calculator')) {
        window.open("Calculator://", "_blank");
        speak("Opening Calculator...");
    } else if (message.includes('note')) {
        speak("What note would you like to make?");
    } else if (message.includes('photo')) {
        window.open("https://photos.google.com", "_blank");
        speak("Opening Google Photos...");
    } else if (message.includes('restaurant')) {
        window.open("https://www.yelp.com", "_blank");
        speak("Looking for restaurants nearby...");
    } else if (message.includes('movie')) {
        window.open("https://www.netflix.com", "_blank");
        speak("Opening Netflix...");
    } else if (message.includes('game')) {
        speak("Which game would you like to play?");
    } else if (message.includes('shopping')) {
        window.open("https://www.amazon.com", "_blank");
        speak("Opening Amazon...");
    } else if (message.includes('travel')) {
        window.open("https://www.expedia.com", "_blank");
        speak("Finding travel deals...");
    } else if (message.includes('how are you')) {
        speak("I'm just a bunch of code, but I'm here to help you!");
    } else if (message.includes('good night')) {
        speak("Good night! Sleep well!");
    } else if (message.includes('good morning')) {
        speak("Good morning! How can I assist you today?");
    } else if (message.includes('set a timer for')) {
        const time = message.match(/\d+/)[0];
        speak(`Setting a timer for ${time} minutes`);
    } else if (message.includes('remind me to')) {
        const reminder = message.split('remind me to')[1].trim();
        speak(`I will remind you to ${reminder}`);
    } else if (message.includes('send an email to')) {
        const email = message.split('send an email to')[1].trim();
        speak(`What should the email to ${email} say?`);
    } else if (message.includes('tell me a story')) {
        speak("Once upon a time, in a land far, far away...");
    } else if (message.includes('tell me a fact')) {
        speak("Did you know that honey never spoils?");
    } else if (message.includes('what can you do')) {
        speak("I can help you with various tasks like setting reminders, opening websites, and more!");
    } else if (message.includes('sing a song')) {
        speak("I would love to sing, but my singing voice is not quite ready yet!");
    } else if (message.includes('open whatsapp')) {
        window.open("https://web.whatsapp.com", "_blank");
        speak("Opening WhatsApp...");
    } else if (message.includes('order food')) {
        window.open("https://www.ubereats.com", "_blank");
        speak("Opening Uber Eats...");
    } else if (message.includes('book a cab')) {
        window.open("https://www.uber.com", "_blank");
        speak("Booking a cab...");
    } else if (message.includes('open facebook')) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('play a video')) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram...");
    } else if  (message.includes('who are you')) {
        speak("I am Charlie, your virtual assistant, anything else sir");
    } else if  (message.includes('Good Morning')) {
        speak("Good Morning Sir,Have a Nice Day");
    } else if  (message.includes('Good Afternoon')) {
        speak("Good Afternoon Sir,Have you had a bite to eat for lunch?");
    }  else if  (message.includes('Good Evening')) {
        speak("Good Evening Sir,How may I help You");
    }  else if  (message.includes('mail')) {
        window.open("https://mail.google.com/mail", "_blank");
    }
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("I found some information for " + message + " on Google");
    }
}

/**
 * Function to tell a random joke.
 */
function tellJoke() {
    const jokes = [
        "Why don’t scientists trust atoms? Because they make up everything!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "Why don't skeletons fight each other? They don't have the guts.",
        "What do you get when you cross a snowman and a vampire? Frostbite.",
        "Why did the bicycle fall over? Because it was two-tired!",
        "What did one wall say to the other wall? I'll meet you at the corner.",
        "Why don't some couples go to the gym? Because some relationships don't work out.",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "What do you call fake spaghetti? An impasta.",
        "What did the grape do when he got stepped on? Nothing but let out a little wine.",
        "Why don't programmers like nature? It has too many bugs.",
        "Why do cows have hooves instead of feet? Because they lactose.",
        "How does a penguin build its house? Igloos it together.",
        "Why did the math book look sad? Because it had too many problems.",
        "Why are elevator jokes so classic and good? They work on many levels.",
        "What do you call cheese that isn't yours? Nacho cheese.",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
        "Why can't you give Elsa a balloon? Because she will let it go.",
        "What do you call a bear with no teeth? A gummy bear.",
        "Why was the stadium so cool? It was filled with fans."
    ];
    const randomIndex = Math.floor(Math.random() * jokes.length);
    speak(jokes[randomIndex]);
}
