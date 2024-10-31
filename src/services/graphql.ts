//@ts-ignore
import { gql } from 'graphql-request';

export const pingQuery = gql`
	query {
		ping
	}
`;

export const createUserMutation = gql`
	mutation CreateUser($name: String!, $email: String!, $password: String!) {
		createUser(input: { name: $name, email: $email, password: $password }) {
			_id
			name
			email
		}
	}
`;

export const loginQuery = gql`
	query login($email: String!, $password: String!) {
		login(input: { email: $email, password: $password })
	}
`;

export const saveProductMutation = gql`
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
`;

export const getProductsByUserQuery = gql`
	query getProductsByUser {
		getProductsByUser {
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
`;
