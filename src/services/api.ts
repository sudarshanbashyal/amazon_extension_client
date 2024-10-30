//@ts-ignore
import request, { gql } from 'graphql-request';
import { LoginDto } from '../components/login-modal';
import { RegisterDto } from '../components/register-modal';
import { SaveProductDto } from '../components/save-product-modal';
import { createUserMutation, loginQuery, pingQuery, saveProductMutation } from './graphql';

export const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

export const pingServer = () => request(GRAPHQL_ENDPOINT, pingQuery);

export const createUser = async (queryVariables: RegisterDto) => {
	try {
		return await request(GRAPHQL_ENDPOINT, createUserMutation, queryVariables);
	} catch (error) {
		throw error;
	}
};

export const login = async (queryVariables: LoginDto) => {
	try {
		return await request(GRAPHQL_ENDPOINT, loginQuery, queryVariables);
	} catch (error) {
		throw error;
	}
};

export const saveProduct = async (queryVariables: SaveProductDto, headers: Object) => {
	try {
		return await request(GRAPHQL_ENDPOINT, saveProductMutation, queryVariables, headers);
	} catch (error) {
		throw error;
	}
};
