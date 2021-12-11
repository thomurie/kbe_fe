#Knobby Bike Exchange Front-End

1. ##Purpose, motivation and description:
   Knobby Bike Exchange Front-End (KBEFE) is the front-end portion of the Knobby Bike Exchange web application. Knobby Bike Exchange was created to revolutionize the online marketplace for high-end used mountain bikes. Other online marketplaces make used bikes look unappealing. KBE was developed to make the buying and selling process for used mountain bikes clean, efficient, and fast.

KBEFE was developed specifically with this purpose in mind. An online used mountain bike exchange website should make your bike look as awesome as it is on the trail. A large focus was placed on creating an efficient, easy to use website to help people buy and sell used mountain bikes. KBE requires more data on used bikes than any other used bike website. This additional data allows users to know exactly what they are getting. This additional buyers confidence leads to more conversions for sellers than any other online mountain bike exchange platform.

Features and capabilities of KBEFE are broken into 2 different categories: guests, users.

Guests are able to look through existing inventory. They are able to search through existing inventory to find exactly the make and model of bike that they are looking for. Additionally we added features to be able to share bikes with your friends. Additional Guest user features are currently under development. Future features aim to enhance user experience.

These guests have the ability to create a profile. Authenticated users have access to exclusive member-only features. Users are able to view additional data on bikes and other users. Users are able to view other user's contact information. Additionally authenticated users are able to favorite their favorite listings. These favorited listings can easily be viewed in the user's profile page. Favorites can easily be shared with others. Additionally if your dream bike changes, favorites can be removed. In addition to adding favorites, signed in users are able to add their own listings. Creating a bike on KBE allows a user to quickly provide descriptive details about their awesome bikes so that others can find what they're looking for. Photos can be added to these posts to increase the likelihood of these posts being viewed and eventually sold. Bikes created by the signed in user can easily be updated with new or additional information. Photos can additionally be added or removed depending on the user's preference. And when the listed bike is sold these bikes and their related photos can easily be removed. Additional Authenticated user features are currently under development. Future features aim to enhance user experience.

2. ##Data model:
   See Knobby Bike Exchange Back-End Documentation for additional information.

3. ##Front-end: You should be able to specify how the front-end is structured with a framework. For example, you may discuss the component hierarchy and why their design works in a certain way. Some examples of questions you may be asked are:

   KBEFE is built using React, Chakra, and the Apollo Client.

Structure:
KBEFE components are separated into 4 categories, Components, Helpers, Hooks, and Pages.

1. Components are parts of the application that provide data for the pages components, pages display different data depending on if the user accessing these pages are authenticated or unauthenticated. Due to this difference in data displayed, application components rendered change. Components make it easy to update and change data displayed to the user.
2. Helper functions are there to separate helper functions from the components, and pages. This separates logic and reduces bulk on each component.
3. Hooks are custom hooks created to separate logic and make the components that use them faster and easier to use.
4. Pages are the actual pages shown to the users. These pages combine hooks, helpers, and multiple components to create an interactive user experience and easy to use user interface.

Authentication:
Authentication on KBEFE is built using the cache in Apollo client, as the application and different pages are loaded a token is pulled from the browser and passed to the KBEBE where the token is authenticated and data is returned. If the token is valid user data is passed back, the token is renewed and stored in the browser for future access requests.

4. ##Testing:
   Testing on the KBEFE consists of several different types of testing. 95% of data displayed on the front end relies on the back-end being operational. Coincidentally a working back-end isn't worth much if the front-end cannot access the data. Because of this focus a large emphasis was placed on End-to-End testing for the entire application. CRUD functionality for users, bikes, and photos is tested end-to-end. Authentication plays a large role in permission differences between guest and authorized users. Authorized users should have access to public data, their assets, and additional features.Public users should have access to only publically available data. Due to this difference in permissions additional tests were implemented to test these differences in permissions in order to ensure that secure data is secure and that public data is public. In addition to these end-to-end tests that make up a majority of testing of KBEFE individual components are tested with simple unit tests.

5. ##Deployment:
   This Application has two separately deployed parts, the front-end and back-end. The back-end was deployed using heroku. The front-end was deployed using Surge.
   Heroku provides a number of additional features that make it ideal for hosting the back-end of this project. The objective achieved in the Knobby Bike Exchange Back-End (KBEBE) was scalability and performance. (See the KBEBE README for further details). Given these requirements Heroku provides an ideal environment where developers can deploy a scalable application. Surge was used for the front-end given its extreme ease in building and deploying React projects. Implementation and deployment of future features and performance enhancements can easily be implemented without requiring any rigorous changes to existing production builds.
