export default {
  modules: ['@nuxtjs/apollo'],
  apollo: {
    clientConfigs: {
      default: {
        ssr: true,
        httpEndpoint: 'https://<YOUR_SHOPIFY_STORE>.myshopify.com/api/graphql',
        httpLinkOptions: {
          headers: {
            'X-Shopify-Storefront-Access-Token': '<YOUR_SHOPIFY_TOKEN>'
          }
        },
      }
    }
  }
}