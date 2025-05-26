# Safe Web Project

## About the Project

This project is about helping people learn how to stay safe online. It's a simple and interactive web app where users can watch educational videos, share their own experiences, and explore content on safe internet usage.

The goal is to make learning about internet safety easy and accessible. Everything is designed to be clean, mobile-friendly, and easy to use, so users of all ages can benefit.

The app also includes a login system, letting users access their own profile and save things like filtered videos or discussion posts. Logged-in users can join conversations, change profile info, and come back to see their saved filters and experiences stored in the session.

## Application Features

- **Single Page Routing** - Using hash changes (no page refreshes).
- **Mobile Responsive Design** - Works great on any screen.
- **Filterable Videos** - On the _"Информирај се"_ page, videos can be filtered by categories. The selected filters are saved in the session, ensuring they persist even after page refreshes or logging in and out. Clicking on the card displays a modal that displays comments for that video. If the user is not logged in, the comment input field leads to the login page _"Најави се"_.
- **Discussion Board** - Only logged in users can add their experiences to the _"Дискусии"_ page. The posts include the username, date, and time of submission. These posts are stored in session and will persist after refreshing the page. The `+ Види повеќе` button shows older discussions.
- **Contact page** - We have information about professional help and non-governmental organizations.
- **Login System** - The user accesses the login page by clicking the `Најави се` button. The user logs in by sending a POST request to http://localhost:5000/api/authentication with the username and password. If the credentials are valid, the user’s session is created, and they can access protected page _"Профил"_. After logging in, a welcome modal appears with a link that redirects the user to the _"Сè што треба да знаеш"_ page.
- **Profile Editing** - Users can update their personal information in _"Профил"_ page and these updates are saved in session, and the changes persist after refresh or logout/login. On this page we have logout button `Одјави се`.
- **Playable Videos** - All hover images that have a play button can be played as a video that shows a button to stop it and return to the image

## Login Credentials

To test the authentication system, you can use any of the following predefined username and password combinations:

| Username | Password |
| -------- | -------- |
| User123  | Pass123  |
| User456  | Pass456  |
| User789  | Pass789  |

## Technologies Used

- ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
- Flask (Python) for the REST API
- Session Storage for persistent user data

## Getting Started

### Prerequisites

To set up the project, follow these steps:

1. **Install Python**: If you don't have Python installed, you can download it from [here](https://www.python.org/downloads/release/python-3123/). Choose the [Windows installer (64-bit)](https://www.python.org/ftp/python/3.12.3/python-3.12.3-amd64.exe) if you're running Windows. The version which was used for developing the application is 3.12.3.

2. **Install Flask**: After installing Python, open a terminal and run:

   ```bash
   pip install flask
   pip install flask_cors
   ```

3. **Download REST API:** After installing Python, you should download the [REST
   API](https://drive.google.com/file/d/1f7ogsElPFmA0k4aMGy5NTq2IMB8cvOwx/view?usp=sharing) locally and then run it by using the following CLI command in the directory where the
   extracted REST API directory is located:

   ```bash
   python '.\REST API\authenticator.py'
   ```

   You should see a message confirming the API is running.

   ## Author

   **Marija Angjelevska**
