<template> 
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link class="nav-link"
                :class="{
                  active: tab === 'Your_Feed'
                }"
                exact
                :to="{
                  name:'home',
                  query:{
                    tab:'Your_Feed'
                  }
                }">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                :class="{
                  active: tab === 'Global_Feed'
                }"
                exact
                :to="{
                  name:'home',
                  query:{
                    tab:'Global_Feed'
                  }
                }">Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link class="nav-link"
                :class="{
                  active: tab === 'Tag'
                }"
                exact
                :to="{
                  name:'home',
                  query:{
                    tab:'Tag',
                    tag:tag
                  }
                }">#{{ tag }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link class="author" :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }">
                {{ article.author.username }}
              </nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button 
              class="btn btn-outline-primary btn-sm pull-xs-right"
              :class="{ active: article.favorited}"
              @click="onFavorite(article)"
              :disabled="article.favoriteDisabled"
            >
              <i class="ion-heart"></i>  {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link class="preview-link" :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }">
            <h1>{{ article.title }}</h1>
            <p>{{ article.body }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
        <!-- 分页 -->
        <nav>
          <ul class="pagination">
            <li class="page-item" 
                v-for="item in totalPage" 
                :key = "item"
                :class="{
                  active:item === page
                }">
              <nuxt-link class="page-link" :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab:tab
                    }
                  }">{{ item }}</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list" v-for = "item in tags" :key="item">
            <nuxt-link :to="{
              name: 'home',
              query: {
                tag: item,
                tab:'Tag'
              }
            }" class="tag-pill tag-default">{{ item }}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template> 
<script>
import { mapState } from "vuex";
import {
  getArticles,
  getYourfeedArticles,
  getTags,
  addFavorite,
  deleteFavorite
} from '@/api/article'
import defaultVue from '../../.nuxt/layouts/default.vue';

export default { 
  name: "home",
  // 监听 query 变化，调用 asyncData
  watchQuery: ['page','tag','tab'],
  computed:{
    ...mapState(['user']),
    // 监听总页数
    totalPage(){
      return Math.ceil(this.articlesCount/this.limit)
    }
  },
  async asyncData ({ query }) {
    const limit = 20;
    const page = Number.parseInt(query.page|| 1)
    const tag = query.tag
    const tab = query.tab || 'Global_Feed'
    // 异步串行写法
    // const  { data }  = await getArticles({
    //   limit,
    //   offset: (page - 1) * limit
    // })
    // const { data:tagData } = await getTags()

    const loadArticles = tab === "Your_Feed" ? getYourfeedArticles : getArticles 

    // 异步并行优化 promise.all()
    const [ articlesRes,tagRes ] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])
    const { articles,articlesCount } = articlesRes.data
    const { tags } = tagRes.data

    articles.forEach(article => article.favoriteDisabled = false)

    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tag,
      tab
    }
  },
  methods:{
    async onFavorite(article){
      article.favoriteDisabled = true
      if(article.favorited){
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      }else{
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
};
</script> 
<style>
</style>