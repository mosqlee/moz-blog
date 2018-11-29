class Meta {
    views:number;
    linkes:number;
    comments:number;
}
export class Blog {
    title: string
    intro: string
    img: string
    createAt: number
    // 状态 1 发布 2 草稿
    state: number
    // 文章公开状态 1 公开 2 私密
    publish: number
    updateAt: number
    category: string
    detail: string
    tag:string
    meta:Meta
}

