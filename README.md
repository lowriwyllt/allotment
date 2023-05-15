# Allotment

The motivation behind this app was many people would like to grow their own vegtables but don't know where to start so by bringing the resources together we hope to make it easier for people to start.  Our app lets you grow virtual vegtables along side the ones in your allotment and gives you a list of tasks to keep your plants happy.

This was my final project at Northcoders (05/2023).  This was made by my team [Peter Matthews](https://github.com/PeterM24), [Lily Levin](https://github.com/LpgLevin), [Connor Smith](https://github.com/connorwriter), [Ryan Karakoc](https://github.com/RyanKarakoc) and [Ross Hamilton](https://github.com/HamRoss).

## Installation
This will require you to have an emulator on your computer / laptop such as [Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/), [Xcode](https://docs.expo.dev/workflow/ios-simulator/) or alternatively download Expo Go from [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) or [App Store](https://itunes.apple.com/app/apple-store/id982107779).
To install this app locally :
1. Move to the directory where you would like this repository locally.
2. Clone this repo to your computer / laptop using the command :
```
git clone https://github.com/lowriwyllt/allotment.git
```
3. Run `npm install` to download all the dependencies.
4. Run `npm start`
5. Then follow the instructions in the terminal to get the app running on your emulator or phone

## Our App
Our allotment app is an app that allows you to add which vegtables you have growing in your allotment onto a virtual allotment.  You will have to give the date you planted the vegtables, then the app will automatically generate task for you to complete such as watering and harvesting.

### Plants
There is a plants page where you can click on a plant to take you to the single plant page for that specific plant.  Here you will see more details about the plant such as how often they need to be watered, how much sunlight they require and minimum temperature they prefer.  Also, on this page is a calendar showing the sowing window and the harvesting window.  From this page you can add the plant to your virtual allotment, or remove them if you have already added them to your virtual allotment.

<div>
  <img src="assets/PlantPage.jpg" alt="Screenshot of Single Plant page for Cabbage in the allotment app" width= "300"/>
<img src="assets/AddPlant.jpg" alt="Screenshot of Single Plant page for Cucumber in the allotment app, while adding a plant to the allotment with the modal open" width= "300"/>
</div>
  
### My Virtual Allotment
My allotment is the first page you get to when logged in / registered, this page shows the plants you have growing in your virtual allotment and the tasks you need to complete today to keep your plants happy.  You can click on any of the plants in your allotment to take you to the single plant page for that plant to see all their details.  You can also tick tasks you have completed from this page as well as see tasks from future days by clicking "load more..."

<div>

<img src="assets/Allotment.jpg" alt="Screenshot of My Allotment page in the allotment app" width= "300"/>
  <img src="assets/MoreTasks.jpg" alt="Screenshot of My Allotment page in the allotment app, with more tasks been loaded and a task being ticked off" width= "300"/>
</div>

### Account
When you register you should register with an email, name, avatar of your choosing and a password.  These can all be changed from within the app on the "Edit Account" from within the "Account" screen.
<div>
<img src="assets/Login.jpg" alt="Screenshot of Login page in the allotment app" width= "300"/>
<img src="assets/Account.jpg" alt="Screenshot of Account page in the allotment app" width= "300"/>
  <img src="assets/EditAccount.jpg" alt="Screenshot of Edit Account page in the allotment app" width= "300"/>
</div>

## Technologies
### Planning and originisation
We used these to keep our code and tasks organised :
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain-wordmark.svg" alt="trello devicon" width="50"/>   
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg" alt="git devicon" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg" alt="github devicon" width="50" />
</div>

### Programming
This the tech stack we used to build our app :
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="typescript devicon" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" alt="visiual studio code devicon" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" alt="react devicon" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain-wordmark.svg" alt="firebase devicon" width="50" />
</div>

  ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
