export type CreateUserPayload = {
	name: string;
	email: string;
	password: string;
};

export type EditUserPayload = Partial<CreateUserPayload>;
