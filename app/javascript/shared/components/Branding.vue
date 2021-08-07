<template>
  <a
    class="branding branding--link" href="https://dash.wevrlabs.net/knowledgebase.php?utm_source=chat_widget" target="_blank">
    <!-- <img alt="WevrLabs Hosting" :src="globalConfig.logoThumbnail" /> -->
    <i class="fa fa-book"></i>
    <span>
      Explore Help Articles
    </span>
  </a>
</template>

<script>
import globalConfigMixin from 'shared/mixins/globalConfigMixin';
import { BUS_EVENTS } from 'shared/constants/busEvents';

const {
  LOGO_THUMBNAIL: logoThumbnail,
  BRAND_NAME: brandName,
  WIDGET_BRAND_URL: widgetBrandURL,
} = window.globalConfig || {};

export default {
  mixins: [globalConfigMixin],
  data() {
    return {
      referrerHost: '',
      globalConfig: {
        brandName,
        logoThumbnail,
        widgetBrandURL,
      },
    };
  },
  computed: {
    brandRedirectURL() {
      const baseURL = `${this.globalConfig.widgetBrandURL}?utm_source=widget_branding`;
      if (this.referrerHost) {
        return `${baseURL}&utm_referrer=${this.referrerHost}`;
      }
      return baseURL;
    },
  },
  mounted() {
    bus.$on(BUS_EVENTS.SET_REFERRER_HOST, referrerHost => {
      this.referrerHost = referrerHost;
    });
  },
};
</script>

<style scoped lang="scss">
@import '~widget/assets/scss/variables.scss';

.branding {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: $space-normal 0 $space-slab;
  text-align: center;

  img {
    margin-right: $space-smaller;
    max-width: $space-slab;
    max-height: $space-slab;
  }
}

.branding--link {
  color: #6f6f6f;
  cursor: pointer;
  display: flex;
  filter: grayscale(1);
  font-size: $font-size-small;
  opacity: 0.9;
  text-decoration: none;
  padding: $space-normal 0 $space-slab;
  cursor: pointer;
  transition: .3s ease all;

  &:hover {
    filter: grayscale(0);
    opacity: 1;
    color: #232323;
    transition: .3s ease all;
  }

  img {
    margin-right: $space-smaller;
    /*max-width: $space-slab;*/
    max-height: 1.8rem;
  }
  i.fas, i.fa {
    margin: 0 4px;
  }
}

.brand--alternative {
  padding: $space-slab;
}
</style>
