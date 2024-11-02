//@ts-ignore
import request, { gql } from 'graphql-request'; // no type defs provided by npm
import { LoginDto } from '../components/login-modal';
import { PaginationVaribles } from '../components/products.modal';
import { RegisterDto } from '../components/register-modal';
import { SaveProductDto } from '../components/save-product-modal';
import { config } from '../config';
import { createUserMutation, getProductsByUserQuery, loginQuery, pingQuery, saveProductMutation } from './graphql';

export const pingServer = () => request(config.GRAPHQL_ENDPOINT, pingQuery);

export const createUser = async (queryVariables: RegisterDto) => {
	try {
		return await request(config.GRAPHQL_ENDPOINT, createUserMutation, queryVariables);
	} catch (error) {
		throw error;
	}
};

export const login = async (queryVariables: LoginDto) => {
	try {
		return await request(config.GRAPHQL_ENDPOINT, loginQuery, queryVariables);
	} catch (error) {
		throw error;
	}
};

export const saveProduct = async (queryVariables: SaveProductDto, headers: Object) => {
	try {
		return await request(config.GRAPHQL_ENDPOINT, saveProductMutation, queryVariables, headers);
	} catch (error) {
		throw error;
	}
};

export const getProductsByUser = async (queryVariables: PaginationVaribles, headers: Object) => {
	try {
		return await request(config.GRAPHQL_ENDPOINT, getProductsByUserQuery, queryVariables, headers);
	} catch (error) {
		throw error;
	}
};
