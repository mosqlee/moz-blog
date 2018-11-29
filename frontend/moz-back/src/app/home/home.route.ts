import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';

export const homeRoute = [
    {
        path: '',
        component: HomeComponent,
        children : [
            { path: 'blogList', component: BlogComponent},
            { path: 'blogDetail/:id', component: BlogDetailComponent },
            {path: 'blogDetail', component: BlogDetailComponent}
        ]
    },
];
