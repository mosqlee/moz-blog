import { BlogModel } from './home/blog-detail/blog.model';
import { Blog } from './home/blog/blog.model';
import { User } from './model/user.model';
import { Carousel } from './carousel';

import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const blogs: Blog[] = [
            { id: 0, title: 'angular相关笔记，自习自习自习自习',
                img: 'http://dl.bizhi.sogou.com/images/2015/06/26/1214905.jpg', 
                order: 0,
                onSale: 1,
                readNum: 1,
                star: 4,
                type: 1,
                creatTime: 1513426971285,
                updateAt: 1513426971285 },
            {
                id: 1, title: 'angular相关笔记，自习自习自习自习',
                img: 'http://dl.bizhi.sogou.com/images/2015/06/26/1214905.jpg',
                order: 0,
                readNum: 1,
                star: 4,
                onSale: 1,
                type: 2,
                creatTime: 1513426971285,
                updateAt: 1513426971285
            },
        ];
        const login: User[] = [{
            id: 4,
            userName: '13032872266',
            remember: true,
            nickname: 'moz'
        }];
        const blogDetail: BlogModel[] = [
            { id: 0, title: 'angular',
            content: '12313', creatAt: 1513426971285, star: 5, readNum: 110},
            {
                id: 1, title: 'angular',
                content: '12313', creatAt: 1513426971285, star: 5, readNum: 110
            },
        ];
        return { blogs, login, blogDetail };
    }
}
