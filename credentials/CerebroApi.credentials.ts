import type { ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

/** Connection to Cerebro: the API gateway base URL and an API key. */
export class CerebroApi implements ICredentialType {
	name = 'cerebroApi';

	displayName = 'Cerebro API';

	icon = 'file:cerebroApi.svg' as const;

	documentationUrl =
		'https://github.com/agentstackai/n8n-nodes-hitl-stack-agent?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			required: true,
			// No default on purpose: the endpoint must be chosen explicitly so review
			// data and the API key are never sent to an unintended environment.
			default: '',
			placeholder: 'https://your-cerebro-gateway.example.com',
			description:
				'Root URL of your Cerebro API gateway',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			placeholder: 'Your Cerebro API key',
			description:
				'Your Cerebro API key',
		},
	];

	// Authenticating with the key doubles as the credential test.
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.baseUrl.replace(/\\/+$/, "") }}',
			url: '/config/v1/auth/api-keys/token',
			method: 'POST',
			body: { api_key: '={{ $credentials.apiKey }}' },
			headers: { 'content-type': 'application/json' },
		},
	};
}
