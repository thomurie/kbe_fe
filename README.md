## Knobby Bike Exchange (Front-End)

Live site: http://knobbybe.surge.sh

### Purpose, motivation and description:

Knobby Bike Exchange Front-End (KBEFE) is the front-end portion of the Knobby Bike Exchange (KBE) web application. Knobby Bike Exchange was created with the goal to revolutionize the online marketplace for high-end used mountain bikes. KBE was developed to make the buying and selling process for used mountain bikes clean, efficient, and fast. Other online marketplaces makes used bikes look unappealing. KBE makes used bikes look as awesome as the day they were first bought.

With this goal and objective in mind KBE was born. A large focus was placed on creating an efficient, feature loaded, easy to use website to help people buy and sell used mountain bikes. To accomplish this goal KBE offers users features to refine, favorite, and share new and existing listings. In order to offer these features, KBE requires more data from our sellers than any other used bike website. For users this additional data allows them to know exactly what they are getting. For sellers this additional buyers confidence leads to more conversions than any other online mountain bike exchange platform.

### Data model:

KBE uses a [PostgreSQL](https://www.postgresql.org/) database.

In accordance with the goal to be scalable multiple open source databases were considered. Ultimately PostgreSQL was used given its highly expandable and flexible full text search features. PostgreSQL has a comparatively low reading speed compared to other open source databases but the advantages outweigh this negative.

The advantage of a full text search allows KBE to obtain a wide range of data based on a simple text query from the user. Oftentimes bike names are an assortment of letters and numbers or an uncommonly used word. If a database with strict text searching was used the data retrieved would be incomplete or simply not found leading to a poor user experience. Given the goal to make KBE as easy to use as possible, the flexible full text search allows us to retrieve data that is even remotely close to what the user is looking for.

The advantage of being highly expandable is that the mountainbike industry is a growing industry. The Mountain Bike market in the U.S. is estimated at [11.9 Million Units](https://www.globenewswire.com/news-release/2020/10/16/2109772/28124/en/Global-Mountain-Bike-Industry-2020-to-2027-Market-Trajectory-Analytics.html) in the year 2020. For KBE that means the potential to host millions of listings every year. This amount of data requires that KBE be highly scalable, and expandable necessitating the use of a database like PostgreSQL

See Knobby Bike Exchange Back-End Documentation for additional information.

### API and routing design:

[GraphQL](https://graphql.org/) is used as the query language for this API. GraphQL offers many benefits over REST APIs.

To start with, GraphQL is client driven. The server only has one endpoint. This endpoint is used by the client, in our case [Apollo](https://www.apollographql.com/) Client to retrieve specific data in one call. This single API call decreases load times, decreases code required for formating/destructuring data. Additionally GraphQL is significantly less error prone. Type checking, variable requirements, and requested data are all checked by the client before a call is made to the server. This creates a more dynamic app with better user feedback and user experience.

Because clients have the ability to dictate exactly what they need from the server, they receive that data in a predictable way. This is advantageous because every part of KBE requires different data. If a REST API was used multiple endpoints would need to be created causing multiple calls to the API, increased load times, decreased user experience and increased the amount of code required to sort through the retrieved data.

See Knobby Bike Exchange Back-End Documentation for additional information.

### Front-end:

KBE is built using [React](https://reactjs.org/) a declarative component based library.

React was used for a number of reasons. First in accordance with our goal to be scalable, React is a great library for expanding on existing code because it uses reusable components. Reusable components means less code needs to be written and maintained. while still facilitating the ability to scale. New features can be created and integrated with ease.

React uses components as a key part of the library. Don't Repeat Yourself (DRY) and Single Responsibility Principle (SRP) were used for defining component hierarchy. The application starts with the APP which holds the navbar, routes, and footer. As routes are visited the contents in the app are updated to reflect the corresponding page requested. Based on the page requested different components are called and rendered. Components are broken down into smaller pieces following the principles of SRP. Components are shared across multiple pages following the principles of DRY. When not logical some components are customized to meet the page requirements. These principles are the reason the hierarchy is built to increase readability and reusability. For more information see the [Pages](https://github.com/thomurie/kbe_fe/tree/main/src/pages) folder and the [Components](https://github.com/thomurie/kbe_fe/tree/main/src/components) folder.

Finally, because it is a declarative library, the local state is used in multiple components to control what a user sees and does. State is managed by the highest up component in the component hierarchy with state passed down as a prop to its children. As the user interacts with the site, the state is updated to display current data and views for the user. Additionally, the global state is managed by the Apollo Client. Authenticated users are issued tokens on sign in that allow the user's data to be retrieved and updated whenever a change is detected. These tokens are stored in the browser and are updated based on user interactions.

Additional information on KBE structure:
KBEFE components are separated into 4 Categories, Components, Helpers, Hooks, and Pages.

1. Pages are the actual pages shown to the users. These pages combine hooks, helpers, and multiple components to create an interactive user experience and easy to use user interface. Pages retrieve data from the server and manage state for their children components. See the [Pages](https://github.com/thomurie/kbe_fe/tree/main/src/pages) folder for more details.
2. Components. SRP is used when creating these components. Each component does one thing. This is done to decrease the amount of code written in accordance with the DRY principle. Additionally this is done to improve unit testing. Component state is determined by authentication of the user which is determined based on data obtained from the Server. See the [Components](https://github.com/thomurie/kbe_fe/tree/main/src/components) folder for more details.
3. Helper functions are there to separate more complex logic from the components. This reduces the bulk for each component. This also complies with the DRY and SRP principles as this logic is used by multiple components. See the [Helpers](https://github.com/thomurie/kbe_fe/tree/main/src/helpers) folder for more details.
4. Hooks are custom hooks created to separate logic and make the components that use them faster and easier to use. Given React is a declarative language, custom hooks can be used to create unique interactions. These hooks were created to seperate the logic and state used by the many forms on KBE. Each hook manages the form state, by cleaning the input values, updating the state, and returning the state back to the user. See the [Hooks](https://github.com/thomurie/kbe_fe/tree/main/src/hooks) folder for more details.

### Additional Features:

Features and capabilities of KBEFE are broken into 2 different categories: guests, users.

Guests are able to look through existing inventory. They are able to search through existing inventory to find exactly the make and model of bike that they are looking for. Additionally we added features to be able to share bikes with your friends. Additional Guest user features are currently under development. Future features like filtering bikes by specs and adding more photos to listings are currently under development.

Users rely on authentication. Authentication on KBEFE is built using the cache in Apollo client, as the application and different pages are loaded a token is pulled from the browser and passed to the KBEBE where the token is authenticated and data is returned. If the token is valid user data is passed back, the token is renewed and stored in the browser for future access requests. If the token is expired or missing the user is denied access to the requested resource and redirected to the sign in page. Authenticated users have access to exclusive member-only features. Users are able to view additional data on bikes and other users. Users are able to view other user's contact information. Additionally authenticated users are able to favorite their favorite listings. These favorited listings can easily be viewed in the user's profile page. Favorites can easily be shared with others. Additionally favorites can be removed. Signed in users are able to add their own listings. Creating a bike on KBE allows a user to quickly provide descriptive details about their bikes so that buyers can find what they're looking for. Photos can be added to these posts to increase the likelihood of these posts being viewed and eventually sold. Bikes created by the signed in user can easily be updated with new or additional information. Photos can additionally be added or removed depending on the user's preference. And when the listed bike is sold these bikes and their related photos can easily be removed. Additional Authenticated user features are currently under development. Future features aim to enhance user experience by adding tags to listings, viewing increases or decreases on favorited bikes.

### Styling:

KBE uses [Chakra UI](https://chakra-ui.com/) to style the components. Chakra UI is a simple, modular and accessible component library that strictly follows WAI-ARIA standards for all components. Chakra UI allows KBE to be accessible, efficient, and easy to use. Additional accessibility features and tools are currently under development.

Furthermore the market demands that a website be responsive and usable regardless of the device being used. Lots of effort was put into ensuring that the entire site is responsive to all major screen sizes. This was accomplished by using Chakra UI's built in breakpoints and additional custom breakpoints for small, medium, and large screens.

The use of Chakra coupled with the development of reusable components increases the reusability of styled components which reduces the amount of code. This additionally leads to a more maintainable and scalable code base

### Testing:

Testing on the KBEFE consists of several different types of testing. 95% of data displayed on the front end relies on the back-end being operational. Coincidentally a working back-end isn't worth much if the front-end cannot access the data. Because of this focus a large emphasis was placed on End-to-End testing for the entire application. CRUD functionality for users, bikes, and photos is tested end-to-end. Authentication plays a large role in permission differences between guest and authorized users. Authorized users should have access to public data, their assets, and additional features. Public users should have access to only publically available data. Due to this difference in permissions additional tests were implemented to test these differences in permissions in order to ensure that secure data is secure and that public data is public. Additional components are tested with simple unit tests.

### Deployment:

This Application has two separately deployed parts, the front-end and back-end. The back-end was deployed using Heroku. The front-end was deployed using Surge.
Heroku provides a number of additional features that make it ideal for hosting the back-end of this project. The primary objective achieved in the Knobby Bike Exchange Back-End ([KBEBE](https://github.com/thomurie/kbe)) was scalability and performance. Given these requirements Heroku provides an ideal environment where developers can deploy a scalable application.
The primary objective achieved in the Knobby Bike Exchange Front-End was accessibility, user experience and performance. Surge was used for the front-end given its extreme ease in building and deploying React projects. Implementation and deployment of future features and performance enhancements can easily be implemented without requiring any rigorous changes to existing production builds.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
