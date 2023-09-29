let toggleBtn = document.getElementById('toggle-btn');
let toggleText = document.getElementById('toggle-text');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   toggleText.textContent = 'Light'; // Change the label text to "Light"
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
   const bodyCard = document.querySelector('.body-card');
   bodyCard.style.backgroundColor = '#1E2A47';
   const infoCard = document.querySelector('.info');
   infoCard.style.backgroundColor = '#141D2F';
   const searchCard = document.querySelector('.search');
   searchCard.style.backgroundColor = '#141D2F';
}


const disableDarkMode = () => {
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   toggleText.textContent = 'Dark'; // Change the label text back to "Dark"
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
   const bodyCard = document.querySelector('.body-card');
   bodyCard.style.backgroundColor = 'white';
   const infoCard = document.querySelector('.info');
   infoCard.style.backgroundColor = 'white';
   const searchCard = document.querySelector('.search');
   searchCard.style.backgroundColor = 'white';
}


if (darkMode === 'enabled') {
   enableDarkMode();
}

toggleBtn.onclick = (e) => {
   darkMode = localStorage.getItem('dark-mode');
   if (darkMode === 'disabled') {
      enableDarkMode();
   } else {
      disableDarkMode();
   }
}

function fetchGitHubUserData(username) {
   // Reset error message
   const errorMessage = document.getElementById('error-message');
   errorMessage.textContent = '';

   // Define the GitHub API URL
   const apiUrl = `https://api.github.com/users/${username}`;

   // Make a GET request to the GitHub API
   fetch(apiUrl)
       .then(response => {
           if (!response.ok) {
               // Display error message if user is not found
               errorMessage.textContent = 'User not found';
               throw new Error(`GitHub API request failed with status ${response.status}`);
           }
           return response.json();
       })
       .then(data => {
           // Update the user card with the fetched data
           const userCard = document.querySelector('.body-card');
           userCard.querySelector('h1').textContent = data.login;
           userCard.querySelector('p').textContent = `@${data.login}`;
           userCard.querySelector('.date').textContent = `Joined ${new Date(data.created_at).toLocaleDateString()}`;
           userCard.querySelector('.date1').textContent = `Joined ${new Date(data.created_at).toLocaleDateString()}`;
           userCard.querySelector('.para p').textContent = data.bio || 'No bio yet....';

           // Update the statistics
           const statistics = userCard.querySelectorAll('.box1 span');
           statistics[0].textContent = data.public_repos;
           statistics[1].textContent = data.followers;
           statistics[2].textContent = data.following;

           // Update the social links
           const socialLinks = userCard.querySelectorAll('.social p  ');
           socialLinks[0].textContent = data.location || 'Location Unavailable';
           socialLinks[1].textContent = data.twitter_username ? `@${data.twitter_username}` : 'Not Available';
           socialLinks[2].textContent= data.repos_url || 'Not Available';
           socialLinks[3].textContent = data.company || 'Not Available';
       })
       .catch(error => {
           // Handle any errors that occur during the request
           console.error(error);
       });
}

// Handle the form submission
const githubForm = document.getElementById('github-form');
githubForm.addEventListener('submit', function (e) {
   e.preventDefault(); // Prevent the form from submitting traditionally

   const usernameInput = document.getElementById('username-input');
   const username = usernameInput.value.trim();

   // Call the function to fetch and display GitHub user data
   fetchGitHubUserData(username);
});