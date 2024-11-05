# Project Overview
The aim of this project was to create a simple chrome extension to extract products from amazon. The general requirements provided are listed below: 

 - The extension should automatically detect when user lands on amazon product page when enabled.
 - The product title, images, description, prices, and rating should be extracted and saved. 
 - Allow users to make any changes to the extracted data before saving.
 - Allow users to view the saved data. 

**This is the client side (chrome extension) repository. You can also find the backend repository along with setup and other related documentation for this project [here](https://github.com/sudarshanbashyal/amazon_extension_server) where most of the details regarding project architecture, and performance/security considerations are documented** 
# Installation Guidelines
## Prerequisites for installing the client side application:

 - [NodeJS](https://nodejs.org/en/download/package-manager) (Version used for project - 20.11.1)
 - [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Version used for project - 10.2.4)

## Installation Steps

 - Clone the repository using `git@github.com:sudarshanbashyal/amazon_extension_client.git`
 - Navigate into the directory where the project was cloned.
 - Install all the dependencies using `npm i`
 - Open the `src/config.ts` file and change the `config.GRAPHQL_ENDPOINT` variable to match the endpoint of your local backend server.  
 - After all the dependencies have been installed, build the project using `npm run build`
 - Once the project has been built, a `dist` folder should appear in the root directory of the project. 
 - Navigate over to the extensions manager section of your chrome web browser, and upload the `dist` folder with the `Load Unpacked` option.
 - A new extension should appear in the extensions manager after completion of all the aforementioned steps. 

# Extension Details

## Technologies Used

 - [ReactJS](https://react.dev/) - Used for building UI componenst for the extension.
 - [Vite](https://vite.dev/) - This project was scaffolded using vite, as it provides better tooling compared to other build tools. 
 - [TypeScript](https://www.typescriptlang.org/) - Added for better type safety, and error handling. 
 - [GraphQL](https://graphql.org/) - API Query language used for all backend queries. 
 - [React Query](https://tanstack.com/query/v3) - Used for calling backend APIs through GraphQL queries.

## API Docs
All the queries and mutations used for the extension are listed below: 

 1. Create User Mutation
	 This mutation is used to create a new user by taking the name, email, and password provided by the user as inputs.

    	mutation CreateUser($name: String!, $email: String!, $password: String!) {
			createUser(input: { name: $name, email: $email, password: $password }) {
				_id
				name
				email
			}
		}


 2. Login Query
	 This query takes in an email, and a password and returns an access token in case the entered details are correct:

    	mutation CreateUser($name: String!, $email: String!, $password: String!) {
			createUser(input: { name: $name, email: $email, password: $password }) {
				_id
				name
				email
			}
		}

3. Save Product Mutation
	This mutation saves the details of products that has been extracted from the amazon product page. 
	

    	mutation SaveProduct(
			$product_title: String!
			$product_url: String!
			$product_description: String!
			$product_price: String!
			$product_image_urls: [String!]!
			$product_rating: Float!
			) {
				saveProduct(
					input: {
						product_title: $product_title
						product_url: $product_url
						product_description: $product_description
						product_price: $product_price
						product_image_urls: $product_image_urls
						product_rating: $product_rating
					}
				) {
				_id
				product_title
				product_description
				product_price
				product_image_urls
				product_rating
				product_url
				user
			}
		}

4. Get Products Query
	This query returns a list of products that has been previously saved by the user. Pagination has been used in this query which is sent in as an additional query variable, along with an access token sent through the headers to identify the user.

    	query getProductsByUser($page: Int!, $limit: Int!) {
			getProductsByUser(pagination: { page: $page, limit: $limit }) {
				pagination {
					total
					page
					limit
					totalPages
				}
				products {
					_id
					product_title
					product_description
					product_price
					product_image_urls
					product_rating
					product_url
					user
				}
			}
		}

## UI Showcase
Please find the client-side features listed below along with relevant screenshots. You can also find a full video showcasing basic usage [here](https://vimeo.com/1026202412?share=copy).

 - Popup for enabling/disabling the extension
![Popup for Enabling/Disabling the extension](https://lh3.googleusercontent.com/pw/AP1GczMuzx2_uFWZGNtF2Lrt3wcXZ_clu7yrzqqUiO5dbHXsJxRoHzK-TRDuvgmxLsClodtpVWUEzdO13NRIGXK4JLlel9tWpiW_0lM7KR2ipKKNVh7aYInKoaTyeg8tWpRtPFMvbb_1PejGZRYdcBkEOAnv=w817-h413-s-no-gm)

 - Prompt displayed automatically to save the product once the user lands on a product page
	![Save Product Modal](https://lh3.googleusercontent.com/pw/AP1GczMQ5y3cHK5kuySIrjk2l46W6AzbQPoLR-kIEjS4d_584e5DGj_6FFAwA1Duxrg5KrdNXaaf3fxFzw1sKpkWUeeo22ITRGvD7JKd36y-JxSf5TIchMRwZYyqVKMobr6R9QBEOhikhX3KQTrSMeSxuW-G=w2046-h1006-s-no-gm?authuser=3)

 - Login and Register popups
 ![Login Modal](https://lh3.googleusercontent.com/pw/AP1GczPAv92OMo_mtFkG7ryBgqf2Fkv_sjobwBUNq8AP8xSkjDzT0Lg9kILap6FfuPnRY1XFUciDlAGvqN4MnvEW8mCvOsXp6BUTrEApqUpUEFaVWx1TDCsB95VO6EOf7Z8V1qk83E-Iu57YTv1jyD7bZwZi=w2048-h998-s-no-gm?authuser=3)
![Register Modal](https://lh3.googleusercontent.com/pw/AP1GczN63tdPDBGUQzRi2wKyK7SGC_YXWkPi6feBn5aAZsQMAs9Y4IMJIquXMdwH1-WUt5_gP2wVwg1TpXiX7Gw0BrnKh8uIn5kXRTU_NDfSmTNh0ekcaFoSSoIjXaMhXA8y9CNHr3XJprs-bYqYa5J2euCU=w2048-h998-s-no-gm?authuser=3)

 - Sidebar to view saved products (with pagination)
 ![Sidebar no login view](https://lh3.googleusercontent.com/pw/AP1GczMhIZibfD6BtrMpJIp4SfyXgsifTXZhVwMYx1_AJOn22BT4fMNt1-RHxg0kKNrJibavmHIuz_KYNHehwPfLcn0BFbVEUMd9DqfG7wXjqRiuKKmN0cZU76swcRKUgwWoCo4_q2NP0MJK_EYhb5iOgD9W=w2040-h1006-s-no-gm?authuser=3)
![Sidebar with products](https://lh3.googleusercontent.com/pw/AP1GczP41FPScpaK6mUyfNrmgi2no_8lR2OE3wlTXmIQkQMXVJm8rwITSGYV3hzrACBkjjgTJF_J845Hqdq86bFsioZgqweBfjq9pYbRhUCtsMiwncx4Ik_gnzhHzAIUan7Fc5WOqsBWac5HQvHJCeNyzCY0=w2044-h1006-s-no-gm?authuser=3)
![Sidebar with Pagination](https://lh3.googleusercontent.com/pw/AP1GczNEU3o07PPb8mhYnFjnDJ23S7TDRgFXl-np2Pgeeu9hnWq7paYoO7_lNnjg7qMSaQZP_qQRsdmslm63jmyYyt3e07_KJEbYvpFam6Rw5AmuiU-CFo0o7MAfAA6suWfWLlCOOmarwH2ykh9lNJ5Ptdgv=w2040-h1006-s-no-gm?authuser=3)
