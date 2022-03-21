## Weaknesses & tradeoffs

 - When submitting the form for creating a post it will always send all of the fields even if they are not needed
 - Refetching posts using GraphQL when one is created - I feel like this is okay for this size application as a prototype but wouldn't be good for scaling up and with a lot more data
 - In terms of the web scraping - It only works for BBC sites, it would be difficult to cater to every site without just extracting all the content. Also It could be more summarised.
 - The postForm component has quite a lot of code - I usually like to avoid this and tried to refactor as much as possible
 - I decided to put all of the information of a post inside a single post module for this implementation - if the payments were real it would probably be best to have a seperate payment module
 - Could have more error handling & testing
 - Styling could be nicer
