# Together-Tune
## Welcome to Togeth Tune an interactive music website, that lets you talk to friends and listen to music at the same time!

**Understanding the code base**
* The first thing a listner will encounter on Togegher Tune is a prompt to sign-in with Spotify. We use Spotify's 
authentification tokens to request profile information from Spotify's API and either create or find a user in our mongo database
* Once a user is logged in they will be presented with all of thier playlist. As soon as the home page is loaded Together
Tune makes a call to spotify (with our user temporary acccess token which we have securely stored in our server)
to request the listener's playlist. 
* If a user wants to play one of the playlist presented on the screen a number of conditions must be met. The listener must have a spotify premium account, the application must be currently open and running signed in device. With these 
conditions met Together Tunes is able to send a PUT request to ask Spotify to start a playback state of a user's device with a specific song.
* The other feature a user is presnted with is an chatroom. Messages are saved to individual users. To start a chat a user must enter their friend's spotify username which allows Together Tune to pull messages in the database with the 
requested username.

**Getting Started & Development Setup**
*  Together Tune was built using Node 14
*  Create a spotify developer account
*  Create a spotify applicaiton through spotify
*  Add users to users and access 
*  Create an .env file
*  add client ID and client secret to XXX folders
*  npm install inside of Together-Tune directory
*  npm start in one terminal
*  npm run build:client in another terminal
*  start mongo db locally or external server instance
*  open up localhost 3000
*  Spotify must be opened on logged in users device
*  BUG Spotify sometimes must be currently playing for the first pause to work
*  good luck ;)

Example .env file
* host = (The deployed server address)
* PORT = (The local port from where you will be running Together Tunes)
* clientID = (Your Spotfy clientID provided by Spotify)
* clientSecret = (Your Spotify ClientSecret also provided by Spotify)




![This is an image](/readme-images/pic1.png)
![This is an image](/readme-images/pic2.png)
