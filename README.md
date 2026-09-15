# Introduction
Welcome to the Query Search Wiki For Music!
Layout of the Files being two javascripts, main html, css folder with the css file
- Javascript 1 config.js: Make use of this as your way to input your personal API key
- Javascript 2 app.js: Main usage for the query, using Pixabay to fetch
- Main HTML index.html: Main website layout
- CSS Folder/CSS File project.css: Re-used CSS layout hence why its named project but it supports the design for the HTML
# Prerequisites
1. Use the same Pixabay account and API key you generated in the previous lab OR a rotated new key.
2. Have your previous repository open as a reference for the exact parameters used in each challenge.
3. Set up SSH for GitHub if you have not already, using your earlier Git and GitHub SSH setup assignment as a reference: https://xavierateneo.instructure.com/courses/5885/assignments/22947. Push your repository using SSH, not HTTPS.
Write a README.md that briefly explains what the project does, how to run it locally, and includes the API key note from the Prerequisites section above.
# Need Help? (Extras)
1. Create a Pixabay account using your Google email account. Signing up is required so you can generate a personal API key 
2. Go to this link https://pixabay.com/service/about/api/ - and go to the bottom page and find the "About" section and click the API  to get your API key (https://pixabay.com/api/docs/)
3. Copy your API key from your Pixabay account page. You will use this key for this website.
## Important: Even with config.js kept out of GitHub, once your site is deployed and your JavaScript calls the Pixabay API directly from the browser, anyone who opens developer tools or views the network request can see your API key. Keeping config.js out of your repository keeps the key out of your GitHub history, which is a real and worthwhile habit, but it does not hide the key from someone using your live site. Mention this tradeoff in your README so it is clear you understand it.
