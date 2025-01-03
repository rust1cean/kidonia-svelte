import { Container } from 'inversify';
import { postContainer } from './post';

const dataContainer = new Container();

Container.merge(dataContainer, postContainer);

export { dataContainer };
