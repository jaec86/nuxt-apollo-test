<template>
  <div>
    <h1>Index Page</h1>
    <template v-if="products.length">
      <div v-for="product in products">{{ product.node.title }}</div>
    </template>
    <button v-if="hasMore" @click="loadMore">Load More</button>
  </div>
</template>

<script>
  import AllProducts from '@/graphql/AllProducts.gql'

  export default {
    data () {
      return {
        hasMore: false,
        products: []
      }
    },
    apollo: {
      products: {
        query: AllProducts,
        loadingKey: 'loading',
        update (data) {
          this.hasMore = data.shop.collectionByHandle.products.pageInfo.hasNextPage
          return data.shop.collectionByHandle.products.edges
        }
      }
    },
    methods: {
      loadMore() {
        let cursor = this.products.slice(-1)[0].cursor
        this.$apollo.queries.products.fetchMore({
          variables: {
            after: cursor
          },
          updateQuery(previousResult, { fetchMoreResult }) {
            let newProducts = fetchMoreResult.shop.collectionByHandle.products.edges
            this.hasMore = fetchMoreResult.shop.collectionByHandle.products.pageInfo.hasNextPage
            return {
              shop: {
                __typename: 'Shop',
                collectionByHandle: {
                  __typename: 'Collection',
                  products: {
                    __typename: 'ProductConnection',
                    edges: [...previousResult.shop.collectionByHandle.products.edges, ...newProducts],
                    pageInfo: {
                      __typename: 'PageInfo',
                      hasNextPage: this.hasMore
                    }
                  }
                }
              }
            }
          }
        })
      }
    }
  }
</script>