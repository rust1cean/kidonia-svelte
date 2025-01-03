import { Container } from 'inversify';
import { API_POST_TYPES } from './constants';
import { PostApi, type PostProvider } from './post-api';

const container = new Container();

container.bind<PostProvider>(API_POST_TYPES.PostProvider).to(PostApi);

export default container;
