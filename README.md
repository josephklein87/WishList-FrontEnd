# WSHLST
### A wishlist app created by Joe Klein, Logan Beckham, Angel Vasquez and Samuel Han

## GOALS
Our goal in creating this app was to make a system where users can post gift ideas for themselves, see the gift ideas of others, and add their friends to easily access each other wishlists.

## FEATURES

### FULL CRUD
Users can post their gifts, edit their own posts, delete their own posts, and view the full list of posts. Additionally any user can mark an item as puchased if they buy it for their friend. 

### USER ACCOUNT CREATION AND AUTH
Users can create accounts and their passwords are encrypted using bcrypt. When users login, they are sent to their home page which is a view of all the gifts they have submitted for themselves.

### SEARCH
Users can search for other user's pages using a search bar as well as the full gift list by tags or title. Currently the gift search is partial match, while the user search needs to be exact match. The same search bar is used for both, and the search option can be changed by dropdown menu which shows a selection of either gifts or users. This was accomplished using the filter method on the front-end to filter the array of gifts or users by the search parameters.

### FRIENDS LIST
Using a Django users can add the account information of their friends to a relational database which makes it easier to find your friends pages later. 

### REACT
Front end is designed as a single page site with assets loaded dynamically using state. The information presented by each section is separated by component and either displayed or hidden with ternary statements.