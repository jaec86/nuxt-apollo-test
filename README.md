# NUXT APOLLO TEST

This a test to integrate nuxt, apollo module and shopify storefront API. Before starting the nuxt project you should create a shopify development store. Once you have the store you need to create some products and add them to a collection. I created an automated collection called "all-products" with a condition that every product price should be greater than 0. Finally you need to create a token for the storefront, get the store URL and put them in the nuxt configuration file where says <YOUR_SHOPIFY_TOKEN> and <YOUR_SHOPIFY_STORE>.

# THE PROBLEM
Once you start nuxt project you should see the index page with the first 6 product titles and a "load more" button. The button will show up only if you have more than 6 products. There are also two links at the top to navigate between index and about page. If you go to about page and then go back to index page, you will get an error.

### CHROME
```
TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
```

### FIREFOX
```
TypeError: property descriptors must not specify a value or be writable when a getter or setter has been specified
```

### SAFARI
```
TypeError: Invalid property.  'value' present on property with getter or setter.
```

I would expect to navigate normally between pages but I always get this error. If I include ```prefetch: true``` inside apollo query the error will not appear while navigating, but if I click the "load more" button the same error will show.

I tested this query with [vue-cli-plugin-apollo](https://github.com/Akryum/vue-cli-plugin-apollo) and it is working fine. But I need to include other features that nuxt offers.