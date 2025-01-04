import { Container } from 'inversify';
import { PostService } from './service';
import { TYPES } from './constants';

const container = new Container();

container.bind<PostService>(TYPES.PostService).to(PostService);

export default container;
