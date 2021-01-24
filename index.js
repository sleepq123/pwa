const images = ['fox1', 'fox2', 'fox3', 'fox4'];
const imgElem = document.querySelector('img');

function randomValueFromArray(array) {
  const randomNo = Math.floor(Math.random() * array.length);
  return array[randomNo];
}

setInterval(() => {
  const randomChoice = randomValueFromArray(images);
  imgElem.src = `images/${randomChoice}.jpg`;
}, 2000);

// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/pwa/sw.js')
    .then(() => { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});

// 授权
var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            randomNotification();
        }
    });
});

let games = [
  {
    name: 'Jack',
    slug: 'fox1'
  },
  {
    name: 'Tom',
    slug: 'fox2'
  },
  {
    name: 'Alice',
    slug: 'fox3'
  },
  {
    name: 'TieZhu',
    slug: 'fox4'
  }
]

// 模拟通知
function randomNotification() {
  var randomItem = Math.floor(Math.random()*games.length);
  var notifTitle = games[randomItem].name;
  var notifBody = 'Created by '+games[randomItem].author+'.';
  var notifImg = 'images/'+games[randomItem].slug+'.jpg';
  var options = {
      body: notifBody,
      icon: notifImg
  }
  var notif = new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}