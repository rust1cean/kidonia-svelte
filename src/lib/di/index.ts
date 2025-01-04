import { Container } from 'inversify';
import postContainer from './post-container';

const container = new Container();

Container.merge(container, postContainer);

export default container;
