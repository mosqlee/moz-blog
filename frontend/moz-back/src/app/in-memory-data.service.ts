import { Carousel } from './carousel';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const blogs: Carousel[] = [
            { id: 0, title: 'angular相关笔记，自习自习自习自习',
                img: 'http://dl.bizhi.sogou.com/images/2015/06/26/1214905.jpg', order: 0, onSale: 1, createAt: 1513426971285, 
                updateAt: 1513426971285 },
            {
                id: 1, title: 'angular相关笔记，自习自习自习自习',
                img: 'http://dl.bizhi.sogou.com/images/2015/06/26/1214905.jpg', order: 1, onSale: 1, createAt: 1513426971286, 
                updateAt: 1513426971285
            },
        ];
        return { blogs };
    }
}
